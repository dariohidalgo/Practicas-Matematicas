import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'

const ejercicios = [
  {
    pregunta: '¿Cuántos centímetros son 2 metros?',
    respuesta: '200'
  },
  {
    pregunta: '¿Cuántos milímetros son 5 centímetros?',
    respuesta: '50'
  },
  {
    pregunta: '¿Cuántos metros son 3 kilómetros?',
    respuesta: '3000'
  },
  {
    pregunta: '¿Cuántos gramos son 2 kilogramos?',
    respuesta: '2000'
  }
]

export default function Actividad2Medida() {
  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const { updateActivityProgress, addPoints } = useProgress()

  const checkAnswers = async () => {
    let correctas = 0
    const incorrectas: number[] = []
    respuestas.forEach((resp, i) => {
      if (resp.trim() === ejercicios[i].respuesta) {
        correctas++
      } else {
        incorrectas.push(i)
      }
    })
    setRespuestasIncorrectas(incorrectas)
    if (correctas === ejercicios.length) {
      setResultado('¡Muy bien! Respondiste correctamente todas las conversiones.')
      await updateActivityProgress('medida', 'actividad-2', { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Respondiste correctamente ${correctas} de ${ejercicios.length} conversiones. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 pb-16">
      <ModuleHeader title="Actividad 2: Conversión de unidades" backPath="/modulos/medida/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Convierte las siguientes unidades</h2>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); checkAnswers() }}>
            {ejercicios.map((ej, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1 font-medium">{ej.pregunta}</label>
                  <input
                    type="number"
                    className={`border-2 rounded px-3 py-2 w-48 text-black ${
                      respuestasIncorrectas.includes(i) 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-800'
                    }`}
                    placeholder="Respuesta"
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
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Verificar respuestas</Button>
              <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setOpenCalc(true)}>
                Usar calculadora
              </Button>
            </div>
          </form>
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {respuestas.every((resp, i) => resp.trim() === ejercicios[i].respuesta) && (
                <Link to="/modulos/medida/actividad-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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