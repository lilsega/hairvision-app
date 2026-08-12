# Registro de decisiones

**2026-07-23 — Prompt: evitar objetos inventados y marcas raras.**
Sega detectó en pruebas reales que a veces la simulación añadía cosas
que no estaban en la foto original (rayas en la cabeza, unos AirPods).
Es un problema conocido de los modelos de edición de imagen: si no se
les prohíbe explícitamente, a veces "rellenan" detalles inventados. Se
añadió una frase al prompt pidiendo expresamente no añadir objetos,
accesorios, joyas ni marcas/líneas/texto sobre la piel o el pelo. No
elimina el riesgo al 100% (sigue siendo IA generativa), pero debería
reducir mucho estos casos. Cambio solo de texto del prompt, sin riesgo
para lo que ya funcionaba.

**2026-07-23 — Manual de uso para la peluquería.**
Se creó `manual-uso-peluqueria.md`, un documento aparte del guion de
venta (`guion-presentacion-peluquerias.md`), pensado para entregar
junto a la tablet a la peluquería 4. Cubre: primer acceso (código +
añadir a pantalla de inicio), pasos para usarla con cada clienta
(incluyendo el aviso de privacidad de la foto que hay que decir en
voz alta), qué decir para dar buena imagen profesional, una tabla de
problemas técnicos comunes y qué hacer en cada caso (lentitud por
"despertar" del servidor, errores de conexión, cámara, resultado poco
fiel, app congelada), y contacto directo con Sega para lo que no esté
cubierto.

**2026-07-23 — Aviso de privacidad de la foto + código de acceso.**
Con clientas reales empezando a usar la app (peluquería 4), se añadieron
dos cosas antes de entregarle la tablet:
1. **Aviso de privacidad**: un texto visible en la pantalla de la ficha
   de clienta, junto al botón de la cámara, explicando que la foto se
   envía a un servicio de IA (Google) solo para generar la simulación.
   Importante: la foto viaja a Google SIEMPRE que se pide un resultado,
   se guarde el perfil localmente después o no — antes esto no quedaba
   claro para nadie.
2. **Código de acceso compartido** (`HAIRVISION_ACCESS_CODE`, ahora
   mismo `hairvision2026`): pantalla de entrada antes de poder usar la
   app en absoluto, para que no sea de uso público. Se guarda en el
   `localStorage` del dispositivo tras introducirlo una vez (no hay que
   volver a escribirlo cada vez). No es seguridad fuerte (el código se
   ve en el código fuente de la página, igual que `HAIRVISION_APP_SECRET`),
   pero cumple el objetivo real: que nadie la use sin pedírselo a Sega
   primero. Es un código único para todos por ahora, no uno por
   peluquería — eso necesita la base de datos grande que se dejó
   aparcada (ver `plan-proximos-meses.md`).

**2026-07-23 — Primeras visitas reales a peluquerías: resultado.**
Sega visitó 4 peluquerías sin cita previa. Resultado: 2 rechazos
inmediatos (sin escuchar la propuesta, o "yo lo hago a mi manera" —
normal en visitas en frío, no necesariamente una señal contra el
producto) y 2 con interés genuino:
- **Peluquería 3**: entendió la app sin esfuerzo, la usaría con
  clientas reales, se imagina usándola a diario, y dijo espontáneamente
  que pagaría si funciona (sin que se le preguntara directamente).
  Pidió tiempo para hablarlo con su socia — de momento lo retoma en
  septiembre (la dueña quiere vacaciones y la socia está fuera; no es
  un "no", es una cuestión de calendario de verano).
- **Peluquería 4**: interés inmediato, quiere la tablet ya. Comentario
  espontáneo relevante: antes existían las revistas de referencia,
  ahora las clientas llegan con fotos de famosas o generadas por IA que
  no se parecen porque cambian la cara — validación directa, con sus
  propias palabras, del problema que HairVision dice resolver. Tiene
  una segunda peluquería (más grande, misma dueña) como posible
  expansión futura del piloto. Sega ya le compró y entregó la tablet
  (justificado: solo se compra tras interés confirmado, como se decidió
  antes de las visitas).

Feedback común de ambas interesadas: falta simulación de color (no
confundir con el bloqueo de cambios de color NO deseados que se
implementó antes — esto es una función nueva pedida a propósito).
Anotado en "Ideas aparcadas" de `plan-proximos-meses.md` para más
adelante, no ahora.

Con esto se cumple el objetivo del mes 1 del plan (conseguir 2-3
peluquerías con interés real). Empieza la fase de uso real con
clientas (peluquería 4 ahora, peluquería 3 posiblemente en septiembre).

**2026-07-23 — Se quita la tablet de préstamo del guion de visita.**
Sega decidió ir a las peluquerías SIN comprar/prestar una tablet de
entrada — solo la compraría más adelante si una peluquería concreta
muestra interés real tras probarlo. Tiene sentido: como HairVision es
solo un enlace web, no hace falta ningún dispositivo dedicado, pueden
probarlo desde su propio móvil o tablet. Se actualizó
`guion-presentacion-peluquerias.md` en varios sitios (preparativos,
frase de apertura, "qué ofreces", pregunta final) para ya no prometer
ninguna tablet, y se aclaró que comprar una es una conversación para
más adelante, no algo que se ofrezca en la primera visita.

**2026-07-23 — Endurecimiento del servidor (revisión con ChatGPT).**
Sega compartió el estado del proyecto con ChatGPT (otra IA que también
asesora en HairVision), que confirmó que el proyecto ya está en fase de
piloto (no de prototipo) y avisó, correctamente, de que
`APP_SHARED_SECRET` no es autenticación real (se ve en el código fuente
público) y de que antes de exponer el servidor más ampliamente convendría
añadir: cuota diaria, validación estricta de entradas y CORS restringido
al dominio de HairVision, entre otras cosas. Se implementaron las tres
más importantes y de menor riesgo de romper algo antes de la visita a
peluquerías (dentro de 2 días):
1. **Cuota diaria** (`DAILY_REQUEST_LIMIT`, contador en memoria,
   por defecto 20/día tras revisarlo con Sega —peor caso ~90 USD/mes,
   más realista para un piloto de 1-2 peluquerías que los 50 iniciales—,
   configurable en Render) — corta un gasto descontrolado si la clave
   compartida se filtrara.
