# Guía de la carpeta HairVision (sin lenguaje técnico)

Este documento explica qué es cada cosa dentro de la carpeta del proyecto,
en español normal. No hace falta entender código para leerlo. Cada línea
lleva el nombre técnico real (por si algún día hablas con otro
desarrollador) y, entre paréntesis, qué es en la práctica.

## Antes de nada: 6 palabras que vas a ver todo el rato

- **MVP** (versión mínima para probar la idea): no es la app terminada, es
  lo justo para enseñársela a peluquerías reales y ver si les interesa.
- **Frontend**: todo lo que la peluquera ve y toca en la pantalla. Hoy
  HairVision es solo esto.
- **Backend**: el "servidor" en internet que guardaría datos de verdad
  (clientas, fotos, pagos). Todavía no existe — lo simulamos.
- **Componente**: una pieza reutilizable de pantalla, como un botón o una
  tarjeta, que se usa en varios sitios para no repetir trabajo.
- **Repositorio / proyecto**: la carpeta completa que contiene todo el
  código. Es lo que te he compartido como archivo `.zip`.
- **Simulado / mock**: algo que se comporta como si fuera real (guarda
  datos, "genera" un resultado) pero por dentro es un truco temporal, para
  no tener que montar un servidor todavía.

## El mapa de la carpeta `hairvision`

```
hairvision/
├── README.md
├── docs/
├── src/
│   ├── screens/
│   ├── components/
│   ├── context/
│   ├── services/
│   ├── design-system/
│   ├── styles/
│   ├── assets/
│   └── types/
└── (archivos de configuración técnica)
```

### `README.md` (léeme)
El primer archivo que abriría cualquier programador. Explica cómo poner en
marcha el proyecto en un ordenador. Tú no necesitas tocarlo.

### `docs/` (documentación del producto)
La carpeta que NO es código. Aquí vive todo lo que tiene que ver con la
idea de negocio y las decisiones tomadas, no con la programación:

- `product-vision.md` (visión de producto): la filosofía y prioridades que
  definimos el 4 de julio — el "espíritu" que debe guiar cada decisión.
- `decisions.md` (registro de decisiones): un diario de "por qué hicimos
  esto así", para no perder el hilo dentro de unos meses.
- `plan-de-negocio.md` (tu plan de negocio): el documento que me pasaste,
  guardado aquí para que lo sigamos retocando juntos sin perderlo.

### `src/` (código fuente — el "motor" real de la app)
`src` es de "source" (fuente). Todo lo que hace que la app funcione vive
aquí dentro. Es la parte que normalmente no necesitas abrir, pero aquí va
el mapa por si tienes curiosidad:

- **`screens/` (pantallas):** una carpeta por cada pantalla que ve la
  peluquera — Inicio, Ficha de la clienta, Sugerencias, Tipos de corte,
  Ajustes, Resumen, Resultado, Guardar. Si algún día quieres cambiar el
  texto de una pantalla, es aquí donde estaría (aunque el cambio en sí lo
  haría yo).
- **`components/` (piezas reutilizables):** botones, tarjetas
  seleccionables, sliders (barras deslizantes), el marcador de "cesta"...
  cosas pequeñas que se repiten en varias pantallas y solo se programan
  una vez.
- **`context/` (memoria compartida de la app):** mientras la peluquera usa
  la app, algo tiene que recordar "en qué pantalla estamos" y "qué ha
  elegido esta clienta hasta ahora". Eso vive aquí.
- **`services/` (la parte que hoy está simulada):** esta es la carpeta más
  importante para entender el MVP. Aquí es donde, en el futuro, se
  conectará el backend real, la IA real y los pagos reales. Hoy, en su
  lugar, hay una versión "de mentira" que se comporta parecido:
  - guardar el perfil de una clienta → hoy se guarda solo en ese
    ordenador/tablet (no en internet)
  - generar el resultado del corte → hoy es una simulación con un
    dibujo de línea, no una IA de verdad
  - Cuando haya presupuesto y sea el momento, se sustituye solo esta
    carpeta — las pantallas no se tocan.
- **`design-system/` y `styles/` (el estilo visual, en dos formatos):**
  aquí están definidos de una vez los colores, la tipografía y los
  espaciados de toda la app, para que todo se vea consistente. Es como la
  paleta de colores y las fuentes de un manual de marca, pero en código.
- **`assets/` (logo, iconos, fotos):** está vacía a propósito. Es donde
  irán el logo real, fotos de cortes con licencia, etc., cuando los
  tengas. Hoy los dibujos de los cortes son ilustraciones simples hechas
  por código (ver más abajo).
- **`types/` (la "ficha" de qué datos tiene una clienta):** define, por
  ejemplo, que una clienta tiene nombre, tipo de cabello, corte elegido,
  etc. Es como el formulario en blanco que luego se rellena.

### Archivos de configuración técnica
`package.json`, `vite.config.ts`, `tsconfig*.json`... Instrucciones para
las herramientas de programación (qué piezas de software usar, cómo
traducir el código). No necesitas entenderlos ni abrirlos nunca.

## Por qué los cortes no tienen fotos reales todavía

En el diseño original usábamos fotos de famosas como referencia. No es
correcto usar esas fotos dentro del producto de verdad (derechos de
imagen), así que de momento cada tipo de corte se representa con un
dibujito de línea generado por código. Antes de enseñar la app a una
peluquería de verdad, conviene sustituirlos por fotos propias o con
licencia — irían en `src/assets/photos`.

## Qué archivos te he ido dando

- `hairvision-mvp-sprint1.zip` — el proyecto completo de código (lo que
  describe esta guía). No se abre a simple vista, es para un programador o
  para subir a una herramienta de desarrollo.
- `hairvision-preview.html` — un archivo suelto que sí puedes abrir
  haciendo doble clic en tu navegador, para ver y tocar el prototipo sin
  instalar nada. Es una copia simplificada solo para mirar, no es el
  proyecto real.

## Qué más te hace falta para estar organizada

No necesitas mucho más ahora mismo. Con lo que tienes, el orden natural
sería:

1. **Ver el prototipo** (`hairvision-preview.html`) y decirme qué
   pantallas no te transmiten esa sensación "premium" de la que hablamos.
2. **Revisar el plan de negocio** (`docs/plan-de-negocio.md`) conmigo,
   sección por sección, y marcar qué está desactualizado o qué falta.
3. Cuando ambas cosas estén más maduras, valdría la pena tener un tercer
   documento corto: un **resumen de una página** (a veces llamado
   "one-pager") que puedas enseñar rápido a una peluquería o a alguien que
   te pregunte de qué va HairVision, sin mandarle el plan entero. Lo
   armamos cuando quieras, a partir del plan que ya tienes.

No hace falta que entiendas el código. Mi trabajo es mantenerlo ordenado;
el tuyo es decidir qué debe transmitir la app y a quién se la vas a
enseñar primero.
