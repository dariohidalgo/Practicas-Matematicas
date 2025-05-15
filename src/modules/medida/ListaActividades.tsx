import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, Award, CheckCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useAuth } from "../../contexts/auth-context"
import { useProgress } from "../../contexts/progress-context"
import ModuleHeader from "../../components/ModuleHeader"
import { SEO } from "../../components/seo/SEO"

export default function ListaActividadesMedida() {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Get activity progress for this module
  const actividadesCompletadas = progress?.activities?.medida || {}
  const moduleProgress = progress?.moduleProgress?.medida || 0

  return (
    <>
      <SEO 
        title="Lista de Actividades de Medida | Ejercicios Prácticos" 
        description="Accede a todas las actividades y ejercicios del módulo de medida. Practica la conversión de unidades y resuelve problemas de medición."
        keywords="actividades, medida, ejercicios, conversión, unidades, matemáticas, educación"
        url="https://matematicas-732ff.web.app/modulos/medida/actividades"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-16">
      {/* Header */}
      <ModuleHeader title="Actividades de Medida" backPath="/modulos/medida">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Award className="w-3.5 h-3.5 mr-1" />
            {moduleProgress}% completado
          </div>
        </div>
      </ModuleHeader>

      {/* Module Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actividad 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Conversiones de unidades de longitud</h2>
              <p className="text-gray-600 mb-4">
                Aprende a convertir entre diferentes unidades de longitud del sistema métrico.
              </p>
              <div className="flex items-center justify-between">
                <Link to="/modulos/medida/actividad-1">
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Comenzar
                  </Button>
                </Link>
                {actividadesCompletadas["actividad-1"]?.completed && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Completado</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actividad 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Unidades de superficie</h2>
              <p className="text-gray-600 mb-4">
                Aprende a convertir entre diferentes unidades de superficie.
              </p>
              <div className="flex items-center justify-between">
                <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700" disabled>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Próximamente
                </Button>
              </div>
            </div>
          </div>

          {/* Actividad 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Unidades de volumen y capacidad</h2>
              <p className="text-gray-600 mb-4">
                Aprende a convertir entre unidades de volumen y capacidad.
              </p>
              <div className="flex items-center justify-between">
                <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700" disabled>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Próximamente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
