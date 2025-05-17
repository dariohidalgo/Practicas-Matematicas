import { useEffect } from "react"
import {  useNavigate } from "react-router-dom"
import {  Award, CheckCircle } from "lucide-react"

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
          {["actividad-1","actividad-2","actividad-3"].map((_, idx) => {
            const actividades = [
              {
                id: "actividad-1",
                titulo: "Conversiones de unidades de longitud",
                descripcion: "Aprende a convertir entre diferentes unidades de longitud del sistema métrico.",
                path: "/modulos/medida/actividad-1"
              },
              {
                id: "actividad-2",
                titulo: "Conversión de unidades",
                descripcion: "Aprende a convertir entre diferentes unidades de medida.",
                path: "/modulos/medida/actividad-2"
              },
              {
                id: "actividad-3",
                titulo: "Problemas de medida",
                descripcion: "Resuelve problemas prácticos usando diferentes unidades de medida.",
                path: "/modulos/medida/actividad-3"
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
                      className={`bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded font-semibold ${isCompleted ? 'bg-purple-400 hover:bg-purple-500' : ''}`}
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
    </>
  )
}
