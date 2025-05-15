import { Card } from '../ui/card'
import { Flame } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StreakCardProps {
  currentStreak: number
  bestStreak: number
  lastActivity: Date
}

export function StreakCard({ currentStreak, bestStreak, lastActivity }: StreakCardProps) {
  const today = new Date()
  const lastActivityDate = new Date(lastActivity)
  const isActiveToday = 
    lastActivityDate.getDate() === today.getDate() &&
    lastActivityDate.getMonth() === today.getMonth() &&
    lastActivityDate.getFullYear() === today.getFullYear()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Racha de actividad</h3>
        <div className={cn(
          'p-2 rounded-full',
          isActiveToday ? 'bg-orange-500 bg-opacity-10' : 'bg-gray-100'
        )}>
          <Flame className={cn(
            'h-5 w-5',
            isActiveToday ? 'text-orange-500' : 'text-gray-400'
          )} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Racha actual</p>
          <p className="text-3xl font-bold text-orange-500">{currentStreak}</p>
          <p className="text-sm text-gray-500">días</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Mejor racha</p>
          <p className="text-3xl font-bold text-gray-900">{bestStreak}</p>
          <p className="text-sm text-gray-500">días</p>
        </div>
      </div>

      {!isActiveToday && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-800">
            ¡Completa una actividad hoy para mantener tu racha!
          </p>
        </div>
      )}
    </Card>
  )
}
