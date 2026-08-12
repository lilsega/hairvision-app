# Opciones de IA para la previsualización de cortes

> Investigado el 9 de julio de 2026. Ninguno de estos proveedores publica
> precio exacto por adelantado — todos piden "contacta con ventas" o dan
> una clave de API gratuita limitada para probar antes de cotizar. Este
> documento es para comparar opciones, no un compromiso con ninguno.

## Por qué esto en vez de construir IA propia

El plan de negocio original presupuestaba desarrollo de la app + entrenar
modelos de simulación como partidas grandes de tiempo y dinero. Existen
empresas que ya venden exactamente esta tecnología (previsualizar un corte
de pelo sobre una foto real) como una pieza que se conecta a la app, en
vez de construirla desde cero. Esto cambia "necesito un equipo de IA" por
"necesito integrar un servicio y pagar por su uso".

## Comparativa rápida

| Proveedor | Qué ofrece para pelo | Dónde procesa la foto | Cómo es el precio |
|---|---|---|---|
| **Perfect Corp (YouCam API)** | Suite de 11 APIs: prueba de corte, color, flequillo, volumen, ondas, extensiones | En sus servidores (la foto viaja a su nube) | Pago por uso ("unidades"), clave gratuita para probar, tarifas reales solo hablando con ventas |
| **Banuba** | SDK de pelo con segmentación e IA, integrable en apps móviles/web | **En el propio dispositivo** — la foto no sale de la tablet | Licencia mensual por plataforma, cotización a medida |
| **ModiFace** | Muy usado por grandes marcas de belleza | En su nube | Principalmente para socios de L'Oréal — probablemente no accesible para una startup pequeña |
| **DeepAR** | Prueba de looks en tiempo real | En el dispositivo (solo iOS para pelo) | Modelo freemium con funciones limitadas gratis |
| **GlamAR / Orbo AI / PulpoAR** | Try-on para varias categorías (incluye pelo), pensado para integración rápida | Varía según proveedor | Cotización a medida |

## Lo más relevante para HairVision, más allá del precio

Vais a grabar la cara de clientas reales en un salón. Eso significa que
**dónde se procesa la foto no es un detalle técnico, es una decisión de
privacidad**: si la foto viaja a un servidor externo (Perfect Corp,
ModiFace), esa empresa está tratando datos personales de vuestras
clientas y hay que gestionarlo bien (avisos, consentimiento, contrato de
tratamiento de datos). Si el procesado ocurre en el propio dispositivo
(Banuba, DeepAR en iOS), la foto nunca sale de la tablet, lo que reduce
bastante ese problema.

No es un motivo para descartar automáticamente a los que usan la nube —
solo significa que el precio no debería ser el único criterio de decisión.

## Alternativa: IA generalista de edición de fotos (no especializada en pelo)

Investigado el 11 de julio de 2026. Además de los proveedores especializados
en pelo/belleza de la tabla de arriba, existen modelos de IA de propósito
general para editar fotos que también pueden cambiar un peinado — se les
manda la foto de la clienta más una instrucción en texto (ej. "aplícale un
corte bob con flequillo cortina y el pelo a la altura de la cintura") y
devuelven la foto editada.

El más relevante ahora mismo es **Nano Banana 2 / Nano Banana Pro**, el
modelo de generación y edición de imágenes de Google (Gemini). A favor:

- Clave de API de autoservicio en Google AI Studio — sin llamada de ventas,
  se puede empezar a probar hoy mismo.
- Precio publicado y transparente (no "contacta con ventas"): del orden de
  0,04 a 0,15 dólares por imagen generada según la resolución.

En contra: no está pensado específicamente para pelo/salón — la fidelidad en
detalles finos (textura exacta, volumen, que respete bien la forma de la
cara) hay que comprobarla con fotos reales antes de confiar en él; los
proveedores especializados (Perfect Corp, Banuba) están construidos
justo para este caso de uso y probablemente den un resultado más fiable ahí.

**Recomendación:** al ser autoservicio y barato, tiene sentido probarlo en
paralelo mientras se espera respuesta de Perfect Corp/Banuba — comparando
los tres con las mismas fotos reales antes de decidir.

## Recomendación concreta

1. Pedir la clave de API gratuita de **Perfect Corp** y una cotización real
   con un volumen estimado del piloto (ej. "5 peluquerías, ~30
   previsualizaciones por semana cada una durante 2-3 meses").
2. Pedir cotización a **Banuba** con el mismo volumen, y preguntar
   explícitamente por el coste de la opción de procesamiento en
   dispositivo.
3. Comparar no solo precio, sino: calidad real del resultado con fotos de
   prueba propias, y qué implica cada uno en términos de privacidad de las
   clientas.
4. Decidir con datos reales en la mano, no antes.

## Qué necesito de ti para dar el siguiente paso

Contactar con estos proveedores implica crear cuentas y hablar como
representante de HairVision — eso te toca a ti (o dime si quieres que te
prepare el email/mensaje de contacto para copiar y enviar). Yo puedo
ayudarte a preparar esas comunicaciones y a integrar la API en el código
una vez elijas proveedor y tengas acceso.
