# Servidor de HairVision (conexión con Nano Banana)

Esta es la pieza que faltaba para que "Ver resultado" haga una simulación
de IA de verdad en vez del dibujo de muestra actual. Guarda tu clave de
Google en secreto y es la única pieza que habla directamente con Google —
la tablet solo le habla a este servidor.

**Aviso honesto:** este código sigue el formato oficial que documenta
Google, pero no he podido probarlo en vivo desde donde trabajo (mi
entorno no tiene salida a internet hacia los servidores de Google). La
primera prueba real hay que hacerla en tu ordenador.

## 1. Preparar la carpeta

Ahora mismo estos archivos están sueltos dentro de tu carpeta
`hairvision` (la que tiene también `docs`, `src`, etc., dentro de
"hair vision todo" en tu Escritorio). Vamos a meterlos en una carpeta
nueva llamada `server`:

1. Abre el Explorador de archivos y entra en esa carpeta `hairvision`.
2. Botón derecho en un espacio vacío → **Nuevo** → **Carpeta**. Escribe
   `server` como nombre (todo en minúsculas, sin tildes) y pulsa Enter.
3. Ahora **mueve** (arrastra, o corta con Ctrl+X y pega con Ctrl+V dentro
   de `server`) estos tres archivos a esa carpeta nueva:
   - `server-index.js`
   - `server-package.json`
   - `server-env-example.txt`
   (`server-README.md`, este mismo archivo, se queda fuera, no hace falta moverlo.)
4. Ya dentro de la carpeta `server`, **renómbralos** (clic derecho →
   Cambiar nombre) así:
   - `server-index.js` → `index.js`
   - `server-package.json` → `package.json`
   - `server-env-example.txt` → `.env.example`

Al final, la carpeta `server` debe contener exactamente estos tres
archivos: `index.js`, `package.json`, `.env.example`.

## 2. Instalar Node.js (si no lo tienes)

Necesitas Node.js instalado en tu ordenador. Descárgalo de
[nodejs.org](https://nodejs.org/) (la versión "LTS", la recomendada) e
instálalo como cualquier programa.

## 3. Poner tu clave

Dentro de la carpeta `server`, copia `.env.example` y renombra la copia a
`.env` (así, empezando por un punto). Ábrelo con el Bloc de notas y
sustituye el texto de ejemplo por tu clave real:

```
GEMINI_API_KEY=pega_aqui_tu_clave_real_de_google_ai_studio
PORT=3001
```

Ese archivo `.env` es privado — no lo compartas ni lo subas a ningún
sitio público.

## 4. Instalar e iniciar

Esto es lo que arranca el servidor de verdad. Son dos comandos: uno que
descarga las piezas que necesita (`npm install`, solo hace falta una vez)
y otro que lo enciende (`npm start`, cada vez que quieras usarlo).

1. Abre el Explorador de archivos y entra en la carpeta `server` (la que
   preparaste en el paso 1, con `index.js`, `package.json` y `.env`
   dentro).
2. Haz clic una vez en la barra de direcciones de arriba (donde se ve la
   ruta de la carpeta, algo como `... > hairvision > server`) para que se
   ponga en modo edición.
3. Borra lo que hay escrito ahí, escribe `cmd` y pulsa Enter. Se abrirá
   una ventana negra (la terminal) ya situada dentro de esa carpeta —
   no hace falta buscar nada más ni navegar con comandos.
4. En esa ventana negra, escribe exactamente:
   ```
   npm install
   ```
   y pulsa Enter. Va a mostrar bastante texto pasando durante uno o dos
   minutos — es normal, está descargando las piezas. Espera a que pare y
   vuelva a aparecer el cursor esperando.
5. Después, escribe:
   ```
   npm start
   ```
   y pulsa Enter.

Si todo va bien, verás el mensaje `Servidor de HairVision escuchando en
el puerto 3001`. Eso significa que está funcionando — deja esa ventana
negra abierta (si la cierras, el servidor se apaga). Para pararlo cuando
quieras, haz clic dentro de la ventana y pulsa Ctrl+C.

## 5. Probar que funciona

Con el servidor arrancado, abre esta dirección en el navegador:
`http://localhost:3001/api/salud` — debería aparecer `{"ok":true}`. Eso
confirma que el servidor responde. La prueba real (generar una imagen)
la haremos cuando conectemos el botón "Ver resultado" de la app a este
servidor — avísame cuando tengas esto funcionando y seguimos con ese
paso.

## Qué hace exactamente

Recibe en `POST /api/generar-resultado` la foto de la clienta y lo que
eligió la estilista (tipo de corte, flequillo, largada, reducción de
volumen), arma una instrucción de texto en español para la IA, se la
manda a Nano Banana junto con la foto, y devuelve la imagen editada.

## Siguiente paso (más adelante)

Este servidor, mientras corre solo en tu ordenador, solo es alcanzable
desde tu propio ordenador (`localhost`). Para que la tablet del salón lo
pueda usar de verdad, hará falta subirlo a un sitio en internet (por
ejemplo, un hosting gratuito o de bajo coste como Render o Railway). Eso
lo vemos cuando confirmemos que funciona en local.
