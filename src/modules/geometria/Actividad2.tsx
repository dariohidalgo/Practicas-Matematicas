import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'
import PizarraPaint from '../../components/ui/PizarraPaint'

const figuras = [
  {
    nombre: 'Cuadrado',
    svg: <svg width="100" height="100"><rect x="10" y="10" width="80" height="80" fill="#60a5fa" stroke="#333" strokeWidth="2" /></svg>,
    lado: 5,
    respuesta: 20
  },
  {
    nombre: 'Rectángulo',
    svg: <svg width="100" height="100"><rect x="10" y="20" width="80" height="60" fill="#f472b6" stroke="#333" strokeWidth="2" /></svg>,
    base: 6,
    altura: 4,
    respuesta: 20
  },
  {
    nombre: 'Triángulo',
    svg: <svg width="100" height="100"><polygon points="50,10 10,90 90,90" fill="#fbbf24" stroke="#333" strokeWidth="2" /></svg>,
    lado1: 5,
    lado2: 5,
    lado3: 6,
    respuesta: 16
  }
]

export default function Actividad2Geometria() {
  const [respuestas, setRespuestas] = useState(Array(figuras.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const { updateActivityProgress, addPoints } = useProgress()

  const checkAnswers = async () => {
    let correctas = 0
    const incorrectas: number[] = []
    respuestas.forEach((resp, i) => {
      const respuestaUsuario = parseInt(resp.trim())
      if (!isNaN(respuestaUsuario) && respuestaUsuario === figuras[i].respuesta) {
        correctas++
      } else {
        incorrectas.push(i)
      }
    })
    setRespuestasIncorrectas(incorrectas)
    if (correctas === figuras.length) {
      setResultado('¡Muy bien! Calculaste correctamente todos los perímetros.')
      await updateActivityProgress('geometria', 'actividad-2', { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Calculaste correctamente ${correctas} de ${figuras.length} perímetros. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      <ModuleHeader title="Actividad 2: Perímetro de figuras planas" backPath="/modulos/geometria/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Calcula el perímetro de las siguientes figuras</h2>
          <p className="mb-6 text-gray-700">
            Observa cada figura y calcula su perímetro. Recuerda que el perímetro es la suma de todos sus lados.
          </p>
          <form className="space-y-8" onSubmit={e => { e.preventDefault(); checkAnswers() }}>
            {figuras.map((fig, i) => (
              <div key={i} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-6">
                  <div>{fig.svg}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{fig.nombre}</h3>
                    <div className="space-y-2">
                      {fig.nombre === 'Cuadrado' && (
                        <p className="text-gray-600">Lado = {fig.lado} cm</p>
                      )}
                      {fig.nombre === 'Rectángulo' && (
                        <>
                          <p className="text-gray-600">Base = {fig.base} cm</p>
                          <p className="text-gray-600">Altura = {fig.altura} cm</p>
                        </>
                      )}
                      {fig.nombre === 'Triángulo' && (
                        <>
                          <p className="text-gray-600">Lado 1 = {fig.lado1} cm</p>
                          <p className="text-gray-600">Lado 2 = {fig.lado2} cm</p>
                          <p className="text-gray-600">Lado 3 = {fig.lado3} cm</p>
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Perímetro (en cm):
                      </label>
                      <input
                        type="number"
                        className={`border-2 rounded px-3 py-2 w-32 text-black ${
                          respuestasIncorrectas.includes(i) 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-800'
                        }`}
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
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-6">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Verificar respuestas
              </Button>
              <Button 
                type="button" 
                className="bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={() => setOpenCalc(true)}
              >
                Usar calculadora
              </Button>
            </div>
          </form>
          <PizarraPaint />
          {resultado && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-green-700 mb-4">{resultado}</div>
              {respuestas.every((resp, i) => parseInt(resp.trim()) === figuras[i].respuesta) && (
                <Link to="/modulos/geometria/actividad-3">
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