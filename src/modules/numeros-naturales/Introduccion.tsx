import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionNaturales() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Números Naturales" backPath="/dashboard" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Introducción a los Números Naturales</h2>
            <p className="text-gray-600">
              Los números naturales son los que utilizamos para contar objetos y ordenar elementos. 
              Empiezan desde el 1 y continúan indefinidamente: 1, 2, 3, 4, 5...
            </p>
          </div>

          {/* Tarjetas de conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Operaciones Básicas</h3>
              <p className="text-gray-600 mb-3">
                Con los números naturales podemos realizar cuatro operaciones básicas:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Suma (+): Añadir cantidades</li>
                <li>Resta (-): Quitar cantidades</li>
                <li>Multiplicación (×): Suma repetida</li>
                <li>División (÷): Repartir en partes iguales</li>
              </ul>
            </Card>
            <Card className="p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Propiedades</h3>
              <p className="text-gray-600 mb-3">
                Los números naturales tienen propiedades importantes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Conmutatividad: a + b = b + a</li>
                <li>Asociatividad: (a + b) + c = a + (b + c)</li>
                <li>Elemento neutro: a + 0 = a</li>
                <li>Distributividad: a × (b + c) = a × b + a × c</li>
              </ul>
            </Card>
          </div>

          {/* Aplicaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Aplicaciones en la vida cotidiana</h3>
            <p className="text-gray-600 mb-4">
              Los números naturales están presentes en muchas situaciones de nuestra vida diaria:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-gray-700">Contar objetos (5 manzanas)</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">Medir cantidades (3 litros)</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-gray-700">Ordenar elementos (1°, 2°, 3°)</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700">Calcular precios (25 pesos)</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-700">Medir el tiempo (7 días)</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-gray-700">Identificar (N° de teléfono)</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/modulos/numeros-naturales/actividades")}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Calculator className="h-5 w-5" />
              <span>Ir a las actividades</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/modulos/numeros-naturales/division-cociente-resto")}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Aprender sobre división</span>
            </Button>
          </div>

          {/* Recursos */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                <a 
                  className='cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 p-3 -m-3 rounded-lg'
                  onClick={() => navigate("/modulos/numeros-naturales/guia-estudio")}
                >
                  <div className='flex items-center'>
                    <div className='flex-grow'>
                      <h4 className="font-medium text-gray-800 transition-colors group-hover:text-blue-600">Guía de estudio</h4>
                      <p className="text-sm text-gray-600 mt-1 transition-colors group-hover:text-blue-500">
                        Material complementario sobre números naturales y sus operaciones.
                      </p>
                    </div>
                    <div className='ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </Card>
              <Card className="p-4 bg-white shadow-sm flex items-start gap-3">
                <Calculator className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
             
          
                  <a className='cursor-pointer' onClick={() => navigate("/modulos/aritmetica/calculadora-interactiva")}>
                  <h4 className="font-medium text-gray-800">Calculadora interactiva</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Herramienta para practicar operaciones con números naturales.
                  </p>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
