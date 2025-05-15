import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X,  ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import { useProgress } from '../../contexts/progress-context'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Progress } from '../../components/ui/progress'
import ModuleHeader from '../../components/ModuleHeader'
import { SEO } from '../../components/seo/SEO'

interface Pregunta {
  id: number
  enunciado: string
  tipo: 'mcd' | 'mcm'
  num1: number
  num2: number
  respuestaCorrecta: number
  explicacion: string
}

export default function ActividadMCDMCM() {
  const { user, loading: authLoading } = useAuth()
  const { updateActivityProgress, updateModuleProgress, addPoints } = useProgress()
  const navigate = useNavigate()
  
  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestaUsuario, setRespuestaUsuario] = useState('')
  const [estadoRespuesta, setEstadoRespuesta] = useState<'pendiente' | 'correcta' | 'incorrecta'>('pendiente')
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false)
  const [puntuacion, setPuntuacion] = useState(0)
  const [actividadCompletada, setActividadCompletada] = useState(false)
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])
  
  // Función para calcular el MCD usando el algoritmo de Euclides
  const calcularMCD = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }
  
  // Función para calcular el MCM
  const calcularMCM = (a: number, b: number): number => {
    return (a * b) / calcularMCD(a, b)
  }
  
  // Generar preguntas al cargar el componente
  useEffect(() => {
    const generarPreguntas = (): Pregunta[] => {
      const preguntasGeneradas: Pregunta[] = []
      
      // Generar 5 preguntas de MCD
      for (let i = 0; i < 5; i++) {
        // Generar números que tengan un MCD interesante (no siempre 1)
        const factorComun = Math.floor(Math.random() * 5) + 2 // Factor común entre 2 y 6
        const num1 = factorComun * (Math.floor(Math.random() * 10) + 2) // Multiplicar por otro número
        const num2 = factorComun * (Math.floor(Math.random() * 10) + 2) // Multiplicar por otro número
        
        const mcd = calcularMCD(num1, num2)
        
        preguntasGeneradas.push({
          id: i + 1,
          enunciado: `Calcula el Máximo Común Divisor (MCD) de ${num1} y ${num2}`,
          tipo: 'mcd',
          num1,
          num2,
          respuestaCorrecta: mcd,
          explicacion: `Para calcular el MCD de ${num1} y ${num2}, podemos usar el algoritmo de Euclides o descomponer en factores primos. El MCD es ${mcd}.`
        })
      }
      
      // Generar 5 preguntas de MCM
      for (let i = 5; i < 10; i++) {
        // Generar números que tengan un MCM interesante
        const factorComun = Math.floor(Math.random() * 5) + 2 // Factor común entre 2 y 6
        const num1 = factorComun * (Math.floor(Math.random() * 10) + 2) // Multiplicar por otro número
        const num2 = factorComun * (Math.floor(Math.random() * 10) + 2) // Multiplicar por otro número
        
        const mcm = calcularMCM(num1, num2)
        
        preguntasGeneradas.push({
          id: i + 1,
          enunciado: `Calcula el Mínimo Común Múltiplo (MCM) de ${num1} y ${num2}`,
          tipo: 'mcm',
          num1,
          num2,
          respuestaCorrecta: mcm,
          explicacion: `Para calcular el MCM de ${num1} y ${num2}, podemos usar la fórmula MCM(a,b) = (a×b) / MCD(a,b). El MCM es ${mcm}.`
        })
      }
      
      return preguntasGeneradas.sort(() => Math.random() - 0.5) // Mezclar preguntas
    }
    
    setPreguntas(generarPreguntas())
  }, [])
  
  const verificarRespuesta = () => {
    if (!respuestaUsuario) return
    
    const respuestaNum = parseInt(respuestaUsuario)
    const esCorrecta = respuestaNum === preguntas[preguntaActual].respuestaCorrecta
    
    setEstadoRespuesta(esCorrecta ? 'correcta' : 'incorrecta')
    setMostrarExplicacion(true)
    
    if (esCorrecta) {
      setPuntuacion(prev => prev + 1)
    }
  }
  
  const siguientePregunta = () => {
    setEstadoRespuesta('pendiente')
    setMostrarExplicacion(false)
    setRespuestaUsuario('')
    
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      // Actividad completada
      setActividadCompletada(true)
      
      // Guardar progreso
      const porcentaje = Math.round((puntuacion / preguntas.length) * 100)
      updateActivityProgress("aritmetica", "actividad-3", { 
        completed: true, 
        score: porcentaje 
      }).then(() => {
        updateModuleProgress("aritmetica", porcentaje)
        // Dar puntos al usuario
        addPoints(puntuacion * 10)
      })
    }
  }
  
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
        title="Actividad de MCD y MCM | Aritmética" 
        description="Practica el cálculo del máximo común divisor y el mínimo común múltiplo con ejercicios interactivos."
        keywords="MCD, MCM, divisores, múltiplos, aritmética, matemáticas, educación"
        url="https://matematicas-732ff.web.app/modulos/aritmetica/actividad-3"
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
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Actividad 3: MCD y MCM</h2>
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
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="respuesta" className="text-sm font-medium text-gray-700">
                        Tu respuesta:
                      </Label>
                      <Input
                        id="respuesta"
                        type="number"
                        value={respuestaUsuario}
                        onChange={(e) => setRespuestaUsuario(e.target.value)}
                        placeholder="Escribe tu respuesta"
                        className="mt-1 text-gray-800"
                        disabled={estadoRespuesta !== 'pendiente'}
                      />
                    </div>
                  </div>
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
                        {estadoRespuesta === 'incorrecta' && (
                          <p className="text-sm mt-2 font-medium">
                            La respuesta correcta es: {preguntas[preguntaActual].respuestaCorrecta}
                          </p>
                        )}
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
                  
                  {estadoRespuesta === 'pendiente' ? (
                    <Button 
                      onClick={verificarRespuesta}
                      disabled={!respuestaUsuario}
                    >
                      Verificar
                    </Button>
                  ) : (
                    <Button onClick={siguientePregunta}>
                      {preguntaActual < preguntas.length - 1 ? 'Siguiente pregunta' : 'Finalizar actividad'}
                    </Button>
                  )}
                </div>
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
                  <Button onClick={() => navigate("/modulos/aritmetica")}>
                    Ir al módulo de Aritmética
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