2. **CORS restringido** a `https://lilsega.github.io` (con aviso
   honesto en el código: esto no detiene peticiones hechas con
   curl/scripts, solo peticiones desde el navegador de otra web).
3. **Validación de entradas** (`sanitizeParams()`): solo se aceptan los
   códigos de corte/flequillo ya conocidos y los números se acotan a
   0-100, para que no llegue texto arbitrario al prompt de la IA.

A propósito NO se tocó el límite de tamaño de foto (se dejó en 15mb,
sin cambios) para no arriesgar nada ya probado y funcionando justo antes
de la visita, siguiendo el consejo de ChatGPT de "no tocar nada grande
antes de las visitas". Pendiente para más adelante (no urgente para un
piloto de 1-2 peluquerías conocidas): limitación de peticiones por IP
individual y registro de consumo más completo (ahora mismo solo hay un
`console.log` básico por petición, visible en los logs de Render).

**2026-07-23 — Deseleccionar flequillo + no cambiar color de pelo.**
Dos ajustes pedidos por Sega tras probar el flujo: (1) en la pantalla de
Flequillo, tocar la opción ya seleccionada la quita (vuelve a `null`),
por si se eligió sin querer y no se quiere llevar flequillo — antes no
había forma de deshacer esa elección; (2) la IA a veces cambiaba el tono
del pelo al generar el resultado, aunque HairVision es un simulador de
CORTE, no de color — se añadió una frase explícita al prompt del
servidor ("no cambies el color del cabello bajo ningún concepto...")
para frenar eso.

**2026-07-23 — La ficha de cabello ahora sí influye en la simulación.**
Sega descubrió (probando el flujo) que la pantalla "Perfil de clienta"
(tipo de cabello, grosor, densidad, volumen natural, elasticidad, estado
—daño/teñido/decolorado—, dirección de crecimiento, remolino) se
rellenaba pero nunca se mandaba al servidor: la IA generaba el resultado
sin saber nada de esos datos. Se corrigió en dos partes: (1) el cliente
ahora manda `hairStructure`, `behavior`, `condition`, `growthDirection` y
`hasWhorl` junto con el resto de la petición; (2) el servidor tiene una
función nueva, `describeHairCharacteristics()`, que traduce esos valores
0-100 a frases en español (usando `nearestLabel()`, con la MISMA fórmula
que ya usaba el cliente para resaltar la etiqueta más cercana en los
sliders, para que el texto que recibe la IA coincida con lo que ve la
estilista en pantalla) y las añade al prompt antes de pedir el corte en
sí. No se manda la posición exacta del remolino (solo si existe), porque
una coordenada de pantalla no se traduce en nada útil para un prompt de
texto. Nota honesta: la elasticidad no tiene un efecto visual claro en
una foto, se incluye igualmente porque se pidió explícitamente.

**2026-07-23 — Bloqueo más fuerte del zoom en móvil.**
Sega notó que en el móvil se seguía pudiendo hacer zoom con los dedos a
pesar del `user-scalable=no` del viewport. Es porque iOS Safari y Chrome
Android ignoran esa etiqueta a propósito desde hace años (decisión de
accesibilidad, para que quien necesite zoom siempre pueda). Se añadió un
bloqueo más robusto: `touch-action: pan-x pan-y` en `html, body` (frena
el pellizco en la mayoría de Android), más JS que cancela el gesto
propio de pellizco de Safari (`gesturestart`/`gesturechange`) y el
zoom por doble-toque rápido. No hay garantía al 100% en todos los
dispositivos/navegadores — para un bloqueo total habría que ser una app
nativa de verdad (ver "Ideas aparcadas" en `plan-proximos-meses.md`).

**2026-07-23 — Tres fallos de UX corregidos + aviso de girar el dispositivo.**
Sega probó la app y detectó tres problemas de navegación/uso:
(1) en "Sugerencias" se podía pasar de pantalla sin elegir Opción X, Y ni
"Ninguna me convence" — ahora la flecha de siguiente no aparece hasta
elegir una de las tres (`blockedOnSuggestions` en `renderCornerNav`);
(2) al elegir un flequillo o una largada y darle a "siguiente", saltaba
directo al resumen en vez de volver al menú de Flequillo/Largada/Volumen
por si se quería ajustar algo más — ahora `goNext()` primero cierra el
subview (igual que ya hacía `goBack()`) y solo una segunda pulsación
avanza de verdad; (3) en móvil/tablet en vertical la app no se ve bien
(está pensada solo para horizontal) — se añadió un aviso a pantalla
completa ("Gira tu dispositivo") que bloquea el uso mientras el aparato
esté en vertical, activado solo por CSS (`@media orientation: portrait`).
Nota honesta: no existe forma fiable de FORZAR el giro real a horizontal
desde una web normal en todos los navegadores — eso solo se puede
garantizar con una app nativa de verdad. El aviso es lo más parecido que
se puede hacer sin salir del formato web.

**2026-07-23 — Clave compartida simple para proteger el servidor + rotación de API key.**
Con el servidor ya público en Render, cualquiera que encontrara la URL
podía usarlo y gastar el saldo de la API de Google. Se añadió una
comprobación sencilla: la app manda una cabecera `X-App-Secret` con un
texto aleatorio (`HAIRVISION_APP_SECRET` en `hairvision-preview.html`), y
el servidor la compara con `APP_SHARED_SECRET` (variable de entorno en
Render); si no coincide, responde 401. No es autenticación fuerte de
verdad — la clave se puede ver en el código fuente de la página, ya que
es una app estática sin backend propio — pero corta el abuso casual de
alguien que se tropiece con la URL del servidor sin pasar por la app.
Pendiente: Sega tiene que poner `APP_SHARED_SECRET` en el panel de Render
con el mismo valor que quedó en el HTML. También se rotó la clave de la
API de Google (se había compartido en el chat en algún momento):
generada la nueva en Google AI Studio, actualizada en `.env` local y en
Render, confirmado que sigue funcionando, y borrada la clave vieja.

