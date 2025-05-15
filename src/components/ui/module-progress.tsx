import { Progress } from './progress'

interface ModuleProgressProps {
  title: string
  progress: number
  className?: string
}

export function ModuleProgress({ title, progress, className }: ModuleProgressProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2" // Hacemos la barra más delgada para mejor apariencia
      />
    </div>
  )
}
