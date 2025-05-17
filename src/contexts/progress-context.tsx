import React, { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './auth-context'

interface ActivityProgress {
  completed: boolean
  score: number
}

interface ModuleProgress {
  [key: string]: number // porcentaje de progreso por módulo
}

interface Progress {
  points: number
  activityProgress: {
    [module: string]: {
      [activity: string]: ActivityProgress
    }
  }
  moduleProgress: ModuleProgress
  // Alias para compatibilidad con los componentes ListaActividades
  activities?: {
    geometria?: {
      [activity: string]: ActivityProgress
    }
    medida?: {
      [activity: string]: ActivityProgress
    }
    numerosRacionales?: {
      [activity: string]: ActivityProgress
    }
    [module: string]: {
      [activity: string]: ActivityProgress
    } | undefined
  }
  // Nuevos campos para racha de actividad
  currentStreak: number
  bestStreak: number
  lastActivityDate?: string | Date | null
}

interface ProgressContextType {
  progress: Progress
  loading: boolean
  updateActivityProgress: (
    module: string,
    activity: string,
    progress: ActivityProgress
  ) => Promise<void>
  updateModuleProgress: (module: string, progress: number) => Promise<void>
  addPoints: (points: number) => Promise<void>
  error: string | null
}

const defaultProgress: Progress = {
  points: 0,
  activityProgress: {
    proporcionalidad: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    numerosNaturales: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    geometria: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    medida: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    numerosRacionales: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    }
  },
  moduleProgress: {
    numerosNaturales: 0,
    proporcionalidad: 0,
    geometria: 0,
    medida: 0,
    numerosRacionales: 0
  },
  // Alias para compatibilidad con los componentes ListaActividades
  activities: {
    geometria: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    medida: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    },
    numerosRacionales: {
      'actividad-1': { completed: false, score: 0 },
      'actividad-2': { completed: false, score: 0 },
      'actividad-3': { completed: false, score: 0 }
    }
  },
  // Inicializar campos de racha
  currentStreak: 0,
  bestStreak: 0
}

const ProgressContext = createContext<ProgressContextType>({
  progress: defaultProgress,
  loading: true,
  error: null,
  updateActivityProgress: async () => {},
  updateModuleProgress: async () => {},
  addPoints: async () => {}
})

export function useProgress() {
  return useContext(ProgressContext)
}

