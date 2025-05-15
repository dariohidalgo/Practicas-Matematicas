import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Award } from 'lucide-react'
import { useProgress } from '../../contexts/progress-context'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'

interface ModuleLayoutProps {
  children: ReactNode
  moduleId: string
  title: string
  description: string
  currentActivity?: number
  totalActivities: number
}

export function ModuleLayout({
  children,
  moduleId,
  title,
  description,
  currentActivity = 1,
  totalActivities
}: ModuleLayoutProps) {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const moduleProgress = progress.moduleProgress[moduleId] || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al dashboard
            </button>
            <Link to="/perfil">
              <Button variant="outline" size="icon">
                <Award className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Actividad {currentActivity} de {totalActivities}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">{moduleProgress}% completado</span>
            </div>
            <Progress value={moduleProgress} className="h-2" />
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
