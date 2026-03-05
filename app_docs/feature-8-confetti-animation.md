# Feature: Animacion de Confetis al Completar un TODO

**ADW ID:** /home/emartinez/work/adw-todo-app-demo/trees/issue-8/.issues/8/plan.md
**Fecha:** 2026-03-05
**Especificacion:** N/A

## Overview

Se anadio una animacion de confetis que se dispara cuando el usuario marca una tarea como completada. Usa la libreria `canvas-confetti` para lanzar particulas desde ambos lados de la pantalla, proporcionando feedback visual positivo al completar tareas. La animacion solo se activa al marcar como completado, no al desmarcar.

## Que se Construyo

- Modulo utilitario `confetti.js` que encapsula la logica de animacion con `canvas-confetti`
- Integracion en `handleToggleTask` de `App.jsx` condicionada al cambio de estado incompleto -> completo
- Tests unitarios para verificar que `fireConfetti` dispara dos rafagas (izquierda y derecha)
- Tests de integracion en `App.test.jsx` para verificar el comportamiento de disparo/no-disparo segun el estado de la tarea

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/package.json`: Anadida dependencia `canvas-confetti`
- `frontend/src/App.jsx`: Importa `fireConfetti` y la llama en `handleToggleTask` cuando `task.completed === false`
- `frontend/src/__tests__/App.test.jsx`: Anadidos 2 tests de integracion para verificar logica de confeti
- `frontend/src/utils/confetti.js` (nuevo): Modulo con funcion `fireConfetti()` que lanza dos rafagas de confetis

### Cambios Clave

- `fireConfetti()` lanza dos llamadas a `canvas-confetti`: una desde la izquierda (`angle: 60, origin.x: 0`) y otra desde la derecha (`angle: 120, origin.x: 1`), ambas a altura media (`origin.y: 0.6`)
- La condicion en `handleToggleTask` es `if (!task.completed) fireConfetti()` — se evalua el estado actual antes del toggle
- La llamada a `fireConfetti()` ocurre antes del `await updateTask` para feedback inmediato al usuario
- Los tests mockean `canvas-confetti` con `vi.mock` para evitar dependencias del DOM en el entorno de test

## Como Usar

1. Abrir la aplicacion Todo List en el navegador
2. Crear una nueva tarea si no existe ninguna
3. Hacer clic en el checkbox de una tarea pendiente
4. La animacion de confetis se lanzara desde ambos lados de la pantalla
5. Al desmarcar una tarea completada, no se muestra animacion

## Configuracion

No requiere configuracion adicional. La dependencia `canvas-confetti` se instala via npm:

```bash
cd frontend && npm install
```

Los parametros de la animacion estan en `frontend/src/utils/confetti.js`:
- `particleCount: 80` — numero de particulas por rafaga
- `spread: 70` — angulo de dispersion
- `startVelocity: 45` — velocidad inicial
- `colors` — array de colores RGB en hex

## Testing

```bash
cd frontend && npm test -- --run
```

Tests relevantes en `frontend/src/__tests__/`:
- `App.test.jsx`: "fireConfetti is called when toggling incomplete task to complete"
- `App.test.jsx`: "fireConfetti is NOT called when toggling complete task to incomplete"
- `confetti.test.js`: Tests unitarios de la funcion `fireConfetti`

## Notas

- `canvas-confetti` (~6KB gzipped, sin dependencias) gestiona su propio canvas HTML, sin impacto en CSS ni estructura DOM existente
- La animacion no bloquea la interaccion del usuario (es puramente visual y no-bloqueante)
- No requiere cambios en el backend; la funcionalidad es 100% frontend
