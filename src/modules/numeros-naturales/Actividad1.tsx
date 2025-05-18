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

export default function ActividadNaturales1() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("problema")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [values, setValues] = useState({
    suma: "",
    producto: "",
    diferencia: "",
    cociente: ""
  })
  const [openCalc, setOpenCalc] = useState(false)

  // Datos del problema
  const numero1 = 24
  const numero2 = 6

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
    const suma = Number.parseInt(values.suma)
    const producto = Number.parseInt(values.producto)
    const diferencia = Number.parseInt(values.diferencia)
    const cociente = Number.parseInt(values.cociente)

    const esCorrecta = 
      suma === numero1 + numero2 &&
      producto === numero1 * numero2 &&
      diferencia === numero1 - numero2 &&
      cociente === numero1 / numero2

    setIsCorrect(esCorrecta)
    setShowFeedback(true)

    if (esCorrecta && !completed) {
      try {
        // Actualizar progreso
        await updateActivityProgress("numerosNaturales", "actividad-1", {
          completed: true,
          score: 100
        })
        
        // Actualizar progreso del módulo (33% si es 1 de 3 actividades)
        await updateModuleProgress("numerosNaturales", 33)
        
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
      <ModuleHeader title="Operaciones básicas" backPath="/modulos/numeros-naturales" />

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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad 1: Operaciones con números naturales</h2>
                
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Dados los números naturales <strong>{numero1}</strong> y <strong>{numero2}</strong>, calcula:
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>La suma de los dos números</li>
                    <li>El producto de los dos números</li>
                    <li>La diferencia entre el primero y el segundo</li>
                    <li>El cociente de dividir el primero entre el segundo</li>
                  </ol>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="suma" className="block text-sm font-medium text-gray-700 mb-1">
                        Suma ({numero1} + {numero2}):
                      </label>
                      <Input
                        id="suma"
                        type="number"
                        value={values.suma}
                        onChange={(e) => handleInputChange("suma", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="producto" className="block text-sm font-medium text-gray-700 mb-1">
                        Producto ({numero1} × {numero2}):
                      </label>
                      <Input
                        id="producto"
                        type="number"
                        value={values.producto}
                        onChange={(e) => handleInputChange("producto", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="diferencia" className="block text-sm font-medium text-gray-700 mb-1">
                        Diferencia ({numero1} - {numero2}):
                      </label>
                      <Input
                        id="diferencia"
                        type="number"
                        value={values.diferencia}
                        onChange={(e) => handleInputChange("diferencia", e.target.value)}
                        placeholder="Ingresa el resultado"
                        className="max-w-[200px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cociente" className="block text-sm font-medium text-gray-700 mb-1">
                        Cociente ({numero1} ÷ {numero2}):
                      </label>
                      <Input
                        id="cociente"
                        type="number"
                        value={values.cociente}
                        onChange={(e) => handleInputChange("cociente", e.target.value)}
                        placeholder="Ingresa el resultado"
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
                            Has calculado correctamente todas las operaciones:
                          </p>
                          <ul className="list-disc list-inside mt-1 text-green-600">
                            <li>Suma: {numero1} + {numero2} = {numero1 + numero2}</li>
                            <li>Producto: {numero1} × {numero2} = {numero1 * numero2}</li>
                            <li>Diferencia: {numero1} - {numero2} = {numero1 - numero2}</li>
                            <li>Cociente: {numero1} ÷ {numero2} = {numero1 / numero2}</li>
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
                            Revisa tus cálculos y vuelve a intentarlo.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="teoria" className="pt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Operaciones con números naturales</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Suma</h3>
                    <p className="text-gray-700">
                      La suma es una operación básica que combina dos o más números en un único número, llamado suma, valor total o total.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Ejemplo: 5 + 3 = 8
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Resta o diferencia</h3>
                    <p className="text-gray-700">
                      La resta es una operación que representa la operación de quitar un número de otro para averiguar la diferencia entre ellos.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Ejemplo: 9 - 4 = 5
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiplicación o producto</h3>
                    <p className="text-gray-700">
                      La multiplicación es una operación matemática que consiste en sumar un número tantas veces como indica otro número.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Ejemplo: 4 × 3 = 12 (es decir, 4 + 4 + 4 = 12)
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">División o cociente</h3>
                    <p className="text-gray-700">
                      La división es una operación matemática que consiste en averiguar cuántas veces un número (divisor) está contenido en otro número (dividendo).
                    </p>
                    <p className="text-gray-700 mt-2">
                      Ejemplo: 12 ÷ 4 = 3 (es decir, 4 cabe 3 veces en 12)
                    </p>
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
