import { useProgress } from '../../contexts/progress-context'
import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { Trophy, Star, Award } from 'lucide-react'

interface ModuleProgressProps {
  moduleId: string
  totalActivities: number
  completedActivities: number
  earnedPoints: number
}

export function ModuleProgress({
  moduleId,
  totalActivities,
  completedActivities,
  earnedPoints
}: ModuleProgressProps) {
  const { progress } = useProgress()
  const moduleProgress = progress.moduleProgress[moduleId] || 0

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Tu progreso</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Puntos ganados</p>
              <p className="text-xl font-bold">{earnedPoints}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Actividades</p>
              <p className="text-xl font-bold">{completedActivities}/{totalActivities}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-green-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Progreso</p>
              <p className="text-xl font-bold">{moduleProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso total del módulo</span>
          <span>{moduleProgress}%</span>
        </div>
        <Progress value={moduleProgress} className="h-2" />
      </div>
    </Card>
  )
}
