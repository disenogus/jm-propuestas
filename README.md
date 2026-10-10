# JM Propuestas · MVP

Generador de propuestas técnicas (brochure) para **JM Security System**. Cualquier vendedor arma la propuesta de un cliente en 5 pasos y la descarga en PDF, lista para enviar.

**Demo:** https://USUARIO.github.io/jm-propuestas/

## Flujo

1. **Cliente:** nombre o marca, subtítulo, imagen de portada, logo, representante del cliente, vendedor JM (elegido de la lista registrada) y fecha.
2. **Contenido:** "Quiénes somos" fijo, visión del proyecto (hasta 2 600 caracteres, máximo 2 páginas) y páginas opcionales (ecosistema, escenarios, planos, cotización).
3. **Productos:** catálogo con búsqueda y filtros. Se agrega con un botón o arrastrando la card al documento. **Cada producto genera su propia página.**
4. **Cotización:** suma automática (cantidad × precio), descuento, ITBIS 18 % y condiciones.
5. **Exportar:** lista de verificación y descarga en PDF (A4 horizontal).

## Estructura del documento

Portada → Quiénes somos → Visión → Ecosistema → por cada sistema: portadilla de sección + una ficha por producto → Escenarios → Planos → Resumen de inversión (paginado) → Cierre con datos del vendedor.

## Reglas editoriales

- Cada hoja mide 297 × 210 mm con el contenido oculto si se desborda. Los textos tienen límite de caracteres, así que nada pasa de una hoja a otra.
- La visión se divide sola en 2 páginas. La tabla de cotización se pagina y los totales siempre caen en la última hoja.
- El PDF se genera con el motor de impresión del navegador (`@page A4 landscape`): texto vectorial y seleccionable.

## Control de ventas

Cada propuesta lleva un **folio** `JM-AAMM-<vendedor>-<n.º>` en todas las páginas. El vendedor no se escribe a mano: se elige de la lista registrada.

## Técnica

- HTML, CSS y JS sin dependencias ni compilación.
- Tipografía Roboto e íconos Material Symbols (Google Fonts).
- Los datos de ejemplo están en `js/data.js`, con la misma estructura que tendrá la conexión al inventario.
- La propuesta se guarda sola en el navegador (localStorage). También se puede **Guardar / Abrir** como archivo `.json`.
- `?solo=N` muestra solo la página N a tamaño real (control de calidad).

## Fase 2 (propuesta)

- Supabase: catálogo conectado al inventario, propuestas guardadas en la nube, login de vendedores.
- Link compartible: el PDF se sube a un almacenamiento y el cliente recibe un enlace de descarga.
- Panel de administración: productos, precios, imágenes, vendedores y textos fijos.
- Imágenes reales por producto y una plantilla alternativa para iluminación.

## Desarrollo local

```bash
npx http-server . -p 5173
```
