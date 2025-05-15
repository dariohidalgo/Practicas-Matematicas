import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAuth } from "../../contexts/auth-context"
import { useProgress } from "../../contexts/progress-context"
import ModuleHeader from "../../components/ModuleHeader"

export default function ActividadProporcionalidad() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints, progress } = useProgress()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("problema")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [values, setValues] = useState({
    cell1: "",
    cell2: "",
    cell3: "",
    cell4: "",
    anotador: "",
  })

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
    // Verificar respuestas
    const costo5Camisetas = parseFloat(values.cell1)
    const camisetasPor90 = parseFloat(values.cell2)

    // Respuestas correctas:
    // 5 camisetas = $75 (porque 1 camiseta = $15)
    // Con $90 puedo comprar 6 camisetas (porque $90 ÷ $15 = 6)
    const isValid = costo5Camisetas === 75 && camisetasPor90 === 6

    setIsCorrect(isValid)
    setShowFeedback(true)

    if (isValid) {
      try {
        // Primero actualizamos el progreso de la actividad
        await updateActivityProgress("proporcionalidad", "actividad-1", {
          completed: true,
          score: 100
        })

        // Luego agregamos los puntos
        await addPoints(50)

        // Finalmente actualizamos el progreso del módulo
        const currentProgress = progress.moduleProgress.proporcionalidad || 0
        const newModuleProgress = Math.max(currentProgress, 30)
        await updateModuleProgress("proporcionalidad", newModuleProgress)

        // Esperar 2 segundos para mostrar el mensaje de éxito antes de redirigir
        setTimeout(() => {
          navigate("/modulos/proporcionalidad")
        }, 2000)
      } catch (error) {
        console.error('Error al actualizar el progreso:', error)
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      }
    }
  }

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
      <ModuleHeader title="Proporcionalidad" backPath="/modulos/proporcionalidad" />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="gap-4">
            <TabsTrigger value="problema">Problema</TabsTrigger>
            <TabsTrigger value="pista">Pista</TabsTrigger>
          </TabsList>
          <TabsContent value="problema" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Problema de Proporcionalidad</h2>
              <p className="text-gray-700">
                En una tienda de ropa, 3 camisetas cuestan $45. Si mantenemos la misma proporción:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>¿Cuánto costarán 5 camisetas?</li>
                <li>¿Cuántas camisetas podré comprar con $90?</li>
              </ul>
              
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Costo de 5 camisetas:</label>
                    <Input
                      type="number"
                      value={values.cell1}
                      onChange={(e) => handleInputChange('cell1', e.target.value)}
                      placeholder="$"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Camisetas por $90:</label>
                    <Input
                      type="number"
                      value={values.cell2}
                      onChange={(e) => handleInputChange('cell2', e.target.value)}
                      placeholder="Cantidad"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={checkAnswers}
                  className="w-full mt-4"
                >
                  Verificar respuestas
                </Button>
              </div>
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center space-x-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="text-green-600" />
                      <p className="text-green-700">¡Correcto! Has ganado 50 puntos. Redirigiendo al siguiente problema...</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-600" />
                      <p className="text-red-700">Intenta de nuevo. Revisa tus cálculos.</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pista" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Pistas para resolver el problema</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-900">Paso 1: Encontrar el costo de una camiseta</h4>
                    <p className="text-blue-800 mt-2">
                      Si 3 camisetas cuestan $45:
                      <br />
                      Costo de 1 camiseta = $45 ÷ 3 = $15 por camiseta
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900">Paso 2: Calcular el costo de 5 camisetas</h4>
                    <p className="text-blue-800 mt-2">
                      Costo de 5 camisetas = 5 × $15 = $75
                      <br />
                      <span className="text-sm">(NO es $225 porque cada camiseta cuesta $15, no $45)</span>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900">Paso 3: Calcular cuántas camisetas puedo comprar con $90</h4>
                    <p className="text-blue-800 mt-2">
                      Número de camisetas = $90 ÷ $15 = 6 camisetas
                      <br />
                      <span className="text-sm">(Con $90 puedo comprar 6 camisetas porque cada una cuesta $15)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}