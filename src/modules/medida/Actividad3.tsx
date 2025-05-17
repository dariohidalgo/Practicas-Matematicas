import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'

const ejercicios = [
  {
    pregunta: 'Si tienes 2,5 metros de cuerda y usas 1,2 metros, ¿cuántos metros te quedan?',
    respuesta: '1.3'
  },
  {
    pregunta: 'Un paquete pesa 750 gramos y otro 1,2 kilogramos. ¿Cuál es el peso total en gramos?',
    respuesta: '1950'
  },
  {
    pregunta: 'Si tienes una botella de 1,5 litros y bebes 600 mililitros, ¿cuántos mililitros quedan?',
    respuesta: '900'
  }
]

export default function Actividad3Medida() {
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
      setResultado('¡Muy bien! Resolviste correctamente todos los problemas.')
      await updateActivityProgress('medida', 'actividad-3', { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Resolviste correctamente ${correctas} de ${ejercicios.length} problemas. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 pb-16">
      <ModuleHeader title="Actividad 3: Problemas de medida" backPath="/modulos/medida/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Resuelve los siguientes problemas prácticos</h2>
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
                <Link to="/modulos/medida/actividades">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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