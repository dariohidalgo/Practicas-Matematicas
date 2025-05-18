import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'
import PizarraPaint from '../../components/ui/PizarraPaint'

const ejercicios = [
  {
    pregunta: '¿Cuántos centímetros hay en 1 metro?',
    respuesta: '100'
  },
  {
    pregunta: '¿Cuántos milímetros hay en 2 centímetros?',
    respuesta: '20'
  },
  {
    pregunta: '¿Cuántos metros hay en 500 centímetros?',
    respuesta: '5'
  },
  {
    pregunta: '¿Cuántos kilómetros hay en 3000 metros?',
    respuesta: '3'
  }
]

export default function ActividadMedida() {
  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const { updateActivityProgress, addPoints, progress } = useProgress()

  useEffect(() => {
    // Verificar si la actividad ya está completada
    const actividadActual = progress.activityProgress.medida?.['actividad-1']
    if (actividadActual?.completed) {
      setIsCompleted(true)
      setResultado('¡Ya has completado esta actividad! Puedes repetirla si lo deseas.')
    }
  }, [progress])

  const checkAnswers = async () => {
    setIsLoading(true)
    try {
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
      const score = Math.round((correctas / ejercicios.length) * 100)
      
      if (correctas === ejercicios.length) {
        setResultado('¡Muy bien! Respondiste correctamente todas las conversiones de longitud.')
        await updateActivityProgress('medida', 'actividad-1', { 
          completed: true, 
          score: score
        })
        await addPoints(10)
        setIsCompleted(true)
      } else {
        setResultado(`Respondiste correctamente ${correctas} de ${ejercicios.length}. ¡Intenta de nuevo!`)
        await updateActivityProgress('medida', 'actividad-1', { 
          completed: false, 
          score: score
        })
      }
    } catch (error) {
      console.error("Error al actualizar el progreso:", error)
      alert("Hubo un error al guardar tu progreso. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 pb-16">
      <ModuleHeader 
        title="Actividad 1: Conversión de longitud" 
        backPath="/modulos/medida/actividades"
      />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Convierte las siguientes unidades de longitud</h2>
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
                    disabled={isLoading}
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
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Guardando...' : 'Verificar respuestas'}
              </Button>
              <Button 
                type="button" 
                className="bg-purple-600 hover:bg-purple-700 text-white" 
                onClick={() => setOpenCalc(true)}
                disabled={isLoading}
              >
                Usar calculadora
              </Button>
            </div>
          </form>
          <PizarraPaint />
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {isCompleted && (
                <div className="flex gap-4">
                  <Link to="/modulos/medida/actividades">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Volver a actividades
                    </Button>
                  </Link>
                  <Link to="/modulos/medida/actividad-2">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Siguiente actividad
                    </Button>
                  </Link>
                </div>
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
