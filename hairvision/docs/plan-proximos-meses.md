# HairVision — Plan realista de los próximos 3 meses

> Este documento es distinto de `plan-de-negocio.md`. Aquel es el documento
> "de presentación" (suscripciones a 29/69/129€, 105.000€ de inversión
> inicial, 100+80+40 peluquerías en el año 1) — sirve para cuando algún día
> se lo enseñes a un inversor o socio, pero no es lo que vas a ejecutar tú
> solo, sin financiación, en los próximos meses. Este documento sí lo es:
> es el plan operativo, con dinero real y pasos concretos, para que puedas
> ceñirte a él sin perderte entre ideas nuevas.
>
> Regla simple mientras dure este plan: cualquier mejora nueva que se te
> ocurra se apunta en la lista de "Ideas aparcadas" al final, no se hace de
> inmediato. Así evitamos que el proyecto no avance nunca por ir
> persiguiendo la siguiente mejora.

## 0. Punto de partida real (23 de julio de 2026)

Lo que ya existe y funciona hoy:

- Prototipo completo (`hairvision-preview.html`) con todo el flujo:
  ficha de cabello, tipo de corte, flequillo, largo, reducción de volumen,
  resumen, resultado con foto real generada por IA.
- Servidor propio (`hairvision-server`) desplegado en Render, con la
  clave de Google guardada de forma segura (no en el código).
- App accesible por enlace público (GitHub Pages), utilizable desde
  cualquier tablet o móvil con navegador.
- 15 fotos de referencia generadas con IA para las tarjetas de selección.

Lo que NO existe todavía (y es importante ser honesto sobre esto):

- Ningún cliente de pago. Ninguna peluquería la ha probado todavía en un
  caso de uso real con clientas reales.
- Ninguna empresa/autónomo dado de alta — no se puede facturar
  legalmente todavía (esto no es asesoría legal ni fiscal; cuando llegues
  al punto de cobrar, conviene confirmarlo con una gestoría).
- Ninguna protección de acceso al servidor (cualquiera con el enlace
  podría generar resultados y gastar tu saldo de la API de Google).
- Ninguna cifra real de coste por uso — solo estimaciones.

## 1. Dinero: lo real, no lo aspiracional

Estos son los costes reales actuales, no proyecciones de un plan de
inversión:

| Concepto | Coste actual |
|---|---|
| GitHub (código + página pública) | 0 € — plan gratuito |
| Render (servidor) | 0 € — plan gratuito (con el "sleep" tras 15 min sin uso) |
| Google Gemini (generar cada resultado) | ~0,05–0,15 USD por imagen generada (pago por uso, sin cuota fija) |
| Dominio propio | 0 € — no tienes uno todavía (opcional, ~10-15€/año si quieres algo como `hairvision.app`) |

Con esto, tu coste mensual real ahora mismo depende solo de cuánto se
use: si nadie la usa, pagas 0€ (aparte de la API, que es por uso). Si una
peluquería piloto hace, por ejemplo, 5 simulaciones al día durante un
mes, serían aproximadamente 5 × 30 × 0,10 USD ≈ **15 USD al mes** — ese es
el número que de verdad importa ahora, no los 105.000€ del plan de
inversión.

**Antes de cobrar nada a nadie**, hay que saber el coste real por
simulación con datos de verdad (no la estimación), y confirmar que un
precio de suscripción lo cubre con margen. Eso se hace en el mes 2 de
este plan.

## 2. Mes 1 — Cerrar el MVP y probarlo con gente real (no de pago)

**Objetivo del mes:** que el producto aguante una prueba real con 2-3
peluquerías conocidas (amigos, contactos), sin cobrar nada, solo
recogiendo feedback honesto.

Tareas concretas:

1. Añadir una clave/contraseña simple al servidor (para que no cualquiera
   con el enlace gaste tu saldo). Pendiente de esta sesión.
2. Rotar la clave de la API de Google (se compartió en el chat en algún
   momento).
