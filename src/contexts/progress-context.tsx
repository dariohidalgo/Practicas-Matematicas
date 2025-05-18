import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './auth-context';

interface ActivityProgress {
  completed: boolean;
  score: number;
}

interface ModuleProgress {
  [key: string]: number; // porcentaje de progreso por módulo
}

interface Progress {
  points: number;
  activityProgress: {
    [module: string]: {
      [activity: string]: ActivityProgress;
    };
  };
  moduleProgress: ModuleProgress;
  // Alias para compatibilidad con los componentes ListaActividades
  activities?: {
    geometria?: {
      [activity: string]: ActivityProgress;
    };
    medida?: {
      [activity: string]: ActivityProgress;
    };
    numerosRacionales?: {
      [activity: string]: ActivityProgress;
    };
    [module: string]: {
      [activity: string]: ActivityProgress;
    } | undefined;
  };
  // Nuevos campos para racha de actividad
  currentStreak: number;
  bestStreak: number;
  lastActivityDate?: string | null;
}

interface ProgressContextType {
  progress: Progress;
  loading: boolean;
  updateActivityProgress: (
    module: string,
    activity: string,
    progress: ActivityProgress
  ) => Promise<void>;
  updateModuleProgress: (module: string, progress: number) => Promise<void>;
  addPoints: (points: number) => Promise<void>;
  getActivityProgress: (module: string, activity: string) => Promise<ActivityProgress | null>;
  error: string | null;
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
  currentStreak: 0,
  bestStreak: 0
}

const ProgressContext = createContext<ProgressContextType>({
  progress: defaultProgress,
  loading: true,
  error: null,
  updateActivityProgress: async () => { },
  updateModuleProgress: async () => { },
  addPoints: async () => { },
  getActivityProgress: async () => null
});

export function useProgress() {
  return useContext(ProgressContext);
}

function recalcularModuleProgress(activityProgress: Progress["activityProgress"]): Progress["moduleProgress"] {
  const moduleProgress: Progress["moduleProgress"] = {};

  // Asegurarse de que todos los módulos estén incluidos
  const modules = [
    'numerosNaturales',
    'proporcionalidad',
    'geometria',
    'medida',
    'numerosRacionales'
  ];

  modules.forEach(moduleId => {
    const activities = activityProgress[moduleId] || {};
    const totalActivities = Object.keys(activities).length;
    const completedActivities = Object.values(activities).filter(a => a.completed).length;
    moduleProgress[moduleId] = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  });

  return moduleProgress;
}

