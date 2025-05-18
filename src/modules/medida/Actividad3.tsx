import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useProgress } from '../../contexts/progress-context';
import ModuleHeader from '../../components/ModuleHeader';
import PizarraPaint from '../../components/ui/PizarraPaint';

const preguntas = [
  {
    enunciado: 'Un cable mide 2.5 metros y necesitas cortarlo en trozos de 25 centímetros. ¿Cuántos trozos puedes obtener?',
    respuesta: '10'
  },
  {
    enunciado: 'Una piscina tiene 1.2 metros de profundidad. ¿Cuántos milímetros son?',
    respuesta: '1200'
  },
  {
    enunciado: 'Un lápiz mide 175 milímetros. ¿Cuántos centímetros mide?',
    respuesta: '17.5'
  },
  {
    enunciado: 'Si una cuerda mide 3 metros y cortas 80 centímetros, ¿cuántos centímetros quedan?',
    respuesta: '220'
  }
];

const descripcion = 'Resuelve los siguientes problemas aplicando conversiones de unidades en situaciones de la vida real.';

const Actividad3 = () => {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(''));
  const [resultado, setResultado] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([]);
  const { updateActivityProgress, addPoints, progress } = useProgress();

  useEffect(() => {
    const actividad = progress.activityProgress.medida?.['actividad-3'];
    if (actividad?.completed) {
      setIsCompleted(true);
      setResultado('¡Ya has completado esta actividad! Puedes repetirla si lo deseas.');
    }
  }, [progress]);

  const checkAnswers = async () => {
    setIsLoading(true);
    try {
      let correctas = 0;
      const incorrectas: number[] = [];
      respuestas.forEach((resp, i) => {
        if (resp.trim() === preguntas[i].respuesta) {
          correctas++;
        } else {
          incorrectas.push(i);
        }
      });
      setRespuestasIncorrectas(incorrectas);
      const score = Math.round((correctas / preguntas.length) * 100);
      if (correctas === preguntas.length) {
        setResultado('¡Muy bien! Respondiste correctamente todos los problemas.');
        await updateActivityProgress('medida', 'actividad-3', { completed: true, score });
        await addPoints(10);
        setIsCompleted(true);
      } else {
        setResultado(`Respondiste correctamente ${correctas} de ${preguntas.length}. ¡Intenta de nuevo!`);
        await updateActivityProgress('medida', 'actividad-3', { completed: false, score });
      }
    } catch (error) {
      alert('Error al guardar el progreso.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 pb-16">
      <ModuleHeader 
        title="Actividad 3: Problemas de aplicación con medidas" 
        backPath="/modulos/medida/actividades"
      />
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-6 mt-8 mx-auto">
        <h2 className="text-xl font-bold mb-4 text-black">Actividad 3: Problemas de aplicación con medidas</h2>
        <p className="mb-4 text-black">{descripcion}</p>
        <form onSubmit={e => { e.preventDefault(); checkAnswers(); }} className="flex flex-col gap-6">
          {preguntas.map((preg, i) => (
            <div key={i} className="flex flex-col">
              <label className="mb-1 text-black font-medium">{preg.enunciado}</label>
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
                  const nuevas = [...respuestas];
                  nuevas[i] = e.target.value;
                  setRespuestas(nuevas);
                  if (respuestasIncorrectas.includes(i)) {
                    setRespuestasIncorrectas(respuestasIncorrectas.filter(index => index !== i));
                  }
                }}
                disabled={isLoading}
              />
              {respuestasIncorrectas.includes(i) && (
                <p className="text-red-600 text-sm mt-1">Respuesta incorrecta. Intenta de nuevo.</p>
              )}
            </div>
          ))}
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Verificar respuestas'}
            </Button>
          </div>
        </form>
        <PizarraPaint />
        {resultado && (
          <div className="mt-6">
            <div className={`text-lg font-semibold ${isCompleted ? 'text-green-700' : 'text-red-600'} mb-4 text-black`}>{resultado}</div>
            {isCompleted && (
              <div className="flex gap-4">
                <Link to="/modulos/medida/actividades">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Volver a actividades
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Actividad3;
