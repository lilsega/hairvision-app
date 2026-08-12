# HairVision — resumen del estado actual del proyecto

> Escrito el 28 de julio de 2026, para poner al día a cualquiera que
> ayude en el proyecto (incluido ChatGPT). Cópialo y pégalo entero.

## Qué es HairVision

Una app para peluquerías que deja a la clienta ver una previsualización
aproximada, generada con IA, de cómo le quedaría un corte antes de
cortarlo. Pensada para tablet en horizontal, apoyada en el mostrador.
No sustituye el criterio de la estilista, lo apoya: reduce la
incertidumbre antes de decidir un cambio de imagen.

Fase actual: MVP funcional, sin clientes de pago todavía, a punto de
empezar pruebas piloto gratuitas con 1-2 peluquerías conocidas.

## Cómo está construido (arquitectura técnica)

- **La app**: un único archivo HTML/CSS/JS (`hairvision-preview.html`),
  sin frameworks, con toda la lógica de pantallas como una máquina de
  estados. Funciona en cualquier navegador (móvil, tablet, ordenador).
- **Dónde vive la app**: publicada gratis en GitHub Pages, en
  `https://lilsega.github.io/hairvision-app/hairvision-preview.html`.
  El código fuente está en el repositorio de GitHub
  `github.com/lilsega/hairvision-app` (público).
- **El servidor de IA**: un servidor Node/Express (`hairvision/server`)
  que recibe la foto de la clienta y las opciones elegidas, arma un
  texto (prompt) para la IA y llama a la API de Google Gemini
  (modelo `gemini-3.1-flash-image`, generación/edición de imágenes) para
  generar el resultado. Nunca se llama a Google directamente desde la
  app — todo pasa por este servidor, para que la clave de API no quede
  expuesta en el navegador de la clienta.
- **Dónde vive el servidor**: desplegado gratis en Render
  (`https://hairvision-server.onrender.com`), con la clave de la API de
  Google guardada como variable de entorno (nunca en el código). Código
  fuente en `github.com/lilsega/hairvision-server` (privado). El plan
  gratuito de Render "duerme" el servicio tras ~15 min sin uso; la
  primera petición después de eso tarda 20-30s extra.
- **Seguridad**: además de la clave de la API de Google, hay una
  segunda clave compartida (`APP_SHARED_SECRET`) entre la app y el
  servidor, para que nadie que encuentre la URL del servidor por
  casualidad pueda usarla sin pasar por la app. No es autenticación
  fuerte (la clave se ve en el código fuente de la página, al ser una
  app estática), pero corta el abuso casual.
- **Fotos de referencia**: hay 15 fotos generadas con IA de una única
  modelo (mismo encuadre, vista de espaldas sin cara) para ilustrar los
  tipos de corte, flequillos y la barra de largo de pelo en las
  pantallas de selección. La foto de la CLIENTA real, en cambio, es de
  cara (con un óvalo guía en pantalla para encuadrarla), porque el
  resultado final sí necesita mostrar la cara real de la clienta.

## Qué hace la app (flujo completo)

Inicio → perfil de la clienta (nombre, edad, foto de cara, ficha de
cabello: tipo, grosor, densidad, volumen natural, elasticidad, estado
—daño/teñido/decolorado—, dirección de crecimiento, remolino) →
sugerencias de IA (Opción X / Opción Y / "ninguna me convence") → si no
se acepta una sugerencia: tipo de corte (7 opciones) → ajustes (flequillo,
largo con foto real que crece/mengua, reducción de volumen) → resumen →
resultado generado por IA (antes/después) → guardar perfil de la
clienta.

Todos los datos de la ficha de cabello SÍ se usan ya para generar el
resultado (esto se corrigió hoy — antes se recogían pero no llegaban a
la IA). El color del cabello está bloqueado para que la IA no lo cambie
por su cuenta (esto es un simulador de corte, no de color).

