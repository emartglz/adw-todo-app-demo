# Feature: Animated Rainbow Border for New TODOs

**ADW ID:** #11
**Fecha:** 2026-03-05
**Especificacion:** N/A

## Overview

When a user creates a new TODO item, it appears with an animated rainbow border that rotates for 3 seconds and then disappears. The effect is implemented with pure CSS using a rotating conic gradient pseudo-element, with no external dependencies.

## Que se Construyo

- Animated rainbow border effect on newly created task items using CSS conic-gradient
- React state tracking (`newTaskId`) in `App.jsx` to identify the most recently created task
- Auto-cleanup via `setTimeout` after 3 seconds, with timer ref management to handle rapid task creation
- `isNew` prop propagation through `TaskList` down to `TaskItem`
- Coexistence with existing features: `ConfirmDialog`, `ParticleBackground`, and confetti animation are preserved

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/src/App.jsx`: Added `newTaskId` state and `newTaskTimerRef`; sets ID on task creation with 3s auto-clear; passes `newTaskId` to `TaskList`
- `frontend/src/components/TaskList.jsx`: Added `newTaskId` prop; passes `isNew={task.id === newTaskId}` to each `TaskItem`
- `frontend/src/components/TaskItem.jsx`: Added `isNew` prop; applies `rainbow-border` CSS class conditionally
- `frontend/src/index.css`: Added `@keyframes rainbow-rotate`, `.task-item.rainbow-border` styles with `::before` (rotating conic gradient) and `::after` (inner background mask) pseudo-elements
- `frontend/src/__tests__/TaskItem.test.jsx`: Updated tests for `isNew` prop and `rainbow-border` class
- `frontend/src/__tests__/App.test.jsx`: Added tests for `newTaskId` logic and timer cleanup

### Cambios Clave

1. **CSS-only rainbow animation**: `.task-item.rainbow-border::before` uses a `conic-gradient` from red through the full spectrum back to red, rotated continuously via `rainbow-rotate` keyframes (2s linear infinite). A `rainbow-fade` animation (3s, ease-out, forwards) fades the border out smoothly over the last ~30% of its duration. The `::after` pseudo-element covers the interior, leaving only a ~2px rainbow border visible.
2. **Timer management**: `newTaskTimerRef.current` stores the active timeout. On each new task creation, any existing timer is cleared before setting a new one, ensuring only the latest task shows the rainbow effect.
3. **Delete flow**: `ConfirmDialog` is preserved from the existing codebase; the rainbow border feature does not affect deletion behavior.
4. **Visual coexistence**: `ParticleBackground` and `fireConfetti` are preserved alongside the rainbow border effect.

## Como Usar

1. Open the Todo List app.
2. Type a task title in the input form and submit.
3. The newly created task item appears with an animated rainbow border rotating around it.
4. After 3 seconds, the rainbow border disappears automatically.
5. If you create another task before the 3 seconds elapse, the rainbow moves to the new task immediately.

## Configuracion

No configuration required. The animation duration (3 seconds) is hardcoded in `App.jsx`:
```js
newTaskTimerRef.current = setTimeout(() => setNewTaskId(null), 3000)
```
Change `3000` to adjust the display duration in milliseconds.

## Testing

Run frontend tests:
```bash
cd frontend && npm test
```

Key test cases:
- `TaskItem` with `isNew=true` renders with `rainbow-border` class
- `TaskItem` with `isNew=false` or no prop does NOT render with `rainbow-border` class
- After creating a task in `App`, the new item has `rainbow-border`
- After advancing fake timers by 3s, `rainbow-border` disappears

## Notas

- No new npm dependencies required — pure CSS and React state.
- `conic-gradient` is supported in all modern browsers.
- The existing `ConfirmDialog` confirmation UX is preserved from the main branch.
