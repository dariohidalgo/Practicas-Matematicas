import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, HelpCircle } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Progress } from '../../components/ui/progress'
import ModuleHeader from '../../components/ModuleHeader'

interface Pregunta {
  id: number
  enunciado: string
  tipo: 'suma' | 'resta' | 'multiplicacion' | 'division'
  num1: number
  num2: number
  respuestaCorrecta: number
  explicacion: string
}

export default function ActividadAritmetica() {
  const { user, loading: authLoading } = useAuth()
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
  
  // Generar preguntas aleatorias al cargar el componente
  useEffect(() => {
    const generarPreguntas = (): Pregunta[] => {
      const tipos: ('suma' | 'resta' | 'multiplicacion' | 'division')[] = ['suma', 'resta', 'multiplicacion', 'division']
      const preguntasGeneradas: Pregunta[] = []
      
      for (let i = 0; i < 10; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)]
        let num1: number
        let num2: number
        let respuestaCorrecta: number
        
        switch (tipo) {
          case 'suma':
            num1 = Math.floor(Math.random() * 100) + 1
            num2 = Math.floor(Math.random() * 100) + 1
            respuestaCorrecta = num1 + num2
            preguntasGeneradas.push({
              id: i + 1,
              enunciado: `Calcula la suma de ${num1} + ${num2}`,
              tipo,
              num1,
              num2,
              respuestaCorrecta,
              explicacion: `Para sumar ${num1} + ${num2}, simplemente sumamos las unidades y luego las decenas, obteniendo ${respuestaCorrecta}.`
            })
            break
            
          case 'resta':
            num1 = Math.floor(Math.random() * 100) + 50
            num2 = Math.floor(Math.random() * 50) + 1
            respuestaCorrecta = num1 - num2
            preguntasGeneradas.push({
              id: i + 1,
              enunciado: `Calcula la resta de ${num1} - ${num2}`,
              tipo,
              num1,
              num2,
              respuestaCorrecta,
              explicacion: `Para restar ${num1} - ${num2}, restamos las unidades y luego las decenas, obteniendo ${respuestaCorrecta}.`
            })
            break
            
          case 'multiplicacion':
            num1 = Math.floor(Math.random() * 12) + 1
            num2 = Math.floor(Math.random() * 12) + 1
            respuestaCorrecta = num1 * num2
            preguntasGeneradas.push({
              id: i + 1,
              enunciado: `Calcula la multiplicación de ${num1} × ${num2}`,
              tipo,
              num1,
              num2,
              respuestaCorrecta,
              explicacion: `Para multiplicar ${num1} × ${num2}, podemos usar la tabla de multiplicar o multiplicar por unidades y decenas, obteniendo ${respuestaCorrecta}.`
            })
            break
            
          case 'division':
            num2 = Math.floor(Math.random() * 10) + 1
            respuestaCorrecta = Math.floor(Math.random() * 10) + 1
            num1 = num2 * respuestaCorrecta
            preguntasGeneradas.push({
              id: i + 1,
              enunciado: `Calcula la división de ${num1} ÷ ${num2}`,
              tipo,
              num1,
              num2,
              respuestaCorrecta,
              explicacion: `Para dividir ${num1} ÷ ${num2}, podemos pensar en cuántas veces cabe ${num2} en ${num1}, que es ${respuestaCorrecta}.`
            })
            break
        }
      }
      
      return preguntasGeneradas
    }
    
    setPreguntas(generarPreguntas())
  }, [])
  
  const verificarRespuesta = () => {
    const respuestaNum = parseInt(respuestaUsuario)
    
    if (isNaN(respuestaNum)) {
      return
    }
    
    if (respuestaNum === preguntas[preguntaActual].respuestaCorrecta) {
      setEstadoRespuesta('correcta')
      setPuntuacion(prev => prev + 1)
    } else {
      setEstadoRespuesta('incorrecta')
    }
  }
  
  const siguientePregunta = () => {
    setRespuestaUsuario('')
    setEstadoRespuesta('pendiente')
    setMostrarExplicacion(false)
    
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      setActividadCompletada(true)
    }
  }
  
  if (authLoading || !user || preguntas.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Actividad 1: Operaciones con números naturales" backPath="/modulos/aritmetica/actividades" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!actividadCompletada ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Pregunta {preguntaActual + 1} de {preguntas.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Puntuación: {puntuacion}/{preguntas.length}
                  </span>
                </div>
                <Progress value={(preguntaActual / preguntas.length) * 100} className="h-2" />
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {preguntas[preguntaActual].enunciado}
                </h2>
                
                <div className="mb-4">
                  <Label htmlFor="respuesta" className="block text-sm font-medium text-gray-700 mb-1">
                    Tu respuesta
                  </Label>
                  <Input
                    id="respuesta"
                    type="number"
                    value={respuestaUsuario}
                    onChange={(e) => setRespuestaUsuario(e.target.value)}
                    disabled={estadoRespuesta !== 'pendiente'}
                    className="w-full"
                  />
                </div>
                
                {estadoRespuesta === 'pendiente' ? (
                  <div className="flex space-x-4">
                    <Button 
                      onClick={verificarRespuesta}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Verificar
                    </Button>
                    <Button 
                      onClick={() => setMostrarExplicacion(!mostrarExplicacion)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      {mostrarExplicacion ? 'Ocultar pista' : 'Mostrar pista'}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={siguientePregunta}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Siguiente pregunta
                  </Button>
                )}
              </div>
              
              {estadoRespuesta !== 'pendiente' && (
                <div className={`p-4 rounded-lg ${
                  estadoRespuesta === 'correcta' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {estadoRespuesta === 'correcta' ? (
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-medium ${
                        estadoRespuesta === 'correcta' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {estadoRespuesta === 'correcta' ? '¡Correcto!' : 'Incorrecto'}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {estadoRespuesta === 'correcta' 
                          ? 'Has respondido correctamente.' 
                          : `La respuesta correcta es: ${preguntas[preguntaActual].respuestaCorrecta}`
                        }
                      </p>
                      <p className="text-gray-600 mt-2">
                        {preguntas[preguntaActual].explicacion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {mostrarExplicacion && estadoRespuesta === 'pendiente' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Pista</h3>
                      <p className="text-gray-600 mt-1">
                        {preguntas[preguntaActual].tipo === 'suma' && 'Recuerda que al sumar debes agrupar las unidades, decenas, etc.'}
                        {preguntas[preguntaActual].tipo === 'resta' && 'Recuerda que al restar, el número mayor va primero.'}
                        {preguntas[preguntaActual].tipo === 'multiplicacion' && 'Puedes usar la tabla de multiplicar o multiplicar por unidades y decenas.'}
                        {preguntas[preguntaActual].tipo === 'division' && 'Piensa en cuántas veces cabe el divisor en el dividendo.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  ¡Actividad completada!
                </h2>
                <p className="text-gray-600">
                  Has obtenido una puntuación de {puntuacion} de {preguntas.length}.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Resumen</h3>
                <p className="text-gray-600">
                  {puntuacion === preguntas.length 
                    ? '¡Excelente trabajo! Has respondido correctamente a todas las preguntas. Tienes un buen dominio de las operaciones con números naturales.'
                    : puntuacion >= preguntas.length * 0.7
                      ? 'Buen trabajo. Has respondido correctamente a la mayoría de las preguntas. Sigue practicando para mejorar.'
                      : 'Has completado la actividad. Te recomendamos repasar las operaciones con números naturales y volver a intentarlo.'
                  }
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => {
                    setPreguntas([])
                    setPreguntaActual(0)
                    setRespuestaUsuario('')
                    setEstadoRespuesta('pendiente')
                    setMostrarExplicacion(false)
                    setPuntuacion(0)
                    setActividadCompletada(false)
                    // Recargar preguntas
                    setTimeout(() => {
                      const generarPreguntas = (): Pregunta[] => {
                        const tipos: ('suma' | 'resta' | 'multiplicacion' | 'division')[] = ['suma', 'resta', 'multiplicacion', 'division']
                        const preguntasGeneradas: Pregunta[] = []
                        
                        for (let i = 0; i < 10; i++) {
                          const tipo = tipos[Math.floor(Math.random() * tipos.length)]
                          let num1: number
                          let num2: number
                          let respuestaCorrecta: number
                          
                          switch (tipo) {
                            case 'suma':
                              num1 = Math.floor(Math.random() * 100) + 1
                              num2 = Math.floor(Math.random() * 100) + 1
                              respuestaCorrecta = num1 + num2
                              preguntasGeneradas.push({
                                id: i + 1,
                                enunciado: `Calcula la suma de ${num1} + ${num2}`,
                                tipo,
                                num1,
                                num2,
                                respuestaCorrecta,
                                explicacion: `Para sumar ${num1} + ${num2}, simplemente sumamos las unidades y luego las decenas, obteniendo ${respuestaCorrecta}.`
                              })
                              break
                              
                            case 'resta':
                              num1 = Math.floor(Math.random() * 100) + 50
                              num2 = Math.floor(Math.random() * 50) + 1
                              respuestaCorrecta = num1 - num2
                              preguntasGeneradas.push({
                                id: i + 1,
                                enunciado: `Calcula la resta de ${num1} - ${num2}`,
                                tipo,
                                num1,
                                num2,
                                respuestaCorrecta,
                                explicacion: `Para restar ${num1} - ${num2}, restamos las unidades y luego las decenas, obteniendo ${respuestaCorrecta}.`
                              })
                              break
                              
                            case 'multiplicacion':
                              num1 = Math.floor(Math.random() * 12) + 1
                              num2 = Math.floor(Math.random() * 12) + 1
                              respuestaCorrecta = num1 * num2
                              preguntasGeneradas.push({
                                id: i + 1,
                                enunciado: `Calcula la multiplicación de ${num1} × ${num2}`,
                                tipo,
                                num1,
                                num2,
                                respuestaCorrecta,
                                explicacion: `Para multiplicar ${num1} × ${num2}, podemos usar la tabla de multiplicar o multiplicar por unidades y decenas, obteniendo ${respuestaCorrecta}.`
                              })
                              break
                              
                            case 'division':
                              num2 = Math.floor(Math.random() * 10) + 1
                              respuestaCorrecta = Math.floor(Math.random() * 10) + 1
                              num1 = num2 * respuestaCorrecta
                              preguntasGeneradas.push({
                                id: i + 1,
                                enunciado: `Calcula la división de ${num1} ÷ ${num2}`,
                                tipo,
                                num1,
                                num2,
                                respuestaCorrecta,
                                explicacion: `Para dividir ${num1} ÷ ${num2}, podemos pensar en cuántas veces cabe ${num2} en ${num1}, que es ${respuestaCorrecta}.`
                              })
                              break
                          }
                        }
                        
                        return preguntasGeneradas
                      }
                      
                      setPreguntas(generarPreguntas())
                    }, 100)
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Volver a intentar
                </Button>
                <Button 
                  onClick={() => navigate('/modulos/aritmetica/actividades')}
                  variant="outline"
                >
                  Volver a actividades
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <button 
              onClick={() => navigate("/modulos/aritmetica/actividades")}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver a actividades
            </button>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate("/modulos/aritmetica/guia-numeros-naturales")}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ver guía de estudio
              </button>
              <button 
                onClick={() => navigate("/modulos/aritmetica/calculadora-interactiva")}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Usar calculadora
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
