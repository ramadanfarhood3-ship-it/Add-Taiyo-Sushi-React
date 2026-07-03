import { SkipForward, Plus } from 'lucide-react'

export default function RestTimerBar({ exerciseName, remaining, total, onAddTime, onSkip }) {
  const size = 64
  const stroke = 5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = total > 0 ? remaining / total : 0
  const offset = circumference - percent * circumference

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const timeLabel = `${minutes}:${String(seconds).padStart(2, '0')}`

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-fitx-surface/97 backdrop-blur border-t border-fitx-primary/40 safe-bottom animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="none" className="text-fitx-border" />
            <circle
              cx={size / 2} cy={size / 2} r={radius}
              stroke="currentColor" strokeWidth={stroke} fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-fitx-primary transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="absolute text-sm font-mono font-bold text-fitx-text">{timeLabel}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-fitx-muted mb-0.5">وقت الراحة</p>
          <p className="font-bold text-fitx-text truncate">{exerciseName}</p>
        </div>

        <button
          onClick={onAddTime}
          className="flex-shrink-0 flex items-center gap-1 bg-fitx-card2 text-fitx-text font-semibold text-sm px-3 py-2 rounded-xl active:scale-95 transition-transform"
        >
          <Plus size={14} />
          15 ث
        </button>

        <button
          onClick={onSkip}
          className="flex-shrink-0 flex items-center gap-1 bg-fitx-primary text-white font-semibold text-sm px-3 py-2 rounded-xl active:scale-95 transition-transform"
        >
          تخطي
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  )
}
