import { DAYS, dayCompletion } from '../utils/days'

function DayRing({ percent, active }) {
  const size = 40
  const stroke = 3.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
        className="text-fitx-border"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={percent >= 100 ? 'text-fitx-accent transition-all duration-500' : 'text-fitx-primary transition-all duration-500'}
      />
    </svg>
  )
}

export default function WeekBar({ activeDay, onSelectDay, weekData, todayKey }) {
  return (
    <div className="sticky top-0 z-30 bg-fitx-surface/95 backdrop-blur border-b border-fitx-border safe-top">
      <div className="flex justify-between gap-1 px-2 py-3 overflow-x-auto scrollbar-hide">
        {DAYS.map((day) => {
          const percent = dayCompletion(weekData[day.key])
          const isActive = activeDay === day.key
          const isToday = todayKey === day.key
          return (
            <button
              key={day.key}
              onClick={() => onSelectDay(day.key)}
              className={`flex flex-col items-center gap-1 min-w-[46px] py-1 px-1 rounded-xl transition-colors ${
                isActive ? 'bg-fitx-card' : ''
              }`}
            >
              <div className="relative flex items-center justify-center">
                <DayRing percent={percent} active={isActive} />
                <span
                  className={`absolute text-[11px] font-mono font-semibold ${
                    isActive ? 'text-fitx-text' : 'text-fitx-muted'
                  }`}
                >
                  {percent}
                </span>
              </div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isActive ? 'text-fitx-primary' : 'text-fitx-muted'
                }`}
              >
                {day.short}
              </span>
              {isToday && <span className="w-1 h-1 rounded-full bg-fitx-accent" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
