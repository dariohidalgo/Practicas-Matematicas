import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from './ui/button'
import type { ReactNode } from 'react'

interface ModuleHeaderProps {
  title: string
  backPath?: string
  children?: ReactNode
}

export default function ModuleHeader({ title, backPath, children }: ModuleHeaderProps) {
  return (
    <header className="bg-white shadow-sm p-3 sm:p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          {backPath && (
            <Link to={backPath} className="mr-2 sm:mr-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 p-1.5" aria-label="Volver">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </Button>
            </Link>
          )}
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate max-w-[180px] sm:max-w-none">{title}</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {children}
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 p-1.5" aria-label="Ir a inicio">
              <Home className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
