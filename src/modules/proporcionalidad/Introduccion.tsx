import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionProporcionalidad() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-red-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-red-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Proporcionalidad" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Introducción a la Proporcionalidad</h2>
            <p className="text-gray-600">
              La proporcionalidad es una relación entre magnitudes que mantienen una razón constante. 
              Es un concepto fundamental en matemáticas con múltiples aplicaciones prácticas.
            </p>
          </div>

          {/* Tarjetas de conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Proporcionalidad Directa</h3>
              <p className="text-gray-600 mb-3">
                En la proporcionalidad directa:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Si una magnitud aumenta, la otra también aumenta</li>
                <li>Si una magnitud disminuye, la otra también disminuye</li>
                <li>La razón entre ambas magnitudes es constante</li>
                <li>Se cumple: a/b = c/d → a·d = b·c (propiedad fundamental)</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Proporcionalidad Inversa</h3>
              <p className="text-gray-600 mb-3">
                En la proporcionalidad inversa:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Si una magnitud aumenta, la otra disminuye</li>
                <li>Si una magnitud disminuye, la otra aumenta</li>
                <li>El producto de ambas magnitudes es constante</li>
                <li>Se cumple: a·b = c·d (producto constante)</li>
              </ul>
            </Card>
          </div>

          {/* Ejemplos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ejemplos de proporcionalidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-red-50">
                <h4 className="font-medium text-gray-800 mb-2">Proporcionalidad Directa</h4>
                <p className="text-sm text-gray-700 mb-2">Si 3 kg de manzanas cuestan $15:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>6 kg costarán $30 (el doble)</li>
                  <li>1.5 kg costarán $7.50 (la mitad)</li>
                  <li>La constante de proporcionalidad es 5 (precio por kg)</li>
                </ul>
              </Card>
              <Card className="p-4 bg-blue-50">
                <h4 className="font-medium text-gray-800 mb-2">Proporcionalidad Inversa</h4>
                <p className="text-sm text-gray-700 mb-2">Si 4 obreros tardan 6 días en terminar una obra:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>8 obreros tardarán 3 días (el doble de obreros, la mitad de tiempo)</li>
                  <li>2 obreros tardarán 12 días (la mitad de obreros, el doble de tiempo)</li>
                  <li>La constante es 24 (obreros × días)</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Aplicaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Aplicaciones en la vida cotidiana</h3>
            <p className="text-gray-600 mb-4">
              La proporcionalidad se aplica en numerosas situaciones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-gray-700">Compras y precios</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">Recetas de cocina</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-gray-700">Escalas en mapas y planos</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">Velocidad, tiempo y distancia</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-700">Porcentajes y descuentos</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700">Repartos proporcionales</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/modulos/proporcionalidad/actividades")}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Calculator className="h-5 w-5" />
              <span>Ir a las actividades</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/modulos/proporcionalidad/regla-de-tres")}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Aprender sobre regla de tres</span>
            </Button>
          </div>

          {/* Recursos */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Guía de proporcionalidad</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Material complementario sobre proporcionalidad directa e inversa.
                  </p>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Calculadora de proporciones</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Herramienta para resolver problemas de proporcionalidad.
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