**2026-07-23 — Servidor desplegado en Render (ya no depende de localhost).**
El código de `hairvision/server` se subió a GitHub
(`github.com/lilsega/hairvision-server`, privado) y se desplegó en Render
como Web Service gratuito, con `GEMINI_API_KEY` puesta como variable de
entorno en el panel de Render (nunca en el código). URL pública:
`https://hairvision-server.onrender.com`. Se actualizó
`HAIRVISION_SERVER_URL` en `hairvision-preview.html` (ambas copias) de
`http://localhost:3001` a esa URL. Con esto la tablet ya no necesita que
el ordenador de Sega esté encendido corriendo `npm start` — el servidor
vive en internet 24/7. Nota: el plan gratuito de Render "duerme" el
servicio tras ~15 min sin uso; la primera petición tras estar dormido
tarda 20-30s extra en responder. Pendiente: añadir una clave/contraseña
simple al endpoint (el servidor ahora es público, cualquiera que
encuentre la URL podría usarlo y gastar el saldo de la API de Google).

**2026-07-19 — Largada de Corte: se quita el cross-fade, se corrige el borroso.**
Sega reportó que el cross-fade (mezclar opacidades de `melena-corta.jpg` y
`melena-larga.jpg`) se veía borroso/fantasma en los valores intermedios del
slider (las dos fotos se transparentan una sobre la otra). Solución: ya no
se mezclan opacidades. Ahora `melena-corta.jpg` es una capa de fondo fija,
siempre 100% visible, y `melena-larga.jpg` se muestra por encima con una
"ventana" (`hairPhotoWindowPercent`, `#hairPhotoWindow`) que se abre de
arriba a abajo según el slider — un corte limpio, sin transparencias: por
debajo de la ventana se ve la foto corta, por encima la larga. Como
comparten encuadre y postura, el efecto sigue siendo que la espalda/hombros/
fondo quedan fijos y solo el pelo parece crecer, pero sin ningún borroso.
Se copió `melena-corta.jpg` (ya generada por Sega con
`generar-foto-corto.js`, pendiente de copiar) a `hairvision-fotos/` en
ambas copias.

**2026-07-18 — Largada de Corte: cross-fade entre dos fotos, no recorte.**
Sega aclaró que recortar una sola foto (la "ventana" que se abre) no
vale: quiere que la espalda, los hombros y el fondo se queden SIEMPRE
fijos e iguales, y que solo el pelo en sí parezca cambiar. Con una única
foto eso no es posible de verdad (recortar solo esconde partes de la
misma imagen). Solución: dos fotos con el MISMO encuadre exacto —
`melena-corta.jpg` (nueva, editada a partir de `melena-larga.jpg` para
que el encuadre/postura/fondo sean idénticos, ver
`hairvision/server/generar-foto-corto.js`) y `melena-larga.jpg` — puestas
una encima de la otra en el mismo sitio, y el slider solo cambia la
opacidad de cada una (cross-fade). Así el fondo/espalda/hombros quedan
fijos en su sitio, y el efecto es que solo el pelo cambia. Pendiente:
que Sega ejecute `generar-foto-corto.js` (ya tiene `generar-foto-largo.js`
hecho).

**2026-07-18 — Largada de Corte: se quita el dibujo del todo, solo foto.**
A Sega no le convenció el resultado con el dibujo vectorial de respaldo
detrás de la foto. Se eliminó por completo `hairMassPathD`,
`hairTextureLineD`, `HAIR_TEXTURE_LINES`, `hairLengthOpacity` y
`hairLengthSvg` — ya no queda nada de dibujo, ni siquiera como respaldo
(si la foto falta, ahora se ve un aviso de texto sencillo, no un dibujo).
Se agrandó bastante el recuadro (de 170×275 a 300×460) y se recalibró el
mínimo de la "ventana" que recorta la foto (`shortFrac` de 8% a 24%, tras
mirar la foto real generada: por debajo de ese punto ya no se reconoce
como pelo corto, solo un hilo). Importante: la FOTO no cambia de tamaño
ni se escala en ningún momento — solo cambia cuánta ventana de la foto se
ve, así que el efecto es que el pelo en sí crece/mengua, no la imagen.

**2026-07-18 — Tarjetas de selección: se ve el corte entero, sin cortar.**
`cardMedia` usaba `object-fit:cover`, que rellena la tarjeta recortando
lo que sobre — a veces cortaba la cara. Se cambió a `object-fit:contain`:
el corte se ve entero siempre, aunque a veces quede algo de espacio vacío
a los lados si la proporción de la tarjeta no coincide con la de la foto.

**2026-07-18 — Largada de Corte: foto real que "crece", no un dibujo.**
Sega pidió pelo de verdad (adjuntó un ejemplo: una foto real de una
melena larga junto a un slider), no una ilustración vectorial por bonita
que fuera. Se implementó una técnica de "ventana que se abre": una foto
real de la MISMA persona con el pelo dejado deliberadamente muy largo
(`hairvision/server/generar-foto-largo.js`, reusa `base.jpg` para que sea
la misma cara) se recorta con una `ventana` (`hairPhotoWindow`) cuya
altura crece del 8% al 100% según el slider — así el pelo "crece" de
verdad con una foto real, revelándose de arriba hacia abajo. El dibujo
vectorial (masa de pelo) se queda como respaldo automático por debajo,
por si esa foto todavía no existe en el ordenador (`onerror` la oculta).
Pendiente: que Sega ejecute ese script una vez para generar la foto.

**2026-07-18 — Largada de Corte: masa de pelo rellena, no líneas.**
Primer intento (7 mechones-línea) seguía sin parecer pelo real. Se
rediseñó de nuevo: ahora es una única forma SÓLIDA rellena (con
degradado, `hairMassPathD`) que crece y se ensancha con el slider —
mucho más parecido a una melena real que unas líneas trazadas — más un
par de mechones finos ENCIMA solo de textura, no como representación
principal. Sigue con la silueta de cabeza+cuello+hombros vista desde
atrás (sin rasgos de cara). Sigue recalculando solo el `d` de la masa y
de las líneas de textura en cada arrastre (sin re-render completo).

