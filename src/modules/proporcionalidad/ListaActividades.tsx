import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/card'
import { useProgress } from '../../contexts/progress-context'
import { useAuth } from '../../contexts/auth-context'
import { useEffect } from 'react'
import ModuleHeader from '../../components/ModuleHeader'

const actividades = [
  {
    id: 'actividad-1',
    titulo: 'Descuentos y porcentajes',
    descripcion: 'Aprende a calcular el precio final de un producto después de aplicar un descuento porcentual.',
    puntos: 50,
    path: '/modulos/proporcionalidad/actividad-1'
  },
  {
    id: 'actividad-2',
    titulo: 'Regla de tres simple',
    descripcion: 'Aplica la proporcionalidad directa para calcular el consumo de combustible en diferentes distancias.',
    puntos: 50,
    path: '/modulos/proporcionalidad/actividad-2'
  },
  {
    id: 'actividad-3',
    titulo: 'Proporcionalidad inversa',
    descripcion: 'Resuelve problemas de proporcionalidad inversa con trabajadores y tiempo de construcción.',
    puntos: 50,
    path: '/modulos/proporcionalidad/actividad-3'
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <ModuleHeader title="Actividades de Proporcionalidad" backPath="/modulos/proporcionalidad" />
      <div className="container mx-auto px-4 py-8">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {actividades.map((actividad) => {
            const isCompleted = progress?.activityProgress?.['proporcionalidad']?.[actividad.id]?.completed || false
            const score = progress?.activityProgress?.['proporcionalidad']?.[actividad.id]?.score || 0

            return (
              <Card
                key={actividad.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(actividad.path)}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{actividad.titulo}</h3>
                <p className="text-gray-600 mb-4">{actividad.descripcion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">
                    {actividad.puntos} puntos
                  </span>
                  {isCompleted ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">{score}%</span>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
