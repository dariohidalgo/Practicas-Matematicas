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
  }
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
          const mergedProgress = {
            ...defaultProgress,
            ...data,
            activityProgress: {
              ...defaultProgress.activityProgress,
              ...(data.activityProgress || {})
            },
            moduleProgress: {
              ...defaultProgress.moduleProgress,
              ...(data.moduleProgress || {})
            }
          }
          
          // Agregar el alias 'activities' para compatibilidad con los componentes ListaActividades
          mergedProgress.activities = {
            geometria: mergedProgress.activityProgress.geometria,
            medida: mergedProgress.activityProgress.medida,
            numerosRacionales: mergedProgress.activityProgress.numerosRacionales
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
      
      const updatedProgress = {
        ...progress,
        activityProgress: {
          ...progress.activityProgress,
          [module]: {
            ...(progress.activityProgress[module] || {}),
            [activity]: activityProgress
          }
        }
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
