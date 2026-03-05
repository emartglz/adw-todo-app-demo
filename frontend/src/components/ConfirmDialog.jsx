function ConfirmDialog({ message, onConfirm, onCancel, icon = null }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        {icon && <p className="confirm-dialog-icon">{icon}</p>}
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-delete" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