**2026-07-18 — Tipos de Corte: filas fijas en vez de flexbox flotante.**
El primer intento de arreglo (flexbox con ajuste de línea y tarjetas de
altura fija en px) seguía fallando: al mostrar fotos reales, el contenido
de una tarjeta a veces necesitaba más alto que el fijado y se superponía
con la fila de abajo. Se cambió a una estructura de dos filas explícitas
(4 arriba, 3 abajo, `hv-grid-rows`/`hv-grid-row`), cada una `flex:1`
dentro de una columna — así las dos filas se reparten el alto disponible
de verdad (nunca se cortan ni se superponen, sea cual sea el tamaño real
de las fotos), y cada tarjeta ocupa el 100% del alto de su fila.

**2026-07-18 — Tipos de Corte: las 7 tarjetas caben siempre en pantalla.**
Con 7 cortes en una rejilla de 4 columnas, la segunda fila (3 tarjetas)
podía quedar cortada por abajo — sobre todo tras cambiar los dibujos por
fotos reales, que al no tener un tamaño fijo (a diferencia del icono
vectorial anterior) podían estirar la altura de la tarjeta más de lo
esperado. Se cambió `.hv-card.compact` a una altura fija (antes era solo
una altura mínima) y se sustituyó la rejilla CSS grid por flexbox con
ajuste de línea (`hv-grid-flow`): las 7 tarjetas quedan siempre del mismo
tamaño, se acomodan 4 por fila, y la última fila de 3 queda centrada y
completamente visible.

**2026-07-18 — Fotos de referencia generadas conectadas a la app.**
Se copiaron las 13 fotos generadas por `generar-fotos-referencia.js` a
una carpeta nueva `hairvision-fotos/` junto a `hairvision-preview.html`.
Se añadió una función `cardMedia(variant)` que devuelve la foto real si
existe para ese estilo (lista `PHOTO_REF_KEYS`) y si no, el dibujo
vectorial de siempre. Se sustituyó `svgSilhouette(...)` por
`cardMedia(...)` en todas las tarjetas de selección (tipos de corte,
flequillos, sugerencias X/Y, filas del resumen y del carrito, y el
"antes" de la pantalla de resultado cuando todavía no hay foto real de
la clienta). Importante: esto NO afecta a la simulación final con Nano
Banana (esa sigue usando la foto real de la clienta, tomada con la
cámara) — las fotos de referencia solo se usan para ilustrar las
tarjetas de selección antes de llegar ahí.

**2026-07-18 — Sliders: tocar la barra también mueve el valor.**
Antes solo funcionaba arrastrando el pulgar del slider; tocar en otro
punto de la barra no hacía nada en algunos navegadores/tablets. Se añadió
`enableSliderTapToJump`, que detecta el toque en cualquier punto de
cualquier slider y salta directamente a ese valor (y desde ahí se puede
seguir arrastrando con normalidad).

**2026-07-18 — Tarjetas Antes/Después sin margen blanco cuando hay foto
real.** Cuando la tarjeta de resultado muestra una foto real (no el
dibujo de muestra), la imagen ahora ocupa toda la tarjeta de borde a
borde — antes quedaba pequeña y centrada, dejando un marco blanco
alrededor. La etiqueta "Antes"/"Después" ahora flota como una píldora
oscura encima de la foto. Clase nueva `.hv-photo-card`, solo se aplica
cuando hay imagen real (el dibujo de muestra sigue viéndose como antes).

**2026-07-18 — Primera imagen generada de verdad, confirmado por Sega.**
Tras subir `@google/genai` a `^2.0.0` y reinstalar, el botón "Ver
resultado" generó correctamente una imagen real con Nano Banana a partir
de una foto real de clienta. Pendiente para más adelante: probar más
casos (distintos cortes/flequillos), añadir un secreto compartido al
servidor antes de exponerlo fuera de `localhost`, subirlo a un hosting
real (Render/Railway) para que la tablet lo alcance, y considerar rotar
la clave de API ya que se compartió en el chat.

**2026-07-18 — Primera prueba real: falló por versión vieja del SDK, no
por el código.**
Sega hizo la primera llamada real y el servidor devolvió un error 400 de
Google: *"The legacy Interactions API schema is no longer supported.
Please upgrade your @google/genai JS/TS SDK to version >= 2.0.0"*. Google
cambió el formato de respuesta de su API (de `outputs` a `steps`) el 7 de
mayo de 2026, después de que escribiéramos este servidor. Se confirmó
consultando la guía oficial de migración
(`interactions-breaking-changes-may-2026`) y la página de generación de
imágenes actualizada: el código de `index.js` ya usaba exactamente el
formato correcto y actual (`interaction.output_image.data` sigue siendo
una propiedad de conveniencia válida en la nueva versión, no hacía falta
tocar nada de la lógica). El único cambio necesario fue subir la versión
del paquete `@google/genai` de `^1.0.0` a `^2.0.0` en `package.json` (ya
actualizado, tanto en la copia real de Sega en `hairvision/server/` como
en las plantillas de `hairvision/`). Falta que Sega vuelva a ejecutar
`npm install` para bajar la versión nueva y reintente.

**2026-07-18 — El botón "Ver resultado" ya llama al servidor real.**
Con el servidor local funcionando en el ordenador de Sega (confirmado con
`npm start` y `http://localhost:3001/api/salud` respondiendo `{"ok":true}`),
se conectó `hairvision-preview.html` a esa dirección
(`HAIRVISION_SERVER_URL = 'http://localhost:3001'`). Cuando hay una foto
real capturada con la cámara, la pantalla de resultado ya no muestra el
dibujo de muestra: manda la foto y las selecciones a
`POST /api/generar-resultado` y muestra la imagen que devuelve Nano
Banana (tanto en las tarjetas Antes/Después como en la vista ampliada).
Si el servidor no responde o falla, se muestra un mensaje de error claro
con botón "Reintentar" en vez de romper la app. Si todavía no hay foto
real (por ejemplo probando la app sin cámara), se mantiene el dibujo de
muestra de siempre, para no romper la demo. Pendiente: probar de verdad
generando una imagen (todavía no confirmado con Sega), y más adelante
subir el servidor a un hosting real para que la tablet lo alcance fuera
de `localhost`.

