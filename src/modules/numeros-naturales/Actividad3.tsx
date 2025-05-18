import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Trophy } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { useAuth } from '../../contexts/auth-context'
import { useProgress } from '../../contexts/progress-context'
import ModuleHeader from '../../components/ModuleHeader'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import PizarraPaint from '../../components/ui/PizarraPaint'

export default function ActividadNaturales3() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("problema")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [values, setValues] = useState({
    dividendo: "",
    divisor: "",
    cociente: "",
    resto: ""
  })
  const [openCalc, setOpenCalc] = useState(false)

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
    const dividendo = Number.parseInt(values.dividendo)
    const divisor = Number.parseInt(values.divisor)
    const cociente = Number.parseInt(values.cociente)
    const resto = Number.parseInt(values.resto)

    // Verificar que el dividendo, divisor, cociente y resto sean correctos
    // La fórmula es: dividendo = divisor * cociente + resto
    const esCorrecta = 
      !isNaN(dividendo) && 
      !isNaN(divisor) && 
      !isNaN(cociente) && 
      !isNaN(resto) && 
      divisor > 0 && 
      resto >= 0 && 
      resto < divisor && 
      dividendo === divisor * cociente + resto

    setIsCorrect(esCorrecta)
    setShowFeedback(true)

    if (esCorrecta && !completed) {
      try {
        // Actualizar progreso
        await updateActivityProgress("numerosNaturales", "actividad-3", {
          completed: true,
          score: 100
        })
        
        // Actualizar progreso del módulo (100% si es 3 de 3 actividades)
        await updateModuleProgress("numerosNaturales", 100)
        
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
      <ModuleHeader title="División con cociente y resto" backPath="/modulos/numeros-naturales" />

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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 3: División con cociente y resto</h2>
                
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Completa los valores para una división con cociente y resto que cumpla con la fórmula:
                  </p>
                  <p className="text-center font-medium text-gray-800 mb-4">
                    Dividendo = Divisor × Cociente + Resto
                  </p>
                  <p className="text-gray-700">
                    Recuerda que:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-1">
                    <li>El divisor debe ser mayor que cero</li>
                    <li>El resto debe ser menor que el divisor</li>
                    <li>El resto debe ser mayor o igual a cero</li>
                  </ul>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dividendo" className="block text-sm font-medium text-gray-700 mb-1">
                        Dividendo:
                      </label>
                      <Input
                        id="dividendo"
                        type="number"
                        value={values.dividendo}
                        onChange={(e) => handleInputChange("dividendo", e.target.value)}
                        placeholder="Ingresa el dividendo"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="divisor" className="block text-sm font-medium text-gray-700 mb-1">
                        Divisor:
                      </label>
                      <Input
                        id="divisor"
                        type="number"
                        value={values.divisor}
                        onChange={(e) => handleInputChange("divisor", e.target.value)}
                        placeholder="Ingresa el divisor"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cociente" className="block text-sm font-medium text-gray-700 mb-1">
                        Cociente:
                      </label>
                      <Input
                        id="cociente"
                        type="number"
                        value={values.cociente}
                        onChange={(e) => handleInputChange("cociente", e.target.value)}
                        placeholder="Ingresa el cociente"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resto" className="block text-sm font-medium text-gray-700 mb-1">
                        Resto:
                      </label>
                      <Input
                        id="resto"
                        type="number"
                        value={values.resto}
                        onChange={(e) => handleInputChange("resto", e.target.value)}
                        placeholder="Ingresa el resto"
                        className="max-w-[200px]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      onClick={checkAnswers} 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={completed}
                    >
                      Verificar respuestas
                    </Button>
                    <Button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setOpenCalc(true)}
                    >
                      Usar calculadora
                    </Button>
                  </div>
                  <Modal open={openCalc} onClose={() => setOpenCalc(false)}>
                    <CalculadoraInteractiva sinHeader />
                  </Modal>
                </form>
                <PizarraPaint />
                {showFeedback && (
                  <div className={`mt-6 p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} rounded-lg flex items-start`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-green-700 font-medium">¡Correcto!</p>
                          <p className="text-green-600">
                            Has completado correctamente una división con cociente y resto:
                          </p>
                          <p className="text-green-600 mt-2">
                            {values.dividendo} = {values.divisor} × {values.cociente} + {values.resto}
                          </p>
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
                            Los valores ingresados no cumplen con la fórmula o con las condiciones requeridas.
                          </p>
                          <p className="text-red-600 mt-2">
                            Recuerda que:
                          </p>
                          <ul className="list-disc list-inside text-red-600 mt-1">
                            <li>Dividendo = Divisor × Cociente + Resto</li>
                            <li>El divisor debe ser mayor que cero</li>
                            <li>El resto debe ser menor que el divisor</li>
                            <li>El resto debe ser mayor o igual a cero</li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="teoria" className="pt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">División con cociente y resto</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Elementos de la división</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>Dividendo:</strong> Es el número que se va a dividir.</li>
                      <li><strong>Divisor:</strong> Es el número por el cual se divide el dividendo.</li>
                      <li><strong>Cociente:</strong> Es el resultado de la división.</li>
                      <li><strong>Resto:</strong> Es lo que sobra después de realizar la división.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">La fórmula fundamental</h3>
                    <p className="text-gray-700">
                      La relación entre estos elementos viene dada por la fórmula:
                    </p>
                    <p className="text-center font-medium text-gray-800 my-3">
                      Dividendo = Divisor × Cociente + Resto
                    </p>
                    <p className="text-gray-700">
                      Esta fórmula siempre se cumple en cualquier división.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ejemplo</h3>
                    <p className="text-gray-700">
                      Si dividimos 17 entre 5:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                      <li>Dividendo: 17</li>
                      <li>Divisor: 5</li>
                      <li>Cociente: 3 (porque 5 × 3 = 15, que es el mayor múltiplo de 5 menor o igual a 17)</li>
                      <li>Resto: 2 (porque 17 - 15 = 2)</li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      Comprobación: 17 = 5 × 3 + 2 ✓
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Condiciones importantes</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>El divisor siempre debe ser mayor que cero.</li>
                      <li>El resto siempre debe ser menor que el divisor.</li>
                      <li>El resto nunca puede ser negativo.</li>
                    </ul>
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
