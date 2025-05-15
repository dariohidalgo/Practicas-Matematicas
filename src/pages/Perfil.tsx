import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Ruler, Percent, ChevronLeft, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { useProgress } from '../contexts/progress-context'
import { Progress } from '../components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

// Usar los mismos módulos que en el Dashboard
const modules = [
  {
    id: 'aritmetica',
    name: 'Aritmética',
    description: 'Aprende sobre operaciones aritméticas básicas',
    icon: TrendingUp,
    color: 'text-amber-500 bg-amber-100',
    bgColor: 'bg-amber-100',
    path: '/modulos/aritmetica'
  },
  {
    id: 'numerosNaturales',
    name: 'Números Naturales',
    description: 'Aprende sobre números naturales y sus operaciones',
    icon: TrendingUp,
    color: 'text-orange-500 bg-orange-100',
    bgColor: 'bg-orange-100',
    path: '/modulos/numeros-naturales'
  },
  {
    id: 'proporcionalidad',
    name: 'Proporcionalidad',
    description: 'Descubre las relaciones de proporcionalidad',
    icon: Percent,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    path: '/modulos/proporcionalidad'
  },
  {
    id: 'geometria',
    name: 'Geometría',
    description: 'Explora formas y figuras geométricas',
    icon: Ruler,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    path: '/modulos/geometria'
  },
  {
    id: 'medida',
    name: 'Medida',
    description: 'Aprende sobre unidades y mediciones',
    icon: Ruler,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    path: '/modulos/medida'
  },
  {
    id: 'numerosRacionales',
    name: 'Números Racionales',
    description: 'Trabaja con fracciones y decimales',
    icon: TrendingUp,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
    path: '/modulos/numeros-racionales'
  }
]

export default function Perfil() {
  const navigate = useNavigate()
  const { user, logout, loading: authLoading } = useAuth()
  const { progress, loading: progressLoading } = useProgress()
  const [activeTab, setActiveTab] = useState('progreso')

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
          <Tabs defaultValue="progreso" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="progreso">Progreso por módulo</TabsTrigger>
              <TabsTrigger value="actividades">Actividades completadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progreso" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                {modules.map((module) => {
                  const moduleProgress = progress.moduleProgress[module.id] || 0
                  const ModuleIcon = module.icon
                  
                  return (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className={`${module.bgColor} p-6 flex items-center justify-center md:w-1/5`}>
                          <ModuleIcon className={`h-12 w-12 ${module.color.split(' ')[0]}`} />
                        </div>
                        <div className="p-6 md:w-4/5 text-gray-900">
                          <CardTitle>{module.name}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                          
                          <div className="mt-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">Progreso</span>
                              <span className="text-sm font-medium">{moduleProgress}%</span>
                            </div>
                            <Progress value={moduleProgress} className="h-2" />
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4 text-white"
                            onClick={() => navigate(module.path)}
                          >
                            Ir al módulo
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="actividades" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                {modules.map((module) => {
                  const moduleActivities = progress.activityProgress[module.id] || {}
                  const activitiesCount = Object.keys(moduleActivities).length
                  
                  if (activitiesCount === 0) return null
                  
                  return (
                    <Card key={module.id} className="overflow-hidden">
                      <CardHeader className={module.bgColor}>
                        <CardTitle className="text-gray-700">{module.name}</CardTitle>
                        <CardDescription className="text-gray-700">
                          Actividades completadas
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {Object.entries(moduleActivities).map(([activityId, activity]) => (
                            <div key={activityId} className="flex justify-between items-center text-gray-900">
                              <div className="flex items-center">
                                {activity.completed ? (
                                  <div className="h-4 w-4 rounded-full bg-green-500 mr-3"></div>
                                ) : (
                                  <div className="h-4 w-4 rounded-full bg-gray-900 mr-3"></div>
                                )}
                                <span className="text-gray-900">Actividad {activityId.split('-')[1]}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-semibold">{activity.score} puntos</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
