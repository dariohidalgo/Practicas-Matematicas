import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Trophy } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { useAuth } from '../../contexts/auth-context'
import { useProgress } from '../../contexts/progress-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function ActividadNaturales2() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("problema")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [values, setValues] = useState({
    resultado1: "",
    resultado2: "",
    resultado3: "",
    resultado4: ""
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Show loading state while checking authentication
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-100">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setValues({
      ...values,
      [field]: value,
    })
  }

  const checkAnswers = async () => {
    // Verificar si las respuestas son correctas
    const resultado1 = Number.parseInt(values.resultado1)
    const resultado2 = Number.parseInt(values.resultado2)
    const resultado3 = Number.parseInt(values.resultado3)
    const resultado4 = Number.parseInt(values.resultado4)

    const esCorrecta = 
      resultado1 === 15 &&
      resultado2 === 30 &&
      resultado3 === 7 &&
      resultado4 === 11

    setIsCorrect(esCorrecta)
    setShowFeedback(true)

    if (esCorrecta && !completed) {
      try {
        // Actualizar progreso
        await updateActivityProgress("numerosNaturales", "actividad-2", {
          completed: true,
          score: 100
        })
        
        // Actualizar progreso del módulo (66% si es 2 de 3 actividades)
        await updateModuleProgress("numerosNaturales", 66)
        
        // Añadir puntos
        await addPoints(50)
        
        setCompleted(true)
      } catch (error) {
        console.error("Error al actualizar el progreso:", error)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Orden de operaciones" backPath="/modulos/numeros-naturales" />

      {/* Contenido */}
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <Tabs defaultValue="problema" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 gap-4">
                <TabsTrigger value="problema">Problema</TabsTrigger>
                <TabsTrigger value="teoria">Teoría</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problema" className="pt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 2: Orden de operaciones</h2>
                
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Calcula el resultado de las siguientes expresiones aplicando el orden correcto de operaciones:
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>3 × 4 + 3</li>
                    <li>5 × (2 + 4)</li>
                    <li>20 ÷ 4 + 2</li>
                    <li>15 - 8 + 4</li>
                  </ol>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="resultado1" className="block text-sm font-medium text-gray-700 mb-1">
                        Resultado de 3 × 4 + 3:
                      </label>
                      <Input
                        id="resultado1"
                        type="number"
                        value={values.resultado1}
                        onChange={(e) => handleInputChange("resultado1", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resultado2" className="block text-sm font-medium text-gray-700 mb-1">
                        Resultado de 5 × (2 + 4):
                      </label>
                      <Input
                        id="resultado2"
                        type="number"
                        value={values.resultado2}
                        onChange={(e) => handleInputChange("resultado2", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resultado3" className="block text-sm font-medium text-gray-700 mb-1">
                        Resultado de 20 ÷ 4 + 2:
                      </label>
                      <Input
                        id="resultado3"
                        type="number"
                        value={values.resultado3}
                        onChange={(e) => handleInputChange("resultado3", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resultado4" className="block text-sm font-medium text-gray-700 mb-1">
                        Resultado de 15 - 8 + 4:
                      </label>
                      <Input
                        id="resultado4"
                        type="number"
                        value={values.resultado4}
                        onChange={(e) => handleInputChange("resultado4", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={checkAnswers} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={completed}
                  >
                    Verificar respuestas
                  </Button>
                </form>
                
                {showFeedback && (
                  <div className={`mt-6 p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} rounded-lg flex items-start`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-green-700 font-medium">¡Correcto!</p>
                          <p className="text-green-600">
                            Has calculado correctamente todas las expresiones:
                          </p>
                          <ul className="list-disc list-inside mt-1 text-green-600">
                            <li>3 × 4 + 3 = 12 + 3 = 15</li>
                            <li>5 × (2 + 4) = 5 × 6 = 30</li>
                            <li>20 ÷ 4 + 2 = 5 + 2 = 7</li>
                            <li>15 - 8 + 4 = 7 + 4 = 11</li>
                          </ul>
                          {completed && (
                            <div className="mt-4 flex items-center">
                              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                              <p className="text-gray-700">¡Has ganado 50 puntos!</p>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-red-700 font-medium">Incorrecto</p>
                          <p className="text-red-600">
                            Revisa tus cálculos y el orden de operaciones.
                          </p>
                          <p className="text-red-600 mt-2">
                            Recuerda: primero se resuelven los paréntesis, luego las multiplicaciones y divisiones, y finalmente las sumas y restas.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="teoria" className="pt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Orden de operaciones</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Regla PEMDAS</h3>
                    <p className="text-gray-700">
                      Para calcular expresiones con varias operaciones, se sigue un orden específico conocido como PEMDAS:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
                      <li><strong>P</strong>aréntesis (resolver primero lo que está dentro de paréntesis)</li>
                      <li><strong>E</strong>xponentes (potencias y raíces)</li>
                      <li><strong>M</strong>ultiplicación y <strong>D</strong>ivisión (de izquierda a derecha)</li>
                      <li><strong>A</strong>dición (suma) y <strong>S</strong>ustracción (resta) (de izquierda a derecha)</li>
                    </ol>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ejemplos</h3>
                    
                    <div className="mb-3">
                      <p className="text-gray-700 font-medium">Ejemplo 1: 2 + 3 × 4</p>
                      <p className="text-gray-700">
                        Primero la multiplicación: 3 × 4 = 12<br />
                        Luego la suma: 2 + 12 = 14
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-700 font-medium">Ejemplo 2: (2 + 3) × 4</p>
                      <p className="text-gray-700">
                        Primero el paréntesis: 2 + 3 = 5<br />
                        Luego la multiplicación: 5 × 4 = 20
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-700 font-medium">Ejemplo 3: 10 - 4 ÷ 2 + 1</p>
                      <p className="text-gray-700">
                        Primero la división: 4 ÷ 2 = 2<br />
                        Luego de izquierda a derecha: 10 - 2 = 8<br />
                        Finalmente: 8 + 1 = 9
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={() => setActiveTab("problema")} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Volver al problema
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
