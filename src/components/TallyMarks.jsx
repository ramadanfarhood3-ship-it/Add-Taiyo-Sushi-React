const MARK_W = 14
const GROUP_W = 4 * MARK_W

function TallyGroup({ size, filled, baseIndex, onMarkClick }) {
  const width = size >= 5 ? GROUP_W : size * MARK_W
  const marks = []

  for (let i = 0; i < Math.min(size, 4); i++) {
    const x = 6 + i * MARK_W
    const isFilled = i < filled
    marks.push(
      <line
        key={`v${i}`}
        x1={x} y1={4} x2={x} y2={26}
        strokeWidth={3}
        strokeLinecap="round"
        className={isFilled ? 'stroke-fitx-primary' : 'stroke-fitx-border'}
      />
    )
  }

  if (size === 5) {
    const isFilled = filled >= 5
    marks.push(
      <line
        key="diag"
        x1={2} y1={27} x2={GROUP_W - 4} y2={3}
        strokeWidth={3}
        strokeLinecap="round"
        className={isFilled ? 'stroke-fitx-accent' : 'stroke-fitx-border'}
      />
    )
  }

  const hitAreas = []
  for (let i = 0; i < size; i++) {
    const x = i < 4 ? i * MARK_W : 0
    const w = i < 4 ? MARK_W : GROUP_W
    hitAreas.push(
      <rect
        key={`hit${i}`}
        x={x} y={0} width={w} height={30}
        fill="transparent"
        className="cursor-pointer"
        onClick={() => onMarkClick(baseIndex + i)}
      />
    )
  }

  return (
    <svg width={width} height={30} className="overflow-visible">
      {marks}
      {hitAreas}
    </svg>
  )
}

export default function TallyMarks({ total, completedCount, onMarkClick }) {
  const groups = []
  let remaining = total
  let baseIndex = 0
  while (remaining > 0) {
    const size = Math.min(5, remaining)
    groups.push({ size, baseIndex })
    remaining -= size
    baseIndex += size
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {groups.map((g) => (
        <TallyGroup
          key={g.baseIndex}
          size={g.size}
          baseIndex={g.baseIndex}
          filled={Math.max(0, Math.min(g.size, completedCount - g.baseIndex))}
          onMarkClick={onMarkClick}
        />
      ))}
    </div>
  )
}
