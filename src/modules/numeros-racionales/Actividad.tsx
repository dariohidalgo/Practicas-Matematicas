import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import ModuleHeader from '../../components/ModuleHeader'
import { Tabs, TabsContent} from '../../components/ui/tabs'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import { useAuth } from '../../contexts/auth-context'
import { useProgress } from '../../contexts/progress-context'
import PizarraPaint from '../../components/ui/PizarraPaint'

export default function ActividadNumerosRacionales() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints, progress } = useProgress()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Obtener el ID de la actividad de la ruta actual
  const actividadId = location.pathname.split('/').pop() || 'actividad-1'

  const [activeTab, setActiveTab] = useState("problema")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [values, setValues] = useState({
    dividendo: "",
    divisor: "",
    cell1: "",
    cell2: "",
    cell3: "",
    cell4: "",
    cell5: "",
    cell6: "",
    anotador: "",
  })
  const [openCalc, setOpenCalc] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  const handleInputChange = (field: string, value: string) => {
    setValues({
      ...values,
      [field]: value,
    })
  }

  const checkAnswers = async () => {
    // Verificar si las respuestas son correctas para la suma de fracciones
    const numerador1 = parseInt(values.cell1)
    const denominador1 = parseInt(values.cell2)
    const numerador2 = parseInt(values.cell3)
    const denominador2 = parseInt(values.cell4)
    const numeradorResultado = parseInt(values.cell5)
    const denominadorResultado = parseInt(values.cell6)

    let isValid = false
    if (!isNaN(numerador1) && !isNaN(denominador1) && !isNaN(numerador2) && !isNaN(denominador2) && 
        !isNaN(numeradorResultado) && !isNaN(denominadorResultado) && 
        denominador1 !== 0 && denominador2 !== 0 && denominadorResultado !== 0) {
      
      // Calcular el mínimo común múltiplo de los denominadores
      const mcm = (denominador1 * denominador2) / gcd(denominador1, denominador2)
      
      // Calcular los nuevos numeradores
      const nuevoNumerador1 = numerador1 * (mcm / denominador1)
      const nuevoNumerador2 = numerador2 * (mcm / denominador2)
      
      // Sumar los numeradores
      const sumaCorrecta = nuevoNumerador1 + nuevoNumerador2
      
      // Simplificar la fracción resultado
      const divisorComun = gcd(Math.abs(sumaCorrecta), mcm)
      const numeradorSimplificado = sumaCorrecta / divisorComun
      const denominadorSimplificado = mcm / divisorComun
      
      // Verificar si la respuesta del usuario es correcta (puede estar simplificada o no)
      const fraccionUsuario = numeradorResultado / denominadorResultado
      const fraccionCorrecta = numeradorSimplificado / denominadorSimplificado
      
      isValid = Math.abs(fraccionUsuario - fraccionCorrecta) < 0.0001
    }

    setIsCorrect(isValid)
    setShowFeedback(true)

    // Si es correcto, actualizar el progreso en Firebase
    if (isValid) {
      try {
        console.log("Respuesta correcta, actualizando progreso...")

        // Actualizar el progreso de la actividad usando el actividadId proporcionado
        await updateActivityProgress("numerosRacionales", actividadId, {
          completed: true,
          score: 100,
        })

        // Añadir puntos
        await addPoints(50)

        // Calcular y actualizar el progreso del módulo
        const newModuleProgress = Math.max(progress.moduleProgress.numerosRacionales || 0, 30)
        await updateModuleProgress("numerosRacionales", newModuleProgress)

        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          navigate("/modulos/numeros-racionales/actividades")
        }, 2000)
      } catch (error) {
        console.error("Error al actualizar el progreso:", error)
        alert("Hubo un error al guardar tu progreso. Por favor, inténtalo de nuevo.")
      }
    }
  }
  
  // Función para calcular el máximo común divisor (MCD)
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  // Show loading state while checking authentication
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 pb-16">
      {/* Header */}
      <ModuleHeader title="Números Racionales" backPath="/modulos/numeros-racionales/actividades">
      
      </ModuleHeader>

      {/* Activity Content */}
      <div className="max-w-3xl mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad: Suma de fracciones</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
           
            <TabsContent value="problema" className="pt-4">
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    Calcula la suma de las fracciones 2/3 y 1/4. Escribe el resultado como una fracción simplificada.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative border-2 border-gray-300 rounded-lg p-6 w-full max-w-md">
                    <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-600">Suma de fracciones</div>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="flex flex-col items-center">
                        <Input
                          type="number"
                          value={values.cell1}
                          onChange={(e) => handleInputChange("cell1", e.target.value)}
                          className="w-16 text-center mb-1"
                          placeholder="?"
                        />
                        <div className="w-16 h-0.5 bg-gray-800"></div>
                        <Input
                          type="number"
                          value={values.cell2}
                          onChange={(e) => handleInputChange("cell2", e.target.value)}
                          className="w-16 text-center mt-1"
                          placeholder="?"
                        />
                      </div>
                      <div className="text-2xl">+</div>
                      <div className="flex flex-col items-center">
                        <Input
                          type="number"
                          value={values.cell3}
                          onChange={(e) => handleInputChange("cell3", e.target.value)}
                          className="w-16 text-center mb-1"
                          placeholder="?"
                        />
                        <div className="w-16 h-0.5 bg-gray-800"></div>
                        <Input
                          type="number"
                          value={values.cell4}
                          onChange={(e) => handleInputChange("cell4", e.target.value)}
                          className="w-16 text-center mt-1"
                          placeholder="?"
                        />
                      </div>
                      <div className="text-2xl">=</div>
                      <div className="flex flex-col items-center">
                        <Input
                          type="number"
                          value={values.cell5}
                          onChange={(e) => handleInputChange("cell5", e.target.value)}
                          className="w-16 text-center mb-1"
                          placeholder="?"
                        />
                        <div className="w-16 h-0.5 bg-gray-800"></div>
                        <Input
                          type="number"
                          value={values.cell6}
                          onChange={(e) => handleInputChange("cell6", e.target.value)}
                          className="w-16 text-center mt-1"
                          placeholder="?"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={checkAnswers}
                    className="bg-green-600 hover:bg-green-700 text-white"
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
                  <div className="flex justify-between items-center ">
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "Ocultar pista" : "Mostrar pista"}
                  </Button>
                </div>
                </div>
          
                {showHint && (
                  <div className="bg-blue-50 p-4 rounded-lg w-full mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Pista para sumar fracciones:</h4>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                      <li>Para sumar fracciones con distinto denominador, primero debes hallar el mcm de los denominadores</li>
                      <li>Luego, multiplica cada numerador por el resultado de dividir el mcm entre su denominador</li>
                      <li>Suma los nuevos numeradores y mantén el mcm como denominador</li>
                      <li>Finalmente, simplifica la fracción si es posible</li>
                    </ul>
                  </div>
                )}
                <PizarraPaint />
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700">¡Respuesta correcta!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-700">Respuesta incorrecta. Inténtalo de nuevo.</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Modal open={openCalc} onClose={() => setOpenCalc(false)}>
        <CalculadoraInteractiva sinHeader />
      </Modal>
    </main>
  )
}