import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'
import PizarraPaint from '../../components/ui/PizarraPaint'
import { Lightbulb } from 'lucide-react'

const ejercicios = [
  {
    pregunta: '¿Cuánto es 2/3 ÷ 1/4?',
    respuesta: '8/3'
  },
  {
    pregunta: '¿Cuánto es 5/6 ÷ 2/3?',
    respuesta: '5/4'
  },
  {
    pregunta: '¿Cuánto es 7/8 ÷ 1/2?',
    respuesta: '7/4'
  }
]

export default function Actividad3NumerosRacionales() {
  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)
  const { updateActivityProgress, addPoints } = useProgress()
  const location = useLocation()
  
  // Obtener el ID de la actividad de la ruta actual
  const actividadId = location.pathname.split('/').pop() || 'actividad-3'

  const checkAnswers = async () => {
    let correctas = 0
    const incorrectas: number[] = []
    respuestas.forEach((resp, i) => {
      if (resp.trim().replace(/\s/g, '') === ejercicios[i].respuesta) {
        correctas++
      } else {
        incorrectas.push(i)
      }
    })
    setRespuestasIncorrectas(incorrectas)
    if (correctas === ejercicios.length) {
      setResultado('¡Muy bien! Respondiste correctamente todas las divisiones.')
      await updateActivityProgress('numerosRacionales', actividadId, { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Respondiste correctamente ${correctas} de ${ejercicios.length} divisiones. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <ModuleHeader title="Actividad 3: División de fracciones" backPath="/modulos/numeros-racionales/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-green-700">Resuelve las siguientes divisiones de fracciones</h2>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); checkAnswers() }}>
            {ejercicios.map((ej, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1 font-medium">{ej.pregunta}</label>
                  <input
                    type="text"
                    className={`border-2 rounded px-3 py-2 w-48 text-black ${
                      respuestasIncorrectas.includes(i) 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-800'
                    }`}
                    placeholder="Respuesta (ej: 1/2)"
                    value={respuestas[i]}
                    onChange={e => {
                      const nuevas = [...respuestas]
                      nuevas[i] = e.target.value
                      setRespuestas(nuevas)
                      if (respuestasIncorrectas.includes(i)) {
                        setRespuestasIncorrectas(respuestasIncorrectas.filter(index => index !== i))
                      }
                    }}
                  />
                  {respuestasIncorrectas.includes(i) && (
                    <p className="text-red-500 text-sm mt-1">
                      Respuesta incorrecta. Intenta de nuevo.
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Verificar respuestas</Button>
              <Button type="button" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setOpenCalc(true)}>
                Usar calculadora
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? "Ocultar pista" : "Mostrar pista"}
              </Button>
            </div>
          </form>
          {showHint && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 mt-6">
              <h4 className="font-medium text-blue-800 mb-2">Pista para dividir fracciones:</h4>
              <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                <li>Para dividir fracciones, multiplica la primera fracción por el inverso de la segunda</li>
                <li>El inverso de una fracción se obtiene intercambiando el numerador y el denominador</li>
                <li>Por ejemplo: a/b ÷ c/d = a/b × d/c</li>
                <li>Finalmente, simplifica la fracción resultante si es posible</li>
              </ul>
            </div>
          )}
          <PizarraPaint />
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {respuestas.every((resp, i) => resp.trim().replace(/\s/g, '') === ejercicios[i].respuesta) && (
                <Link to="/modulos/numeros-racionales/actividades">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Volver a actividades
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal open={openCalc} onClose={() => setOpenCalc(false)}>
        <CalculadoraInteractiva sinHeader />
      </Modal>
    </main>
  )
} 