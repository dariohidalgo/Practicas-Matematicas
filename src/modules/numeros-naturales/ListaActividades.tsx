import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useProgress } from '../../contexts/progress-context'
import { useAuth } from '../../contexts/auth-context'
import { useEffect } from 'react'
import ModuleHeader from '../../components/ModuleHeader'

const actividades = [
  {
    id: 'actividad-1',
    titulo: 'Operaciones básicas',
    descripcion: 'Aprende a realizar las operaciones básicas con números naturales: suma, resta, multiplicación y división.',
    puntos: 50,
    path: '/modulos/numeros-naturales/actividad-1'
  },
  {
    id: 'actividad-2',
    titulo: 'Orden de operaciones',
    descripcion: 'Descubre cómo aplicar correctamente el orden de operaciones en expresiones matemáticas.',
    puntos: 50,
    path: '/modulos/numeros-naturales/actividad-2'
  },
  {
    id: 'actividad-3',
    titulo: 'División con cociente y resto',
    descripcion: 'Aprende a realizar divisiones y a identificar el cociente y el resto.',
    puntos: 50,
    path: '/modulos/numeros-naturales/actividad-3'
  }
]

export default function ListaActividades() {
  const navigate = useNavigate()
  const { progress, loading: progressLoading } = useProgress()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  if (authLoading || progressLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Obtener el progreso del módulo de números naturales
  const activityProgress = progress?.activityProgress?.numerosNaturales || {}
  
  // Función para obtener el estado de una actividad
  const getActivityStatus = (activityId: string) => {
    const activity = activityProgress?.[activityId]
    if (!activity) return { completed: false, score: 0 }
    return {
      completed: activity.completed || false,
      score: activity.score || 0
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Números Naturales" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Actividades</h2>
            <p className="text-gray-600">
              Completa las siguientes actividades para aprender sobre los números naturales y sus operaciones.
            </p>
          </div>

          <div className="space-y-4">
            {actividades.map((actividad) => {
              const status = getActivityStatus(actividad.id)
              
              return (
                <Card key={actividad.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {actividad.titulo}
                          {status.completed && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completado
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 mb-4">{actividad.descripcion}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {actividad.puntos} puntos
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate(actividad.path)}
                        className={status.completed ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {status.completed ? "Repetir" : "Comenzar"}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-8">
            <Link to="/modulos/numeros-naturales">
              <Button variant="outline" className="w-full">
                Volver a la introducción
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
