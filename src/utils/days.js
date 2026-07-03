export const DAYS = [
  { key: 'sat', label: 'السبت', short: 'سبت' },
  { key: 'sun', label: 'الأحد', short: 'أحد' },
  { key: 'mon', label: 'الاثنين', short: 'اثنين' },
  { key: 'tue', label: 'الثلاثاء', short: 'ثلاثاء' },
  { key: 'wed', label: 'الأربعاء', short: 'أربعاء' },
  { key: 'thu', label: 'الخميس', short: 'خميس' },
  { key: 'fri', label: 'الجمعة', short: 'جمعة' },
]

const JS_DAY_TO_KEY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export function todayKey() {
  return JS_DAY_TO_KEY[new Date().getDay()]
}

export function createEmptyWeek() {
  return DAYS.reduce((acc, day) => {
    acc[day.key] = { exercises: [] }
    return acc
  }, {})
}

export function dayCompletion(day) {
  if (!day || !day.exercises || day.exercises.length === 0) return 0
  let total = 0
  let done = 0
  for (const ex of day.exercises) {
    total += ex.sets
    done += ex.completedSets.filter(Boolean).length
  }
  if (total === 0) return 0
  return Math.round((done / total) * 100)
}
