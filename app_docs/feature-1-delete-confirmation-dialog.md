# Delete Confirmation Dialog

**ADW ID:** 1
**Fecha:** 2026-03-04
**Especificacion:** .issues/1/plan.md

## Overview

Se añadió un diálogo de confirmación modal al flujo de eliminación de tareas. Antes de borrar una tarea, el usuario debe confirmar explícitamente la acción, evitando borrados accidentales por clics involuntarios.

## Que se Construyo

- Componente `ConfirmDialog` reutilizable como overlay modal
- Integración de `ConfirmDialog` en `TaskItem` con gestión de estado local
- Estilos CSS para el modal (overlay, cuadro de diálogo, botones)
- Tests unitarios para `ConfirmDialog`
- Tests actualizados para `TaskItem` cubriendo el nuevo flujo de confirmación

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/src/components/TaskItem.jsx`: Añadido estado `showConfirm`, cambiado `onClick` del botón "Eliminar" para mostrar el diálogo en vez de borrar directamente, renderizado condicional de `ConfirmDialog`
- `frontend/src/index.css`: Añadidos estilos para `.confirm-overlay`, `.confirm-dialog`, `.confirm-dialog-message`, `.confirm-dialog-actions` y `.btn-cancel`
- `frontend/src/__tests__/TaskItem.test.jsx`: Actualizados tests existentes y añadidos nuevos para cubrir el flujo de confirmación

### Ficheros Nuevos

- `frontend/src/components/ConfirmDialog.jsx`: Componente modal reutilizable con props `message`, `onConfirm` y `onCancel`
- `frontend/src/__tests__/ConfirmDialog.test.jsx`: Tests unitarios del componente `ConfirmDialog`

### Cambios Clave

- El botón "Eliminar" en `TaskItem` ya no llama a `onDelete` directamente; en su lugar activa `setShowConfirm(true)`
- `ConfirmDialog` se renderiza condicionalmente usando `showConfirm` como flag de estado local en `TaskItem`
- Al confirmar: se ejecuta `onDelete(task.id)` y se cierra el diálogo (`setShowConfirm(false)`)
- Al cancelar (botón o click en overlay): solo se cierra el diálogo sin borrar la tarea
- El overlay usa `z-index: 1000` y cubre toda la pantalla con fondo semitransparente

## Como Usar

1. En la lista de tareas, pulsa el botón **"Eliminar"** de cualquier tarea
2. Aparece un modal con el mensaje: `¿Eliminar la tarea "<título>"?`
3. Pulsa **"Eliminar"** en el diálogo para confirmar y borrar la tarea
4. Pulsa **"Cancelar"** o haz click fuera del diálogo para cerrar sin borrar

## Configuracion

No requiere configuración adicional. El componente `ConfirmDialog` es autocontenido y no depende de contexto global ni variables de entorno.

## Testing

```bash
cd frontend && npm test -- --run
```

Los tests cubren:
- `ConfirmDialog`: renderizado del mensaje, callbacks `onConfirm`/`onCancel`, click en overlay
- `TaskItem`: click en "Eliminar" muestra el diálogo, confirmar llama a `onDelete`, cancelar no llama a `onDelete`

## Notas

- El componente `ConfirmDialog` es genérico y reutilizable en otros contextos
- No se requirieron cambios en el backend
- No se añadieron nuevas dependencias npm
