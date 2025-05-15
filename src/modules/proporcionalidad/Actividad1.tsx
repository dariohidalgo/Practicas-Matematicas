import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, Trophy } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useAuth } from "../../contexts/auth-context"
import { useProgress } from "../../contexts/progress-context"
import ModuleHeader from "../../components/ModuleHeader"

export default function ActividadProporcionalidad1() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()
  
  const [respuesta, setRespuesta] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [intentos, setIntentos] = useState(0)
  const [completed, setCompleted] = useState(false)
  
  // Datos del problema
  const precioOriginal = 120
  const descuento = 15
  const precioFinal = precioOriginal - (precioOriginal * descuento / 100)

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
    
    const respuestaUsuario = parseFloat(respuesta)
    const respuestaCorrecta = precioFinal
    
    // Verificar si la respuesta es correcta (con un margen de error de 0.01)
    const esCorrecta = Math.abs(respuestaUsuario - respuestaCorrecta) < 0.01
    
    if (esCorrecta) {
      setFeedback("correct")
      
      if (!completed) {
        // Actualizar progreso solo si no se había completado antes
        await updateActivityProgress("proporcionalidad", "actividad-1", { 
          completed: true, 
          score: 100 
        })
        
        // Actualizar progreso del módulo (ejemplo: 33% si es 1 de 3 actividades)
        await updateModuleProgress("proporcionalidad", 33)
        
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
      <ModuleHeader title="Descuentos y porcentajes" backPath="/modulos/proporcionalidad" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 1: Cálculo de descuentos</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-4">
                Un producto tiene un precio original de <strong>${precioOriginal}</strong> y se aplica un descuento del <strong>{descuento}%</strong>.
              </p>
              <p className="text-gray-700 font-medium">
                ¿Cuál será el precio final después de aplicar el descuento?
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="respuesta" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu respuesta:
                </label>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-700">$</span>
                  <Input
                    id="respuesta"
                    type="number"
                    step="0.01"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    placeholder="Ingresa el precio final"
                    className="max-w-[200px]"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={completed}>
                Verificar respuesta
              </Button>
            </form>
            
            {feedback === "correct" && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-green-700 font-medium">¡Correcto!</p>
                  <p className="text-green-600">
                    El precio final es ${precioFinal.toFixed(2)}. Has calculado correctamente el descuento.
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
                    Tu respuesta no es correcta. Recuerda que para calcular un descuento debes:
                  </p>
                  <ol className="list-decimal list-inside mt-2 text-red-600">
                    <li>Calcular el valor del descuento: Precio original × (Porcentaje de descuento ÷ 100)</li>
                    <li>Restar el valor del descuento al precio original</li>
                  </ol>
                  <p className="mt-2 text-red-600">Intenta nuevamente.</p>
                </div>
              </div>
            )}
            
            {/* Ayuda adicional después de varios intentos */}
            {intentos >= 2 && feedback === "incorrect" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 font-medium">Pista:</p>
                <p className="text-gray-600">
                  Para este problema:
                </p>
                <ul className="list-disc list-inside mt-1 text-gray-600">
                  <li>Valor del descuento = ${precioOriginal} × ({descuento} ÷ 100) = ${(precioOriginal * descuento / 100).toFixed(2)}</li>
                  <li>Precio final = ${precioOriginal} - ${(precioOriginal * descuento / 100).toFixed(2)}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
