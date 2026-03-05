# Feature: Animated Particle Background

**ADW ID:** /home/emartinez/work/adw-todo-app-demo/trees/issue-9/.issues/9/plan.md
**Fecha:** 2026-03-05
**Especificacion:** /home/emartinez/work/adw-todo-app-demo/trees/issue-9/.issues/9/plan.md

## Overview

Se ha implementado un fondo animado interactivo con particulas para la aplicacion Todo List. Las particulas se mueven organicamente por el fondo, rebotan en los bordes, se conectan entre si con lineas semitransparentes cuando estan cerca, y se acercan al puntero del mouse creando un efecto de atraccion visual.

## Que se Construyo

- Componente React `ParticleBackground` que usa Canvas API nativa para renderizar 100 particulas animadas
- Sistema de atraccion de particulas hacia el puntero del mouse (radio de 150px)
- Conexiones visuales entre particulas cercanas (radio de 120px) con opacidad proporcional a la distancia
- Redimensionado automatico del canvas al cambiar el tamano de la ventana
- Mock del Canvas API en el setup de tests para compatibilidad con jsdom
- Tests unitarios para el nuevo componente

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/src/components/ParticleBackground.jsx`: Nuevo componente con logica de canvas, animacion, tracking del mouse y conexiones entre particulas
- `frontend/src/App.jsx`: Importa y renderiza `<ParticleBackground />` como primer hijo envuelto en un Fragment
- `frontend/src/index.css`: Cambia el fondo del body a `#1a1a2e` (oscuro) y añade `position: relative; z-index: 1` al `.app` para que quede sobre el canvas
- `frontend/src/__tests__/setup.js`: Mock de `HTMLCanvasElement.prototype.getContext` para tests con jsdom
- `frontend/src/__tests__/ParticleBackground.test.jsx`: Tests unitarios del componente (nuevo fichero)

### Cambios Clave

1. **ParticleBackground**: Usa `useRef` para el canvas y `useEffect` para gestionar el ciclo de vida. El loop de animacion corre con `requestAnimationFrame` y se cancela en el cleanup.
2. **Constantes configurables**: `PARTICLE_COUNT=100`, `CONNECTION_DISTANCE=120px`, `MOUSE_ATTRACTION_DISTANCE=150px`, `MAX_SPEED=2` definidas al inicio del componente.
3. **Renderizado en capas**: El canvas tiene `position: fixed; z-index: -1` y el `.app` tiene `z-index: 1`, garantizando que el contenido quede siempre sobre el fondo.
4. **Color coherente**: Se usa `rgba(52, 152, 219, 0.6)` (azul `#3498db`) para las particulas, coincidiendo con el color primario existente de la app.
5. **Cleanup completo**: Se limpian `mousemove`, `resize` listeners y el `animationId` al desmontar el componente.

## Como Usar

El fondo animado esta activo automaticamente al cargar la aplicacion. No requiere interaccion del usuario.

1. Abre la aplicacion en el navegador
2. El fondo oscuro con particulas azules aparece automaticamente
3. Mueve el mouse por la pantalla para ver como las particulas cercanas se acercan al puntero
4. Las particulas que se encuentran a menos de 120px entre si se conectan con lineas semitransparentes

## Configuracion

Las siguientes constantes en `frontend/src/components/ParticleBackground.jsx` permiten ajustar el comportamiento:

| Constante | Valor | Descripcion |
|---|---|---|
| `PARTICLE_COUNT` | 100 | Numero de particulas |
| `PARTICLE_COLOR` | `rgba(52, 152, 219, 0.6)` | Color de las particulas |
| `LINE_COLOR_BASE` | `'52, 152, 219'` | Color base de las lineas de conexion |
| `CONNECTION_DISTANCE` | 120 | Distancia maxima (px) para conectar particulas |
| `MOUSE_ATTRACTION_DISTANCE` | 150 | Radio de atraccion del mouse (px) |
| `MAX_SPEED` | 2 | Velocidad maxima de las particulas |

El color de fondo se define en `frontend/src/index.css` como `background-color: #1a1a2e`.

## Testing

```bash
cd frontend && npm test
```

Los tests en `frontend/src/__tests__/ParticleBackground.test.jsx` verifican:
- El componente renderiza un elemento `<canvas>`
- El canvas tiene los estilos de posicionamiento correctos (`position: fixed`, `zIndex: -1`)

El mock del Canvas API en `frontend/src/__tests__/setup.js` es necesario porque jsdom no soporta `getContext('2d')`.

## Notas

- Implementacion sin dependencias externas usando Canvas API nativa para mantener el bundle ligero
- El numero de particulas (100) es un balance entre efecto visual y rendimiento (~60fps)
- El fondo oscuro (`#1a1a2e`) es necesario para que las particulas azules sean visibles; si se cambia el tema de color hay que ajustar ambos
