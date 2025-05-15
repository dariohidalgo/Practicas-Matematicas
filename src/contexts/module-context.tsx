import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useProgress } from './progress-context'

interface Activity {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
}

interface ModuleContextType {
  activities: Activity[]
  currentActivity: number
  setCurrentActivity: (index: number) => void
  completeActivity: (activityId: string) => void
  moduleProgress: number
  earnedPoints: number
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined)

interface ModuleProviderProps {
  children: ReactNode
  moduleId: string
  activities: Omit<Activity, 'completed'>[]
}

export function ModuleProvider({ children, moduleId, activities: initialActivities }: ModuleProviderProps) {
  const { progress, updateActivityProgress, updateModuleProgress } = useProgress()
  const [activities, setActivities] = useState<Activity[]>(() =>
    initialActivities.map(activity => ({
      ...activity,
      completed: Boolean(progress.activityProgress[activity.id])
    }))
  )
  const [currentActivity, setCurrentActivity] = useState(1)

  const moduleProgress = Math.round(
    (activities.filter(a => a.completed).length / activities.length) * 100
  )

  const earnedPoints = activities
    .filter(a => a.completed)
    .reduce((sum, activity) => sum + activity.points, 0)

  const completeActivity = async (activityId: string) => {
    // Actualizar el estado local
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, completed: true }
          : activity
      )
    )

    // Actualizar el progreso en el contexto de progreso
    await updateActivityProgress(activityId, true)
    await updateModuleProgress(moduleId, moduleProgress)
  }

  return (
    <ModuleContext.Provider
      value={{
        activities,
        currentActivity,
        setCurrentActivity,
        completeActivity,
        moduleProgress,
        earnedPoints
      }}
    >
      {children}
    </ModuleContext.Provider>
  )
}

export function useModule() {
  const context = useContext(ModuleContext)
  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider')
  }
  return context
}
