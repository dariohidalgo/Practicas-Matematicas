import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, HelpCircle, BookOpen } from 'lucide-react'
import { useModule } from '../../contexts/module-context'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface ActivityLayoutProps {
  children: ReactNode
  title: string
  description: string
  helpContent?: ReactNode
  theoryContent?: ReactNode
  onComplete?: () => void
  canProgress?: boolean
  nextPath?: string
  previousPath?: string
}

export function ActivityLayout({
  children,
  title,
  description,
  helpContent,
  theoryContent,
  onComplete,
  canProgress = true,
  nextPath,
  previousPath
}: ActivityLayoutProps) {
  const navigate = useNavigate()
  const { currentActivity, activities } = useModule()

  const handleNext = () => {
    if (onComplete) {
      onComplete()
    }
    if (nextPath) {
      navigate(nextPath)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </button>
            <div className="flex items-center space-x-2">
              {helpContent && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Ayuda</SheetTitle>
                      <SheetDescription>
                        {helpContent}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              )}
              {theoryContent && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <BookOpen className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Teoría</SheetTitle>
                      <SheetDescription>
                        {theoryContent}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {children}
        </div>

        <div className="flex justify-between">
          {previousPath && (
            <Button
              variant="outline"
              onClick={() => navigate(previousPath)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Anterior
            </Button>
          )}
          {nextPath && (
            <Button
              onClick={handleNext}
              disabled={!canProgress}
              className="ml-auto"
            >
              Siguiente
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
