import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function ListaActividadesAritmetica() {
  const { user, loading: authLoading } = useAuth()
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
              <Card 
                className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => navigate('/modulos/aritmetica/actividad-1')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Actividad 1: Operaciones con números naturales</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Practica sumas, restas, multiplicaciones y divisiones con números naturales.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
              
              <Card 
                className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => navigate('/modulos/aritmetica/actividad-2')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Actividad 2: Divisibilidad</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Aprende a aplicar los criterios de divisibilidad y a identificar números primos.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
              
              <Card 
                className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => navigate('/modulos/aritmetica/actividad-3')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Actividad 3: MCD y MCM</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Calcula el máximo común divisor y el mínimo común múltiplo de varios números.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
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
