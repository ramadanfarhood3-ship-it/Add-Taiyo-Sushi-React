export default function ConfirmDialog({ open, title, message, confirmLabel = 'حذف', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-fade-in" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-96 sm:rounded-2xl rounded-t-2xl bg-fitx-card border border-fitx-border p-5 animate-scale-in"
      >
        <h3 className="text-lg font-bold text-fitx-text mb-2">{title}</h3>
        <p className="text-sm text-fitx-muted mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-fitx-card2 text-fitx-text font-semibold text-sm active:scale-95 transition-transform"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-fitx-danger text-white font-semibold text-sm active:scale-95 transition-transform"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
