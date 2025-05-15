import { Link } from 'react-router-dom'
import { Play, CheckCircle } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

interface ActivityCardProps {
  id: string
  title: string
  description: string
  completed: boolean
  href: string
  points: number
}

export function ActivityCard({
  id,
  title,
  description,
  completed,
  href,
  points
}: ActivityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link to={href}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {completed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <div className="text-sm font-medium text-green-600">
                +{points} puntos
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button
            variant={completed ? "outline" : "default"}
            className="w-full"
          >
            <Play className="h-4 w-4 mr-2" />
            {completed ? "Repasar" : "Comenzar"}
          </Button>
        </div>
      </Link>
    </Card>
  )
}