// Función para calcular la racha de actividad
const calculateStreak = (lastActivityDate: string | null): { currentStreak: number; bestStreak: number } => {
  const today = new Date();
  let currentStreak = 0;
  let bestStreak = 0;

  if (lastActivityDate) {
    const lastActivity = new Date(lastActivityDate);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isYesterday =
      lastActivity.getDate() === yesterday.getDate() &&
      lastActivity.getMonth() === yesterday.getMonth() &&
      lastActivity.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      currentStreak = 1;
      bestStreak = 1;
    } else if (
      lastActivity.getDate() !== today.getDate() ||
      lastActivity.getMonth() !== today.getMonth() ||
      lastActivity.getFullYear() !== today.getFullYear()
    ) {
      currentStreak = 0;
    }
  } else {
    currentStreak = 0;
    bestStreak = 0;
  }

  return { currentStreak, bestStreak };
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      try {
        if (!user) {
          setProgress(defaultProgress);
          setLoading(false);
          return;
        }

        const docRef = doc(db, 'progress', user.uid);
        const docSnap = await getDoc(docRef);

        let data: Progress = defaultProgress;

        if (docSnap.exists()) {
          data = docSnap.data() as Progress;
        }

        // Fusionar los datos de Firebase con los valores por defecto
        const mergedProgress: Progress = {
          ...defaultProgress,
          points: data.points || 0,
          activityProgress: {
            ...defaultProgress.activityProgress,
            ...(data.activityProgress || {}),
          },
          moduleProgress: {
            ...defaultProgress.moduleProgress,
            ...(data.moduleProgress || {}),
          },
          currentStreak: data.currentStreak || 0,
          bestStreak: data.bestStreak || 0,
          lastActivityDate: data.lastActivityDate || null,
          activities: {
            ...defaultProgress.activities,
            ...(data.activities || {}),
          },
        };

        // Recalcular el progreso de los módulos
        mergedProgress.moduleProgress = recalcularModuleProgress(mergedProgress.activityProgress);

        // Calcular la racha de actividad
        const { currentStreak, bestStreak } = calculateStreak(mergedProgress.lastActivityDate || null);
        mergedProgress.currentStreak = currentStreak;
        mergedProgress.bestStreak = bestStreak;

        setProgress(mergedProgress);
      } catch (error) {
        console.error('Error al cargar el progreso:', error);
        setError('Error al cargar tu progreso.');
        setProgress(defaultProgress);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const updateActivityProgress = async (
    module: string,
    activity: string,
    activityProgress: ActivityProgress
  ) => {
    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    try {
      setError(null);
      const docRef = doc(db, 'progress', user.uid);

      // Obtener el documento actual de Firebase
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as Progress : defaultProgress;

      // Actualizar el progreso de la actividad
      const updatedActivityProgress = {
        ...currentData.activityProgress,
        [module]: {
          ...currentData.activityProgress[module],
          [activity]: activityProgress,
        },
      };

      // Recalcular el progreso del módulo
      const updatedModuleProgress = recalcularModuleProgress(updatedActivityProgress);

      // Calcular la racha de actividad
      const today = new Date();
      const lastActivityDate = currentData.lastActivityDate;
      let newCurrentStreak = currentData.currentStreak || 0;
      let newBestStreak = currentData.bestStreak || 0;

      if (lastActivityDate) {
        const lastActivity = new Date(lastActivityDate);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isYesterday =
          lastActivity.getDate() === yesterday.getDate() &&
          lastActivity.getMonth() === yesterday.getMonth() &&
          lastActivity.getFullYear() === yesterday.getFullYear();

        if (isYesterday) {
          newCurrentStreak++;
          newBestStreak = Math.max(newCurrentStreak, newBestStreak);
        } else if (
          lastActivity.getDate() !== today.getDate() ||
          lastActivity.getMonth() !== today.getMonth() ||
          lastActivity.getFullYear() !== today.getFullYear()
        ) {
          newCurrentStreak = 0;
        }
      } else {
        newCurrentStreak = 0;
        newBestStreak = 0;
      }

      const updatedProgress = {
        ...defaultProgress,
        points: currentData.points || 0,
        activityProgress: updatedActivityProgress,
        moduleProgress: updatedModuleProgress,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        lastActivityDate: today.toISOString(),
        activities: {
          ...defaultProgress.activities,
          [module]: {
            ...(defaultProgress.activities?.[module] || {}),
            [activity]: activityProgress,
          },
        },
      };

      console.log("updateActivityProgress - updatedProgress:", updatedProgress);

      // Actualizar en Firebase
      await updateDoc(docRef, {
        activityProgress: updatedActivityProgress,
        moduleProgress: updatedModuleProgress,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        lastActivityDate: today.toISOString(),
        points: currentData.points || 0,
        activities: {
          ...currentData.activities,
          [module]: {
            ...(currentData.activities?.[module] || {}),
            [activity]: activityProgress,
          },
        },
      });

      // Actualizar el estado local
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error al actualizar el progreso:', error);
      setError('Error al actualizar el progreso.');
      throw error;
    }
  };

  const updateModuleProgress = async (module: string, moduleProgress: number) => {
    if (!user) return;

    try {
      setError(null);
      const docRef = doc(db, 'progress', user.uid);
      const updatedProgress = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [module]: moduleProgress
        }
      };

      await updateDoc(docRef, updatedProgress);
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error al actualizar el progreso:', error);
      setError('Error al actualizar el progreso.');
      throw error;
    }
  };

  const addPoints = async (points: number) => {
    if (!user) return;

    try {
      setError(null);
      const docRef = doc(db, 'progress', user.uid);
      
      // Obtener el documento actual de Firebase
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as Progress : defaultProgress;
      
      const updatedProgress = {
        ...currentData,
        points: (currentData.points || 0) + points
      }

      // Actualizar en Firebase
      await updateDoc(docRef, updatedProgress);
      
      // Actualizar el estado local
      setProgress(updatedProgress)
    } catch (error) {
      console.error('Error al agregar puntos:', error)
      setError('Error al actualizar los puntos.')
      throw error
    }
  };

  const getActivityProgress = async (module: string, activity: string): Promise<ActivityProgress | null> => {
    if (!user) return null;
    
    try {
      const docRef = doc(db, 'progress', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as Progress;
        return data.activityProgress[module]?.[activity] || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener el progreso de la actividad:', error);
      return null;
    }
  };

  const value = {
    progress,
    loading,
    updateActivityProgress,
    updateModuleProgress,
    addPoints,
    getActivityProgress,
    error
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
