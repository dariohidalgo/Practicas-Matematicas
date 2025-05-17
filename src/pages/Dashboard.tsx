import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Award, TrendingUp, Ruler, Percent, Search } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { useProgress } from '../contexts/progress-context'
import { SEO } from '../components/seo/SEO'
import { Progress } from '../components/ui/progress'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { AchievementCard, StreakCard } from '../components/dashboard'
import { TourGuide } from '../components/TourGuide'

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

const achievements = [
  {
    id: 'first-module',
    title: 'Primer módulo completado',
    description: 'Completa tu primer módulo',
    type: 'activities' as const,
    progress: 0,
    goal: 1,
    completed: false
  },
  {
    id: 'points-100',
    title: 'Primeros 100 puntos',
    description: 'Gana tus primeros 100 puntos',
    type: 'points' as const,
    progress: 0,
    goal: 100,
    completed: false
  },
  {
    id: 'streak-7',
    title: 'Racha semanal',
    description: 'Mantén una racha de 7 días',
    type: 'streak' as const,
    progress: 0,
    goal: 7,
    completed: false
  }
]


export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { progress, loading: progressLoading } = useProgress()
  const [searchQuery, setSearchQuery] = useState('')
  const [userAchievements, setUserAchievements] = useState(achievements)
  const tourRef = useRef<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (progress) {
      setUserAchievements(prev => prev.map(achievement => {
        switch (achievement.id) {
          case 'points-100':
            return {
              ...achievement,
              progress: progress.points || 0,
              completed: (progress.points || 0) >= achievement.goal
            }
          case 'first-module':
            const completedModules = Object.values(progress.moduleProgress || {}).filter(p => p === 100).length
            return {
              ...achievement,
              progress: completedModules,
              completed: completedModules >= achievement.goal
            }
          default:
            return achievement
        }
      }))
    }
  }, [progress])

  if (authLoading || progressLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">Cargando...</div>
    )
  }

  const normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  const filteredModules = modules.filter(module => {
    const normalizedQuery = normalizeText(searchQuery);
    const normalizedName = normalizeText(module.name);
    const normalizedDescription = normalizeText(module.description);

    return normalizedName.includes(normalizedQuery) || 
           normalizedDescription.includes(normalizedQuery);
  })

  const tourSteps = [
    {
      element: "#tour-header",
      popover: {
        title: "Barra de Navegación",
        description: "Aquí encontrarás los módulos principales de la aplicación",
        position: "bottom" as const
      }
    },
    {
      element: "#tour-modulo-aritmetica",
      popover: {
        title: "Tus módulos",
        description: "Aquí puedes acceder a los diferentes módulos de matemáticas. Haz clic en cualquiera para comenzar a aprender.",
        position: "top" as const
      }
    },
    {
      element: "#dashboard-perfil-link",
      popover: {
        title: "Perfil",
        description: "Administra tu información personal y configuración",
        position: "left" as const
      }
    }
  ];

  return (
    <>
      <SEO 
        title="Dashboard" 
        description="Accede a todos tus módulos de matemáticas y revisa tu progreso en la plataforma educativa."
        keywords="dashboard, matemáticas, módulos, progreso, aprendizaje"
        url="https://matematicas-732ff.web.app/dashboard"
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        <header id="tour-header" className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">Mis módulos</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Puntos totales</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{progress?.points || 0}</p>
                </div>
                <Link to="/perfil">
                  <Button variant="outline" size="icon" id="dashboard-perfil-link">
                    <Award className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex items-center">
                  <div className="mr-3 hidden sm:block">
                    <h2 className="text-sm font-semibold text-gray-800 text-right">
                      ¡Bienvenido{user?.displayName ? `, ${user.displayName}` : ''}!
                    </h2>
                    <p className="text-xs text-gray-500 text-right">{user?.email}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        alt="Avatar del usuario"
                        className="h-10 w-10 rounded-full border-2 border-green-400"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg border-2 border-green-400">
                        {user.email ? user.email[0].toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-6 flex items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="tour-buscador"
                  type="text"
                  placeholder="Buscar módulos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <StreakCard />
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-3 md:mb-4">Logros</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {userAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredModules.map((module) => {
                const ModuleIcon = module.icon
                const moduleProgress = progress?.moduleProgress?.[module.id] || 0
                return (
                  <Card key={module.id} id={`tour-modulo-${module.id}`} className="hover:shadow-lg transition-shadow">
                    <Link to={module.path}>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center">
                          <div className={`p-2 md:p-3 rounded-full ${module.color} bg-opacity-10`}>
                            <ModuleIcon className={`h-5 w-5 md:h-6 md:w-6 ${module.color}`} />
                          </div>
                          <h3 className="ml-3 text-lg md:text-xl font-semibold text-gray-900">{module.name}</h3>
                        </div>
                        <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600">{module.description}</p>
                        <div className="mt-3 md:mt-4">
                          <div className="flex justify-between items-center text-xs md:text-sm mb-1">
                            <span className="text-gray-600">Progreso</span>
                            <span className="font-medium">{moduleProgress}%</span>
                          </div>
                          <Progress value={moduleProgress} className="h-2" />
                        </div>
                      </div>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
      <TourGuide ref={tourRef} steps={tourSteps} tourKey="main-tour" />
      <button
        onClick={() => tourRef.current?.startTour()}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm"
        aria-label="Repetir tour"
      >
        Repetir tour
      </button>
    </>
  )
}
