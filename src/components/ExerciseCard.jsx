import { useState } from 'react'
import { Trash2, Check } from 'lucide-react'
import TallyMarks from './TallyMarks'

export default function ExerciseCard({ exercise, onToggleSet, onUpdateWeight, onDelete }) {
  const [editingWeight, setEditingWeight] = useState(false)
  const [weightDraft, setWeightDraft] = useState(exercise.weight)

  const completedCount = exercise.completedSets.filter(Boolean).length
  const isDone = completedCount === exercise.sets

  const commitWeight = () => {
    const val = Math.max(0, Number(weightDraft) || 0)
    onUpdateWeight(val)
    setEditingWeight(false)
  }

  const handleMarkClick = (index) => {
    if (index === completedCount) {
      onToggleSet(index, true)
    } else if (index === completedCount - 1) {
      onToggleSet(index, false)
    }
  }

  return (
    <div
      className={`bg-fitx-card border rounded-2xl p-4 mb-3 transition-colors ${
        isDone ? 'border-fitx-accent/50' : 'border-fitx-border'
      }`}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {isDone && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-fitx-accent flex items-center justify-center">
              <Check size={13} strokeWidth={3} className="text-fitx-bg" />
            </span>
          )}
          <h3 className="font-bold text-fitx-text truncate">{exercise.name}</h3>
        </div>
        <button
          onClick={onDelete}
          className="flex-shrink-0 text-fitx-muted hover:text-fitx-danger p-1 -m-1 transition-colors"
          aria-label="حذف التمرين"
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 font-mono text-sm">
        <div className="flex items-baseline gap-1">
          <span className="text-fitx-text font-semibold">{exercise.sets}</span>
          <span className="text-fitx-muted text-xs">جولات</span>
        </div>
        <div className="w-px h-4 bg-fitx-border" />
        <div className="flex items-baseline gap-1">
          <span className="text-fitx-text font-semibold">{exercise.reps}</span>
          <span className="text-fitx-muted text-xs">تكرار</span>
        </div>
        <div className="w-px h-4 bg-fitx-border" />
        {editingWeight ? (
          <input
            type="number"
            autoFocus
            min={0}
            step="0.5"
            value={weightDraft}
            onChange={(e) => setWeightDraft(e.target.value)}
            onBlur={commitWeight}
            onKeyDown={(e) => e.key === 'Enter' && commitWeight()}
            className="w-16 bg-fitx-card2 border border-fitx-primary rounded-lg px-2 py-0.5 text-fitx-text font-mono text-sm outline-none"
          />
        ) : (
          <button
            onClick={() => {
              setWeightDraft(exercise.weight)
              setEditingWeight(true)
            }}
            className="flex items-baseline gap-1 text-fitx-primaryLight underline decoration-dotted underline-offset-4"
          >
            <span className="font-semibold">{exercise.weight}</span>
            <span className="text-xs">كجم</span>
          </button>
        )}
        <div className="w-px h-4 bg-fitx-border" />
        <div className="flex items-baseline gap-1 text-fitx-muted">
          <span>{exercise.restSeconds}</span>
          <span className="text-xs">ث راحة</span>
        </div>
      </div>

      <TallyMarks
        total={exercise.sets}
        completedCount={completedCount}
        onMarkClick={handleMarkClick}
      />
    </div>
  )
}
