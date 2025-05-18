import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, Trophy } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useAuth } from "../../contexts/auth-context"
import { useProgress } from "../../contexts/progress-context"
import ModuleHeader from "../../components/ModuleHeader"
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import PizarraPaint from '../../components/ui/PizarraPaint'

export default function ActividadProporcionalidad2() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()
  
  const [respuesta1, setRespuesta1] = useState("")
  const [respuesta2, setRespuesta2] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [intentos, setIntentos] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [openCalc, setOpenCalc] = useState(false)
  
  // Datos del problema de regla de tres
  const distancia1 = 150 // km
  const combustible1 = 12 // litros
  const distancia2 = 250 // km
  const combustible2 = (distancia2 * combustible1) / distancia1 // litros

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Show loading state while checking authentication
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const respuestaUsuario = parseFloat(respuesta1)
    const respuestaCorrecta = combustible2
    
    // Verificar si la respuesta es correcta (con un margen de error de 0.1)
    const esCorrecta = Math.abs(respuestaUsuario - respuestaCorrecta) < 0.1
    
    // Verificar si la explicación contiene palabras clave
    const explicacionCorrecta = respuesta2.toLowerCase().includes("proporcional") || 
                               respuesta2.toLowerCase().includes("regla de tres") ||
                               respuesta2.toLowerCase().includes("directa")
    
    if (esCorrecta && explicacionCorrecta) {
      setFeedback("correct")
      
      if (!completed) {
        // Actualizar progreso solo si no se había completado antes
        await updateActivityProgress("proporcionalidad", "actividad-2", { 
          completed: true, 
          score: 100 
        })
        
        // Actualizar progreso del módulo (ejemplo: 66% si es 2 de 3 actividades)
        await updateModuleProgress("proporcionalidad", 66)
        
        // Añadir puntos
        await addPoints(50)
        
        setCompleted(true)
      }
    } else {
      setFeedback("incorrect")
      setIntentos(intentos + 1)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Regla de tres simple" backPath="/modulos/proporcionalidad/actividades" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 2: Proporcionalidad directa</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-4">
                Un automóvil consume <strong>{combustible1} litros</strong> de combustible para recorrer <strong>{distancia1} kilómetros</strong>.
              </p>
              <p className="text-gray-700 font-medium">
                ¿Cuántos litros consumirá para recorrer <strong>{distancia2} kilómetros</strong>?
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="respuesta1" className="block text-sm font-medium text-gray-700 mb-1">
                  Litros de combustible necesarios:
                </label>
                <div className="flex items-center">
                  <Input
                    id="respuesta1"
                    type="number"
                    step="0.1"
                    value={respuesta1}
                    onChange={(e) => setRespuesta1(e.target.value)}
                    placeholder="Ingresa los litros"
                    className="max-w-[200px]"
                    required
                  />
                  <span className="ml-2 text-gray-700">litros</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="respuesta2" className="block text-sm font-medium text-gray-700 mb-1">
                  Explica brevemente cómo lo calculaste:
                </label>
                <Input
                  id="respuesta2"
                  value={respuesta2}
                  onChange={(e) => setRespuesta2(e.target.value)}
                  placeholder="Explica tu método de cálculo"
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={completed}>
                  Verificar respuesta
                </Button>
                <Button type="button" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setOpenCalc(true)}>
                  Usar calculadora
                </Button>
              </div>
            </form>
            <PizarraPaint />
            {feedback === "correct" && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-green-700 font-medium">¡Correcto!</p>
                  <p className="text-green-600">
                    Para recorrer {distancia2} km, el automóvil consumirá {combustible2.toFixed(1)} litros de combustible.
                    Has aplicado correctamente la proporcionalidad directa.
                  </p>
                  {completed && (
                    <div className="mt-4 flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <p className="text-gray-700">¡Has ganado 50 puntos!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {feedback === "incorrect" && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Incorrecto</p>
                  <p className="text-red-600">
                    Tu respuesta no es correcta o tu explicación no menciona la proporcionalidad directa.
                  </p>
                  <p className="mt-2 text-red-600">
                    Recuerda que en una proporcionalidad directa, puedes usar la regla de tres:
                  </p>
                  <p className="mt-1 text-red-600">
                    Si {distancia1} km → {combustible1} litros
                  </p>
                  <p className="text-red-600">
                    Entonces {distancia2} km → x litros
                  </p>
                  <p className="mt-2 text-red-600">Intenta nuevamente.</p>
                </div>
              </div>
            )}
            
            {/* Ayuda adicional después de varios intentos */}
            {intentos >= 2 && feedback === "incorrect" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 font-medium">Pista:</p>
                <p className="text-gray-600">
                  Para resolver este problema usando la regla de tres:
                </p>
                <p className="text-gray-600 mt-1">
                  x = ({distancia2} × {combustible1}) ÷ {distancia1}
                </p>
                <p className="text-gray-600">
                  Donde x es la cantidad de litros que necesitamos encontrar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={openCalc} onClose={() => setOpenCalc(false)}>
        <CalculadoraInteractiva sinHeader />
      </Modal>
    </main>
  )
}
