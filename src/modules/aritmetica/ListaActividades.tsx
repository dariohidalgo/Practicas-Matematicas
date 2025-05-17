import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'
import { useProgress } from '../../contexts/progress-context'

export default function ListaActividadesAritmetica() {
  const { user, loading: authLoading } = useAuth()
  const { progress } = useProgress()
  const navigate = useNavigate()
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const actividades = [
    {
      id: 'actividad-1',
      titulo: 'Operaciones con números naturales',
      descripcion: 'Practica sumas, restas, multiplicaciones y divisiones con números naturales.',
      path: '/modulos/aritmetica/actividad-1'
    },
    {
      id: 'actividad-2',
      titulo: 'Divisibilidad',
      descripcion: 'Aprende a aplicar los criterios de divisibilidad y a identificar números primos.',
      path: '/modulos/aritmetica/actividad-2'
    },
    {
      id: 'actividad-3',
      titulo: 'MCD y MCM',
      descripcion: 'Calcula el máximo común divisor y el mínimo común múltiplo de varios números.',
      path: '/modulos/aritmetica/actividad-3'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Actividades de Aritmética" backPath="/modulos/aritmetica" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Actividades</h2>
            <p className="text-gray-600 mb-6">
              Selecciona una actividad para comenzar a practicar tus habilidades en aritmética.
            </p>
            
            <div className="space-y-4">
              {actividades.map((actividad) => {
                const isCompleted = progress?.activityProgress?.aritmetica?.[actividad.id]?.completed || false
                return (
                  <Card key={actividad.id} className="p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800">{actividad.titulo}</h3>
                        <p className="text-sm text-gray-600 mt-1">{actividad.descripcion}</p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded text-white font-semibold ${isCompleted ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                        onClick={() => navigate(actividad.path)}
                      >
                        {isCompleted ? 'Repetir' : 'Comenzar'}
                      </button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={() => navigate("/modulos/aritmetica")}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver a Aritmética
            </button>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate("/modulos/aritmetica/guia-numeros-naturales")}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ver guía de estudio
              </button>
              <button 
                onClick={() => navigate("/modulos/aritmetica/calculadora-interactiva")}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Usar calculadora
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
