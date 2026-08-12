# Ideas y tareas pendientes (para retomar en unos días)

> Todo lo hablado en la sesión de hoy, más ideas nuevas que no habíamos
> comentado. Ordenado por complejidad/prioridad, no por orden en que
> salió en la conversación. No hace falta capital para nada del Nivel 0
> y Nivel 1; a partir del Nivel 2 algunas cosas sí lo piden.

## Nivel 0 — Ya está casi hecho, solo falta terminarlo (minutos/horas)

1. **Subir a producción el aviso de privacidad de la foto y el código
   de acceso** — ya está escrito y probado en local, solo falta el
   `git push` a `hairvision-app`.
2. **Confirmar que el endurecimiento del servidor está desplegado**
   (cuota diaria de 20/día, CORS restringido, validación de entradas)
   — se dieron los comandos pero no llegué a ver la confirmación de que
   se ejecutaron.
3. **Reprobar todo de cabo a rabo** después de esos dos pushes: las 8
   combinaciones de corte, el código de acceso, el aviso de privacidad.
4. **Decidir si programo un aviso automático para septiembre** para
   retomar el contacto con la peluquería 3 (lo he ofrecido dos veces,
   sigue sin respuesta).

## Nivel 1 — Baja complejidad, buen impacto (próxima sesión, sin gastar dinero)

5. **Que las sugerencias de IA (Opción X / Opción Y) se puedan moldear.**
   Lo has intuido bien: ahora mismo, si aceptas X o Y, la app se salta
   por completo las pantallas de ajuste (tipo de corte, flequillo,
   largo, volumen) y va directa al resultado con la sugerencia fija, sin
   poder tocar nada. Debería funcionar como un punto de partida: aceptas
   X o Y, esos ajustes se rellenan solos (esto ya existe a medias como
   lógica interna), pero luego SÍ pasas por las pantallas de ajuste para
   poder retocar largo, flequillo, volumen, etc. antes de generar el
   resultado. Complejidad baja-media, y soluciona una limitación real.
6. **Exportar/importar perfiles de clientas guardados.** Ahora mismo un
   perfil guardado con "Guardar Perfil" vive solo en el navegador de
   esa tablet — si se resetea, se pierde o se cambia de tablet, se
   pierde todo. Un botón simple de "exportar copia de seguridad" (un
   archivo) y "importar" evitaría ese riesgo sin necesitar una base de
   datos real todavía.
7. **Convertirlo en PWA de verdad** (manifest.json + icono propio +
   pantalla de carga) para que al "Añadir a pantalla de inicio" se vea
   y se sienta como una app real, no como un acceso directo a una web.
   Coste cero, solo trabajo.
8. **Un one-pager para dejar en las peluquerías que dijeron que no**,
   o para la segunda peluquería (más grande) de la dueña de la
   peluquería 4. Algo que se pueda dejar en el mostrador sin necesitar
   la demo en vivo — abre la puerta a que reconsideren más adelante sin
   que tengas que volver a visitarlas en frío.
9. **Registro ligero de uso por peluquería** (cuántas veces se ha usado,
   qué combinaciones se piden más). El servidor ya registra las
   peticiones; formatear eso en algo legible ayuda a tener datos reales
   para la conversación de septiembre con la peluquería 3.

## Nivel 2 — Antes de cobrar dinero de verdad o escalar el piloto

10. **Decidir el modelo de precio** antes de la conversación de
    septiembre con la peluquería 3 (dijeron que pagarían "si funciona"
    — hay que tener una cifra y una forma de cobrar preparadas).
11. **Darte de alta como autónomo** antes de emitir cualquier factura
    real (aviso: esto es una recomendación general, no asesoría legal
    o fiscal — conviene confirmarlo con una gestoría).
12. **Simulación de color de pelo** — lo han pedido las dos peluquerías
    interesadas, es la petición más repetida hasta ahora. Complejidad
    media-alta (afecta al prompt de la IA y a cómo se presenta el
    resultado).
13. **El resto del endurecimiento de seguridad que quedó aparcado**:
    límite de peticiones por IP (no solo por día), validar mejor el
    tamaño de la foto, y un registro de consumo más serio. Nada urgente
    mientras sea un piloto pequeño, pero sí antes de tener varias
    peluquerías pagando a la vez.
14. **Monitorización básica**: que te avise si el servidor se cae, en
    vez de enterarte porque una peluquería te escribe. Con una
    peluquería no es crítico; con varias, sí.

## Nivel 3 — Alta complejidad o requiere capital, solo si el piloto valida bien

15. **Cuentas reales por peluquería** (login propio, perfiles
    sincronizados entre dispositivos) — necesita una base de datos y
    backend de verdad, no es un cambio pequeño.
16. **App nativa iOS/Android** (tipo Capacitor) — unos 2 meses de
    trabajo, ~99$/año en Apple y ~25$ únicos en Google, más el riesgo
    de que Apple rechace la app por ser "un wrapper" si no se cuida el
    acabado.
17. **Sistema de cobro/suscripción real** (Stripe u otro) — necesario
    en cuanto haya más de 1-2 peluquerías pagando a la vez.
18. **Versión "lite" para clientas finales con QR** (que la clienta
    pruebe cortes desde su móvil en la sala de espera, no solo la
    estilista) — ya estaba aparcada, la mantengo aquí por completitud.
19. **Proteger el nombre "HairVision"** (dominio propio, y quizá marca
    registrada si esto avanza en serio) — barato en comparación con el
    resto de este nivel, pero lo pongo aquí porque solo tiene sentido
    si el piloto va bien.

---

Nada de esto es urgente hoy. La idea es que cuando retomes, empieces
por el Nivel 0 (cerrar lo que ya está a medias) y subas de nivel según
tiempo y ganas.
