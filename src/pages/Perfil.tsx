import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Ruler, Percent, ChevronLeft, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { useProgress } from '../contexts/progress-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { SEO } from '../components/seo/SEO'
import { Progress } from '../components/ui/progress'
import { TourGuide } from '../components/TourGuide'

// Usar los mismos módulos que en el Dashboard
const modules = [
  {
    id: 'aritmetica',
    name: 'Aritmética',
    description: 'Aprende sobre operaciones aritméticas básicas',
    icon: TrendingUp,
    color: 'text-amber-500',
    path: '/modulos/aritmetica'
  },
  {
    id: 'numerosNaturales',
    name: 'Números Naturales',
    description: 'Aprende sobre números naturales y sus operaciones',
    icon: TrendingUp,
    color: 'text-orange-500',
    path: '/modulos/numeros-naturales'
  },
  {
    id: 'proporcionalidad',
    name: 'Proporcionalidad',
    description: 'Descubre las relaciones de proporcionalidad',
    icon: Percent,
    color: 'text-green-500',
    path: '/modulos/proporcionalidad'
  },
  {
    id: 'geometria',
    name: 'Geometría',
    description: 'Explora formas y figuras geométricas',
    icon: Ruler,
    color: 'text-blue-500',
    path: '/modulos/geometria'
  },
  {
    id: 'medida',
    name: 'Medida',
    description: 'Aprende sobre unidades y mediciones',
    icon: Ruler,
    color: 'text-purple-500',
    path: '/modulos/medida'
  },
  {
    id: 'numerosRacionales',
    name: 'Números Racionales',
    description: 'Trabaja con fracciones y decimales',
    icon: TrendingUp,
    color: 'text-pink-500',
    path: '/modulos/numeros-racionales'
  }
]

export default function Perfil() {
  const navigate = useNavigate()
  const { user, logout, loading: authLoading } = useAuth()
  const { progress, loading: progressLoading } = useProgress()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  // Calcular estadísticas generales
  const calculateStats = () => {
    if (!progress) return { totalProgress: 0, completedActivities: 0, totalActivities: 0 }

    const moduleIds = Object.keys(progress.moduleProgress || {})
    const totalModules = moduleIds.length

    let totalProgress = 0
    moduleIds.forEach(moduleId => {
      totalProgress += progress.moduleProgress[moduleId] || 0
    })

    const avgProgress = totalModules > 0 ? totalProgress / totalModules : 0

    // Contar actividades completadas
    let completedActivities = 0
    let totalActivities = 0

    Object.keys(progress.activityProgress || {}).forEach(moduleId => {
      const moduleActivities = progress.activityProgress[moduleId] || {}
      Object.keys(moduleActivities).forEach(activityId => {
        totalActivities++
        if (moduleActivities[activityId].completed) {
          completedActivities++
        }
      })
    })

    return { 
      totalProgress: avgProgress, 
      completedActivities, 
      totalActivities 
    }
  }

  const stats = calculateStats()

  // Mostrar spinner mientras se carga
  if (authLoading || progressLoading || !user || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Perfil de Usuario" 
        description="Gestiona tu perfil y visualiza tu progreso en la plataforma educativa."
        keywords="perfil, usuario, progreso, matemáticas, educación"
        url="https://matematicas-732ff.web.app/perfil"
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate(-1)}
                  className="mr-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={async () => {
                  await logout()
                  navigate('/login')
                }}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Información del usuario */}
            <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Avatar del usuario"
                    className="h-32 w-32 rounded-full border-4 border-green-400 shadow-lg"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-4xl border-4 border-green-400 shadow-lg">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.displayName || 'Estudiante'}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Puntos totales</p>
                      <p className="text-3xl font-bold text-green-600">{progress.points}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Actividades completadas</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.completedActivities}/{stats.totalActivities}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Progreso general</p>
                      <p className="text-3xl font-bold text-purple-600">{Math.round(stats.totalProgress)}%</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Tabs para diferentes secciones */}
            <Tabs defaultValue="progreso" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 gap-2">
                <TabsTrigger value="progreso">Progreso</TabsTrigger>
                <TabsTrigger value="logros">Logros</TabsTrigger>
              </TabsList>
              <TabsContent value="progreso" className="space-y-4">
                {/* Resumen general */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-black'>Resumen General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-500">Progreso General</div>
                        <div className="text-2xl font-bold text-green-600">{Math.round(stats.totalProgress)}%</div>
                      </div>
                      <Progress value={Math.round(stats.totalProgress)} className="h-3" />
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>{stats.completedActivities} de {stats.totalActivities} actividades completadas</div>
                        <div>{progress.points} puntos totales</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Módulos con progreso */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {modules.map((module) => (
                    <Card key={module.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          <div className="flex items-center gap-4 mx-4 text-black">
                            <module.icon className={`h-4 w-4 ${module.color}`} />
                            {module.name}
                          </div>
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500">
                          {module.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-500">Progreso</div>
                            <div className="text-xl font-bold text-black">
                              {progress.moduleProgress?.[module.id] || 0}%
                            </div>
                          </div>
                          <Progress 
                            value={progress.moduleProgress?.[module.id] || 0} 
                            className="h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="logros" className="space-y-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-500">Actividades completadas</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.completedActivities}/{stats.totalActivities}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-500">Progreso general</p>
                    <p className="text-3xl font-bold text-purple-600">{Math.round(stats.totalProgress)}%</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

        </main>
    </div>
    <TourGuide
      tourKey="dashboard-tour"
      steps={[
        {
          element: '#tour-header',
          popover: {
            title: 'Bienvenido al Dashboard',
            description: 'Aquí puedes ver tus módulos, puntos y perfil de usuario.',
            position: 'bottom'
          }
        }
      ]}
    />
  </>
)
}
