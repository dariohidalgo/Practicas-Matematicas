import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionGeometria() {
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
      <ModuleHeader title="Geometría" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Introducción a la Geometría</h2>
            <p className="text-gray-600">
              La geometría es la rama de las matemáticas que estudia las propiedades y relaciones de figuras en el espacio.
              Nos permite entender y describir el mundo que nos rodea a través de formas, tamaños y posiciones.
            </p>
          </div>

          {/* Tarjetas de conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Figuras Planas</h3>
              <p className="text-gray-600 mb-3">
                Las figuras planas son formas bidimensionales con características específicas:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Triángulos: 3 lados y 3 ángulos</li>
                <li>Cuadriláteros: 4 lados y 4 ángulos</li>
                <li>Círculos: puntos equidistantes de un centro</li>
                <li>Polígonos regulares e irregulares</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Medidas Geométricas</h3>
              <p className="text-gray-600 mb-3">
                En geometría calculamos diferentes medidas:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Perímetro: suma de las longitudes de los lados</li>
                <li>Área: espacio interior de una figura plana</li>
                <li>Volumen: espacio ocupado por un cuerpo tridimensional</li>
                <li>Ángulos: medida de la apertura entre dos semirrectas</li>
              </ul>
            </Card>
          </div>

          {/* Ejemplos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Figuras geométricas comunes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Triángulo</p>
                <p className="text-sm text-gray-600">A = (b × h) ÷ 2</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Cuadrado</p>
                <p className="text-sm text-gray-600">A = lado²</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Rectángulo</p>
                <p className="text-sm text-gray-600">A = base × altura</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Círculo</p>
                <p className="text-sm text-gray-600">A = π × r²</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Paralelogramo</p>
                <p className="text-sm text-gray-600">A = base × altura</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-gray-700 font-medium">Trapecio</p>
                <p className="text-sm text-gray-600">A = (B + b) × h ÷ 2</p>
              </div>
            </div>
          </div>

          {/* Aplicaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Aplicaciones en la vida cotidiana</h3>
            <p className="text-gray-600 mb-4">
              La geometría está presente en muchos aspectos de nuestra vida:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">Arquitectura y construcción</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">Diseño y arte</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-700">Navegación y cartografía</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700">Tecnología y computación</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/modulos/geometria/actividades")}
              className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700"
            >
              <Calculator className="h-5 w-5" />
              <span>Ir a las actividades</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/modulos/geometria/aprende-triangulos")}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Aprender sobre triángulos</span>
            </Button>
          </div>

          {/* Recursos */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="p-4 bg-white shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/modulos/geometria/guia-figuras')}
              >
                <BookOpen className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Guía de figuras geométricas</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Material complementario sobre figuras planas y sus propiedades.
                  </p>
                  <span className="text-sm text-yellow-600 mt-2 inline-block hover:underline">Ver guía</span>
                </div>
              </Card>
              <Card 
                className="p-4 bg-white shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/modulos/geometria/calculadora-areas')}
              >
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Calculadora de áreas</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Herramienta para calcular áreas y perímetros de figuras geométricas.
                  </p>
                  <span className="text-sm text-blue-600 mt-2 inline-block hover:underline">Usar calculadora</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
