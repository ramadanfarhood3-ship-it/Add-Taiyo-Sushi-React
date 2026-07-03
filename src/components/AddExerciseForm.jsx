import { useState } from 'react'
import { X, Plus } from 'lucide-react'

const initialForm = { name: '', sets: 3, reps: 10, weight: 0, restSeconds: 60 }

export default function AddExerciseForm({ onAdd, onClose }) {
  const [form, setForm] = useState(initialForm)

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({
      name: form.name.trim(),
      sets: Math.max(1, Number(form.sets) || 1),
      reps: Math.max(1, Number(form.reps) || 1),
      weight: Math.max(0, Number(form.weight) || 0),
      restSeconds: Math.max(5, Number(form.restSeconds) || 5),
    })
    setForm(initialForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-fitx-card border border-fitx-border rounded-2xl p-4 mb-4 animate-scale-in"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-fitx-text">تمرين جديد</h3>
        <button type="button" onClick={onClose} className="text-fitx-muted p-1">
          <X size={18} />
        </button>
      </div>

      <input
        autoFocus
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        placeholder="اسم التمرين"
        className="w-full bg-fitx-card2 border border-fitx-border rounded-xl px-4 py-3 text-fitx-text placeholder:text-fitx-muted mb-3 outline-none focus:border-fitx-primary transition-colors"
      />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field label="الجولات (Sets)">
          <input
            type="number"
            min={1}
            value={form.sets}
            onChange={(e) => update('sets', e.target.value)}
            className="input-num"
          />
        </Field>
        <Field label="التكرارات (Reps)">
          <input
            type="number"
            min={1}
            value={form.reps}
            onChange={(e) => update('reps', e.target.value)}
            className="input-num"
          />
        </Field>
        <Field label="الوزن (كجم)">
          <input
            type="number"
            min={0}
            step="0.5"
            value={form.weight}
            onChange={(e) => update('weight', e.target.value)}
            className="input-num"
          />
        </Field>
        <Field label="الراحة (ثانية)">
          <input
            type="number"
            min={5}
            step="5"
            value={form.restSeconds}
            onChange={(e) => update('restSeconds', e.target.value)}
            className="input-num"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-fitx-primary text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
      >
        <Plus size={18} />
        إضافة التمرين
      </button>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs text-fitx-muted mb-1">{label}</span>
      {children}
    </label>
  )
}