3. Corregir los fallos y mejoras que ya has visto usando la app tú mismo
   — apúntalos todos ahora, los revisamos y priorizamos juntos.
4. Probar el flujo completo con al menos 5-10 combinaciones distintas de
   corte/flequillo/largo, para ver si la IA falla en algún caso.
5. Conseguir 2-3 peluquerías (pueden ser conocidas, no hace falta que
   sean desconocidas) que prueben la app en persona, gratis, a cambio de
   feedback sincero: ¿lo entienden sin explicación? ¿lo usarían con
   clientas de verdad? ¿qué les sobra o les falta?

**Qué medir durante las semanas de prueba** (detalle completo en
`guion-presentacion-peluquerias.md`): número de simulaciones hechas,
tiempo medio de generación, cuántas salieron bien/aceptables/mal,
errores técnicos, cuántas veces la simulación cambió o confirmó la
decisión de la clienta, y comentarios textuales literales de estilistas
y clientas. Esto importa más que "les gustó o no" en abstracto.

**Resultado esperado a final de mes 1:** una lista corta y honesta de qué
funciona y qué no, dicha por gente que no seas tú.

## 3. Mes 2 — Medir el coste real y definir el primer piloto de pago

**Objetivo del mes:** saber cuánto cuesta de verdad cada simulación con
uso real, y montar una prueba piloto formal (aunque sea gratuita todavía)
con esas mismas peluquerías u otras nuevas.

Tareas concretas:

1. Revisar en el panel de Google AI Studio / Google Cloud el gasto real
   generado durante el mes 1 y calcular el coste medio por simulación.
2. Con ese dato, decidir un precio de piloto realista — probablemente
   muy por debajo de los 29-129€/mes del plan de negocio original, al
   menos al principio (por ejemplo, un precio simbólico o incluso seguir
   gratis un mes más a cambio de compromiso de uso y feedback).
3. Formalizar una prueba piloto de 2-4 semanas con 2-3 peluquerías:
   acuerdo simple (aunque sea de palabra o un email), qué esperas de
   ellas (usarlo con clientas reales, no solo probarlo una vez) y qué
   esperan ellas de ti.
4. Implementar las correcciones más importantes detectadas en el mes 1.
5. Empezar a mirar, sin comprometerte todavía, qué hace falta para dar de
   alta una actividad económica (autónomo) el día que cobres de verdad —
   esto no te lo puedo asesorar yo con detalle (no soy gestor ni
   asesor fiscal), pero conviene tenerlo mapeado con tiempo.

**Resultado esperado a final de mes 2:** coste real por uso conocido,
piloto formal en marcha con peluquerías reales usándolo con clientas.

## 4. Mes 3 — Validar si esto se sostiene y decidir el siguiente paso

**Objetivo del mes:** con datos reales de 4-8 semanas de piloto, tomar
una decisión informada sobre si seguir, ajustar o pausar.

Tareas concretas:

1. Recoger resultados del piloto: ¿las peluquerías lo siguieron usando
   sin que tú insistieras? ¿alguna clienta lo mencionó espontáneamente?
   ¿alguna peluquería preguntó por precio sin que se lo ofrecieras?
2. Con eso, decidir entre tres caminos honestos:
   - **Seguir y cobrar**: si el piloto fue bien, pasar a un primer plan
     de pago real (aunque sea con 1-3 clientas iniciales) y dar de alta
     la actividad económica.
   - **Ajustar y repetir**: si el interés existe pero algo no encaja
     (precio, flujo, tipo de peluquería), repetir un piloto de otro mes
     con cambios concretos.
   - **Pausar**: si tras probarlo con gente real no hay interés
     genuino, es información válida — mejor saberlo ahora, con coste
     casi cero, que después de invertir en marketing o en el plan de
     105.000€.
3. Revisar si el hosting gratuito (Render free) sigue siendo suficiente
   o si el uso real justifica pasar a un plan de pago (~7 USD/mes) para
   evitar el "sleep" del servidor.

