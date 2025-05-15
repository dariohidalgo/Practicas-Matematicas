import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionRacionales() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Números Racionales" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Introducción a los Números Racionales</h2>
            <p className="text-gray-600">
              Los números racionales son aquellos que pueden expresarse como el cociente de dos números enteros, 
              donde el denominador es distinto de cero. Se representan como fracciones (a/b) o como decimales.
            </p>
          </div>

          {/* Tarjetas de conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Características</h3>
              <p className="text-gray-600 mb-3">
                Los números racionales tienen propiedades importantes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Pueden expresarse como fracciones (a/b)</li>
                <li>Incluyen a todos los números enteros</li>
                <li>Pueden ser positivos, negativos o cero</li>
                <li>Pueden representarse como decimales finitos o periódicos</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Operaciones</h3>
              <p className="text-gray-600 mb-3">
                Con los números racionales podemos realizar:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Suma y resta de fracciones</li>
                <li>Multiplicación de fracciones</li>
                <li>División de fracciones</li>
                <li>Simplificación y amplificación</li>
              </ul>
            </Card>
          </div>

          {/* Ejemplos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ejemplos de números racionales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">1/2</p>
                <p className="text-sm text-gray-600">0.5</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">3/4</p>
                <p className="text-sm text-gray-600">0.75</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">-2/5</p>
                <p className="text-sm text-gray-600">-0.4</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">1/3</p>
                <p className="text-sm text-gray-600">0.333...</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">7/2</p>
                <p className="text-sm text-gray-600">3.5</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">5/1</p>
                <p className="text-sm text-gray-600">5</p>
              </div>
            </div>
          </div>

          {/* Aplicaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Aplicaciones en la vida cotidiana</h3>
            <p className="text-gray-600 mb-4">
              Los números racionales están presentes en muchas situaciones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">Recetas de cocina (1/2 taza de azúcar)</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">Medidas (3/4 de metro)</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-gray-700">Descuentos (25% = 1/4 del precio)</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700">Tiempo (3/4 de hora = 45 minutos)</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/modulos/numeros-racionales/actividades")}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Calculator className="h-5 w-5" />
              <span>Ir a las actividades</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/modulos/numeros-racionales/fracciones-equivalentes")}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Aprender sobre fracciones equivalentes</span>
            </Button>
          </div>

          {/* Recursos */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Guía de fracciones</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Material complementario sobre operaciones con fracciones.
                  </p>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Calculadora de fracciones</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Herramienta para practicar operaciones con números racionales.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
