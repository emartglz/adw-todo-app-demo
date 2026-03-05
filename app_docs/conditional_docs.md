# Guia de Documentacion Condicional

Este documento te ayuda a determinar que documentacion deberias leer en funcion de los cambios que necesitas hacer en el codebase. Revisa las condiciones de abajo y lee la documentacion relevante antes de proceder con tu tarea.

## Instrucciones
- Revisa la tarea que te han pedido realizar
- Comprueba cada ruta de documentacion en la seccion de Documentacion Condicional
- Para cada ruta, evalua si alguna de las condiciones aplica a tu tarea
  - IMPORTANTE: Solo lee la documentacion si alguna de las condiciones coincide con tu tarea
- IMPORTANTE: No quieres leer documentacion en exceso. Solo lee la documentacion si es relevante para tu tarea.

## Documentacion Condicional

- backend/README.md
  - Condiciones:
    - Cuando trabajes con cualquier cosa bajo backend/
    - Cuando necesites saber como arrancar o testear el servidor Rails
    - Cuando trabajes con la API o los endpoints del backend

- frontend/README.md
  - Condiciones:
    - Cuando trabajes con cualquier cosa bajo frontend/
    - Cuando necesites saber como arrancar o testear la aplicacion React
    - Cuando trabajes con componentes, servicios o estilos del frontend

- app_docs/feature-1-delete-confirmation-dialog.md
  - Condiciones:
    - Cuando se trabaje con el flujo de eliminación de tareas
    - Cuando se implemente un diálogo de confirmación modal en el frontend
    - Cuando se resuelvan problemas relacionados con borrados accidentales o UX de confirmación

- app_docs/feature-8-confetti-animation.md
  - Condiciones:
    - Cuando se trabaje con la animacion de confetis o feedback visual al completar tareas
    - Cuando se implemente o modifique `handleToggleTask` en `App.jsx`
    - Cuando se trabaje con `canvas-confetti` o el modulo `frontend/src/utils/confetti.js`
    - Cuando se resuelvan problemas relacionados con animaciones en el frontend

- app_docs/feature-9-particle-background.md
  - Condiciones:
    - Cuando se trabaje con el componente ParticleBackground o el canvas animado
    - Cuando se implemente o modifique efectos visuales de fondo en el frontend
    - Cuando se resuelvan problemas de z-index o capas visuales en la UI
    - Cuando se ajuste el tema de colores o el fondo de la aplicacion

- app_docs/feature-11-rainbow-border-new-tasks.md
  - Condiciones:
    - Cuando trabajes con efectos visuales o animaciones en TaskItem
    - Cuando implementes feedback visual para acciones del usuario (crear, completar tareas)
    - Cuando resuelvas problemas relacionados con la clase rainbow-border o el estado newTaskId
    - Cuando trabajes con animaciones CSS en index.css relacionadas con tareas
