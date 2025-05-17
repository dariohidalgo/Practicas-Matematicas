import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'

const ejercicios = [
  {
    pregunta: '¿Cuánto es 2/3 × 3/4?',
    respuesta: '1/2'
  },
  {
    pregunta: '¿Cuánto es 5/6 × 1/2?',
    respuesta: '5/12'
  },
  {
    pregunta: '¿Cuánto es 7/8 × 4/7?',
    respuesta: '1/2'
  }
]

export default function Actividad2NumerosRacionales() {
  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const { updateActivityProgress, addPoints } = useProgress()
  const location = useLocation()
  
  // Obtener el ID de la actividad de la ruta actual
  const actividadId = location.pathname.split('/').pop() || 'actividad-2'

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
      setResultado('¡Muy bien! Respondiste correctamente todas las multiplicaciones.')
      await updateActivityProgress('numerosRacionales', actividadId, { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Respondiste correctamente ${correctas} de ${ejercicios.length} multiplicaciones. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <ModuleHeader title="Actividad 2: Multiplicación de fracciones" backPath="/modulos/numeros-racionales/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-green-700">Resuelve las siguientes multiplicaciones de fracciones</h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-blue-800 mb-2">Pista para multiplicar fracciones:</h4>
            <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
              <li>Para multiplicar fracciones, multiplica los numeradores entre sí</li>
              <li>Luego multiplica los denominadores entre sí</li>
              <li>El resultado será una nueva fracción con el producto de los numeradores como numerador y el producto de los denominadores como denominador</li>
              <li>Finalmente, simplifica la fracción si es posible</li>
            </ul>
          </div>
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
            </div>
          </form>
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {respuestas.every((resp, i) => resp.trim().replace(/\s/g, '') === ejercicios[i].respuesta) && (
                <Link to="/modulos/numeros-racionales/actividad-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Siguiente actividad
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