## Qué se ha hecho en las últimas sesiones (resumen cronológico)

1. Prototipo completo construido y pulido visualmente (fichas, sliders,
   selector de remolino, cámara real, flujo completo de pantallas).
2. Servidor propio construido y conectado a la API real de Google
   Gemini para generar resultados de verdad (antes era una simulación
   falsa/mock).
3. 15 fotos de referencia generadas con IA para las tarjetas de
   selección, con la misma modelo en todas para consistencia visual.
4. La ilustración de "Largada de Corte" pasó de un dibujo vectorial a
   dos fotos reales (pelo corto / pelo largo) que se combinan sin
   efecto borroso, para que solo el pelo parezca crecer/menguar.
5. Servidor desplegado en Render (dejó de depender de tener el
   ordenador de Sega encendido) y app publicada en GitHub Pages (para
   poder abrirla desde el móvil, con cámara funcionando vía HTTPS).
6. Seguridad: clave de la API de Google rotada, clave compartida
   añadida entre app y servidor.
7. Corregidos 3 fallos de navegación encontrados al probar la app: no
   se podía avanzar en "Sugerencias" sin elegir nada; al elegir
   flequillo/largo y darle a "siguiente" se saltaba el menú de más
   ajustes; sin bloqueo de uso en móvil/tablet en vertical (ahora avisa
   a girar el dispositivo).
8. Bloqueo más fuerte del zoom en móvil (pellizco y doble-toque).
9. La ficha de cabello completa ahora sí influye en el resultado de la
   IA (antes se ignoraba por completo).
10. Se puede deseleccionar el flequillo tocándolo otra vez.
11. El color del cabello ya no lo cambia la IA por su cuenta.

## Plan de negocio: versión real vs. versión de presentación

Hay dos documentos de plan, a propósito distintos:

- `plan-de-negocio.md`: el documento "de presentación" (para
  inversores/socios más adelante) — suscripciones a 29/69/129€/mes,
  105.000€ de inversión inicial, proyecciones de 100+ peluquerías en el
  año 1. Es aspiracional, no lo que se está ejecutando ahora.
- `plan-proximos-meses.md`: el plan REAL que se está siguiendo, sin
  financiación, bootstrapped. Resumen:
  - **Mes 1** (en curso): cerrar el MVP, corregir fallos, probar con
    2-3 peluquerías conocidas gratis, sin cobrar nada.
  - **Mes 2**: medir el coste real por simulación (~0,05-0,15 USD por
    imagen generada, pago por uso a Google) y montar un piloto formal.
  - **Mes 3**: decidir con datos reales si seguir, ajustar o pausar.
  - Coste actual real: prácticamente 0€ fijos al mes (GitHub y Render
    gratis), solo el coste variable de la API de Google por cada
    simulación generada.

## Qué queda pendiente

- Presentárselo en persona a 1-2 peluquerías (dentro de 2 días),
  dejando una tablet de préstamo para la prueba.
- Recoger feedback estructurado (hay un guion preparado en
  `guion-presentacion-peluquerias.md`).
- Medir coste real por uso tras el primer mes de pruebas.
- Pendiente a más largo plazo, aparcado a propósito por ahora: login
  por peluquería (multi-tenant, hoy los perfiles de clientas se guardan
  solo en el `localStorage` del navegador de cada tablet, sin base de
  datos central), versión "lite" para clientas finales con QR,
  posible app nativa (Play Store/App Store) o PWA para bloquear de
  verdad la orientación horizontal.

## Dónde está todo (para quien quiera mirar el detalle)

Toda esta información, con fecha y motivo de cada decisión, vive en la
carpeta `hairvision/docs/` del proyecto: `decisions.md` (registro
completo, el más detallado), `plan-proximos-meses.md`,
`guion-presentacion-peluquerias.md`, `plan-de-negocio.md`,
`product-vision.md`, `guia-para-sega.md` (explica la carpeta en
lenguaje sencillo).
