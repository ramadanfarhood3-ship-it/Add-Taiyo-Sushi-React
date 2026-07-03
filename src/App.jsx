import { useState, useEffect, useMemo } from 'react'
import { Flame, Plus, ListX } from 'lucide-react'
import WeekBar from './components/WeekBar'
import ExerciseCard from './components/ExerciseCard'
import AddExerciseForm from './components/AddExerciseForm'
import RestTimerBar from './components/RestTimerBar'
import ConfirmDialog from './components/ConfirmDialog'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DAYS, createEmptyWeek, todayKey, dayCompletion } from './utils/days'
import { playTimerEndSound } from './utils/sound'

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function App() {
  const [weekData, setWeekData] = useLocalStorage('fitx-week-data', createEmptyWeek())
  const [activeDay, setActiveDay] = useState(todayKey())
  const [showAddForm, setShowAddForm] = useState(false)
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false)
  const [deleteExerciseId, setDeleteExerciseId] = useState(null)
  const [restTimer, setRestTimer] = useState(null)

  const currentDay = weekData[activeDay] || { exercises: [] }
  const dayLabel = DAYS.find((d) => d.key === activeDay)?.label
  const percent = useMemo(() => dayCompletion(currentDay), [currentDay])

  useEffect(() => {
    if (!restTimer) return
    if (restTimer.remaining <= 0) {
      playTimerEndSound()
      setRestTimer(null)
      return
    }
    const id = setTimeout(() => {
      setRestTimer((prev) => (prev ? { ...prev, remaining: prev.remaining - 1 } : null))
    }, 1000)
    return () => clearTimeout(id)
  }, [restTimer])

  const updateDay = (dayKey, updater) => {
    setWeekData((prev) => ({
      ...prev,
      [dayKey]: updater(prev[dayKey] || { exercises: [] }),
    }))
  }

  const handleAddExercise = (data) => {
    const newExercise = {
      id: makeId(),
      ...data,
      completedSets: Array(data.sets).fill(false),
    }
    updateDay(activeDay, (day) => ({ ...day, exercises: [...day.exercises, newExercise] }))
    setShowAddForm(false)
  }

  const handleToggleSet = (exercise, index, setToTrue) => {
    updateDay(activeDay, (day) => ({
      ...day,
      exercises: day.exercises.map((ex) => {
        if (ex.id !== exercise.id) return ex
        const completedSets = [...ex.completedSets]
        completedSets[index] = setToTrue
        return { ...ex, completedSets }
      }),
    }))

    const isLastSet = index === exercise.sets - 1
    if (setToTrue && !isLastSet) {
      setRestTimer({
        id: makeId(),
        exerciseName: exercise.name,
        total: exercise.restSeconds,
        remaining: exercise.restSeconds,
      })
    }
  }

  const handleUpdateWeight = (exerciseId, weight) => {
    updateDay(activeDay, (day) => ({
      ...day,
      exercises: day.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, weight } : ex)),
    }))
  }

  const handleDeleteExercise = () => {
    updateDay(activeDay, (day) => ({
      ...day,
      exercises: day.exercises.filter((ex) => ex.id !== deleteExerciseId),
    }))
    setDeleteExerciseId(null)
  }

  const handleDeleteAll = () => {
    updateDay(activeDay, (day) => ({ ...day, exercises: [] }))
    setConfirmDeleteAll(false)
  }

  return (
    <div className="min-h-screen bg-fitx-bg pb-24">
      <header className="px-4 pt-5 pb-2 flex items-center gap-2">
        <Flame size={22} className="text-fitx-primary" />
        <h1 className="text-xl font-extrabold text-fitx-text tracking-tight">FitX</h1>
      </header>

      <WeekBar
        activeDay={activeDay}
        onSelectDay={setActiveDay}
        weekData={weekData}
        todayKey={todayKey()}
      />

      <main className="max-w-md mx-auto px-4 pt-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-fitx-text">{dayLabel}</h2>
            <p className="text-sm text-fitx-muted font-mono">
              {percent}% إنجاز · {currentDay.exercises.length} تمارين
            </p>
          </div>
          {currentDay.exercises.length > 0 && (
            <button
              onClick={() => setConfirmDeleteAll(true)}
              className="flex items-center gap-1 text-fitx-muted hover:text-fitx-danger text-xs font-semibold px-2 py-1.5 transition-colors"
            >
              <ListX size={15} />
              حذف الكل
            </button>
          )}
        </div>

        {showAddForm && (
          <AddExerciseForm onAdd={handleAddExercise} onClose={() => setShowAddForm(false)} />
        )}

        {currentDay.exercises.length === 0 && !showAddForm && (
          <div className="text-center py-16 text-fitx-muted">
            <Flame size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">لا توجد تمارين لهذا اليوم</p>
            <p className="text-sm mt-1">اضغط على الزر أدناه لإضافة أول تمرين</p>
          </div>
        )}

        {currentDay.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onToggleSet={(index, setToTrue) => handleToggleSet(exercise, index, setToTrue)}
            onUpdateWeight={(weight) => handleUpdateWeight(exercise.id, weight)}
            onDelete={() => setDeleteExerciseId(exercise.id)}
          />
        ))}

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-fitx-border text-fitx-muted font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform mt-2"
          >
            <Plus size={18} />
            إضافة تمرين
          </button>
        )}
      </main>

      {restTimer && (
        <RestTimerBar
          exerciseName={restTimer.exerciseName}
          remaining={restTimer.remaining}
          total={restTimer.total}
          onAddTime={() =>
            setRestTimer((prev) =>
              prev ? { ...prev, remaining: prev.remaining + 15, total: prev.total + 15 } : null
            )
          }
          onSkip={() => setRestTimer(null)}
        />
      )}

      <ConfirmDialog
        open={confirmDeleteAll}
        title="حذف كل التمارين؟"
        message={`سيتم حذف جميع تمارين يوم ${dayLabel} نهائياً. لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={handleDeleteAll}
        onCancel={() => setConfirmDeleteAll(false)}
      />

      <ConfirmDialog
        open={Boolean(deleteExerciseId)}
        title="حذف التمرين؟"
        message="سيتم حذف هذا التمرين وكل بياناته نهائياً."
        onConfirm={handleDeleteExercise}
        onCancel={() => setDeleteExerciseId(null)}
      />
    </div>
  )
}