**Resultado esperado a final de mes 3:** una decisión basada en
evidencia real, no en suposiciones, sobre si HairVision tiene tracción o
no.

## 5. Lo que queda fuera de estos 3 meses (a propósito)

Para no dispersar el foco, esto se deja explícitamente para después del
mes 3, solo si el piloto va bien:

- Migrar el prototipo HTML al proyecto React/TypeScript real.
- Segundo modelo/persona de referencia para las fotos.
- Sugerencias X/Y con análisis de IA real (ahora mismo son fijas).
- Alquiler de tablets, marketing en redes, ferias, inversores.
- Cualquier cifra del `plan-de-negocio.md` original (son para más
  adelante, cuando haya tracción real que enseñar).

## 6. Ideas aparcadas (se van apuntando aquí, no se implementan ya)

**Simulación de color de pelo.** Pedido por las dos peluquerías con
interés real tras probar la app (visitas del 23 de julio). No confundir
con el bloqueo de cambios de color NO deseados (eso ya está hecho y se
queda) — esto es una función nueva a propósito: dejar elegir un color
distinto y verlo simulado, igual que ya se hace con el corte. Bastante
factible con la misma arquitectura actual (añadir una pantalla de
selección de color + una frase más en el prompt del servidor), pero se
deja para después de validar el piloto actual con las dos peluquerías,
no ahora.

**Login por peluquería (multi-tenant) + perfiles guardados compartidos.**
Sega pidió dos cosas que en realidad son la MISMA pieza de trabajo: un
código de acceso por peluquería (para que no sea de uso público), y que
los perfiles de clientas guardados ("Cargar Perfil", ya existe hoy en
la pantalla de inicio) se compartan entre los dispositivos de esa
peluquería en vez de quedarse solo en el navegador de una tablet
concreta. Las dos requieren lo mismo: cuentas de usuario, contraseñas y
una base de datos real en el servidor (ahora mismo los perfiles de
clientas se guardan solo en el navegador de cada tablet, sin servidor
de por medio — ver más abajo, en la pregunta de dónde quedan las
fotos). Si el piloto de 2-3 semanas con las peluquerías 3 y 4 va bien,
esta sería la siguiente prioridad técnica grande. Se revisita cuando
haya más de una peluquería
usándolo en serio.

**Versión "lite" para clientas finales (con QR).** Una app aparte,
pensada para personas (no peluquerías), donde cada clienta guarda su
ficha de cabello y su historial (cortes, colores) y la enseña con un QR
en cualquier peluquería nueva. Es una idea de expansión de negocio
razonable a futuro (cambia el modelo: ya no es solo B2B, también B2C),
pero implica guardar datos personales y fotos de gente de forma
duradera entre visitas, lo cual trae obligaciones de privacidad reales
(consentimiento, poder borrar los datos, etc. — esto no es asesoría
legal, conviene consultarlo con un abogado si se llega a construir).
Sega ya lo marcó como "no tiene por qué ser ahora".

**Bloquear de verdad la orientación horizontal + app nativa.** Ya se
añadió un aviso que bloquea el uso en vertical (ver `decisions.md`,
23 jul), pero eso es un aviso, no un bloqueo real de giro — en la web
normal no se puede forzar el giro de forma fiable en todos los
navegadores. La forma de tener control total (giro forzado, sin poder
hacer zoom ni seleccionar texto, icono propio en el móvil) es convertir
esto en una app instalable de verdad. Hay dos niveles: una PWA (app
"instalable" desde el navegador, gratis, funciona en pantalla completa
sin barra de direcciones) como paso intermedio razonable, o una app
nativa en Play Store/App Store (más control, pero cuesta dinero -- unos
99 USD/año en Apple, 25 USD única vez en Google -- y hay que pasar el
proceso de revisión de cada tienda). Se revisita cuando haya piloto
validado; no es prioridad mientras se está probando con 2-3 peluquerías
conocidas.

---

Documento creado el 23 de julio de 2026. Se revisa al final de cada mes
para marcar qué se cumplió y ajustar el siguiente si hace falta.
