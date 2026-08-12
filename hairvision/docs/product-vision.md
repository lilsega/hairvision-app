# HairVision — Visión de producto

## Sprint 1 (4 de julio de 2026)

### 1. Filosofía del proyecto
HairVision no es una prueba técnica ni una demo rápida: es el primer
producto de una startup real. Cada decisión técnica busca equilibrio entre
rapidez para construir el MVP, código limpio, escalabilidad futura y
facilidad de mantenimiento. Sin sobreingeniería, pero sin nada que obligue
a rehacer la aplicación en seis meses.

### 2. Prioridad absoluta
Antes que nuevas funcionalidades: sensación de producto premium. Al abrir
la app por primera vez, una peluquera debe pensar "esto parece una
aplicación profesional". La calidad visual y la UX importan tanto como el
código.

### 3. Objetivo del MVP
El MVP no busca demostrar la calidad de la IA. Busca validar si las
peluquerías usarían HairVision y pagarían una suscripción. Cualquier
funcionalidad no imprescindible para validar esa hipótesis queda fuera.

### 4. Referencias de diseño
Apple, Notion, Linear, Arc Browser, Raycast. Interfaz elegante,
minimalista, moderna, limpia, muy visual, con abundante espacio en blanco.
Nada recargado.

### 5. Tablet horizontal, sin concesiones a móvil
Toda decisión de UI se piensa exclusivamente para tablet en landscape.
Cada pantalla aprovecha el espacio horizontal para que la peluquera
enseñe el resultado cómodamente a la clienta.

### 6. Estado global
Context API por ahora. No se migra a Zustand (u otra librería) hasta que
el producto incorpore backend, login y suscripciones — se revisita esa
decisión en ese momento, no antes.

### 7. Fuera del MVP (de momento)
Backend, login, base de datos, suscripciones, IA real, procesamiento real
de vídeo, APIs externas. Todo debe quedar preparado para integrarse sin
modificar pantallas (ver `services/` en el código).

### 8. Proceso de trabajo
Antes de sumar funcionalidades nuevas: revisión visual completa del MVP,
luego refinamiento pantalla por pantalla. Menos funcionalidades y más
calidad. Cada componente reutilizable, cada pantalla consistente con el
resto.

Cambios que alteren el flujo principal del producto se proponen antes de
implementarse. Cambios técnicos o de UX que no alteren el flujo pueden
proponerse e implementarse en el mismo ciclo.
