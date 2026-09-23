function ConfirmModal({ title, message, confirmLabel, destructive, onConfirm, onCancel }) {
    return (
      <div className="modal-overlay" onClick={onCancel}>
        <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onCancel} aria-label="Close">
            ✕
          </button>
          <h2 className="confirm-title">{title}</h2>
          <p className="confirm-message">{message}</p>
          <div className="confirm-actions">
            <button type="button" className="form-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className={destructive ? "confirm-submit destructive" : "confirm-submit"}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmModal;