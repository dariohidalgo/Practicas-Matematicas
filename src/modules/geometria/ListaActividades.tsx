import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Award, CheckCircle } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import { useProgress } from "../../contexts/progress-context"
import ModuleHeader from "../../components/ModuleHeader"

export default function ListaActividadesGeometria() {
  const { user, loading: authLoading } = useAuth()
  const { progress } = useProgress()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Show loading state while checking authentication
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Get activity progress for this module
  const actividadesCompletadas = progress?.activities?.geometria || {}
  const moduleProgress = progress?.moduleProgress?.geometria || 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-50 pb-16">
      {/* Header */}
      <ModuleHeader title="Actividades de Geometría" backPath="/modulos/geometria">
        <div className="ml-auto flex items-center gap-2">
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Award className="w-3.5 h-3.5 mr-1" />
            {moduleProgress}% completado
          </div>
        </div>
      </ModuleHeader>

      {/* Module Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["actividad-1","actividad-2","actividad-3"].map((_, idx) => {
            const actividades = [
              {
                id: "actividad-1",
                titulo: "Cálculo del área de un triángulo",
                descripcion: "Aprende a calcular el área de un triángulo utilizando la fórmula correcta.",
                path: "/modulos/geometria/actividad-1"
              },
              {
                id: "actividad-2",
                titulo: "Perímetro de figuras planas",
                descripcion: "Aprende a calcular el perímetro de diferentes figuras geométricas.",
                path: "/modulos/geometria/actividad-2"
              },
              {
                id: "actividad-3",
                titulo: "Volumen de cuerpos geométricos",
                descripcion: "Aprende a calcular el volumen de diferentes cuerpos geométricos.",
                path: "/modulos/geometria/actividad-3"
              }
            ];
            const actividad = actividades[idx];
            const isCompleted = actividadesCompletadas[actividad.id]?.completed || false;
            return (
              <div className="bg-white rounded-xl shadow-md overflow-hidden" key={actividad.id}>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{actividad.titulo}</h2>
                  <p className="text-gray-600 mb-4">{actividad.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <button
                      className={`bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded font-semibold ${isCompleted ? 'bg-blue-400 hover:bg-blue-500' : ''}`}
                      onClick={() => navigate(actividad.path)}
                    >
                      {isCompleted ? 'Repetir' : 'Comenzar'}
                    </button>
                    {isCompleted && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Completado</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  )
}