function recalcularModuleProgress(activityProgress: Progress["activityProgress"]): Progress["moduleProgress"] {
  const moduleProgress: Progress["moduleProgress"] = {}
  Object.keys(activityProgress).forEach(moduleId => {
    const activities = activityProgress[moduleId] || {}
    const totalActivities = Object.keys(activities).length
    const completedActivities = Object.values(activities).filter(a => a.completed).length
    moduleProgress[moduleId] = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0
  })
  return moduleProgress
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Progress>(defaultProgress)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true)
      try {
        if (!user) {
          setProgress(defaultProgress)
          setLoading(false)
          return
        }

        const docRef = doc(db, 'progress', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as Progress
          // Asegurar que todos los campos existan
          const mergedProgress: Progress = {
            ...defaultProgress,
            ...data,
            activityProgress: {
              ...defaultProgress.activityProgress,
              ...(data.activityProgress || {})
            },
            // Recalcular el progreso de cada módulo
            moduleProgress: recalcularModuleProgress({
              ...defaultProgress.activityProgress,
              ...(data.activityProgress || {})
            }),
            // Asegurar campos de racha
            currentStreak: data.currentStreak || 0,
            bestStreak: data.bestStreak || 0,
            lastActivityDate: data.lastActivityDate 
              ? (typeof data.lastActivityDate === 'string' 
                ? data.lastActivityDate 
                : data.lastActivityDate instanceof Date 
                  ? data.lastActivityDate.toISOString() 
                  : new Date(data.lastActivityDate).toISOString())
              : undefined,
            // Agregar el alias 'activities' para compatibilidad con los componentes ListaActividades
            activities: {
              geometria: data.activityProgress?.geometria || defaultProgress.activityProgress.geometria,
              medida: data.activityProgress?.medida || defaultProgress.activityProgress.medida,
              numerosRacionales: data.activityProgress?.numerosRacionales || defaultProgress.activityProgress.numerosRacionales
            }
          }
       
          setProgress(mergedProgress)
          setLoading(false)
        } else {
          await setDoc(docRef, defaultProgress)
          setProgress(defaultProgress)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al cargar el progreso:', error)
        setError('Error al cargar tu progreso.')
        // En caso de error, usar el progreso por defecto
        setProgress(defaultProgress)
        setLoading(false)
      }
    }

    loadProgress()
  }, [user])

  const updateActivityProgress = async (
    module: string,
    activity: string,
    activityProgress: ActivityProgress
  ) => {
    if (!user) {
      console.error('No hay usuario autenticado')
      return
    }

    try {
      setError(null)
      const docRef = doc(db, 'progress', user.uid)
      
      // Calcular la racha de actividad
      const today = new Date()
      const lastActivityDate = progress.lastActivityDate 
        ? new Date(progress.lastActivityDate) 
        : null
      
      let newCurrentStreak = progress.currentStreak
      let newBestStreak = progress.bestStreak
      
      // Verificar si la última actividad fue ayer
      if (lastActivityDate) {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        
        const isYesterday = 
          lastActivityDate.getDate() === yesterday.getDate() &&
          lastActivityDate.getMonth() === yesterday.getMonth() &&
          lastActivityDate.getFullYear() === yesterday.getFullYear()
        
        // Si la última actividad fue ayer, incrementar la racha
        if (isYesterday) {
          newCurrentStreak++
          newBestStreak = Math.max(newCurrentStreak, newBestStreak)
        } 
        // Si no es ayer, reiniciar la racha
        else if (
          lastActivityDate.getDate() !== today.getDate() ||
          lastActivityDate.getMonth() !== today.getMonth() ||
          lastActivityDate.getFullYear() !== today.getFullYear()
        ) {
          newCurrentStreak = 1
        }
      } else {
        // Primera actividad
        newCurrentStreak = 1
      }

      // Calcular el progreso del módulo
      const activities = progress.activityProgress[module] || {}
      const totalActivities = Object.keys(activities).length
      const completedActivities = Object.values(activities).filter(a => a.completed).length
      const moduleProgress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0

      const updatedProgress = {
        ...progress,
        activityProgress: {
          ...progress.activityProgress,
          [module]: {
            ...progress.activityProgress[module],
            [activity]: activityProgress
          }
        },
        moduleProgress: {
          ...progress.moduleProgress,
          [module]: moduleProgress
        },
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        lastActivityDate: today.toISOString() // Convertir a cadena para Firestore
      }
      
      // Actualizar también el alias 'activities' para mantener la consistencia
      if (module === 'geometria' || module === 'medida' || module === 'numerosRacionales') {
        updatedProgress.activities = {
          ...progress.activities,
          [module]: {
            ...(progress.activities?.[module] || {}),
            [activity]: activityProgress
          }
        }
      }

      await updateDoc(docRef, updatedProgress)
      setProgress(updatedProgress)
    } catch (error) {
      console.error('Error al actualizar el progreso:', error)
      setError('Error al actualizar el progreso.')
      throw error
    }
  }

  const updateModuleProgress = async (module: string, moduleProgress: number) => {
    if (!user) return

    try {
      setError(null)
      const docRef = doc(db, 'progress', user.uid)
      const updatedProgress = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [module]: moduleProgress
        }
      }

      await updateDoc(docRef, updatedProgress)
      setProgress(updatedProgress)
    } catch (error) {
      console.error('Error al actualizar el progreso:', error)
      setError('Error al actualizar el progreso.')
      throw error
    }
  }

  const addPoints = async (points: number) => {
    if (!user) return

    try {
      setError(null)
      const docRef = doc(db, 'progress', user.uid)
      const updatedProgress = {
        ...progress,
        points: progress.points + points
      }

      await updateDoc(docRef, updatedProgress)
      setProgress(updatedProgress)
    } catch (error) {
      console.error('Error al agregar puntos:', error)
      setError('Error al actualizar los puntos.')
      throw error
    }
  }

  const value = {
    progress,
    loading,
    updateActivityProgress,
    updateModuleProgress,
    addPoints,
    error
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}
