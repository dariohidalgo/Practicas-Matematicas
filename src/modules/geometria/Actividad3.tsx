import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/ui/Modal'
import CalculadoraInteractiva from '../aritmetica/CalculadoraInteractiva'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { useProgress } from '../../contexts/progress-context'
import PizarraPaint from '../../components/ui/PizarraPaint'

const cuerpos = [
  {
    nombre: 'Cubo',
    svg: <svg width="100" height="100" viewBox="0 0 100 100">
      <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="#60a5fa" stroke="#333" strokeWidth="2" />
      <path d="M20,20 L20,80" stroke="#333" strokeWidth="2" />
      <path d="M80,20 L80,80" stroke="#333" strokeWidth="2" />
    </svg>,
    arista: 4,
    respuesta: 64
  },
  {
    nombre: 'Prisma Rectangular',
    svg: <svg width="100" height="100" viewBox="0 0 100 100">
      <path d="M20,20 L80,20 L80,60 L20,60 Z" fill="#f472b6" stroke="#333" strokeWidth="2" />
      <path d="M20,20 L20,60" stroke="#333" strokeWidth="2" />
      <path d="M80,20 L80,60" stroke="#333" strokeWidth="2" />
    </svg>,
    largo: 5,
    ancho: 3,
    alto: 4,
    respuesta: 60
  },
  {
    nombre: 'Cilindro',
    svg: <svg width="100" height="100" viewBox="0 0 100 100">
      <ellipse cx="50" cy="30" rx="30" ry="10" fill="#fbbf24" stroke="#333" strokeWidth="2" />
      <ellipse cx="50" cy="70" rx="30" ry="10" fill="#fbbf24" stroke="#333" strokeWidth="2" />
      <path d="M20,30 L20,70" stroke="#333" strokeWidth="2" />
      <path d="M80,30 L80,70" stroke="#333" strokeWidth="2" />
    </svg>,
    radio: 3,
    altura: 5,
    respuesta: 141.37 // π * r² * h = π * 9 * 5 ≈ 141.37
  }
]

export default function Actividad3Geometria() {
  const [respuestas, setRespuestas] = useState(Array(cuerpos.length).fill(''))
  const [resultado, setResultado] = useState<string | null>(null)
  const [openCalc, setOpenCalc] = useState(false)
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([])
  const { updateActivityProgress, addPoints } = useProgress()

  const checkAnswers = async () => {
    let correctas = 0
    const incorrectas: number[] = []
    respuestas.forEach((resp, i) => {
      const respuestaUsuario = parseFloat(resp.trim())
      if (!isNaN(respuestaUsuario)) {
        if (i === 2) {
          if (Math.abs(respuestaUsuario - cuerpos[i].respuesta) <= 0.5) {
            correctas++
          } else {
            incorrectas.push(i)
          }
        } else {
          if (respuestaUsuario === cuerpos[i].respuesta) {
            correctas++
          } else {
            incorrectas.push(i)
          }
        }
      } else {
        incorrectas.push(i)
      }
    })
    setRespuestasIncorrectas(incorrectas)
    if (correctas === cuerpos.length) {
      setResultado('¡Muy bien! Calculaste correctamente todos los volúmenes.')
      await updateActivityProgress('geometria', 'actividad-3', { completed: true, score: 100 })
      await addPoints(10)
    } else {
      setResultado(`Calculaste correctamente ${correctas} de ${cuerpos.length} volúmenes. ¡Intenta de nuevo!`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      <ModuleHeader title="Actividad 3: Volumen de cuerpos geométricos" backPath="/modulos/geometria/actividades" />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Calcula el volumen de los siguientes cuerpos geométricos</h2>
          <p className="mb-6 text-gray-700">
            Observa cada cuerpo y calcula su volumen. Recuerda las fórmulas:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cubo: V = arista³</li>
              <li>Prisma rectangular: V = largo × ancho × alto</li>
              <li>Cilindro: V = π × radio² × altura</li>
            </ul>
          </p>
          <form className="space-y-8" onSubmit={e => { e.preventDefault(); checkAnswers() }}>
            {cuerpos.map((cuerpo, i) => (
              <div key={i} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-6">
                  <div>{cuerpo.svg}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{cuerpo.nombre}</h3>
                    <div className="space-y-2">
                      {cuerpo.nombre === 'Cubo' && (
                        <p className="text-gray-600">Arista = {cuerpo.arista} cm</p>
                      )}
                      {cuerpo.nombre === 'Prisma Rectangular' && (
                        <>
                          <p className="text-gray-600">Largo = {cuerpo.largo} cm</p>
                          <p className="text-gray-600">Ancho = {cuerpo.ancho} cm</p>
                          <p className="text-gray-600">Alto = {cuerpo.alto} cm</p>
                        </>
                      )}
                      {cuerpo.nombre === 'Cilindro' && (
                        <>
                          <p className="text-gray-600">Radio = {cuerpo.radio} cm</p>
                          <p className="text-gray-600">Altura = {cuerpo.altura} cm</p>
                          <p className="text-gray-600">π ≈ 3.1416</p>
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Volumen (en cm³):
                      </label>
                      <input
                        type="number"
                        step="0.01"
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
              {respuestas.every((resp, i) => {
                const respuestaUsuario = parseFloat(resp.trim())
                if (i === 2) {
                  return !isNaN(respuestaUsuario) && Math.abs(respuestaUsuario - cuerpos[i].respuesta) <= 0.5
                }
                return !isNaN(respuestaUsuario) && respuestaUsuario === cuerpos[i].respuesta
              }) && (
                <Link to="/modulos/geometria/actividades">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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