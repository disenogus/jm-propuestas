/* ==========================================================================
   JM Propuestas · App
   Estado → lista de páginas → HTML. Cada cambio vuelve a pintar el documento.
   ========================================================================== */
(function () {
  'use strict';

  const D = window.JM_DATA;
  const STORE_KEY = 'jm-propuesta-v1';
  const SEQ_KEY = 'jm-folio-seq';
  const PX_PER_MM = 96 / 25.4;
  const PAGE_W_PX = 297 * PX_PER_MM;

  /* Límites editoriales: garantizan que nada se desborde de su hoja */
  const VISION_FIRST_CAP = 1100;   // caracteres que caben junto a los pilares
  const QUOTE_ROWS = 13;           // filas por hoja de cotización
  const QUOTE_ROWS_LAST = 8;       // filas en la hoja que lleva los totales
  const SECTION_INDEX_MAX = 9;     // productos listados en la portadilla
  const TAX_RATE = 0.18;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const byId = (arr, id) => arr.find(x => x.id === id);
  const product = id => byId(D.products, id);
  const category = id => byId(D.categories, id);

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const icon = (name, cls = '') => `<span class="ms ${cls}">${esc(name)}</span>`;
  const money = n => 'US$ ' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pad2 = n => String(n).padStart(2, '0');
  const initials = name => String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const today = () => new Date().toISOString().slice(0, 10);
  const fmtDate = iso => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${d} de ${months[m - 1]} de ${y}`;
  };
  const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const setPath = (obj, path, val) => {
    const ks = path.split('.'); const last = ks.pop();
    ks.reduce((o, k) => (o[k] = o[k] || {}), obj)[last] = val;
  };

  /* ------------------------------------------------------------------------
     Estado
     ------------------------------------------------------------------------ */
  function blankState() {
    return {
      v: 1,
      client: { name: '', subtitle: '', location: '', logo: '', cover: '' },
      rep: { name: '', role: '', contact: '' },
      seller: { id: D.sellers[0].id, photo: '' },
      doc: { date: today(), version: 'v1', seq: nextSeq() },
      vision: JSON.parse(JSON.stringify(D.defaults.vision)),
      opts: { eco: true, scen: true, plans: true, quote: true },
      items: [],
      quote: { discount: 0, tax: true, validity: 15, terms: D.defaults.terms }
    };
  }

  function demoState() {
    const s = blankState();
    s.client.name = 'Residencia Lorem';
    s.client.subtitle = 'Seguridad, conectividad, domótica y audio para una residencia conectada, segura y memorable.';
    s.client.location = 'Los Cacicazgos, Santo Domingo';
    s.rep = { name: 'Nombre Apellido', role: 'Propietario', contact: '(809) 000-0000 · cliente@correo.com' };
    s.items = ['p01', 'p02', 'p03', 'p05', 'p06', 'p07', 'p09', 'p10', 'p11', 'p15', 'p17', 'p19', 'p21']
      .map(pid => ({ pid, qty: product(pid).qty, location: product(pid).location }));
    return s;
  }

  function nextSeq() {
    let n = 1;
    try { n = (parseInt(localStorage.getItem(SEQ_KEY), 10) || 0) + 1; localStorage.setItem(SEQ_KEY, n); } catch (e) { n = Math.floor(Math.random() * 900) + 100; }
    return n;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return migrate(JSON.parse(raw));
    } catch (e) { /* almacenamiento no disponible */ }
    return demoState();
  }

  function migrate(s) {
    const b = blankState();
    const out = Object.assign({}, b, s);
    ['client', 'rep', 'seller', 'doc', 'vision', 'opts', 'quote'].forEach(k => { out[k] = Object.assign({}, b[k], s[k] || {}); });
    out.items = (s.items || []).filter(it => product(it.pid));
    return out;
  }

  let state = load();
  let saveTimer = null;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
      catch (e) { toast('Las imágenes son muy pesadas para el guardado automático. Usa "Guardar" (.json).'); }
    }, 300);
  }

  const seller = () => byId(D.sellers, state.seller.id) || D.sellers[0];
  const folio = () => {
    const d = state.doc.date || today();
    return `JM-${d.slice(2, 4)}${d.slice(5, 7)}-${seller().code}-${String(state.doc.seq).padStart(4, '0')}`;
  };

  /* ------------------------------------------------------------------------
     Cálculos
     ------------------------------------------------------------------------ */
  function orderedItems() {
    const out = [];
    D.categories.forEach(c => state.items.forEach(it => { if (product(it.pid).category === c.id) out.push(it); }));
    return out;
  }
  function totals() {
    const sub = state.items.reduce((a, it) => a + product(it.pid).price * (it.qty || 0), 0);
    const disc = sub * (Math.min(Math.max(+state.quote.discount || 0, 0), 100) / 100);
    const base = sub - disc;
    const tax = state.quote.tax ? base * TAX_RATE : 0;
    return { sub, disc, base, tax, total: base + tax, units: state.items.reduce((a, it) => a + (it.qty || 0), 0) };
  }

  /* Divide el texto de visión: primera hoja (con pilares) + continuación */
  function splitVision(text) {
    const paras = String(text || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const first = []; const rest = [];
    let used = 0;
    paras.forEach(p => {
      if (rest.length) { rest.push(p); return; }
      if (used + p.length <= VISION_FIRST_CAP) { first.push(p); used += p.length; return; }
      const room = VISION_FIRST_CAP - used;
      if (room > 180) {
        let cut = p.lastIndexOf('. ', room);
        if (cut < room * 0.5) cut = p.lastIndexOf(' ', room);
        first.push(p.slice(0, cut + 1).trim());
        rest.push(p.slice(cut + 1).trim());
      } else rest.push(p);
      used = VISION_FIRST_CAP;
    });
    return { first, rest };
  }

  /* Reparte filas de la cotización en hojas; la última lleva los totales */
  function chunkQuote(rows) {
    const pages = []; let rem = rows.slice();
    while (rem.length > QUOTE_ROWS_LAST) {
      const take = rem.length > QUOTE_ROWS ? QUOTE_ROWS : Math.ceil(rem.length / 2);
      pages.push(rem.slice(0, take)); rem = rem.slice(take);
    }
    pages.push(rem);
    return pages;
  }

  /* ------------------------------------------------------------------------
     Modelo de páginas
     ------------------------------------------------------------------------ */
  function buildPages() {
    const pages = [];
    const items = orderedItems();
    const cats = D.categories.filter(c => items.some(it => product(it.pid).category === c.id));
    let n = 1; const sec = () => pad2(n++);

    pages.push({ type: 'cover', anchor: 'cover', label: 'Portada' });
    pages.push({ type: 'about', anchor: 'about', label: 'Quiénes somos', num: sec() });

    const v = splitVision(state.vision.body);
    const vNum = sec();
    pages.push({ type: 'vision', anchor: 'vision', label: 'Visión del proyecto', num: vNum, paras: v.first });
    if (v.rest.length) pages.push({ type: 'vision-cont', label: 'Visión del proyecto (cont.)', num: vNum, paras: v.rest });

    if (state.opts.eco) pages.push({ type: 'eco', anchor: 'eco', label: 'Ecosistema', num: sec(), cats: cats.length ? cats : D.categories });

    cats.forEach((c, ci) => {
      const its = items.filter(it => product(it.pid).category === c.id);
      pages.push({ type: 'section', anchor: ci === 0 ? 'products' : null, label: 'Sección · ' + c.name, cat: c, idx: ci + 1, of: cats.length, items: its });
      its.forEach(it => pages.push({ type: 'product', anchor: 'prod-' + it.pid, label: product(it.pid).name, cat: c, secIdx: ci + 1, item: it }));
    });
    if (!cats.length) pages.push({ type: 'empty-products', anchor: 'products', label: 'Productos' });

    if (state.opts.scen) pages.push({ type: 'scen', label: 'Escenarios automáticos', num: sec() });
    if (state.opts.plans) pages.push({ type: 'plans', label: 'Planos', num: sec() });

    if (state.opts.quote) {
      const qNum = sec();
      const chunks = chunkQuote(items);
      let offset = 0;
      chunks.forEach((rows, i) => {
        pages.push({ type: 'quote', anchor: i === 0 ? 'quote' : null, label: 'Resumen de inversión' + (chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : ''), num: qNum, rows, offset, last: i === chunks.length - 1, part: i + 1, parts: chunks.length });
        offset += rows.length;
      });
    }
    pages.push({ type: 'close', anchor: 'close', label: 'Cierre y contacto' });
    return pages;
  }

  /* ------------------------------------------------------------------------
     Render de páginas
     ------------------------------------------------------------------------ */
  function clientName() { return state.client.name || 'Nombre del cliente'; }

  function head(left, right) {
    return `<div class="pg-head"><span class="eyebrow">${left}</span><span class="eyebrow">${right || esc(clientName()) + ' · Propuesta técnica integral'}</span></div>`;
  }
  function foot(i, total) {
    return `<div class="pg-foot"><span>${esc(D.company.name)} · ${esc(D.company.group)}</span><span>Folio ${esc(folio())}</span><span class="num">${pad2(i)} / ${pad2(total)}</span></div>`;
  }
  function ph(iconName, caption, img, cls = '') {
    return `<div class="ph ${cls}">${img ? `<img src="${img}" alt="">` : `${icon(iconName)}<small>${esc(caption)}</small>`}</div>`;
  }
  function avatar(s) {
    return `<div class="avatar">${state.seller.photo ? `<img src="${state.seller.photo}" alt="">` : esc(s.code || initials(s.name))}</div>`;
  }
  function sellerBubble() {
    const s = seller();
    return `<div class="seller">${avatar(s)}<div class="who"><b>${esc(s.name)}</b><span>${esc(s.role)} · ${esc(D.company.name)}</span></div></div>`;
  }
  function paras(list) { return list.map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join(''); }

  const R = {};

  R.cover = () => {
    const c = state.client, s = seller(), r = state.rep;
    return `<section class="page p-cover">
      ${c.cover ? `<div class="bg ph"><img src="${c.cover}" alt=""></div>` : `<div class="bg ph">${icon('image')}<small>Imagen de portada</small></div>`}
      <div class="shade"></div>
      <div class="inner">
        <div class="top">
          <div class="brandmark"><span class="box">JM</span>${esc(D.company.name)}</div>
          <div class="client-logo">${c.logo ? `<img src="${c.logo}" alt="">` : `<div class="ph">${icon('add_photo_alternate')}<small>Logo</small></div>`}</div>
        </div>
        <div class="mid">
          <div class="eyebrow">Propuesta técnica integral · ${esc((state.doc.date || today()).slice(0, 4))}</div>
          <h1>${esc(clientName())}<span class="dot">.</span></h1>
          ${c.subtitle ? `<p class="sub">${esc(c.subtitle)}</p>` : ''}
        </div>
        <div class="bottom">
          ${sellerBubble()}
          <div class="meta">
            <div><div class="label">Preparado para</div><p>${esc(r.name || '—')}${r.role ? `<br>${esc(r.role)}` : ''}</p></div>
            <div><div class="label">Fecha · Versión</div><p>${esc(fmtDate(state.doc.date))}<br>${esc(state.doc.version || '')} · ${esc(folio())}</p></div>
            <div><div class="label">Asesor</div><p>${esc(s.phone)}<br>${esc(s.email)}</p></div>
            <div><div class="label">${esc(D.company.name)}</div><p>${esc(D.company.phone)}<br>${esc(D.company.web)}</p></div>
          </div>
        </div>
      </div>
    </section>`;
  };

  R.about = (p, i, t) => {
    const a = D.company.about;
    return `<section class="page p-about">
      ${head(`<b>${p.num}</b> · Quiénes somos`)}
      <div class="grid">
        <div class="txt">
          <div class="eyebrow">${esc(a.eyebrow)}</div>
          <h2 class="h-display">${esc(a.title)}</h2>
          <p class="lead">${esc(a.body)}</p>
          <div class="brands">${a.brands.map(b => `<span>${esc(b)}</span>`).join('')}</div>
        </div>
        <div class="stats">${a.stats.map(s => `<div class="stat"><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div><div class="n">${esc(s.note)}</div></div>`).join('')}</div>
      </div>
      ${foot(i, t)}
    </section>`;
  };

  R.vision = (p, i, t) => {
    const v = state.vision;
    return `<section class="page p-vision">
      ${head(`<b>${p.num}</b> · Visión del proyecto`)}
      <div class="grid">
        <div><div class="eyebrow" style="margin-bottom:5mm">La premisa del proyecto</div><h2 class="h-display">${esc(v.title || 'Título de la visión')}</h2></div>
        <div class="text body">${p.paras.length ? paras(p.paras) : '<p style="color:#aaa">Describe aquí el proyecto del cliente…</p>'}</div>
        <div class="pillars">${v.pillars.map(pl => `<div class="pillar">${icon(pl.icon)}<h3>${esc(pl.title)}</h3><div class="pl">${esc(pl.lead)}</div><p>${esc(pl.text)}</p></div>`).join('')}</div>
      </div>
      ${foot(i, t)}
    </section>`;
  };

  R['vision-cont'] = (p, i, t) => `<section class="page p-vision-cont">
      ${head(`<b>${p.num}</b> · Visión del proyecto · continuación`)}
      <div class="text body">${paras(p.paras)}</div>
      ${foot(i, t)}
    </section>`;

  R.eco = (p, i, t) => {
    const items = orderedItems();
    return `<section class="page p-eco">
      ${head(`<b>${p.num}</b> · Ecosistema`)}
      <div class="body-wrap">
        <div class="intro">
          <div><div class="eyebrow" style="margin-bottom:4mm">${p.cats.length} sistemas, una plataforma</div><h2 class="h-display">Ecosistema tecnológico <b>integrado.</b></h2></div>
          <p class="lead">Cada subsistema fue seleccionado por su fiabilidad, escalabilidad y compatibilidad con estándares abiertos. Trabajan en sincronía bajo una sola lógica operativa.</p>
        </div>
        <div class="eco" style="grid-template-columns:repeat(${p.cats.length},1fr)">
          ${p.cats.map((c, k) => {
            const n = items.filter(it => product(it.pid).category === c.id).length;
            return `<div class="eco-item"><span class="eyebrow">${pad2(k + 1)} · ${esc(c.name)}</span>${icon(c.icon)}<h3>${esc(c.title.replace(/\.$/, ''))}</h3><p>${esc(c.eco)}</p><span class="count">${n ? n + (n === 1 ? ' producto' : ' productos') : '—'}</span></div>`;
          }).join('')}
        </div>
      </div>
      ${foot(i, t)}
    </section>`;
  };

  R.section = (p, i, t) => {
    const c = p.cat;
    const shown = p.items.slice(0, SECTION_INDEX_MAX);
    const more = p.items.length - shown.length;
    return `<section class="page p-section">
      <div class="txt">
        <div class="eyebrow" style="padding-top:0"><b>Sección ${pad2(p.idx)}</b> · ${pad2(p.idx)} / ${pad2(p.of)}</div>
        <div>
          <div class="bignum">${pad2(p.idx)}</div>
          <h2 class="h-display">${esc(c.title)}</h2>
          <p class="lead">${esc(c.desc)}</p>
          <div class="tags">${c.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>
        </div>
        <div>
          <ul class="index">
            ${shown.map((it, k) => `<li><span class="i">${pad2(k + 1)}</span><span>${esc(product(it.pid).name)}</span><span class="q">${it.qty} ${it.qty === 1 ? 'ud.' : 'uds.'}</span></li>`).join('')}
            ${more > 0 ? `<li class="more">+ ${more} productos más en esta sección</li>` : ''}
          </ul>
          <div class="pg-foot" style="border-top:0;margin-top:3mm;padding-top:0"><span>Folio ${esc(folio())}</span><span class="num">${pad2(i)} / ${pad2(t)}</span></div>
        </div>
      </div>
      ${ph(c.icon, 'Imagen de sección', '', 'side')}
    </section>`;
  };

  R.product = (p, i, t) => {
    const it = p.item, pr = product(it.pid), c = p.cat;
    const units = `${it.qty} ${it.qty === 1 ? 'unidad' : 'unidades'}`;
    return `<section class="page p-product">
      ${head(`<b>Sección ${pad2(p.secIdx)}</b> · ${esc(c.name)}`, `${esc(c.name)} · ${esc(pr.subcategory)}`)}
      <div class="grid">
        <div class="media">
          <div class="ph">${icon(c.icon)}<small>Imagen de producto</small><span class="badge">Imagen de referencia</span></div>
          <div class="model"><div><div class="label">Modelo</div><div class="sku">${esc(pr.sku)}</div></div><div class="brand">${esc(pr.brand)}</div></div>
        </div>
        <div class="info">
          <div class="meta"><span class="chip">${icon('inventory_2')}${esc(units)}</span>${it.location ? `<span class="chip o">${icon('location_on')}${esc(it.location)}</span>` : ''}<span class="chip o">${esc(pr.subcategory)}</span></div>
          <h2>${esc(pr.name)}</h2>
          <p class="desc">${esc(pr.description)}</p>
          <div class="blk push"><span class="label">Especificaciones técnicas</span>
            <div class="specs">${pr.specs.slice(0, 6).map(s => `<div class="spec">${icon(s.icon)}<span class="label">${esc(s.label)}</span><b>${esc(s.value)}</b></div>`).join('')}</div>
          </div>
          <div class="blk"><span class="label">Beneficios para el proyecto</span>
            <ul class="benefits">${pr.benefits.slice(0, 4).map(b => `<li>${icon('check_circle')}<span>${esc(b)}</span></li>`).join('')}</ul>
          </div>
        </div>
      </div>
      ${foot(i, t)}
    </section>`;
  };

  R['empty-products'] = (p, i, t) => `<section class="page">
      ${head('<b>Productos</b>')}
      ${ph('add_shopping_cart', 'Agrega productos en el paso 3 · cada producto genera su propia página')}
      ${foot(i, t)}
    </section>`;

  R.scen = (p, i, t) => `<section class="page p-scen">
      ${head(`<b>${p.num}</b> · Escenarios automáticos`)}
      <div class="wrap">
        <div class="p-eco"><div class="intro" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm;align-items:end">
          <div><div class="eyebrow" style="margin-bottom:4mm">Cómo vivirá la tecnología</div><h2 class="h-display">El hogar responde a su rutina, <b>no al revés.</b></h2></div>
          <p class="lead">Tres escenarios programados que muestran cómo cada sistema actúa en sincronía sin que el propietario tenga que pensar en ello.</p>
        </div></div>
        <div class="scen">${D.defaults.scenarios.map(s => `<div>
          <div class="t">${icon(s.icon)}<span class="eyebrow"><b>${esc(s.time)}</b> · ${esc(s.mode)}</span></div>
          <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>
          <ol>${s.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
        </div>`).join('')}</div>
      </div>
      ${foot(i, t)}
    </section>`;

  R.plans = (p, i, t) => `<section class="page p-plans">
      ${head(`<b>${p.num}</b> · Planos`)}
      <div class="wrap">
        <div style="display:flex;flex-direction:column;gap:5mm">
          <div class="eyebrow">Documentación técnica</div>
          <h2 class="h-display">Planos eléctricos <b>y de redes.</b></h2>
          <p class="lead">Documentación técnica completa de instalaciones eléctricas, redes de datos, domótica y sistemas de comunicación para el proyecto.</p>
        </div>
        <div class="tiles">${D.defaults.plans.map(x => `<div class="tile">${ph(x.icon, 'Plano · imagen')}<div class="cap"><b>${esc(x.title)}</b><span>${esc(x.text)}</span></div></div>`).join('')}</div>
      </div>
      ${foot(i, t)}
    </section>`;

  R.quote = (p, i, t) => {
    const T = totals();
    const q = state.quote;
    const terms = String(q.terms || '').replace(/válida por \d+ días/i, `válida por ${q.validity || 15} días`);
    return `<section class="page p-quote">
      ${head(`<b>${p.num}</b> · Resumen de inversión${p.parts > 1 ? ` · ${p.part} / ${p.parts}` : ''}`)}
      <div class="wrap">
        <div class="top">
          <div><div class="eyebrow" style="margin-bottom:3mm">${state.items.length} productos · ${T.units} unidades</div><h2 class="h-title">Resumen de inversión.</h2></div>
          <div class="eyebrow" style="text-align:right">Folio <b>${esc(folio())}</b><br>${esc(fmtDate(state.doc.date))}</div>
        </div>
        <table class="qt">
          <colgroup><col class="c-i"><col><col class="c-cat"><col class="c-q"><col class="c-u"><col class="c-t"></colgroup>
          <thead><tr><th>#</th><th>Producto</th><th>Sistema</th><th class="n">Cant.</th><th class="n">Precio unit.</th><th class="n">Subtotal</th></tr></thead>
          <tbody>${p.rows.length ? p.rows.map((it, k) => {
            const pr = product(it.pid);
            return `<tr><td class="i">${pad2(p.offset + k + 1)}</td><td>${esc(pr.name)}<span class="s">${esc(pr.sku)}</span></td><td>${esc(category(pr.category).name)}</td><td class="n">${it.qty}</td><td class="n">${money(pr.price)}</td><td class="n">${money(pr.price * it.qty)}</td></tr>`;
          }).join('') : `<tr><td></td><td colspan="5" style="color:#999">Sin productos todavía.</td></tr>`}</tbody>
        </table>
        ${p.last ? `<div class="totals">
          <div class="terms"><span class="label">Condiciones</span>${esc(terms)}</div>
          <dl>
            <div><dt>Subtotal</dt><dd>${money(T.sub)}</dd></div>
            ${T.disc ? `<div><dt>Descuento (${+q.discount}%)</dt><dd>− ${money(T.disc)}</dd></div>` : ''}
            ${q.tax ? `<div><dt>ITBIS (18%)</dt><dd>${money(T.tax)}</dd></div>` : ''}
            <div class="grand"><dt>Total</dt><dd>${money(T.total)}</dd></div>
          </dl>
        </div>` : `<div class="cont">Continúa en la página siguiente →</div>`}
      </div>
      ${foot(i, t)}
    </section>`;
  };

  R.close = (p, i, t) => {
    const s = seller();
    return `<section class="page p-close">
      ${head('<b>Cierre</b> · Próximos pasos')}
      <div class="wrap">
        <div class="txt">
          <div class="eyebrow">Gracias por su confianza</div>
          <h2 class="h-display">Diseñemos juntos <b>el siguiente paso.</b></h2>
          <p class="lead">Esta propuesta fue preparada para ${esc(clientName())}${state.rep.name ? `, a la atención de ${esc(state.rep.name)}` : ''}. Su asesor queda a disposición para resolver dudas y ajustar el alcance.</p>
          <div class="steps">${D.defaults.nextSteps.map((x, k) => `<div><div class="k">${pad2(k + 1)}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join('')}</div>
        </div>
        <div class="card">
          <span class="label">Su asesor</span>
          ${sellerBubble()}
          <ul>
            <li>${icon('call')}${esc(s.phone)}</li>
            <li>${icon('mail')}${esc(s.email)}</li>
            <li>${icon('tag')}Folio ${esc(folio())}</li>
          </ul>
          <div class="co"><span class="label">${esc(D.company.name)} · ${esc(D.company.group)}</span>
            <ul>
              <li>${icon('location_on')}${esc(D.company.city)}</li>
              <li>${icon('call')}${esc(D.company.phone)}</li>
              <li>${icon('language')}${esc(D.company.web)}</li>
              <li>${icon('photo_camera')}${esc(D.company.instagram)}</li>
            </ul>
          </div>
        </div>
      </div>
      ${foot(i, t)}
    </section>`;
  };

  /* ------------------------------------------------------------------------
     Pintado del documento
     ------------------------------------------------------------------------ */
  let pagesCache = [];
  function renderDoc() {
    const pages = buildPages();
    pagesCache = pages;
    const total = pages.length;
    $('#doc').innerHTML = pages.map((p, k) => {
      const i = k + 1;
      return `<div class="pg-wrap" ${p.anchor ? `id="pg-${p.anchor}"` : ''} data-i="${i}">
        <div class="pg-label"><b>${pad2(i)} · ${esc(p.label)}</b><span>${i} de ${total}</span></div>
        <div class="page-frame">${R[p.type](p, i, total)}</div>
      </div>`;
    }).join('');
    const solo = +new URLSearchParams(location.search).get('solo');
    if (solo) { document.documentElement.classList.add('solo'); const w = $$('.pg-wrap')[solo - 1]; if (w) w.classList.add('solo-on'); }
    $('#pv-count').textContent = `${total} páginas`;
    $('#pv-folio').textContent = 'Folio ' + folio();
    fitPages();
  }

  function fitPages() {
    const frame = $('.page-frame');
    if (!frame) return;
    const s = frame.clientWidth / PAGE_W_PX;
    $('#doc').style.setProperty('--s', s.toFixed(4));
  }

  function scrollToPage(anchor) {
    const el = document.getElementById('pg-' + anchor);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 900);
  }

  /* ------------------------------------------------------------------------
     Editor · enlaces de formulario
     ------------------------------------------------------------------------ */
  let renderTimer = null;
  function changed(opts = {}) {
    persist();
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => { renderDoc(); refreshSide(); }, opts.now ? 0 : 120);
  }

  function bindFields() {
    $$('[data-bind]').forEach(el => {
      const path = el.dataset.bind;
      const val = getPath(state, path);
      if (el.type === 'checkbox') el.checked = !!val; else el.value = val == null ? '' : val;
      const ev = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(ev, () => {
        let v = el.type === 'checkbox' ? el.checked : el.value;
        if (el.dataset.num) v = Math.max(+el.min || 0, Math.min(+el.max || 1e9, parseFloat(v) || 0));
        setPath(state, path, v);
        updateCount(path);
        changed();
      });
      updateCount(path);
    });
  }
  function rebindValues() {
    $$('[data-bind]').forEach(el => {
      const val = getPath(state, el.dataset.bind);
      if (el.type === 'checkbox') el.checked = !!val; else el.value = val == null ? '' : val;
      updateCount(el.dataset.bind);
    });
  }
  function updateCount(path) {
    const em = $(`[data-count="${path}"]`);
    if (!em) return;
    const el = $(`[data-bind="${path}"]`);
    const len = (el.value || '').length, max = +el.maxLength;
    em.textContent = `${len.toLocaleString('es')} / ${max.toLocaleString('es')}`;
    em.classList.toggle('over', len >= max);
  }

  /* Pilares de la visión */
  function renderPillarsEditor() {
    $('#pillars-ed').innerHTML = state.vision.pillars.map((p, k) => `
      <div class="pillar-ed">
        <div class="ph-t">${icon(p.icon)} Pilar ${k + 1}</div>
        <div class="row">
          <label class="field"><span>Título</span><input class="input" data-pillar="${k}.title" maxlength="18" value="${esc(p.title)}"></label>
          <label class="field"><span>Frase</span><input class="input" data-pillar="${k}.lead" maxlength="48" value="${esc(p.lead)}"></label>
        </div>
        <label class="field"><span>Detalle</span><input class="input" data-pillar="${k}.text" maxlength="70" value="${esc(p.text)}"></label>
      </div>`).join('');
    $$('[data-pillar]').forEach(el => el.addEventListener('input', () => {
      const [k, f] = el.dataset.pillar.split('.');
      state.vision.pillars[k][f] = el.value; changed();
    }));
  }

  /* Vendedor */
  function renderSellerSelect() {
    const sel = $('#seller-select');
    sel.innerHTML = D.sellers.map(s => `<option value="${s.id}">${esc(s.name)} · ${esc(s.role)}</option>`).join('');
    sel.value = state.seller.id;
    sel.addEventListener('change', () => { state.seller.id = sel.value; changed(); });
  }
  function renderSellerCard() {
    const s = seller();
    $('#seller-card').innerHTML = `<div class="av">${state.seller.photo ? `<img src="${state.seller.photo}" alt="">` : esc(s.code)}</div>
      <div><b>${esc(s.name)}</b><small>${esc(s.phone)} · ${esc(s.email)}</small></div>
      <div class="folio">Folio<br><b>${esc(folio())}</b></div>`;
  }

  /* Imágenes: se reducen en el navegador para que el archivo no pese */
  function readImage(file, max, png) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        if (file.type === 'image/svg+xml') return resolve(fr.result);
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const k = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(png ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.84));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  function bindUploads() {
    $$('[data-upload]').forEach(inp => inp.addEventListener('change', async () => {
      const f = inp.files[0]; if (!f) return;
      try {
        const data = await readImage(f, +inp.dataset.max || 1600, !!inp.dataset.png);
        setPath(state, inp.dataset.upload, data);
        refreshThumbs(); changed({ now: true });
        if (inp.dataset.upload === 'client.cover' || inp.dataset.upload === 'client.logo') scrollToPage('cover');
      } catch (e) { toast('No se pudo leer la imagen.'); }
      inp.value = '';
    }));
    $$('[data-clear]').forEach(b => b.addEventListener('click', () => {
      setPath(state, b.dataset.clear, ''); refreshThumbs(); changed({ now: true });
    }));
  }
  function refreshThumbs() {
    const set = (id, src, ic) => { $(id).innerHTML = src ? `<img src="${src}" alt="">` : icon(ic); };
    set('#thumb-cover', state.client.cover, 'image');
    set('#thumb-logo', state.client.logo, 'add_photo_alternate');
    set('#thumb-avatar', state.seller.photo, 'account_circle');
  }

  /* ------------------------------------------------------------------------
     Paso 3 · Catálogo y selección
     ------------------------------------------------------------------------ */
  let catFilter = 'all', catQuery = '';
  function renderChips() {
    const chips = [{ id: 'all', name: 'Todos', icon: 'apps' }].concat(D.categories);
    $('#cat-chips').innerHTML = chips.map(c => `<button data-cat="${c.id}" class="${c.id === catFilter ? 'on' : ''}">${icon(c.icon)}${esc(c.name)}</button>`).join('');
  }
  function renderCatalog() {
    const q = catQuery.trim().toLowerCase();
    const list = D.products.filter(p => (catFilter === 'all' || p.category === catFilter) &&
      (!q || [p.name, p.sku, p.brand, p.subcategory].join(' ').toLowerCase().includes(q)));
    $('#catalog').innerHTML = list.length ? list.map(p => {
      const added = state.items.some(it => it.pid === p.id);
      return `<article class="pcard" draggable="true" data-pid="${p.id}">
        <div class="img">${icon('drag_indicator', 'grip')}${icon(category(p.category).icon)}${added ? `<span class="added">${icon('check')}Agregado</span>` : ''}</div>
        <div class="bd"><small>${esc(p.brand)} · ${esc(p.sku)}</small><b>${esc(p.name)}</b></div>
        <div class="ft"><span class="price">${money(p.price).replace('.00', '')}</span>
          <button class="btn ${added ? '' : 'primary'}" data-add="${p.id}">${added ? icon('visibility') + 'Ver' : icon('add') + 'Agregar'}</button></div>
      </article>`;
    }).join('') : `<div class="empty-cat">Sin resultados para "${esc(catQuery)}".</div>`;
  }

  function addProduct(pid) {
    if (!state.items.some(it => it.pid === pid)) {
      const p = product(pid);
      state.items.push({ pid, qty: p.qty || 1, location: p.location || '' });
      toast(`Agregado: ${p.name}`);
      persist(); renderDoc(); refreshSide();
    }
    setTimeout(() => scrollToPage('prod-' + pid), 60);
  }

  function renderSelList() {
    const items = orderedItems();
    $('#sel-count').textContent = items.length;
    if (!items.length) {
      $('#sel-list').innerHTML = `<div class="dropzone" id="dropzone">${icon('move_to_inbox')}Aún no hay productos.<br>Arrástralos aquí o al documento, o usa <b>Agregar</b> en el catálogo.</div>`;
      return;
    }
    const T = totals();
    $('#sel-list').innerHTML = D.categories.map(c => {
      const its = items.filter(it => product(it.pid).category === c.id);
      if (!its.length) return '';
      return `<div class="sel-group"><h4>${icon(c.icon)}${esc(c.name)} · ${its.length}</h4>${its.map((it, k) => {
        const p = product(it.pid);
        return `<div class="sel" data-pid="${it.pid}">
          <div class="t"><div><b>${esc(p.name)}</b><small>${esc(p.sku)} · ${money(p.price)} c/u</small></div>
            <div class="ops">
              <button data-move="-1" title="Subir" ${k === 0 ? 'disabled' : ''}>${icon('arrow_upward')}</button>
              <button data-move="1" title="Bajar" ${k === its.length - 1 ? 'disabled' : ''}>${icon('arrow_downward')}</button>
              <button data-goto title="Ver en el documento">${icon('visibility')}</button>
              <button data-remove title="Quitar">${icon('close')}</button>
            </div></div>
          <div class="c">
            <div class="qty"><button data-q="-1" aria-label="Menos">${icon('remove')}</button><input type="number" min="1" max="9999" value="${it.qty}" data-qty aria-label="Cantidad"><button data-q="1" aria-label="Más">${icon('add')}</button></div>
            <input class="input" data-loc maxlength="34" value="${esc(it.location)}" placeholder="Ubicación (ej. Exteriores)">
          </div>
        </div>`;
      }).join('')}</div>`;
    }).join('') + `<div class="dropzone" id="dropzone" style="padding:14px">${icon('add')}Arrastra más productos aquí</div>
      <div class="sel-sum"><span>${items.length} productos · ${T.units} unidades</span><b>${money(T.sub)}</b></div>`;
  }

  function itemOf(el) { const pid = el.closest('[data-pid]').dataset.pid; return state.items.find(it => it.pid === pid); }

  function bindStep3() {
    $('#cat-chips').addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      catFilter = b.dataset.cat; renderChips(); renderCatalog();
    });
    $('#cat-search').addEventListener('input', e => { catQuery = e.target.value; renderCatalog(); });
    $('#catalog').addEventListener('click', e => {
      const b = e.target.closest('[data-add]'); if (b) addProduct(b.dataset.add);
    });
    $('#subtabs').addEventListener('click', e => {
      const b = e.target.closest('[data-sub]'); if (!b) return;
      setSub(b.dataset.sub);
    });

    const list = $('#sel-list');
    list.addEventListener('click', e => {
      const t = e.target.closest('button'); if (!t || !t.closest('[data-pid]')) return;
      const it = itemOf(t);
      if (t.dataset.q) { it.qty = Math.max(1, (it.qty || 1) + +t.dataset.q); t.parentNode.querySelector('input').value = it.qty; changed(); }
      else if (t.hasAttribute('data-remove')) { state.items = state.items.filter(x => x !== it); changed({ now: true }); renderCatalog(); }
      else if (t.hasAttribute('data-goto')) { scrollToPage('prod-' + it.pid); showPreviewOnMobile(); }
      else if (t.dataset.move) {
        const cat = product(it.pid).category;
        const same = state.items.filter(x => product(x.pid).category === cat);
        const j = same.indexOf(it) + +t.dataset.move;
        if (j < 0 || j >= same.length) return;
        const a = state.items.indexOf(it), b = state.items.indexOf(same[j]);
        [state.items[a], state.items[b]] = [state.items[b], state.items[a]];
        changed({ now: true });
      }
    });
    list.addEventListener('input', e => {
      if (!e.target.closest('[data-pid]')) return;
      const it = itemOf(e.target);
      if (e.target.hasAttribute('data-qty')) it.qty = Math.max(1, Math.min(9999, parseInt(e.target.value, 10) || 1));
      if (e.target.hasAttribute('data-loc')) it.location = e.target.value;
      persist(); clearTimeout(renderTimer); renderTimer = setTimeout(() => { renderDoc(); renderQuotePanel(); renderExport(); $('.sel-sum') && renderSumOnly(); }, 200);
    });

    /* Arrastrar y soltar */
    let dragPid = null;
    $('#catalog').addEventListener('dragstart', e => {
      const card = e.target.closest('.pcard'); if (!card) return;
      dragPid = card.dataset.pid; card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', dragPid);
    });
    $('#catalog').addEventListener('dragend', e => {
      const card = e.target.closest('.pcard'); if (card) card.classList.remove('dragging');
      dragPid = null; $$('.drop-hot-zone,.drop-hot,.hot').forEach(x => x.classList.remove('drop-hot-zone', 'drop-hot', 'hot'));
    });
    const zones = [
      [$('#preview'), 'drop-hot-zone'],
      [$('#sub-sel'), 'drop-hot'],
      [list, 'drop-hot-zone']
    ];
    zones.forEach(([el, cls]) => {
      el.addEventListener('dragover', e => { if (!dragPid) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; el.classList.add(cls); });
      el.addEventListener('dragleave', e => { if (!el.contains(e.relatedTarget)) el.classList.remove(cls); });
      el.addEventListener('drop', e => {
        e.preventDefault(); el.classList.remove(cls);
        const pid = e.dataTransfer.getData('text/plain') || dragPid;
        if (pid && product(pid)) addProduct(pid);
      });
    });
  }
  function renderSumOnly() {
    const T = totals();
    const s = $('.sel-sum'); if (s) s.innerHTML = `<span>${state.items.length} productos · ${T.units} unidades</span><b>${money(T.sub)}</b>`;
  }
  function setSub(which) {
    $$('#subtabs [data-sub]').forEach(b => b.classList.toggle('on', b.dataset.sub === which));
    $$('[data-subpanel]').forEach(p => { p.hidden = p.dataset.subpanel !== which; });
  }

  /* ------------------------------------------------------------------------
     Paso 4 · Cotización
     ------------------------------------------------------------------------ */
  function renderQuotePanel() {
    const items = orderedItems();
    const T = totals();
    $('#q-list').innerHTML = items.length ? `<div class="qlist">${items.map(it => {
      const p = product(it.pid);
      return `<div class="qline"><b>${esc(p.name)}</b><span class="tot">${money(p.price * it.qty)}</span><small>${it.qty} × ${money(p.price)}</small><small style="text-align:right">${esc(category(p.category).name)}</small></div>`;
    }).join('')}</div>` : `<div class="dropzone">${icon('receipt_long')}No hay productos. Agrégalos en el paso 3.</div>`;
    $('#q-sum').innerHTML = `
      <div><span>Subtotal · ${T.units} unidades</span><span>${money(T.sub)}</span></div>
      ${T.disc ? `<div><span>Descuento (${+state.quote.discount}%)</span><span>− ${money(T.disc)}</span></div>` : ''}
      ${state.quote.tax ? `<div><span>ITBIS (18%)</span><span>${money(T.tax)}</span></div>` : ''}
      <div class="g"><span>Total</span><b>${money(T.total)}</b></div>`;
  }

  /* ------------------------------------------------------------------------
     Paso 5 · Exportar
     ------------------------------------------------------------------------ */
  function renderExport() {
    const T = totals();
    $('#export-meta').innerHTML = `
      <div><small>Folio</small><b>${esc(folio())}</b></div>
      <div><small>Páginas</small><b>${pagesCache.length}</b></div>
      <div><small>Total</small><b>${money(T.total).replace('US$ ', '$')}</b></div>`;
    const checks = [
      [!!state.client.name, 'Nombre del cliente', state.client.name || 'Falta el nombre (paso 1)', true],
      [!!state.client.cover, 'Imagen de portada', state.client.cover ? 'Cargada' : 'Se usará un fondo gris de muestra', false],
      [!!state.client.logo, 'Logo del cliente', state.client.logo ? 'Cargado' : 'Opcional · se mostrará un espacio reservado', false],
      [!!state.rep.name, 'Representante del cliente', state.rep.name || 'Falta el representante (paso 1)', false],
      [true, 'Vendedor responsable', `${seller().name} · ${seller().code}`, true],
      [state.items.length > 0, 'Productos', state.items.length ? `${state.items.length} productos · ${state.items.length} fichas` : 'Agrega al menos un producto (paso 3)', true]
    ];
    $('#checks').innerHTML = checks.map(([ok, t, d, req]) => `<li class="${ok ? 'ok' : 'no'}">${icon(ok ? 'check_circle' : (req ? 'error' : 'radio_button_unchecked'))}<div><b>${esc(t)}${!ok && req ? ' · requerido' : ''}</b>${esc(d)}</div></li>`).join('');
    const ready = checks.every(([ok, , , req]) => ok || !req);
    $('#btn-pdf').disabled = !ready;
  }

  function refreshSide() {
    renderSellerCard();
    renderSelList();
    renderCatalog();
    renderQuotePanel();
    renderExport();
  }

  /* ------------------------------------------------------------------------
     Navegación por pasos
     ------------------------------------------------------------------------ */
  let step = 1;
  const stepAnchor = { 1: 'cover', 2: 'vision', 3: 'products', 4: 'quote', 5: 'cover' };
  function goStep(n) {
    step = Math.min(5, Math.max(1, n));
    $$('.step').forEach(b => { const k = +b.dataset.step; b.classList.toggle('on', k === step); b.classList.toggle('done', k < step); });
    $$('.panel').forEach(p => p.classList.toggle('on', +p.dataset.panel === step));
    $('#nav-prev').disabled = step === 1;
    $('#nav-next').style.visibility = step === 5 ? 'hidden' : 'visible';
    $('#editor-scroll').scrollTop = 0;
    if (window.innerWidth <= 900) window.scrollTo({ top: 0 });
    const a = stepAnchor[step];
    if (a && window.innerWidth > 900) scrollToPage(a);
    $('.step.on').scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  function showPreviewOnMobile() {
    if (window.innerWidth > 900) return;
    setView('preview');
  }
  function setView(v) {
    document.body.classList.toggle('show-preview', v === 'preview');
    $$('#mtabs button').forEach(b => b.classList.toggle('on', b.dataset.view === v));
    if (v === 'preview') requestAnimationFrame(fitPages);
  }

  /* ------------------------------------------------------------------------
     Archivo · guardar / abrir / nueva
     ------------------------------------------------------------------------ */
  function saveFile() {
    const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${folio()} ${state.client.name || 'propuesta'}.json`.replace(/[\\/:*?"<>|]/g, '');
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Propuesta guardada como archivo.');
  }
  function openFile(file) {
    const fr = new FileReader();
    fr.onload = () => {
      try { state = migrate(JSON.parse(fr.result)); afterReplace(); toast('Propuesta abierta.'); }
      catch (e) { toast('El archivo no es una propuesta válida.'); }
    };
    fr.readAsText(file);
  }
  function afterReplace() {
    persist(); rebindValues(); renderPillarsEditor(); $('#seller-select').value = state.seller.id;
    refreshThumbs(); renderDoc(); refreshSide(); goStep(1);
  }

  /* ------------------------------------------------------------------------
     Utilidades UI
     ------------------------------------------------------------------------ */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 2400);
  }

  function printPdf() {
    const prev = document.title;
    document.title = `${folio()} · Propuesta ${state.client.name || ''}`.trim();
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    const go = () => window.print();
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  function init() {
    bindFields();
    renderPillarsEditor();
    renderSellerSelect();
    bindUploads();
    refreshThumbs();
    renderChips();
    bindStep3();

    $('#stepper').addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (b) goStep(+b.dataset.step); });
    $('#nav-prev').addEventListener('click', () => goStep(step - 1));
    $('#nav-next').addEventListener('click', () => goStep(step + 1));
    $('#mtabs').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) setView(b.dataset.view); });

    $('#btn-save').addEventListener('click', saveFile);
    $('#btn-save-2').addEventListener('click', saveFile);
    $('#btn-open').addEventListener('click', () => $('#file-open').click());
    $('#file-open').addEventListener('change', e => { if (e.target.files[0]) openFile(e.target.files[0]); e.target.value = ''; });
    $('#btn-new').addEventListener('click', () => {
      if (!confirm('¿Empezar una propuesta nueva? Se borrará la propuesta actual de este navegador (guárdala antes si la necesitas).')) return;
      state = blankState(); afterReplace();
    });
    $('#btn-pdf').addEventListener('click', printPdf);

    persist(); // fija el folio de la propuesta en este navegador
    renderDoc();
    refreshSide();
    goStep(1);

    if ('ResizeObserver' in window) new ResizeObserver(fitPages).observe($('#doc'));
    else window.addEventListener('resize', fitPages);
    if (document.fonts) document.fonts.ready.then(fitPages);
  }

  init();
})();
