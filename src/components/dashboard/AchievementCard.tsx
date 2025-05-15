import { Card } from '../ui/card'
import { Trophy, Star, Target, Award } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Achievement {
  id: string
  title: string
  description: string
  type: 'points' | 'activities' | 'streak' | 'special'
  progress: number
  goal: number
  completed: boolean
}

interface AchievementCardProps {
  achievement: Achievement
}

const achievementIcons = {
  points: Trophy,
  activities: Star,
  streak: Target,
  special: Award,
}

const achievementColors = {
  points: 'text-yellow-500',
  activities: 'text-blue-500',
  streak: 'text-purple-500',
  special: 'text-green-500',
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = achievementIcons[achievement.type]
  const color = achievementColors[achievement.type]
  const progress = Math.min((achievement.progress / achievement.goal) * 100, 100)

  return (
    <Card className={cn(
      'p-4 transition-all duration-300',
      achievement.completed ? 'bg-gradient-to-br from-green-50 to-blue-50' : ''
    )}>
      <div className="flex items-start space-x-4">
        <div className={cn(
          'p-2 rounded-full',
          color.replace('text-', 'bg-').concat(' bg-opacity-10')
        )}>
          <Icon className={cn('h-6 w-6', color)} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{achievement.progress} / {achievement.goal}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  achievement.completed ? 'bg-green-500' : 'bg-blue-500'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
