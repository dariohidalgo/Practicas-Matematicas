import { useState } from 'react'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { useProgress } from '../../contexts/progress-context'

const figuras = [
  { nombre: 'Triángulo', svg: <svg width="60" height="60"><polygon points="30,10 10,50 50,50" fill="#fbbf24" stroke="#333" strokeWidth="2" /></svg> },
  { nombre: 'Cuadrado', svg: <svg width="60" height="60"><rect x="10" y="10" width="40" height="40" fill="#60a5fa" stroke="#333" strokeWidth="2" /></svg> },
  { nombre: 'Círculo', svg: <svg width="60" height="60"><circle cx="30" cy="30" r="20" fill="#34d399" stroke="#333" strokeWidth="2" /></svg> },
  { nombre: 'Rectángulo', svg: <svg width="60" height="60"><rect x="5" y="20" width="50" height="25" fill="#f472b6" stroke="#333" strokeWidth="2" /></svg> },
]

export default function Actividad1Geometria() {
  const [respuestas, setRespuestas] = useState(Array(figuras.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const { updateActivityProgress, addPoints } = useProgress()

  const nombresValidos = [
    ['triángulo', 'triangulo'],
    ['cuadrado'],
    ['círculo', 'circulo'],
    ['rectángulo', 'rectangulo']
  ]

  const checkAnswers = async () => {
    let correctas = 0
    const incorrectas: number[] = []
    respuestas.forEach((resp, i) => {
      if (nombresValidos[i].includes(resp.trim().toLowerCase())) {
        correctas++
      } else {
        incorrectas.push(i)
      }
    })
    setRespuestasIncorrectas(incorrectas)
    if (correctas === figuras.length) {
      setResultado('¡Muy bien! Identificaste todas las figuras correctamente.')
      await updateActivityProgress('geometria', 'actividad-1', { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Identificaste ${correctas} de ${figuras.length} figuras correctamente. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      <ModuleHeader title="Actividad 1: Figuras geométricas planas" backPath="/modulos/geometria/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Identifica y nombra las siguientes figuras geométricas</h2>
          <p className="mb-6 text-gray-700">Observa cada figura y escribe su nombre en el recuadro correspondiente.</p>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); checkAnswers() }}>
            {figuras.map((fig, i) => (
              <div key={i} className="flex items-center gap-4">
                <div>{fig.svg}</div>
                <div className="flex-1">
                  <input
                    type="text"
                    className={`border-2 rounded px-3 py-2 w-48 text-black ${
                      respuestasIncorrectas.includes(i) 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-800'
                    }`}
                    placeholder="Nombre de la figura"
                    value={respuestas[i]}
                    onChange={e => {
                      const nuevas = [...respuestas]
                      nuevas[i] = e.target.value
                      setRespuestas(nuevas)
                      // Limpiar el estado de incorrecta cuando el usuario empieza a escribir
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Verificar respuestas</Button>
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpenCalc(true)}>
                Usar calculadora
              </Button>
            </div>
          </form>
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {respuestas.every((resp, i) => nombresValidos[i].includes(resp.trim().toLowerCase())) && (
                <Link to="/modulos/geometria/actividad-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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