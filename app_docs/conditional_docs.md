# Conditional Documentation

Esta guía ayuda a los desarrolladores a saber qué documentación leer según el contexto de su tarea.

## Ficheros de Documentacion

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