**2026-07-18 — Primer servidor intermedio para conectar con Nano Banana
(sin probar en vivo todavía).**
Sega consiguió su clave de API de Google AI Studio (formato nuevo,
empieza por "AQ." en vez de "AIza..." — Google actualizó el formato desde
la última vez que se investigó esto). Se construyó un primer servidor
Node.js (`server-index.js`, `server-package.json`,
`server-env-example.txt`, `server-README.md` dentro de `hairvision/`,
pendientes de mover a una carpeta `server/` propia) que recibe la foto de
la clienta más las selecciones de la estilista, arma una instrucción de
texto en español, y llama al modelo `gemini-3.1-flash-image` (Nano Banana
2) usando el SDK oficial `@google/genai`, siguiendo el formato documentado
por Google.

**Importante:** este código no se ha podido probar en vivo — el entorno
donde trabajo tiene la salida a internet restringida a una lista
concreta de dominios, y `generativelanguage.googleapis.com` no está en
esa lista (se confirmó con un `curl` que devolvió "blocked-by-allowlist"
desde el proxy del sandbox). La primera prueba real de esta pieza tiene
que hacerla Sega en su propio ordenador, con instrucciones paso a paso en
`server-README.md`. Todavía no se ha tocado el botón "Ver resultado" de
`hairvision-preview.html` — sigue mostrando el dibujo de muestra hasta
confirmar que el servidor funciona de verdad.


Formato: fecha — decisión — motivo. Más reciente arriba.

---

**2026-07-11 — La mitad delantera del óvalo (hacia la frente) ya no
aparece en la vista de atrás.**
Sega señaló que el 50% superior del óvalo (el lado de la frente, marcado
con el flequillo dibujado ahí) lógicamente no se puede ver nunca desde
atrás, así que un remolino marcado ahí no debería generar ningún punto en
esa vista. Se sigue pudiendo marcar en esa zona en la vista de arriba
(la estilista puede ver un remolino cerca de la frente perfectamente
mirando desde arriba), pero `whorlPointForBackView` ahora devuelve `null`
para esos puntos (`ny < 0`, mitad delantera), y la vista de atrás filtra
esos `null` antes de dibujar — así que esos remolinos solo se ven en la
vista de arriba, nunca en la de atrás.

**2026-07-11 — Modelo radial: el óvalo es una "gorra" alrededor del
vértice, no una franja plana cerca de arriba.**
Sega mandó una captura con un punto marcado en el lateral del óvalo
(mismo "alto" que el centro, pegado al borde) y dibujó a mano dónde
debería caer en la vista de atrás: cerca de la oreja, muy por debajo de
donde aparecía. El modelo anterior calculaba la posición en la vista de
atrás solo a partir de la posición delante-detrás del óvalo, ignorando lo
lejos que el punto estaba hacia los lados — así que un punto en el
lateral (lejísimos del vértice en la práctica) se trataba casi igual que
uno en el centro, y se quedaba pegado arriba.

Modelo nuevo, más correcto: el óvalo es una gorra circular sobre la
coronilla. El centro del óvalo es el vértice de la cabeza; **la distancia
al centro en cualquier dirección** (no solo hacia atrás) determina cuánto
se aleja de ese vértice — un punto pegado al borde del óvalo, sea hacia
el lateral, hacia delante o hacia atrás, llega igual de "lejos" del
vértice. Esa distancia (radial, 0 a 1) se traduce a la vista de atrás
como profundidad desde el vértice hasta donde la cabeza empieza a
ensancharse de verdad (justo antes de las orejas), y el ángulo determina
el lado (izquierda/derecha). Con esto, el punto lateral del ejemplo de
Sega ahora cae correctamente cerca de la oreja, coincidiendo con el punto
azul de su captura.

Cambio técnico: cada remolino ahora se guarda como `{zone:'crown', nx,
ny}` (coordenadas normalizadas del óvalo) si está dentro de la franja
visible desde arriba, o `{zone:'nape', y, r}` (como antes) si está en la
nuca. Un punto "crown" tocado directamente en la vista de atrás no puede
distinguir si estaba más hacia delante o hacia atrás del vértice (esa
vista no lo muestra), así que se asume el lado de atrás — la lectura más
plausible al marcar desde ahí.

**2026-07-11 — Los bordes del óvalo ahora llegan de verdad a los bordes de
la vista de atrás.**
Con el arreglo anterior, un punto ya no quedaba flotando fuera de la
cabeza, pero Sega notó que tocar el borde del óvalo no siempre llegaba al
borde de la vista de atrás — a veces se quedaba corto, cerca del centro.
Causa: dentro de la franja de la coronilla, la vista de atrás es
naturalmente muy estrecha en las filas más altas (casi un punto en el
mismo vértice de la cabeza) y solo alcanza su anchura máxima en el límite
inferior de esa franja — usar la anchura real de cada fila para colocar
el punto hacía que, según la fila exacta, un toque en el borde del óvalo
se quedara muy corto.

Arreglo: dentro de la franja de la coronilla se usa una anchura de
referencia fija (`WHORL_CROWN_REF_HALF_WIDTH`, la anchura máxima que esa
franja llega a alcanzar) tanto para guardar el punto como para dibujarlo,
en vez de la anchura real de cada fila. Así, tocar el borde del óvalo
(en cualquier fila) siempre corresponde al máximo alcance de la franja en
la vista de atrás — borde con borde, como pidió Sega. La nuca (el otro
85%, fuera del óvalo) sigue usando su anchura real sin cambios, ya que
ese ajuste no aplicaba ahí.

