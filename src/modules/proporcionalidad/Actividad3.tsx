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

export default function ActividadProporcionalidad3() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()
  
  const [respuestas, setRespuestas] = useState({
    trabajadores: "",
    dias: ""
  })
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [intentos, setIntentos] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [openCalc, setOpenCalc] = useState(false)
  
  // Datos del problema de proporcionalidad inversa
  const trabajadoresOriginales = 6
  const diasOriginales = 15
  const trabajadoresNuevos = 9
  const diasNuevos = (trabajadoresOriginales * diasOriginales) / trabajadoresNuevos // 10 días

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRespuestas(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar la primera parte (cuántos trabajadores)
    const trabajadoresRespuesta = parseInt(respuestas.trabajadores)
    const esCorrectaTrabajadores = trabajadoresRespuesta === trabajadoresNuevos
    
    // Verificar la segunda parte (cuántos días)
    const diasRespuesta = parseInt(respuestas.dias)
    const esCorrectaDias = diasRespuesta === diasNuevos
    
    if (esCorrectaTrabajadores && esCorrectaDias) {
      setFeedback("correct")
      
      if (!completed) {
        // Actualizar progreso solo si no se había completado antes
        await updateActivityProgress("proporcionalidad", "actividad-3", { 
          completed: true, 
          score: 100 
        })
        
        // Actualizar progreso del módulo (100% si es 3 de 3 actividades)
        await updateModuleProgress("proporcionalidad", 100)
        
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
      <ModuleHeader title="Proporcionalidad inversa" backPath="/modulos/proporcionalidad/actividades" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 3: Proporcionalidad inversa</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>{trabajadoresOriginales} trabajadores</strong> tardan <strong>{diasOriginales} días</strong> en construir una casa.
              </p>
              <p className="text-gray-700 font-medium mb-2">
                Responde las siguientes preguntas:
              </p>
              <ol className="list-decimal list-inside text-gray-700">
                <li className="mb-1">¿Cuántos trabajadores se necesitarían para construir la casa en 10 días?</li>
                <li>Si se contrata a 9 trabajadores, ¿cuántos días tardarán en construir la casa?</li>
              </ol>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="trabajadores" className="block text-sm font-medium text-gray-700 mb-1">
                  Trabajadores necesarios para construir en 10 días:
                </label>
                <div className="flex items-center">
                  <Input
                    id="trabajadores"
                    name="trabajadores"
                    type="number"
                    value={respuestas.trabajadores}
                    onChange={handleChange}
                    placeholder="Número de trabajadores"
                    className="max-w-[200px]"
                    required
                  />
                  <span className="ml-2 text-gray-700">trabajadores</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="dias" className="block text-sm font-medium text-gray-700 mb-1">
                  Días que tardarán 9 trabajadores:
                </label>
                <div className="flex items-center">
                  <Input
                    id="dias"
                    name="dias"
                    type="number"
                    value={respuestas.dias}
                    onChange={handleChange}
                    placeholder="Número de días"
                    className="max-w-[200px]"
                    required
                  />
                  <span className="ml-2 text-gray-700">días</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={completed}>
                  Verificar respuestas
                </Button>
                <Button type="button" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setOpenCalc(true)}>
                  Usar calculadora
                </Button>
              </div>
            </form>
            
            {feedback === "correct" && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-green-700 font-medium">¡Correcto!</p>
                  <p className="text-green-600">
                    Has aplicado correctamente la proporcionalidad inversa:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-green-600">
                    <li>Para construir la casa en 10 días, se necesitan {trabajadoresNuevos} trabajadores.</li>
                    <li>Si se contrata a 9 trabajadores, tardarán {diasNuevos} días en construir la casa.</li>
                  </ul>
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
                    Una o ambas respuestas no son correctas.
                  </p>
                  <p className="mt-2 text-red-600">
                    Recuerda que en una proporcionalidad inversa:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-red-600">
                    <li>A más trabajadores, menos días (y viceversa)</li>
                    <li>El producto de trabajadores × días es constante</li>
                  </ul>
                  <p className="mt-2 text-red-600">Intenta nuevamente.</p>
                </div>
              </div>
            )}
            
            {/* Ayuda adicional después de varios intentos */}
            {intentos >= 2 && feedback === "incorrect" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 font-medium">Pista:</p>
                <p className="text-gray-600">
                  En una proporcionalidad inversa, el producto de las magnitudes es constante:
                </p>
                <p className="text-gray-600 mt-1">
                  {trabajadoresOriginales} trabajadores × {diasOriginales} días = {trabajadoresOriginales * diasOriginales}
                </p>
                <p className="text-gray-600 mt-2">
                  Para la primera pregunta: trabajadores × 10 días = {trabajadoresOriginales * diasOriginales}
                </p>
                <p className="text-gray-600">
                  Para la segunda pregunta: 9 trabajadores × días = {trabajadoresOriginales * diasOriginales}
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
