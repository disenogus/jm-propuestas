/* ==========================================================================
   JM Propuestas · Datos de ejemplo (MVP)
   Todo lo que hay aquí es placeholder. En fase 2 este archivo se reemplaza
   por una consulta al inventario (Supabase / ERP) con la misma estructura.
   ========================================================================== */

window.JM_DATA = {

  company: {
    name: 'JM Security System',
    group: 'Grupo Joseda',
    city: 'Santo Domingo, República Dominicana',
    phone: '(809) 000-0000',
    email: 'ventas@jmsecuritysystem.com',
    web: 'www.jmsecuritysystem.com',
    instagram: '@jmsecuritysystem',
    about: {
      eyebrow: 'JM Security System · Grupo Joseda',
      title: 'Una empresa diseñada para proyectos exigentes.',
      body: 'JM Security System es la división de tecnología de Grupo Joseda. Diseñamos, suministramos e integramos soluciones de seguridad electrónica, redes, automatización y audio residencial para clientes que entienden que la calidad de la infraestructura define la calidad de la vivienda.',
      stats: [
        { value: '17', label: 'Años en operación', note: 'Sede principal · Fundada en 2008' },
        { value: '3', label: 'Sedes', note: 'SD · STG · PUJ' },
        { value: '10+', label: 'Marcas oficiales', note: 'Distribuidor autorizado' },
        { value: '24/7', label: 'Soporte directo', note: 'Sin intermediarios' },
        { value: '100%', label: 'Llave en mano', note: 'Diseño · integración · soporte' },
        { value: 'RD', label: 'Cobertura nacional', note: '3 sedes activas' }
      ],
      brands: ['Hikvision', 'LifeSmart', 'IP-COM', 'Fonestar', 'ZKTeco', 'Honeywell', 'Fortinet', 'Akuvox']
    }
  },

  /* Vendedores registrados. El vendedor se ELIGE de esta lista (no se escribe a mano)
     para que cada propuesta quede atribuida sin alteraciones. */
  sellers: [
    { id: 'cm', code: 'CM', name: 'Carlos Méndez', role: 'Asesor de proyectos', phone: '(809) 000-0001', email: 'cmendez@jmsecuritysystem.com' },
    { id: 'lj', code: 'LJ', name: 'Laura Jiménez', role: 'Ejecutiva de ventas', phone: '(809) 000-0002', email: 'ljimenez@jmsecuritysystem.com' },
    { id: 'pa', code: 'PA', name: 'Pedro Almonte', role: 'Ingeniero de preventa', phone: '(809) 000-0003', email: 'palmonte@jmsecuritysystem.com' },
    { id: 'ac', code: 'AC', name: 'Ana Castillo', role: 'Gerente comercial', phone: '(809) 000-0004', email: 'acastillo@jmsecuritysystem.com' }
  ],

  /* Orden canónico de secciones dentro del brochure */
  categories: [
    {
      id: 'seguridad', name: 'Seguridad', icon: 'videocam',
      title: 'Seguridad electrónica.',
      desc: 'Videovigilancia ColorVu 24/7, grabación centralizada y videoportero IP. La capa que protege, registra y verifica.',
      eco: 'Cámaras ColorVu con analítica AcuSense y grabación local 24/7 en NVR centralizado.',
      tags: ['Hikvision', 'ColorVu', 'AcuSense AI', 'NVR 4K', 'Hik-Connect']
    },
    {
      id: 'conectividad', name: 'Conectividad', icon: 'wifi',
      title: 'Conectividad Wi-Fi 6.',
      desc: 'La columna vertebral. Sin red sólida, ningún sistema inteligente funciona bien. Switch PoE, router empresarial y access points Wi-Fi 6 distribuidos.',
      eco: 'Switch PoE, router empresarial y access points Wi-Fi 6 con cobertura total y red segmentada.',
      tags: ['Switch PoE Gigabit', 'Router empresarial', 'Wi-Fi 6 AX3000', 'Red segmentada']
    },
    {
      id: 'domotica', name: 'Domótica', icon: 'touch_app',
      title: 'Domótica LifeSmart.',
      desc: 'El cerebro del confort. Panel táctil Nature 7 PRO, interruptores inteligentes, cerradura biométrica, termostato y escenarios automáticos. Una sola app, un solo ecosistema.',
      eco: 'Panel táctil Nature 7 PRO, interruptores y escenarios automáticos por habitación.',
      tags: ['Panel Nature 7 PRO', 'Interruptores inteligentes', 'Cerradura biométrica', 'Termostato']
    },
    {
      id: 'audio', name: 'Audio', icon: 'speaker',
      title: 'Audio residencial.',
      desc: 'Cada zona, su propia música. Sistema multizona Fonestar con amplificación clase D, bocinas de techo embutidas y streaming Wi-Fi por habitación.',
      eco: 'Sistema Fonestar con amplificación clase D, altavoces de techo y streaming Wi-Fi por zona.',
      tags: ['Fonestar Pro', 'Clase D · 4 zonas', 'Streaming Wi-Fi', 'Línea 100V']
    },
    {
      id: 'iluminacion', name: 'Iluminación', icon: 'lightbulb',
      title: 'Iluminación integral.',
      desc: 'Luz que define cada ambiente: luminarias empotradas, rieles y puntos decorativos, con regulación de intensidad y escenas por momento del día.',
      eco: 'Luminarias empotradas, rieles y cintas LED con regulación por escena: cena, descanso, exterior.',
      tags: ['Empotrados', 'Rieles', 'Decorativa', 'Escenas y regulación']
    }
  ],

  /* Catálogo. price = precio unitario placeholder en USD. */
  products: [
    /* ---------------- SEGURIDAD ---------------- */
    {
      id: 'p01', category: 'seguridad', subcategory: 'Videovigilancia', brand: 'Hikvision',
      sku: 'DS-2CD2047G3-LIY', name: 'Cámara IP ColorVu Mini Bullet 4MP',
      price: 129, qty: 14, location: 'Exteriores',
      description: 'Imagen a color las 24 horas con tecnología Hybrid Light (IR + luz blanca), micrófono integrado y certificación IP67 para exteriores. Diseñada para identificación visual confiable, incluso en oscuridad total.',
      specs: [
        { icon: 'hd', label: 'Resolución', value: '4MP' },
        { icon: 'palette', label: 'Tecnología', value: 'ColorVu' },
        { icon: 'light_mode', label: 'Iluminación', value: 'Hybrid IR + Blanca' },
        { icon: 'mic', label: 'Audio', value: 'Micrófono integrado' },
        { icon: 'compress', label: 'Compresión', value: 'H.265+' },
        { icon: 'shield', label: 'Protección', value: 'IP67 / IK10' }
      ],
      benefits: [
        'Identificación clara de rostros y placas, incluso de noche.',
        'Audio + video como evidencia ante incidentes.',
        'AcuSense reduce falsas alarmas filtrando movimiento irrelevante.',
        'Cobertura perimetral robusta con un solo cable PoE.'
      ]
    },
    {
      id: 'p02', category: 'seguridad', subcategory: 'Grabación centralizada', brand: 'Hikvision',
      sku: 'DS-7716NXI-K4/16P', name: 'NVR AcuSense 4K · 16 canales PoE',
      price: 689, qty: 1, location: 'Cuarto técnico',
      description: 'El corazón del sistema. Grabación continua 24/7 de hasta 16 cámaras IP en resolución 4K, con analítica AcuSense por inteligencia artificial y disco duro Skyhawk de 6TB especializado en videovigilancia.',
      specs: [
        { icon: 'videocam', label: 'Canales IP', value: '16' },
        { icon: 'hd', label: 'Resolución máx.', value: '4K (8MP)' },
        { icon: 'settings_ethernet', label: 'PoE integrado', value: '16 puertos' },
        { icon: 'hard_drive', label: 'Bahías de disco', value: '4 ranuras SATA' },
        { icon: 'storage', label: 'Disco incluido', value: 'Seagate Skyhawk 6TB' },
        { icon: 'cloud', label: 'Acceso remoto', value: 'Hik-Connect / iVMS' }
      ],
      benefits: [
        'Control centralizado de todas las cámaras desde un solo dispositivo.',
        'Almacenamiento local: la grabación no depende de la nube.',
        'Reproducción remota desde el smartphone en tiempo real.',
        'Cableado simplificado: PoE alimenta cada cámara con un solo cable.'
      ]
    },
    {
      id: 'p03', category: 'seguridad', subcategory: 'Intercomunicación', brand: 'Hikvision',
      sku: 'DS-KIS602 + DS-KH6350-WTE1', name: 'Videoportero IP modular para villas',
      price: 545, qty: 1, location: 'Entrada principal',
      description: 'Estación exterior con cámara HD y comunicación bidireccional en la entrada principal; pantallas táctiles de 7" en interiores y atención desde el smartphone en cualquier lugar del mundo.',
      specs: [
        { icon: 'doorbell', label: 'Estación exterior', value: 'DS-KD8003-IME1' },
        { icon: 'tablet', label: 'Pantallas interiores', value: '7" táctil' },
        { icon: 'videocam', label: 'Cámara', value: 'HD con WDR' },
        { icon: 'settings_ethernet', label: 'Conectividad', value: 'PoE Ethernet' },
        { icon: 'record_voice_over', label: 'Audio', value: 'Bidireccional full-duplex' },
        { icon: 'smartphone', label: 'App móvil', value: 'Hik-Connect' }
      ],
      benefits: [
        'Atienda visitas desde la entrada o desde su teléfono, esté donde esté.',
        'Apertura remota de portón con un toque.',
        'Captura de imagen automática de cada visita.',
        'Integración total con la app de CCTV (Hik-Connect).'
      ]
    },
    {
      id: 'p04', category: 'seguridad', subcategory: 'Videovigilancia', brand: 'Hikvision',
      sku: 'DS-2CD1383G2-LIUF', name: 'Cámara Turret 8MP con Smart Hybrid Light',
      price: 115, qty: 6, location: 'Exterior · IP67',
      description: 'Cámara turret 4K con iluminación híbrida —infrarrojo y luz blanca simultáneos— hasta 30 metros, micrófono integrado y clasificación de personas y vehículos por IA (AcuSense Lite).',
      specs: [
        { icon: 'hd', label: 'Resolución', value: '8MP (4K UHD)' },
        { icon: 'camera', label: 'Lente', value: '2.8 mm · 113°' },
        { icon: 'light_mode', label: 'Iluminación', value: 'Hybrid IR + Blanca · 30 m' },
        { icon: 'mic', label: 'Audio', value: 'Micrófono integrado' },
        { icon: 'compress', label: 'Compresión', value: 'H.265+ / H.264+' },
        { icon: 'shield', label: 'Protección', value: 'IP67' }
      ],
      benefits: [
        'Identificación clara incluso en oscuridad total, sin puntos ciegos.',
        'Clasificación por IA reduce falsas alarmas de movimiento irrelevante.',
        'Audio como evidencia adicional ante incidentes.',
        'Respaldo local en microSD, independiente del NVR central.'
      ]
    },

    /* ---------------- CONECTIVIDAD ---------------- */
    {
      id: 'p05', category: 'conectividad', subcategory: 'Distribución de red', brand: 'Hikvision',
      sku: 'DS-3E1510P-SI', name: 'Switch PoE Gigabit 8 puertos',
      price: 139, qty: 1, location: 'Cuarto técnico',
      description: 'Alimentación eléctrica y datos por el mismo cable a cada cámara IP, access point y videoportero. Reduce cableado, elimina fuentes externas y mantiene la infraestructura limpia y organizada en el rack.',
      specs: [
        { icon: 'settings_ethernet', label: 'Puertos', value: '8 PoE + uplink' },
        { icon: 'speed', label: 'Velocidad', value: 'Gigabit (1 Gbps)' },
        { icon: 'bolt', label: 'PoE / PoE+', value: 'IEEE 802.3af / at' },
        { icon: 'tune', label: 'Gestión', value: 'Smart Managed' },
        { icon: 'straighten', label: 'Modo Extender', value: 'Hasta 250 m' },
        { icon: 'thunderstorm', label: 'Protección', value: 'Sobrecarga + rayo 6 kV' }
      ],
      benefits: [
        'Un solo cable por dispositivo: energía y datos juntos.',
        'Sin fuentes externas, sin transformadores adicionales.',
        'Mayor estabilidad de red y latencia mínima.',
        'Protección contra sobrevoltaje y descargas atmosféricas.'
      ]
    },
    {
      id: 'p06', category: 'conectividad', subcategory: 'Núcleo de red', brand: 'IP-COM',
      sku: 'M30', name: 'Router empresarial IP-COM M30',
      price: 159, qty: 1, location: 'Cuarto técnico',
      description: 'Núcleo de red diseñado para soportar hasta 100 usuarios concurrentes con gestión avanzada, control de ancho de banda y seguridad integrada. Preparado para streaming, CCTV, domótica y trabajo remoto.',
      specs: [
        { icon: 'group', label: 'Capacidad', value: 'Hasta 100 usuarios' },
        { icon: 'tune', label: 'QoS', value: 'Inteligente por dispositivo' },
        { icon: 'vpn_lock', label: 'VPN', value: 'PPTP · L2TP · OpenVPN' },
        { icon: 'security', label: 'Firewall', value: 'SPI integrado' },
        { icon: 'lan', label: 'VLAN', value: '802.1Q soportado' },
        { icon: 'cloud', label: 'Gestión', value: 'Nube + Web local' }
      ],
      benefits: [
        'Conexión estable bajo alta demanda simultánea.',
        'Red segmentada: invitados y dispositivos IoT aislados.',
        'Protección contra accesos no autorizados.',
        'Acceso VPN seguro a la red de casa desde el exterior.'
      ]
    },
    {
      id: 'p07', category: 'conectividad', subcategory: 'Cobertura Wi-Fi', brand: 'IP-COM',
      sku: 'PRO-6-IW', name: 'Access Point Wi-Fi 6 AX3000 de pared',
      price: 119, qty: 4, location: 'Interior · Pared',
      description: 'Distribución inalámbrica de nueva generación con Wi-Fi 6 (802.11ax), instalado embutido en caja de pared estándar. Diseñado para residencias donde la estética importa tanto como el rendimiento.',
      specs: [
        { icon: 'wifi', label: 'Estándar', value: 'Wi-Fi 6 (802.11ax)' },
        { icon: 'speed', label: 'Velocidad combinada', value: '3000 Mbps (AX3000)' },
        { icon: 'settings_input_antenna', label: 'Banda', value: 'Dual concurrente' },
        { icon: 'devices', label: 'Dispositivos', value: 'Hasta 80 simultáneos' },
        { icon: 'electrical_services', label: 'Instalación', value: 'Caja eléctrica de pared' },
        { icon: 'square_foot', label: 'Cobertura', value: '~250 m² por unidad' }
      ],
      benefits: [
        'Diseño embutido y discreto que se integra a la pared.',
        'Roaming transparente: el dispositivo cambia de AP sin cortes.',
        'Puerto IPTV dedicado para televisión por streaming.',
        'Soporta más de 80 dispositivos simultáneos sin saturarse.'
      ]
    },
    {
      id: 'p08', category: 'conectividad', subcategory: 'Cobertura Wi-Fi', brand: 'IP-COM',
      sku: 'iUAP-AC-LITE', name: 'Access Point de techo 802.11ac dual banda',
      price: 89, qty: 2, location: 'Interior · Techo',
      description: 'Punto de acceso Gigabit para instalación en cielo raso, con tecnología MU-MIMO para atender múltiples dispositivos de forma simultánea sin perder velocidad. Antenas omnidireccionales y diseño discreto.',
      specs: [
        { icon: 'wifi', label: 'Estándar', value: '802.11ac Wave 2' },
        { icon: 'speed', label: 'Velocidad combinada', value: '1167 Mbps' },
        { icon: 'settings_input_antenna', label: 'Banda', value: 'Dual 2.4 + 5 GHz' },
        { icon: 'hub', label: 'MU-MIMO', value: 'Sí' },
        { icon: 'bolt', label: 'Alimentación', value: 'PoE 802.3af/at' },
        { icon: 'square_foot', label: 'Cobertura', value: '~120 m² por unidad' }
      ],
      benefits: [
        'MU-MIMO mantiene la velocidad con varios dispositivos a la vez.',
        'Instalación discreta embutida en el techo, sin cables visibles.',
        'Ideal para complementar zonas sin cobertura de los AP de pared.',
        'Un solo cable PoE alimenta y conecta cada punto de acceso.'
      ]
    },

    /* ---------------- DOMÓTICA ---------------- */
    {
      id: 'p09', category: 'domotica', subcategory: 'Centro de control', brand: 'LifeSmart',
      sku: 'LS227 · Nature 7 PRO', name: 'Panel táctil Nature 7 PRO',
      price: 758, qty: 2, location: 'Sala + Family',
      description: 'El cerebro de la residencia. Pantalla táctil de alta gama que concentra el control de luces, clima, audio, cámaras y escenarios desde una interfaz elegante. Funciona aunque el internet falle.',
      specs: [
        { icon: 'tablet', label: 'Pantalla', value: '7" táctil capacitiva' },
        { icon: 'wifi', label: 'Conectividad', value: 'Wi-Fi · Zigbee · BLE' },
        { icon: 'mic', label: 'Asistente', value: 'Alexa · Google · Siri' },
        { icon: 'cloud_off', label: 'Operación local', value: 'Sin dependencia de nube' },
        { icon: 'build', label: 'Instalación', value: 'Empotrada en pared' },
        { icon: 'diamond', label: 'Acabado', value: 'Cristal templado' }
      ],
      benefits: [
        'Control total desde un solo punto físico, sin buscar la app.',
        'Respuesta instantánea sin esperar la nube.',
        'Escenarios con un toque: cine, cena, noche, salida.',
        'Diseño que se integra discretamente a la arquitectura.'
      ]
    },
    {
      id: 'p10', category: 'domotica', subcategory: 'Iluminación inteligente', brand: 'LifeSmart',
      sku: 'LS123 · LS124 · LS125', name: 'Interruptores LifeSmart de 1, 2 y 3 posiciones',
      price: 85, qty: 45, location: 'Toda la residencia',
      description: 'Reemplazan los interruptores convencionales sin modificar el cableado existente. Control manual físico, por app, por voz o por escena programada. Diseño minimalista en cristal blanco.',
      specs: [
        { icon: 'toggle_on', label: 'Configuraciones', value: '1, 2 o 3 circuitos' },
        { icon: 'bolt', label: 'Carga máx.', value: '10 A por canal' },
        { icon: 'wifi', label: 'Comunicación', value: 'Wi-Fi + CoSS RF' },
        { icon: 'cable', label: 'Cableado', value: 'Compatible existente' },
        { icon: 'touch_app', label: 'Operación', value: 'Físico · App · Voz' },
        { icon: 'schedule', label: 'Programación', value: 'Horarios + escenas' }
      ],
      benefits: [
        'Apague todas las luces de la casa con un solo toque al salir.',
        'Sin romper paredes: usa el cableado existente.',
        'Ahorro energético medible: 15–25% en consumo de iluminación.',
        'Diseño elegante que eleva la percepción del espacio.'
      ]
    },
    {
      id: 'p11', category: 'domotica', subcategory: 'Control de acceso', brand: 'LifeSmart',
      sku: 'LS101GS', name: 'Cerradura inteligente con huella, código y NFC',
      price: 289, qty: 1, location: 'Entrada principal',
      description: 'Acceso seguro sin llaves físicas. Cuatro métodos de apertura —huella dactilar, código PIN, tarjeta NFC y llave de emergencia— más control remoto desde la app. Cada acceso queda registrado.',
      specs: [
        { icon: 'fingerprint', label: 'Apertura', value: 'Huella · PIN · NFC · Llave' },
        { icon: 'bluetooth', label: 'Conectividad', value: 'Wi-Fi + Bluetooth' },
        { icon: 'group', label: 'Usuarios', value: 'Múltiples perfiles' },
        { icon: 'history', label: 'Bitácora', value: 'Historial completo' },
        { icon: 'battery_full', label: 'Batería', value: '8–12 meses uso normal' },
        { icon: 'usb', label: 'Modo emergencia', value: 'USB-C externo' }
      ],
      benefits: [
        'Nunca más se quedará fuera por olvidar las llaves.',
        'Otorgue acceso temporal al personal de servicio o visitas.',
        'Bitácora detallada: quién entró, cuándo y cómo.',
        'Notificación instantánea de cada apertura al móvil.'
      ]
    },
    {
      id: 'p12', category: 'domotica', subcategory: 'Panel de control', brand: 'LifeSmart',
      sku: 'LS218-WH3 · Nature Mini L', name: 'Panel táctil compacto Nature Mini L',
      price: 199, qty: 3, location: 'Pasillos y accesos',
      description: 'Versión compacta de la familia Nature. Pantalla táctil de borde a borde para los puntos de paso de la casa: funciona como interruptor, panel de escenas, pantalla de clima o control de A/C.',
      specs: [
        { icon: 'tablet', label: 'Pantalla', value: 'Táctil, borde a borde' },
        { icon: 'apps', label: 'Funciones', value: 'Interruptor · Escenas · Clima' },
        { icon: 'movie', label: 'Escenarios', value: 'Away · Sleep · Film · Cena' },
        { icon: 'tune', label: 'Control', value: 'Cortinas · Luces · A/C' },
        { icon: 'build', label: 'Instalación', value: 'Empotrada en pared' },
        { icon: 'hub', label: 'Ecosistema', value: 'LifeSmart · CoSS' }
      ],
      benefits: [
        'Formato compacto ideal para pasillos y entradas secundarias.',
        'Un solo panel reemplaza interruptor, termostato y escenas.',
        'Se integra al mismo ecosistema del panel Nature 7 PRO.',
        'Escenarios de un toque: salida, dormir, cine, cena.'
      ]
    },
    {
      id: 'p13', category: 'domotica', subcategory: 'Control universal', brand: 'LifeSmart',
      sku: 'LS251WH · Spot Mini', name: 'Mando universal infrarrojo Spot Mini',
      price: 39, qty: 4, location: 'Habitaciones',
      description: 'Reemplaza los controles remotos tradicionales de TV, aire acondicionado y abanicos. Cobertura infrarroja de 360°, controlable desde la app, un panel de pared o por voz, con aprendizaje de códigos IR.',
      specs: [
        { icon: 'settings_remote', label: 'Alcance IR', value: '360° · 5–12 m' },
        { icon: 'graphic_eq', label: 'Frecuencia IR', value: '38 kHz' },
        { icon: 'wifi_tethering', label: 'Protocolo', value: 'CoSS · 200 m' },
        { icon: 'mic', label: 'Voz', value: 'Alexa · Google Assistant' },
        { icon: 'power', label: 'Alimentación', value: '5V / 2A · Micro USB' },
        { icon: 'devices', label: 'Dispositivos', value: 'TV · A/C · Abanicos' }
      ],
      benefits: [
        'Aprende el código de cualquier equipo infrarrojo existente.',
        'Elimina la necesidad de múltiples controles por habitación.',
        'Control por voz para quienes prefieren no usar la app.',
        'Se integra a escenarios: "cine" apaga luces y enciende el TV.'
      ]
    },
    {
      id: 'p14', category: 'domotica', subcategory: 'Climatización', brand: 'LifeSmart',
      sku: 'LS220-GT1', name: 'Termostato inteligente para fan coil',
      price: 129, qty: 5, location: 'Dormitorios y sala',
      description: 'Control independiente de unidades de fan coil, con pantalla clara y marco negro. Rango de temperatura configurable y comunicación inalámbrica CoSS de largo alcance, integrado al ecosistema LifeSmart.',
      specs: [
        { icon: 'thermostat', label: 'Rango', value: '16 °C – 32 °C' },
        { icon: 'power', label: 'Alimentación', value: '230V AC · 1W' },
        { icon: 'wifi_tethering', label: 'Protocolo', value: 'CoSS · 433 MHz' },
        { icon: 'settings_input_antenna', label: 'Alcance', value: 'Hasta 100 m' },
        { icon: 'build', label: 'Instalación', value: 'Empotrada · caja embutida' },
        { icon: 'palette', label: 'Acabado', value: 'Marco negro' }
      ],
      benefits: [
        'Control independiente por zona, sin sobre-enfriar toda la casa.',
        'Programable por horarios y por escena con el resto de la domótica.',
        'Ahorro energético al climatizar solo los espacios ocupados.',
        'Acabado que combina con interruptores y paneles.'
      ]
    },

    /* ---------------- AUDIO ---------------- */
    {
      id: 'p15', category: 'audio', subcategory: 'Amplificación', brand: 'Fonestar',
      sku: 'PROX-60', name: 'Amplificador de megafonía multizona 60W',
      price: 249, qty: 2, location: 'Rack de equipos',
      description: 'Amplificador PA de 60W RMS con dos zonas de salida en línea de 100V, entrada USB/MP3 con arranque automático y sintonizador FM digital: la base del sistema de audio ambiental de la residencia.',
      specs: [
        { icon: 'volume_up', label: 'Potencia', value: '60W RMS' },
        { icon: 'speaker_group', label: 'Zonas', value: '2 zonas · 100V' },
        { icon: 'input', label: 'Entradas', value: '2× Aux + 2× Mic' },
        { icon: 'music_note', label: 'Reproducción', value: 'USB/MP3 + FM' },
        { icon: 'graphic_eq', label: 'Distorsión', value: '< 1% a 1 kHz' },
        { icon: 'power', label: 'Alimentación', value: '230V · 200W' }
      ],
      benefits: [
        'Alimenta múltiples zonas de audio ambiental desde un solo equipo.',
        'Reproduce música desde USB sin depender de otro dispositivo.',
        'Diseño sin ventilador, silencioso para instalación en rack.',
        'Entradas de micrófono para anuncios o intercomunicación.'
      ]
    },
    {
      id: 'p16', category: 'audio', subcategory: 'Reproducción', brand: 'Fonestar',
      sku: 'SKY-6T-DOME', name: 'Bocina de techo 6" con transformador 100V',
      price: 45, qty: 8, location: 'Techos · zonas comunes',
      description: 'Altavoz de techo de 6" con transformador de línea 100V: sonido claro, uniforme y sin distorsión, embebido discretamente en el techo. Cada zona recibe streaming inalámbrico desde el móvil.',
      specs: [
        { icon: 'speaker', label: 'Tamaño', value: '6 pulgadas' },
        { icon: 'cable', label: 'Tipo de línea', value: '100V baja impedancia' },
        { icon: 'electrical_services', label: 'Transformador', value: 'Integrado' },
        { icon: 'surround_sound', label: 'Cobertura', value: 'Multizona uniforme' },
        { icon: 'build', label: 'Instalación', value: 'Embutida en techo' },
        { icon: 'umbrella', label: 'Uso', value: 'Interior · exterior cubierto' }
      ],
      benefits: [
        'Instalación discreta: bocinas embutidas al techo.',
        'Sonido uniforme en todo el espacio, sin "puntos muertos".',
        'Streaming directo desde Spotify, Apple Music o YouTube Music.',
        'Durabilidad para uso continuo y exteriores cubiertos.'
      ]
    },
    {
      id: 'p17', category: 'audio', subcategory: 'Streaming', brand: 'Fonestar',
      sku: 'FONCAST', name: 'Receptor de audio Wi-Fi para streaming multiroom',
      price: 79, qty: 4, location: 'Una por zona',
      description: 'Receptor compacto que conecta el sistema de audio a servicios de streaming, radio por internet y reproducción por microSD, controlado desde una app móvil con sincronización multiroom.',
      specs: [
        { icon: 'wifi', label: 'Conectividad', value: 'WiFi 2.4GHz + Ethernet' },
        { icon: 'output', label: 'Salida', value: 'Aux + óptica Toslink' },
        { icon: 'smartphone', label: 'Control', value: 'App iOS / Android' },
        { icon: 'sd_card', label: 'Reproducción', value: 'MicroSD · Streaming' },
        { icon: 'sync', label: 'Multiroom', value: 'Sincronización entre unidades' },
        { icon: 'straighten', label: 'Dimensiones', value: '76 × 76 × 19 mm' }
      ],
      benefits: [
        'Convierte cualquier entrada del sistema en fuente de streaming.',
        'Control total desde el celular, sin control remoto.',
        'Sincroniza audio entre zonas, simultáneo o independiente.',
        'Tamaño reducido, se integra discreto junto al equipo.'
      ]
    },
    {
      id: 'p18', category: 'audio', subcategory: 'Home theatre', brand: 'Sonos',
      sku: 'BEAM · Gen 2', name: 'Barra de sonido compacta con Dolby Atmos',
      price: 499, qty: 1, location: 'Bajo TV · Family',
      description: 'Soundbar todo-en-uno con procesamiento Dolby Atmos, cinco amplificadores clase D y sintonía automática de sala. Se conecta por HDMI eARC y opera en la misma red Wi-Fi del sistema.',
      specs: [
        { icon: 'surround_sound', label: 'Audio', value: 'Dolby Atmos · 5 amplif.' },
        { icon: 'tv', label: 'Conexión TV', value: 'HDMI eARC' },
        { icon: 'wifi', label: 'Red', value: 'WiFi 2.4GHz + Ethernet' },
        { icon: 'mic', label: 'Voz', value: 'Alexa · Google Assistant' },
        { icon: 'cast', label: 'Streaming', value: 'AirPlay 2 · App Sonos' },
        { icon: 'straighten', label: 'Dimensiones', value: '651 × 100 × 68 mm' }
      ],
      benefits: [
        'Mejora el audio de cualquier TV sin altavoces adicionales.',
        'Se integra al mismo ecosistema del sistema multiroom.',
        'Instalación simple: un solo cable HDMI hacia el televisor.',
        'Sintonía automática ajusta el sonido a la acústica de la sala.'
      ]
    },

    /* ---------------- ILUMINACIÓN ---------------- */
    {
      id: 'p19', category: 'iluminacion', subcategory: 'Empotrados', brand: 'Genérico',
      sku: 'QE90L2S2', name: 'Ojos de buey dobles',
      price: 68, qty: 12, location: 'Recibidor / sala',
      description: 'Luz focal precisa para resaltar mobiliario y objetos decorativos. Acabado negro mate que se integra discretamente en el plafón, con regulación DALI para configurar escenas por momento del día.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '2 × 6 W' },
        { icon: 'flare', label: 'Apertura', value: '60°' },
        { icon: 'tune', label: 'Regulación', value: 'DALI' },
        { icon: 'light_mode', label: 'CCT', value: '2700–5000K' },
        { icon: 'water_drop', label: 'Frontal', value: 'IP54' },
        { icon: 'straighten', label: 'Corte', value: '90 × 180 mm' }
      ],
      benefits: [
        'Luz focal precisa para resaltar mobiliario y objetos decorativos.',
        'Acabado negro mate que se integra discretamente en el plafón.',
        'Regulación DALI para configurar escenas por momento del día.',
        'Cinco temperaturas de color seleccionables, de cálido a neutro.'
      ]
    },
    {
      id: 'p20', category: 'iluminacion', subcategory: 'Empotrados', brand: 'Genérico',
      sku: 'QE75L1', name: 'Ojos de buey simples',
      price: 38, qty: 16, location: 'Baño principal / terraza',
      description: 'Luz descendente pareja sobre el vanity y zonas de circulación. Reflector cónico interior que reduce el deslumbramiento y regulación DALI integrada con las escenas de la residencia.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '6 W' },
        { icon: 'flare', label: 'Apertura', value: '60°' },
        { icon: 'tune', label: 'Regulación', value: 'DALI' },
        { icon: 'light_mode', label: 'CCT', value: '2700–5000K' },
        { icon: 'straighten', label: 'Diámetro', value: 'Ø 82 mm' },
        { icon: 'palette', label: 'Reproducción', value: 'CRI > 90' }
      ],
      benefits: [
        'Luz descendente pareja sobre el vanity y zona de circulación.',
        'Acabado negro mate que desaparece contra plafones oscuros.',
        'Regulación DALI integrada con las escenas de la residencia.',
        'Reflector cónico interior que reduce el deslumbramiento.'
      ]
    },
    {
      id: 'p21', category: 'iluminacion', subcategory: 'Cintas LED', brand: 'Genérico',
      sku: 'AHT2020', name: 'Cinta LED de exterior',
      price: 95, qty: 4, location: 'Marquesina',
      description: 'Luz continua para acentuar plafones de madera y volúmenes exteriores. Protección IP67 con encapsulado molded, sistema 48V DC de bajo consumo y tono cálido que integra con madera y piedra.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '10 W/m' },
        { icon: 'light_mode', label: 'CCT', value: '3000K' },
        { icon: 'water_drop', label: 'Protección', value: 'IP67 molded' },
        { icon: 'power', label: 'Tensión', value: '48 V DC' },
        { icon: 'straighten', label: 'Longitud', value: '5 m por rollo' },
        { icon: 'width', label: 'Ancho', value: '20 mm' }
      ],
      benefits: [
        'Luz continua para acentuar plafones de madera y volúmenes.',
        'Protección IP67 con encapsulado molded, apta para intemperie.',
        'Sistema 48V DC de bajo consumo y alta uniformidad lumínica.',
        'Tono cálido 3000K que integra con la madera y la piedra.'
      ]
    },
    {
      id: 'p22', category: 'iluminacion', subcategory: 'Cintas LED', brand: 'Genérico',
      sku: 'NJT1010T', name: 'Cinta LED de acento',
      price: 42, qty: 6, location: 'Cabeceras, baños y escaleras',
      description: 'Cinta ultra-delgada que se oculta tras cabeceras y cornisas, ideal para iluminación indirecta cálida en dormitorios y baños. Sistema 24V DC de bajo voltaje con corte cada 25 mm.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '10 W/m' },
        { icon: 'light_mode', label: 'CCT', value: '3000K' },
        { icon: 'layers', label: 'Montaje', value: 'Adhesivo (gluing)' },
        { icon: 'power', label: 'Tensión', value: '24 V DC' },
        { icon: 'straighten', label: 'Longitud', value: '5 m · corte c/25 mm' },
        { icon: 'width', label: 'Ancho', value: '10 mm' }
      ],
      benefits: [
        'Cinta ultra-delgada que se oculta tras cabeceras y cornisas.',
        'Iluminación indirecta cálida en dormitorios y baños.',
        'Sistema 24V DC de bajo voltaje, seguro para zonas húmedas.',
        'Corte cada 25 mm para adaptarse a cualquier longitud.'
      ]
    },
    {
      id: 'p23', category: 'iluminacion', subcategory: 'Rieles', brand: 'Genérico',
      sku: 'TLS-MS210-B', name: 'Sistema spot en riel magnético',
      price: 310, qty: 2, location: 'Family room',
      description: 'Sistema modular que permite recolocar y añadir puntos sin obra. Combina spots orientables, parrillas anti-deslumbramiento y difusores lineales en un mismo riel, con acabado negro mate.',
      specs: [
        { icon: 'straighten', label: 'Módulo riel', value: '1 m' },
        { icon: 'bolt', label: 'Por spot', value: '8–12 W' },
        { icon: 'zoom_in', label: 'Zoom spot', value: '15°–50°' },
        { icon: 'tune', label: 'Regulación', value: 'DALI' },
        { icon: 'light_mode', label: 'CCT', value: '3000–5000K' },
        { icon: 'palette', label: 'Reproducción', value: 'CRI > 90' }
      ],
      benefits: [
        'Sistema modular: recoloque y añada puntos sin obra.',
        'Spots, parrillas y difusores lineales en un mismo riel.',
        'Zoom óptico 15°–45° por spot para adaptar el haz a cada tarea.',
        'Acabado negro mate que se pierde en la arquitectura.'
      ]
    },
    {
      id: 'p24', category: 'iluminacion', subcategory: 'Rieles', brand: 'Genérico',
      sku: 'MT20FD', name: 'Sistema track lineal con difusor',
      price: 58, qty: 4, location: 'Cocina y comedor',
      description: 'Iluminación general uniforme sobre isla y comedor. Difusor natural que suaviza la luz y elimina puntos calientes, con CCT ajustable para pasar de luz de trabajo a ambiente cálido.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '7 W' },
        { icon: 'straighten', label: 'Longitud', value: '300 mm' },
        { icon: 'light_mode', label: 'CCT', value: '3000–5000K tunable' },
        { icon: 'power', label: 'Tensión', value: '24–48 V DC' },
        { icon: 'blur_on', label: 'Difusor', value: 'Natural' },
        { icon: 'view_module', label: 'Encastre', value: 'Modular' }
      ],
      benefits: [
        'Iluminación general uniforme sobre isla y comedor.',
        'Difusor natural que suaviza la luz y elimina puntos calientes.',
        'CCT ajustable: de luz de trabajo a ambiente cálido.',
        'Se combina en el mismo riel con spots y parrillas.'
      ]
    },
    {
      id: 'p25', category: 'iluminacion', subcategory: 'Servicio', brand: 'Genérico',
      sku: 'LDP-01-R12W-30K-N', name: 'Paneles LED de servicio',
      price: 18, qty: 10, location: 'Cocina caliente y lavandería',
      description: 'Iluminación pareja y funcional para zonas de trabajo intensivo. Versiones empotrable y superficial según el plafón disponible, con alto flujo luminoso y acabado blanco discreto.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '12 W' },
        { icon: 'wb_sunny', label: 'Flujo', value: '1200 lm' },
        { icon: 'light_mode', label: 'CCT', value: '3000K cálido' },
        { icon: 'water_drop', label: 'Protección', value: 'IP20 interior' },
        { icon: 'straighten', label: 'Empotrable', value: 'Ø 165 mm' },
        { icon: 'palette', label: 'Reproducción', value: 'Ra > 70' }
      ],
      benefits: [
        'Iluminación pareja y funcional para zonas de trabajo intensivo.',
        'Versiones empotrable (Ø165 mm) y superficial (Ø160 mm).',
        'Alto flujo luminoso (1200 lm) con solo 12 W de consumo.',
        'Acabado blanco discreto para zonas técnicas.'
      ]
    },
    {
      id: 'p26', category: 'iluminacion', subcategory: 'Exterior', brand: 'Genérico',
      sku: 'H-600/S', name: 'Luminarias empotradas de piso',
      price: 54, qty: 8, location: 'Marquesina y jardines',
      description: 'Iluminación de piso para bañar muros y volúmenes de piedra. Carcasa de lámina de acero satinada resistente a la intemperie, aplicable tanto en marquesina como en zonas ajardinadas.',
      specs: [
        { icon: 'bolt', label: 'Consumo', value: '50 W' },
        { icon: 'power', label: 'Tensión', value: '100–240 V' },
        { icon: 'light_mode', label: 'CCT', value: '3000K cálido' },
        { icon: 'emoji_objects', label: 'Portalámpara', value: 'GX5.3 / GU10' },
        { icon: 'straighten', label: 'Empotrable', value: 'Ø 100 mm' },
        { icon: 'thermostat', label: 'Operación', value: '-10 a +40 °C' }
      ],
      benefits: [
        'Iluminación de piso para bañar muros y volúmenes de piedra.',
        'Carcasa de acero satinado, resistente a intemperie.',
        'Aplicable en marquesina y en zonas ajardinadas.',
        'Portalámpara GX5.3/GU10 para flexibilidad de recambio.'
      ]
    },
    {
      id: 'p27', category: 'iluminacion', subcategory: 'Exterior', brand: 'Genérico',
      sku: '3HLED1165MV30N', name: 'Balizas empotradas a muro',
      price: 29, qty: 10, location: 'Escalones de acceso',
      description: 'Baliza discreta empotrada al muro que ilumina solo el escalón. IP65 y aluminio negro para exposición a la intemperie, bajo consumo y luz cálida que no genera deslumbramiento nocturno.',
      specs: [
        { icon: 'bolt', label: 'Potencia', value: '3 W' },
        { icon: 'wb_sunny', label: 'Flujo', value: '13 lm' },
        { icon: 'light_mode', label: 'CCT', value: '3000K cálido' },
        { icon: 'water_drop', label: 'Intemperie', value: 'IP65' },
        { icon: 'palette', label: 'Reproducción', value: 'IRC 80' },
        { icon: 'hourglass_top', label: 'Vida útil', value: '30 000 h' }
      ],
      benefits: [
        'Baliza discreta empotrada al muro, ilumina solo el escalón.',
        'IP65 y aluminio negro para exposición a la intemperie.',
        'Bajo consumo (3 W) con vida útil de 30 000 horas.',
        'Luz cálida 3000K que no genera deslumbramiento nocturno.'
      ]
    },
    {
      id: 'p28', category: 'iluminacion', subcategory: 'Decorativa', brand: 'LightSource',
      sku: 'BT441 + BT440-BK', name: 'Spots de superficie simple y doble',
      price: 24, qty: 6, location: 'Baños y pasillos',
      description: 'Spots orientables de superficie con base GU10 en aluminio. Instalación directa sin falso techo ni caja embutida; el modelo doble (BT441) es IP44, apto para baños y zonas húmedas.',
      specs: [
        { icon: 'emoji_objects', label: 'Base', value: 'GU10' },
        { icon: 'power', label: 'Tensión', value: '110–240 V' },
        { icon: 'water_drop', label: 'Protección', value: 'IP20 / IP44' },
        { icon: 'layers', label: 'Material', value: 'Aluminio' },
        { icon: 'palette', label: 'Acabado', value: 'Negro / Blanco' },
        { icon: '360', label: 'Cabezal', value: 'Orientable 360°' }
      ],
      benefits: [
        'Cabezal orientable 360° para dirigir el haz sin mover la base.',
        'Instalación en superficie: sin falso techo ni caja embutida.',
        'Modelo doble (BT441) IP44, apto para baños y zonas húmedas.',
        'Compatibles con lámparas GU10 LED; aluminio resistente al calor.'
      ]
    }
  ],

  /* Contenido por defecto de bloques opcionales (tomado del documento base) */
  defaults: {
    vision: {
      title: 'Una casa que responde al estilo de vida.',
      body: 'Tres dimensiones que dejan de funcionar como capas separadas para operar como una sola experiencia residencial: seguridad, confort y control, sincronizados bajo una misma plataforma.\n\nCada subsistema fue seleccionado por su fiabilidad, escalabilidad y compatibilidad con estándares abiertos. Trabajan en sincronía bajo una sola lógica operativa, de modo que el propietario no tenga que pensar en la tecnología: simplemente la vive.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus. Vestibulum id ligula porta felis euismod semper, cras mattis consectetur purus sit amet fermentum.',
      pillars: [
        { icon: 'shield', title: 'Seguridad', lead: 'Protección que no se nota hasta que importa.', text: 'ColorVu, control biométrico y videoportero IP.' },
        { icon: 'chair', title: 'Confort', lead: 'Automatización que anticipa la rutina.', text: 'Iluminación, clima y audio por escenarios programados.' },
        { icon: 'touch_app', title: 'Control', lead: 'Un solo punto de mando.', text: 'Panel táctil en casa, smartphone fuera de ella.' }
      ]
    },
    scenarios: [
      { time: '07:30 AM', mode: 'Modo salida', icon: 'logout', title: 'Al salir de casa, todo se asegura solo.', text: 'Detecta su salida desde el móvil o el botón del panel; toda la residencia entra en modo seguro.', steps: ['Apaga todas las luces y aires acondicionados.', 'Activa modo alerta en cámaras y cerca eléctrica.', 'Bloquea la cerradura principal automáticamente.', 'Envía confirmación visual al smartphone.'] },
      { time: '06:00 PM', mode: 'Modo llegada', icon: 'login', title: 'Al acercarse, la casa lo recibe.', text: 'La geolocalización del móvil dispara la secuencia de bienvenida antes de que estacione el vehículo.', steps: ['Desactiva la cerca eléctrica perimetral.', 'Abre el portón y enciende las luces de la marquesina.', 'Climatiza la sala a 22 °C automáticamente.', 'Inicia la playlist preferida en el sistema de audio.'] },
      { time: '10:30 PM', mode: 'Modo noche', icon: 'bedtime', title: 'Antes de dormir, todo se acomoda.', text: 'Un toque en el panel de la habitación principal y la casa se prepara para descansar.', steps: ['Atenúa luces de zonas comunes a tonos cálidos.', 'Refuerza la cobertura perimetral de cámaras.', 'Confirma cierre de puertas y ventanas.', 'Activa modo silencio en panel y notificaciones.'] }
    ],
    plans: [
      { icon: 'electrical_services', title: 'Plano eléctrico', text: 'Circuitos, tomas y puntos de iluminación por nivel.' },
      { icon: 'lan', title: 'Red de datos', text: 'Recorrido de cableado estructurado, rack y puntos de red.' },
      { icon: 'touch_app', title: 'Domótica', text: 'Ubicación de paneles, interruptores y sensores.' },
      { icon: 'videocam', title: 'Seguridad', text: 'Cobertura de cámaras, videoportero y control de acceso.' }
    ],
    terms: 'Precios expresados en dólares estadounidenses (USD). Propuesta válida por 15 días a partir de la fecha de emisión. Incluye suministro de equipos; instalación, programación y cableado se cotizan según visita técnica. Lorem ipsum dolor sit amet, condiciones sujetas a disponibilidad de inventario.',
    nextSteps: [
      { title: 'Revisión de la propuesta', text: 'Ajustamos cantidades y alcance junto a usted.' },
      { title: 'Visita técnica', text: 'Validamos planos, recorridos y puntos de instalación.' },
      { title: 'Instalación llave en mano', text: 'Suministro, integración, programación y soporte.' }
    ]
  }
};