**2026-07-11 — El remolino ya no se puede marcar fuera de la cabeza, y
nunca queda "flotando" fuera de la silueta al pasar de una vista a otra.**
Sega detectó dos problemas relacionados: (1) al tocar cerca del borde del
óvalo "desde arriba", el punto podía aparecer fuera de la cabeza en la
vista "de atrás"; (2) en general, se podía tocar en cualquier parte del
lienzo (incluidas las esquinas vacías, fuera de la cabeza dibujada), lo
cual no tiene sentido.

Causa real: el eje horizontal (x) se compartía como un porcentaje
absoluto e idéntico entre las dos vistas, pero cada silueta tiene una
anchura real distinta a cada altura (la cabeza de espaldas es más
estrecha cerca de la coronilla que el óvalo de arriba en su punto
equivalente) — así que un x que cabía perfectamente en una vista podía
quedar fuera de la cabeza en la otra.

Solución: cada remolino ahora se guarda como una posición vertical
canónica más una **proporción horizontal** (`r`, de -1 a 1: qué tan cerca
está del borde de la cabeza, medido como fracción de la anchura real de
la cabeza en esa altura). Cada vista calcula su propia anchura real punto
por punto (`topHalfWidthAtY` para el óvalo, con la fórmula de la elipse;
`backHalfWidthAtY` para la vista de atrás, aproximando su silueta con una
tabla de anchuras conocidas a distintas alturas) y coloca el punto usando
esa proporción — así el mismo remolino queda siempre dentro de la cabeza
en las dos vistas, sin importar lo distinta que sea su forma. Además, un
toque que cae fuera de la silueta (anchura real = 0 en ese punto, o más
lejos del centro de lo que permite la anchura) se ignora directamente, no
se guarda ningún remolino ahí.

**2026-07-11 — Corrección del modelo de correlación del remolino: el
óvalo de arriba solo representa la coronilla (~15% de la vista de atrás),
no toda la cabeza.**
El primer intento de corrección (entrada anterior) seguía sin ser
correcto: estiraba todo el óvalo a lo largo de TODA la vista de atrás
(coronilla arriba, nuca abajo), pero eso no tiene sentido físico — mirando
la cabeza desde arriba solo se ve la coronilla, nunca la nuca (queda
"debajo" de la curva del cráneo, fuera de la vista). Sega lo explicó así:
un punto tocado en el óvalo tiene que caer siempre dentro del ~15%
superior de la vista de atrás; un punto tocado en el otro ~85% (la nuca)
no tiene que aparecer en el óvalo, porque no hay ningún sitio correcto
donde ponerlo.

Se corrigió el modelo: las posiciones se guardan ahora en coordenadas de
la vista "de atrás" (0-100% de esa imagen), tal cual. La vista de atrás
pinta todos los puntos directamente. El óvalo de arriba solo pinta (y
solo puede crear/tocar) los puntos con y ≤ 15%, comprimidos dentro de su
propio lienzo — los puntos por debajo de ese 15% (zona de nuca) quedan
invisibles en el óvalo, tal como pidió Sega. Se añadió también una línea
de guía discontinua en el dibujo de atrás marcando ese límite del 15%.

**2026-07-11 — Vista "desde atrás" del remolino: silueta más ancha y
realista, y corrección de la correlación entre las dos vistas.**
Sega adjuntó una referencia mostrando que un mismo punto (ej. la
coronilla) debe caer en el sitio anatómicamente correcto en las dos
vistas, no en el mismo porcentaje bruto. Antes, el punto marcado en
cualquiera de las dos vistas se copiaba literal (mismo % de x e y) a la
otra, así que un punto en el centro del óvalo (coronilla) no aparecía
arriba del dibujo de espaldas como debería.

1. *Silueta de espaldas rehecha, más ancha y realista*: cráneo con
   anchura real a la altura de las orejas (antes era muy estrecho),
   orejas visibles, cuello y hombros recortados por el borde del lienzo
   como en una foto — sustituye la silueta anterior, más esquemática.
2. *Corrección de la correlación*: las posiciones ahora se guardan
   siempre en el sistema de coordenadas de la vista "desde arriba". Al
   pintar la vista "de atrás", el eje vertical se traduce con una función
   (`mapTopYToBackY`) que hace que el centro del óvalo (coronilla) caiga
   arriba del dibujo de espaldas, y el borde trasero del óvalo (dirección
   nuca) caiga cerca de la línea "nuca" de esa vista. Al tocar en la
   vista de atrás se aplica la traducción inversa (`mapBackYToTopY`)
   antes de guardar el punto. El eje horizontal se mantiene igual en las
   dos vistas (no hacía falta corregirlo). Sigue siendo una traducción
   práctica por puntos de referencia, no un mapeo 3D real, pero ahora
   respeta qué parte de la cabeza es cada una.

**2026-07-11 — Selector de remolino: las dos vistas ya no se apilan.**
Sega detectó que en el navegador solo se veía la vista "desde arriba" y la
de "atrás (nuca)" aparecía debajo, en vez de las dos una al lado de la
otra. Causa: la ventana emergente (`.hv-sheet`) tiene un ancho fijo
(`min(480px,80vw)`) que solo se sobrescribía a medias (`max-width:640px`
no fuerza un ancho mayor si el ancho base ya es menor), así que no cabían
las dos vistas de 260px una junto a otra y la fila con `flex-wrap:wrap`
las apilaba. Se corrigió: la ventana ahora fuerza su propio ancho
(`width:min(720px,94vw)`), la fila ya no permite ajustarse en varias
líneas (`flex-wrap:nowrap`), y cada vista se encoge un poco en pantallas
más estrechas (`clamp(160px, 26vw, 260px)`) para que las dos quepan
siempre lado a lado en vez de apilarse.

**2026-07-11 — Guía de encuadre facial en la cámara + icono más pequeño.**
Mientras la cámara está encendida, ahora se ve un óvalo discontinuo
superpuesto sobre el vídeo en vivo ("Encuadra la cara dentro del óvalo")
para ayudar a centrar bien la cara, más un aviso escrito abajo: "Si tiene
el pelo largo, pídele que lo lleve hacia delante para verlo junto a la
cara" — así se recomienda bien la forma de la cara aunque el pelo largo
la tape. El pedir permiso de cámara ya ocurría automáticamente al pulsar
"Tomar foto" (lo hace el propio navegador/tablet); no hacía falta cambiar
nada ahí. Además, el icono de cámara del botón "Tomar foto" se veía
enorme porque el SVG no tenía tamaño fijo (usaba el tamaño por defecto
del navegador, 300×150); ahora se fuerza a 38×31px.

