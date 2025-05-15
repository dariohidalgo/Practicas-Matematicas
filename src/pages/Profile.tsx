import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Star, Trophy } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { useProgress } from '../contexts/progress-context'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { SEO } from '../components/seo/SEO'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { progress } = useProgress()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (!user) return null

  const totalProgress = Object.values(progress.moduleProgress).reduce(
    (acc, curr) => acc + curr,
    0
  ) / Object.keys(progress.moduleProgress).length

  return (
    <>
      <SEO 
        title="Mi Perfil" 
        description="Gestiona tu perfil de usuario y visualiza tu progreso en la plataforma educativa Elena."
        keywords="perfil, usuario, progreso, matemáticas, educación"
        url="https://matematicas-732ff.web.app/profile"
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Perfil */}
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">{user.email?.[0].toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-semibold">{user.email}</h2>
              <Button
                variant="outline"
                className="mt-6"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          </Card>

          {/* Estadísticas */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Puntos totales</p>
                    <p className="text-2xl font-bold">{progress.points}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Progreso total</p>
                    <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Nivel</p>
                    <p className="text-2xl font-bold">{Math.floor(progress.points / 100) + 1}</p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-medium mb-4">Progreso por módulo</h4>
            <div className="space-y-4">
              {Object.entries(progress.moduleProgress).map(([module, progress]) => (
                <div key={module}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{module}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}
