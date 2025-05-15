import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionMedida() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Medida" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Introducción a la Medida</h2>
            <p className="text-gray-600">
              La medida es el proceso de asignar un valor numérico a propiedades físicas como longitud, 
              masa, tiempo, temperatura, etc. Es fundamental para comprender y describir el mundo que nos rodea.
            </p>
          </div>

          {/* Tarjetas de conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Unidades de Longitud</h3>
              <p className="text-gray-600 mb-3">
                Las unidades de longitud miden distancias:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Kilómetro (km): 1000 metros</li>
                <li>Metro (m): unidad básica</li>
                <li>Centímetro (cm): 0.01 metros</li>
                <li>Milímetro (mm): 0.001 metros</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Unidades de Masa</h3>
              <p className="text-gray-600 mb-3">
                Las unidades de masa miden la cantidad de materia:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Tonelada (t): 1000 kilogramos</li>
                <li>Kilogramo (kg): unidad básica</li>
                <li>Gramo (g): 0.001 kilogramos</li>
                <li>Miligramo (mg): 0.000001 kilogramos</li>
              </ul>
            </Card>
          </div>

          {/* Más unidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Unidades de Capacidad</h3>
              <p className="text-gray-600 mb-3">
                Las unidades de capacidad miden volúmenes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Kilolitro (kl): 1000 litros</li>
                <li>Litro (l): unidad básica</li>
                <li>Centilitro (cl): 0.01 litros</li>
                <li>Mililitro (ml): 0.001 litros</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Unidades de Tiempo</h3>
              <p className="text-gray-600 mb-3">
                Las unidades de tiempo miden duración:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Año: 365 días (366 en año bisiesto)</li>
                <li>Mes: aproximadamente 30 días</li>
                <li>Día: 24 horas</li>
                <li>Hora: 60 minutos</li>
                <li>Minuto: 60 segundos</li>
                <li>Segundo: unidad básica</li>
              </ul>
            </Card>
          </div>

          {/* Conversiones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Conversiones entre unidades</h3>
            <p className="text-gray-600 mb-4">
              Para convertir entre unidades del mismo sistema, multiplicamos o dividimos por potencias de 10:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 bg-teal-50">
                <h4 className="font-medium text-gray-800 mb-2">De unidad mayor a menor</h4>
                <p className="text-sm text-gray-700 mb-2">Multiplicamos por la potencia de 10 correspondiente:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>2 km = 2 × 1000 = 2000 m</li>
                  <li>5 m = 5 × 100 = 500 cm</li>
                  <li>3 kg = 3 × 1000 = 3000 g</li>
                </ul>
              </Card>
              <Card className="p-4 bg-blue-50">
                <h4 className="font-medium text-gray-800 mb-2">De unidad menor a mayor</h4>
                <p className="text-sm text-gray-700 mb-2">Dividimos por la potencia de 10 correspondiente:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>3000 m = 3000 ÷ 1000 = 3 km</li>
                  <li>250 cm = 250 ÷ 100 = 2.5 m</li>
                  <li>1500 g = 1500 ÷ 1000 = 1.5 kg</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Aplicaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Aplicaciones en la vida cotidiana</h3>
            <p className="text-gray-600 mb-4">
              Las medidas están presentes en numerosas situaciones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-teal-50 p-3 rounded-lg">
                <p className="text-gray-700">Cocina (recetas)</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">Compras (peso de alimentos)</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-gray-700">Viajes (distancias)</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">Medicina (dosis)</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-700">Construcción (materiales)</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700">Deportes (tiempos, distancias)</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/modulos/medida/actividades")}
              className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700"
            >
              <Calculator className="h-5 w-5" />
              <span>Ir a las actividades</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/modulos/medida/conversion-unidades")}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Aprender sobre conversiones</span>
            </Button>
          </div>

          {/* Recursos */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Guía de unidades de medida</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Material complementario sobre sistemas de unidades y conversiones.
                  </p>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Conversor de unidades</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Herramienta para convertir entre diferentes unidades de medida.
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
