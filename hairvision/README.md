# HairVision — MVP

App para tablet (horizontal) que ayuda a las peluqueras a mostrar a la clienta
una previsualización aproximada de un corte antes de realizarlo.

Este MVP no tiene backend, login, base de datos ni IA real: todo lo que
sería una integración futura está aislado detrás de interfaces en
`src/services/`, así que se puede sustituir sin tocar las pantallas.

## Poner en marcha

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite en una tablet o en Chrome con las dev tools en
modo tablet horizontal (≥ 1024×768). No se ha podido ejecutar `npm install`
en este entorno de generación por no tener acceso a la registry de npm —
conviene correr `npm run dev` una vez descargado el proyecto para confirmar
que todo compila antes de enseñarlo a una peluquería.

```bash
npm run build     # build de producción (dist/)
npm run preview   # sirve el build de producción
```

## Estructura

```
src/
  types/            Modelos de dominio (ClientProfile, Selections, etc.)
  services/          Capa de datos simulada, detrás de interfaces:
                      - profileRepository.ts  (hoy: localStorage)
                      - hairPreviewService.ts (hoy: mock con retraso simulado)
                      - hairData.ts           (catálogo de cortes/flequillos)
  context/            Estado global vía React Context:
                      - FlowContext     navegación (paso actual, atrás/siguiente/home)
                      - AppDataContext  perfil de la clienta + selecciones + cesta
  components/         Piezas reutilizables (Button, SelectableCard, RangeSlider,
                      ToggleGroup, CornerNav, CartBadge, BeforeAfterView,
                      HairSilhouette, ScreenHeader)
  screens/            Una carpeta por pantalla del flujo
  styles/             tokens.css (design tokens) + global.css (reset/base)
```

## Navegación

Gestos en las esquinas, como en el diseño original:

- Arriba-izquierda → volver a inicio ("pantalla nueva")
- Abajo-izquierda → atrás
- Abajo-derecha → siguiente

Cada esquina muestra un icono sutil como referencia visual (decisión
acordada: gestos + iconos, en vez de gestos puros o botones tradicionales).

## Decisiones tomadas junto con Sega (4 de julio 2026)

1. **Navegación**: gestos + iconos sutiles en las esquinas.
2. **Resumen antes del resultado**: se añadió una pantalla de revisión
   editable (`SummaryReview`) antes de generar el resultado — no estaba en
   el wireframe original, pero se acordó explícitamente.
3. **Grabar vídeo**: completamente simulado (sin `getUserMedia`, sin pedir
   permisos de cámara) — solo para dar sensación de flujo real en la demo.
4. **Resultado IA**: se simula con un retraso + nota de texto ("Simulación
   generada según el corte y ajustes seleccionados"). Ver nota sobre
   imágenes más abajo.

## Nota sobre imágenes de referencia

El wireframe original usaba fotos de stock/famosas como referencia visual
para cada tipo de corte. No es apropiado incluir esas imágenes en el
producto (derechos de imagen/licencia), así que cada opción se representa
con una pequeña ilustración de línea generada en código
(`components/HairSilhouette`). Antes de una demo real conviene sustituir
esto por fotografía propia de la peluquería o un banco de imágenes con
licencia — es el primer punto pendiente de "producto terminado".

## Próximos pasos sugeridos

- Sustituir `HairSilhouette` por fotografía real con licencia.
- Cuando exista IA real de generación, implementar `HairPreviewService`
  contra la API y sustituirla en `services/index.ts`.
- Cuando exista backend, implementar `ProfileRepository` contra la API y
  sustituirlo en `services/index.ts` — las pantallas no necesitan cambiar.
- Revisar accesibilidad de los gestos de esquina para tablets más pequeñas.
