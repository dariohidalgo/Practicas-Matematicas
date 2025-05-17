import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, HelpCircle, BookOpen, Lightbulb, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { useAuth } from '../contexts/auth-context'
import { useProgress } from '../contexts/progress-context'

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
    dividendo: "",
    divisor: "",  
  })

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
    // Verificar si las respuestas son correctas
    // Cualquier dividendo y divisor que cumplan: dividendo = divisor * 21 + 8
    const dividendo = Number.parseInt(values.dividendo)
    const divisor = Number.parseInt(values.divisor)

    let isValid = false
    if (!isNaN(dividendo) && !isNaN(divisor)) {
      isValid = dividendo === divisor * 21 + 8
    }

    setIsCorrect(isValid)
    setShowFeedback(true)

    // Si es correcto, actualizar el progreso en Firebase
    if (isValid) {
      try {
        console.log("Respuesta correcta, actualizando progreso...")

        // Actualizar el progreso de la actividad
        await updateActivityProgress("numerosNaturales", "division-cociente-resto", {
          completed: true,
          score: 100,
        })

        // Añadir puntos
        await addPoints(50)

        // Calcular y actualizar el progreso del módulo
        const newModuleProgress = Math.max(progress.moduleProgress.numerosNaturales, 20)
        await updateModuleProgress("numerosNaturales", newModuleProgress)

        console.log("Progreso actualizado correctamente")
      } catch (error) {
        console.error("Error al actualizar el progreso:", error)
        alert("Hubo un error al guardar tu progreso. Por favor, inténtalo de nuevo.")
      }
    }
  }

  // Show loading state while checking authentication
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-orange-50">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/modulos/numeros-naturales" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Números Naturales</h1>
          <div className="ml-auto flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ayuda</DialogTitle>
                  <DialogDescription>
                    En esta actividad debes encontrar una división con cociente 21 y resto 8. Recuerda la relación entre
                    dividendo, divisor, cociente y resto.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="font-medium text-sm">Pistas:</h4>
                  <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li>En una división: Dividendo = Divisor × Cociente + Resto</li>
                    <li>El resto siempre debe ser menor que el divisor</li>
                    <li>Puedes probar con diferentes valores para el divisor</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Activity Content */}
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad: División con cociente y resto</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="problema">Problema</TabsTrigger>
              <TabsTrigger value="anotador">Anotador</TabsTrigger>
            </TabsList>

            <TabsContent value="problema" className="pt-4">
              <div className="space-y-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    Encuentra una división que tenga como cociente 21 y como resto 8. Escribe el dividendo y el divisor
                    que cumplen esta condición.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative border-2 border-gray-300 rounded-lg p-6 w-64">
                    <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-600">División</div>

                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Dividendo</label>
                        <Input
                          type="number"
                          value={values.dividendo}
                          onChange={(e) => handleInputChange("dividendo", e.target.value)}
                          className="w-24 text-center"
                          placeholder="?"
                        />
                      </div>
                      <div className="text-2xl">÷</div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Divisor</label>
                        <Input
                          type="number"
                          value={values.divisor}
                          onChange={(e) => handleInputChange("divisor", e.target.value)}
                          className="w-24 text-center"
                          placeholder="?"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Cociente</label>
                        <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center font-medium">
                          21
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Resto</label>
                        <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center font-medium">
                          8
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>Pista</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pista</DialogTitle>
                      </DialogHeader>
                      <p className="text-sm text-gray-600 mt-2">
                        Recuerda que en una división, el dividendo es igual al divisor multiplicado por el cociente, más
                        el resto.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Es decir: Dividendo = Divisor × Cociente + Resto</p>
                      <p className="text-sm text-gray-600 mt-2">
                        En este caso, ya sabes que el cociente es 21 y el resto es 8. ¿Puedes encontrar el dividendo y
                        el divisor?
                      </p>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={checkAnswers}>Verificar respuestas</Button>
                </div>

                {showFeedback && (
                  <div className={`p-4 rounded-lg mt-4 ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <h3 className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                          {isCorrect ? "¡Muy bien!" : "Revisa tus respuestas"}
                        </h3>
                        <p className="text-sm mt-1">
                          {isCorrect
                            ? `¡Correcto! La división ${values.dividendo} ÷ ${values.divisor} tiene cociente 21 y resto 8.`
                            : "Tu respuesta no es correcta. Recuerda que el dividendo debe ser igual al divisor multiplicado por el cociente, más el resto."}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mt-2">
                            Sugerencia: Prueba usando la fórmula Dividendo = Divisor × 21 + 8
                          </p>
                        )}
                        {isCorrect && (
                          <div className="mt-3">
                            <Button onClick={() => navigate("/modulos/numeros-naturales")}>Volver al módulo</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="anotador" className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Usa este espacio para anotar tus ideas, cálculos y estrategias para resolver el problema.
                </p>

                <textarea
                  className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Escribe aquí tus anotaciones, cálculos y estrategias..."
                  value={values.anotador}
                  onChange={(e) => handleInputChange("anotador", e.target.value)}
                ></textarea>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Sugerencia:</span> Explica cómo encontraste el dividendo y el divisor.
                    ¿Qué relación matemática utilizaste? ¿Hay más de una respuesta posible?
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Resources */}
      <div className="container mx-auto px-4 mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Recursos de apoyo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-800">División de números naturales</h4>
              <p className="text-sm text-gray-600 mt-1">
                Repasa los conceptos de dividendo, divisor, cociente y resto.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-800">Propiedades de la división</h4>
              <p className="text-sm text-gray-600 mt-1">
                Aprende sobre las propiedades de la división y cómo aplicarlas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