**2026-07-11 — Foto real de la clienta en vez de grabación simulada.**
El botón "Grabar vídeo" (que solo simulaba un cronómetro) se sustituye por
una cámara real: "Tomar foto" pide permiso de cámara al navegador, muestra
la imagen en vivo con botones Capturar/Cancelar, y al capturar guarda una
foto fija (no vídeo) como imagen de la clienta — Sega confirmó que basta
con foto fija, ya que los proveedores de IA de simulación de corte
procesan fotos, no vídeo. Tocar la foto ya tomada permite repetirla.
Importante: los navegadores solo dan acceso a la cámara en páginas
servidas por http/https o localhost, no al abrir el archivo con doble
clic — al probarlo así aparecerá un aviso explicando esto; funcionará
normalmente en la tablet o en un servidor real. Este es el primer paso de
la secuencia que pidió Sega: grabación → fotos → simulación de IA.

**2026-07-11 — Selector de remolino: dos vistas correlacionadas (arriba +
nuca), la reducción de volumen solo cuenta si está activada, largada
corta hasta calva, y "ninguna me convence" no sube al carrito.**

1. *Dos vistas del remolino*: una vista de arriba (coronilla) por sí sola
   no puede representar bien un remolino en la nuca (queda "debajo" de la
   curva del cráneo). Se añadió una segunda vista, cabeza de espaldas
   (`whorlBackCanvasSvg`), mostrada junto a la de arriba. Las dos comparten
   el mismo array de posiciones en coordenadas porcentuales — tocar un
   punto en cualquiera de las dos añade/quita un pin que aparece en ambas
   a la vez, tal y como pidió Sega ("si lo pones en la coronilla, se vería
   en las dos imágenes").
2. *Reducción de volumen*: se revirtió a que solo aparezca en el carrito
   (y solo cuente en el número) cuando está activada — "No" es un estado
   neutro que no debería ocupar sitio. La largada de corte, en cambio,
   sigue contando siempre porque no tiene un estado "sin elegir" real.
3. *"Ninguna me convence" no cuenta para el carrito*: era un bug — al
   guardar el string `'none'` en `selections.suggestion`, el contador lo
   tomaba como una elección real. Ahora se excluye explícitamente.
4. *Largada de corte: el extremo corto ahora llega a calva*, no solo a la
   altura del hombro — el trazo del pelo se acorta y también se
   desvanece (opacidad) a medida que se acerca a 0%, para reforzar la
   sensación de rapado.

**2026-07-11 — Tres retoques de pulido: etiquetas del slider de largada,
negrita en vivo, y carrito completo.**

1. *Etiquetas "Corto"/"Largo" corregidas*: estaban invertidas (aparecía
   "Largo" en el extremo de pelo corto). Se corrigió el orden.
2. *Negrita en vivo en sliders continuos*: igual que ya pasaba con los
   sliders con nombre (tipo de cabello, grosor...), ahora "Corto"/"Largo"
   (y "Natural"/"Dañado" en el estado del cabello) se ponen en negrita
   según de qué lado del centro esté el valor actual, actualizado mientras
   se arrastra.
3. *El carrito cuenta y muestra Largada de Corte y Reducción de Volumen*:
   antes el número del carrito solo contaba sugerencia/tipo de corte/
   flequillo. Como largada y reducción de volumen siempre tienen un valor
   (no un estado "sin elegir"), ahora suman 1 cada una siempre al total, y
   "Reducción de Volumen" aparece como fila nueva en el panel del carrito
   (con un icono de círculo que se achica si está activada).

**2026-07-11 — Largada de Corte: dibujo de pelo que crece/mengua en vez
de número; el porcentaje se ve en el carrito.**
En vez de mostrar "62%" sobre el slider, ahora hay una ilustración fija
(cabeza/hombros/torso) donde solo el trazo del pelo se alarga o acorta en
vivo mientras se arrastra — de corto hasta "la cintura" (marcada con una
línea de referencia). El número en sí no desaparece: se guarda como
selección y se ve en el panel del carrito, junto a una miniatura de ese
mismo dibujo congelada en el valor elegido. El slider también se hizo más
ancho (520px) y las tarjetas de Flequillo pasaron a usar el mismo tamaño
grande que las tarjetas de sugerencia (Opción X/Y), en vez del tamaño de
tarjeta estándar.

**2026-07-11 — Cinco ajustes más sobre el resumen, ajustes de corte y
resultado final (misma sesión de trabajo).**

1. *Resumen de sesión unificado*: en vez de un bloque especial para
   sugerencias de IA, el resumen usa siempre las mismas filas (Sugerencia,
   Tipo de corte, Flequillo, Largada de corte, Reducción de volumen). Al
   aceptar la Opción X o Y, esos campos se rellenan solos con los valores
   de la sugerencia (`SUGGESTION_OPTIONS` ahora incluye `haircutType`,
   `bangs`, `lengthValue`, `volumeReduction` además de `label`/`desc`), así
   que el resumen se ve idéntico tanto si se eligió a mano como si vino de
   la IA. Al pulsar "Ninguna me convence" esos campos se limpian para
   empezar la elección manual desde cero.
2. *Pantallas de 3 opciones centradas*: "Ajustes de Corte" (Flequillo/
   Largada/Reducción de Volumen) y "Flequillo" (los 3 estilos) ahora
   centran su rejilla como grupo en la pantalla, en vez de quedar arriba a
   la izquierda.
3. *Porcentaje en vivo en Largada de Corte*: al arrastrar el slider
   aparece un número grande (0-100%) que se actualiza en directo, igual
   que ya pasaba con el negrita de los sliders con nombre.
4. *Carrito con vista previa*: tocar el icono del carrito abre un panel
   (inspirado en el mini-carrito de apps de compra) con lo elegido hasta
   ahora — sugerencia de IA, tipo de corte, flequillo — cada uno con su
   ilustración y un botón para quitarlo individualmente.
5. *Resultado final sin comparación a medias*: se quitó el arrastrar-para-
   comparar con la cara partida en dos. Ahora la vista ampliada del
   resultado muestra siempre el estado inicial por defecto, y mientras se
   mantiene pulsado muestra el resultado final completo — sin mezcla de
   las dos fotos a la vez.

**2026-07-11 — Aceptar una sugerencia de IA salta "Tipos de Cortes" y
"Ajustes de Corte"; va directa al resumen.**
Si la estilista elige la Opción X o la Opción Y en la pantalla de
sugerencias, el flujo deja de pasar por la elección manual de tipo de
corte y ajustes — no tiene sentido pedir esos datos si la IA ya generó un
corte completo. Se salta directamente a "Resumen de la Sesión", que
ahora muestra las características de la sugerencia aceptada (nombre +
descripción) en vez de las filas de tipo de corte/flequillo/largo/volumen.
Si en cambio se elige "Ninguna me convence", el flujo sigue siendo el
manual de siempre. Técnicamente: `FLOW_STEPS` (array fijo) se sustituyó
por `getFlowSteps()` (función), que recalcula la lista de pantallas según
`state.selections.suggestion` cada vez que se usa — así "atrás" también
sabe a qué pantalla volver en cada caso. El resultado final (pantalla de
IA/resultado) también reflejará el peinado de la sugerencia aceptada en
vez de una combinación manual vacía.

**2026-07-11 — Tarjetas de sugerencia (Opción X / Opción Y) más grandes
y con descripción visible.**
Antes solo mostraban el nombre; ahora también muestran una frase corta
describiendo el corte sugerido (ej. "Corte a capas con volumen medio y
flequillo cortina..."), y las tarjetas crecieron (320px de alto, ilustración
más grande) para que destaquen frente al botón "Ninguna me convence".
Estas descripciones son de muestra — en producción las generará el mismo
servicio de IA que la sugerencia.

**2026-07-11 — Se elimina la transición "remolino" de Nuevo Cliente +.**
Sega la probó y no convenció; se vuelve al comportamiento original (cambio
de pantalla directo, sin animación de transición). Código retirado por
completo, no solo desactivado, para no dejar peso muerto en el archivo.

**2026-07-11 — Sugerencias: separación de tarjetas IA vs. "ninguna me
convence", y etiqueta de IA visible.**
Las dos sugerencias (Opción X / Opción Y) ahora llevan una etiqueta
"✨ Generado con IA" en la tarjeta, para dejar claro que son una
sugerencia automática y no una elección manual de la estilista. El botón
"Ninguna me convence" se saca de la rejilla de tarjetas y pasa a un botón
independiente debajo, con una cruz (×) en un tono más oscuro de la misma
familia de color que el resto de acentos (`--color-reject`, variante
oscura de `--color-selected`) — visualmente distingue "rechazar" de
"elegir".

**2026-07-11 — Rango de edad: se añade "-18".**
Faltaba una franja para menores de 18 años; ahora es la primera opción
del selector.

**2026-07-11 — Logo de portada: negrita + icono recentrado.**
Las letras "Hair Vision" pasan de peso 300 a 700 (negrita), y el icono
de cámara que sustituye la "o" de "Vision" se envuelve en un contenedor
de tamaño fijo con centrado propio y un pequeño ajuste óptico vertical,
para que quede alineado con el resto de las letras en vez de flotar.

**2026-07-11 — Transición "remolino" al pulsar Nuevo Cliente + (sustituye
la versión anterior de círculo simple).**
El botón se convierte en un tornado/remolino (gradiente cónico girando +
oscurecimiento radial en el centro) que gira rápido (2.5 vueltas, ~0.85s)
mientras crece y succiona la pantalla; a mitad de camino un velo negro se
superpone hasta cubrir el 100% de la pantalla, y una vez todo negro se
cambia de pantalla por debajo antes de desvanecerse y revelar la ficha de
cliente. Sigue sin dependencias externas — el remolino es CSS puro
(`conic-gradient` + `radial-gradient` + rotación), no una imagen ni un
vídeo.

**2026-07-11 — El remolino admite varias posiciones, no solo una.**
Algunas personas tienen más de un remolino. El selector de punto exacto
ahora guarda un array `growthWhorlPositions: [{x,y}, ...]` en vez de un
único punto; tocar el lienzo añade un pin, tocar un pin existente lo
quita, y hay un botón "Borrar todo". El resumen en la ficha muestra un
recuento ("2 remolinos marcados") en vez de un sí/no.

**2026-07-11 — "Tiene remolino" es independiente de la dirección de
crecimiento (Frontal/Lateral/Mixto).**
Antes remolino competía con Frontal/Lateral/Mixto como si solo se pudiera
elegir una opción. En la vida real una persona puede tener, por ejemplo,
dirección Frontal Y además un remolino. Ahora son dos controles
separados: el grupo Frontal/Lateral/Mixto sigue siendo de selección
única, y "Tiene remolino" es un interruptor aparte que se puede activar
con cualquiera de los tres (o con ninguno).

**2026-07-11 — Sliders: imán hacia las posiciones con nombre + negrita en vivo.**
Al arrastrar un slider continuo, si el valor queda a menos de 4 puntos
(sobre 100) de una de las etiquetas (ej. "Ondulado"), se ajusta solo a
ese valor exacto — así es fácil "caer" en una categoría con nombre sin
perder la posibilidad de dejarlo a medio camino. La etiqueta más cercana
se marca en negrita mientras se arrastra, actualizada directamente sin
recargar toda la pantalla (para no romper el arrastre nativo).

**2026-07-11 — Rango de edad: se mantiene, no se elimina.**
Sega preguntó si merece la pena mantener el campo o quitarlo
directamente. Decisión: se mantiene, porque sigue aportando una señal
real para ajustar sugerencias de corte (la edad influye en tenden