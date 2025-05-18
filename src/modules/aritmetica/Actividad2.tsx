import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Progress } from '../../components/ui/progress'
import { CustomRadioGroup as RadioGroup, CustomRadioGroupItem as RadioGroupItem } from '../../components/ui/custom-radio-group'
import ModuleHeader from '../../components/ModuleHeader'
import { SEO } from '../../components/seo/SEO'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from './CalculadoraInteractiva'
import PizarraPaint from '../../components/ui/PizarraPaint'

interface Pregunta {
  id: number
  enunciado: string
  tipo: 'divisibilidad' | 'primos'
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

export default function ActividadDivisibilidad() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [preguntaActual] = useState(0)
  const [respuestaUsuario, setRespuestaUsuario] = useState<number | null>(null)
  const [estadoRespuesta] = useState<'pendiente' | 'correcta' | 'incorrecta'>('pendiente')
  const [mostrarExplicacion] = useState(false)
  const [puntuacion] = useState(0)
  const [actividadCompletada] = useState(false)
  const [openCalc, setOpenCalc] = useState(false)
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])
  
  // Generar preguntas al cargar el componente
  useEffect(() => {
    const preguntasDivisibilidad: Pregunta[] = [
      {
        id: 1,
        enunciado: "¿Cuál de los siguientes números es divisible por 3?",
        tipo: "divisibilidad",
        opciones: ["142", "251", "387", "425"],
        respuestaCorrecta: 2, // 387 -> 3+8+7=18, divisible por 3
        explicacion: "Un número es divisible por 3 si la suma de sus dígitos es divisible por 3. En el caso de 387: 3+8+7=18, y 18 es divisible por 3."
      },
      {
        id: 2,
        enunciado: "¿Cuál de los siguientes números es divisible por 5?",
        tipo: "divisibilidad",
        opciones: ["123", "456", "780", "901"],
        respuestaCorrecta: 2, // 780 termina en 0
        explicacion: "Un número es divisible por 5 si termina en 0 o 5. El número 780 termina en 0, por lo que es divisible por 5."
      },
      {
        id: 3,
        enunciado: "¿Cuál de los siguientes números es divisible por 2 y por 3?",
        tipo: "divisibilidad",
        opciones: ["123", "234", "345", "456"],
        respuestaCorrecta: 3, // 456 es par y 4+5+6=15, divisible por 3
        explicacion: "Un número es divisible por 2 si es par (termina en 0, 2, 4, 6 u 8) y es divisible por 3 si la suma de sus dígitos es divisible por 3. 456 termina en 6 (es par) y 4+5+6=15, que es divisible por 3."
      },
      {
        id: 4,
        enunciado: "¿Cuál de los siguientes números es divisible por 4?",
        tipo: "divisibilidad",
        opciones: ["214", "328", "536", "742"],
        respuestaCorrecta: 1, // 328, sus últimos dos dígitos (28) son divisibles por 4
        explicacion: "Un número es divisible por 4 si sus dos últimos dígitos forman un número divisible por 4. En 328, los últimos dos dígitos son 28, y 28 ÷ 4 = 7, por lo que es divisible por 4."
      },
      {
        id: 5,
        enunciado: "¿Cuál de los siguientes números es primo?",
        tipo: "primos",
        opciones: ["51", "67", "91", "119"],
        respuestaCorrecta: 1, // 67 es primo
        explicacion: "Un número primo solo es divisible por 1 y por sí mismo. 67 no tiene otros divisores, por lo que es un número primo."
      },
      {
        id: 6,
        enunciado: "¿Cuál de los siguientes números NO es primo?",
        tipo: "primos",
        opciones: ["23", "37", "49", "83"],
        respuestaCorrecta: 2, // 49 = 7 × 7
        explicacion: "49 no es primo porque es divisible por 7 (49 = 7 × 7). Un número primo solo debe ser divisible por 1 y por sí mismo."
      },
      {
        id: 7,
        enunciado: "¿Cuál es el criterio de divisibilidad por 9?",
        tipo: "divisibilidad",
        opciones: [
          "Que termine en 9",
          "Que la suma de sus dígitos sea divisible por 9",
          "Que sea divisible por 3 y por 6",
          "Que sus últimos dos dígitos sean divisibles por 9"
        ],
        respuestaCorrecta: 1,
        explicacion: "Un número es divisible por 9 si la suma de sus dígitos es divisible por 9. Por ejemplo, 729: 7+2+9=18, y 18 es divisible por 9."
      },
      {
        id: 8,
        enunciado: "¿Cuál de los siguientes números es divisible por 6?",
        tipo: "divisibilidad",
        opciones: ["123", "234", "342", "453"],
        respuestaCorrecta: 2, // 342 es par y 3+4+2=9, divisible por 3
        explicacion: "Un número es divisible por 6 si es divisible por 2 y por 3 a la vez. 342 es par (termina en 2) y 3+4+2=9, que es divisible por 3."
      },
      {
        id: 9,
        enunciado: "¿Cuál es el mayor número primo menor que 20?",
        tipo: "primos",
        opciones: ["13", "17", "19", "21"],
        respuestaCorrecta: 2, // 19
        explicacion: "Los números primos menores que 20 son: 2, 3, 5, 7, 11, 13, 17 y 19. Por lo tanto, el mayor número primo menor que 20 es 19."
      },
      {
        id: 10,
        enunciado: "¿Cuál de los siguientes números es divisible por 11?",
        tipo: "divisibilidad",
        opciones: ["121", "143", "235", "347"],
        respuestaCorrecta: 0, // 121 = 11 × 11
        explicacion: "Un número es divisible por 11 si la diferencia entre la suma de los dígitos en posiciones pares y la suma de los dígitos en posiciones impares es 0 o múltiplo de 11. En 121: (1+1)-(2)=0, por lo que es divisible por 11."
      }
    ]
    
    // Mezclar preguntas para que aparezcan en orden aleatorio
    const preguntasMezcladas = [...preguntasDivisibilidad].sort(() => Math.random() - 0.5)
    setPreguntas(preguntasMezcladas)
  }, [])
  
  // Mostrar cargando mientras se verifica la autenticación
  if (authLoading || !user || preguntas.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <>
      <SEO 
        title="Actividad de Divisibilidad | Aritmética" 
        description="Practica los criterios de divisibilidad y aprende a identificar números primos con ejercicios interactivos."
        keywords="divisibilidad, números primos, criterios, aritmética, matemáticas, educación"
        url="https://matematicas-732ff.web.app/modulos/aritmetica/actividad-2"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
        {/* Header */}
        <ModuleHeader title="Aritmética" backPath="/modulos/aritmetica/actividades" />
        
        {/* Contenido */}
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-3xl mx-auto">
            {!actividadCompletada ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Actividad 2: Divisibilidad</h2>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Pregunta {preguntaActual + 1} de {preguntas.length}
                    </p>
                    <p className="text-sm font-medium">
                      Puntuación: {puntuacion}/{preguntas.length}
                    </p>
                  </div>
                  <Progress value={(preguntaActual / preguntas.length) * 100} className="mt-2" />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    {preguntas[preguntaActual].enunciado}
                  </h3>
                  
                  <RadioGroup 
                    value={respuestaUsuario !== null ? respuestaUsuario.toString() : undefined}
                    onValueChange={(value: string) => setRespuestaUsuario(parseInt(value))}
                    className="space-y-3"
                    disabled={estadoRespuesta !== 'pendiente'}
                  >
                    {preguntas[preguntaActual].opciones.map((opcion, index) => (
                      <div key={index} className={`flex items-center space-x-2 p-3 rounded-md border ${
                        estadoRespuesta !== 'pendiente' 
                          ? index === preguntas[preguntaActual].respuestaCorrecta 
                            ? 'border-green-500 bg-green-50' 
                            : respuestaUsuario === index 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-200'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}>
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`opcion-${index}`} 
                          className={estadoRespuesta !== 'pendiente' && index === preguntas[preguntaActual].respuestaCorrecta ? 'text-green-500' : ''}
                        />
                        <Label htmlFor={`opcion-${index}`} className="w-full cursor-pointer text-gray-800">
                          {opcion}
                        </Label>
                        {estadoRespuesta !== 'pendiente' && index === preguntas[preguntaActual].respuestaCorrecta && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        {estadoRespuesta !== 'pendiente' && respuestaUsuario === index && index !== preguntas[preguntaActual].respuestaCorrecta && (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {mostrarExplicacion && (
                  <div className={`p-4 rounded-md mb-6 ${estadoRespuesta === 'correcta' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-start">
                      {estadoRespuesta === 'correcta' ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <div>
                        <p className={`font-medium ${estadoRespuesta === 'correcta' ? 'text-green-800' : 'text-red-800'}`}>
                          {estadoRespuesta === 'correcta' ? '¡Correcto!' : 'Incorrecto'}
                        </p>
                        <p className="text-sm mt-1">
                          {preguntas[preguntaActual].explicacion}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/modulos/aritmetica/actividades")}
                  >
                    Volver a actividades
                  </Button>
                  <Button 
                    onClick={() => setOpenCalc(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Usar calculadora
                  </Button>
                </div>
                <Modal open={openCalc} onClose={() => setOpenCalc(false)}>
                  <CalculadoraInteractiva sinHeader />
                </Modal>
                <PizarraPaint />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Actividad completada!</h2>
                  <p className="text-gray-600">
                    Has obtenido {puntuacion} de {preguntas.length} puntos.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                    <div 
                      className="bg-yellow-400 h-4 rounded-full" 
                      style={{ width: `${(puntuacion / preguntas.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/modulos/aritmetica/actividades")}
                  >
                    Volver a actividades
                  </Button>
                  <Button onClick={() => navigate("/modulos/aritmetica/actividad-3")}>
                    Siguiente actividad
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
