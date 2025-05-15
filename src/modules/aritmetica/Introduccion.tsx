import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function IntroduccionAritmetica() {
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
      <ModuleHeader title="Aritmética" backPath="/dashboard" />
      
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Aritmética</h2>
        <p className="text-gray-600 mt-2">
          Aprende sobre los números naturales, operaciones básicas y propiedades.
        </p>
      </div>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Columna izquierda */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">¿Qué es la aritmética?</h2>
              <p className="text-gray-600 mb-4">
                La aritmética es la rama más básica de las matemáticas que se ocupa de los números y las operaciones elementales con ellos: suma, resta, multiplicación y división.
              </p>
              <p className="text-gray-600 mb-4">
                En este módulo aprenderás sobre los números naturales, sus propiedades y cómo realizar operaciones con ellos. También explorarás conceptos como la divisibilidad, los números primos y compuestos, y aprenderás a calcular el máximo común divisor (MCD) y el mínimo común múltiplo (MCM).
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Temas principales:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Números naturales y sus propiedades</li>
                  <li>Operaciones básicas: suma, resta, multiplicación y división</li>
                  <li>Divisibilidad y criterios de divisibilidad</li>
                  <li>Números primos y compuestos</li>
                  <li>Máximo común divisor (MCD) y mínimo común múltiplo (MCM)</li>
                  <li>Factorización en números primos</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Actividades</h2>
              <p className="text-gray-600 mb-4">
                Pon a prueba tus conocimientos con estas actividades interactivas.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/modulos/aritmetica/actividades')}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">Actividades de aritmética</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Ejercicios interactivos para practicar operaciones aritméticas.
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Columna derecha */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recursos adicionales</h2>
              
              <div className="space-y-4">
                <Card 
                  className="p-4 bg-white shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/modulos/aritmetica/guia-numeros-naturales')}
                >
                  <BookOpen className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800">Guía de números naturales</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Material complementario sobre números naturales y sus propiedades.
                    </p>
                    <span className="text-sm text-yellow-600 mt-2 inline-block hover:underline">Ver guía</span>
                  </div>
                </Card>
                
                <Card 
                  className="p-4 bg-white shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/modulos/aritmetica/calculadora-interactiva')}
                >
                  <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800">Calculadora interactiva</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Herramienta para realizar operaciones con números naturales, calcular MCD, MCM y más.
                    </p>
                    <span className="text-sm text-blue-600 mt-2 inline-block hover:underline">Usar calculadora</span>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">¿Sabías que...?</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                  "La palabra 'aritmética' proviene del griego 'arithmos', que significa 'número'. Es una de las ramas más antiguas de las matemáticas y ha sido estudiada desde hace miles de años."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
