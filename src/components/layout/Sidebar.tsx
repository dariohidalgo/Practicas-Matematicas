import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../../contexts/progress-context'
import { cn } from '../../lib/utils'
import {
  Home,
  TrendingUp,
  Percent,
  Ruler,
  Settings,
  Award,
  X
} from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Números Naturales',
    href: '/modulos/numeros-naturales',
    icon: TrendingUp
  },
  {
    name: 'Proporcionalidad',
    href: '/modulos/proporcionalidad',
    icon: Percent
  },
  {
    name: 'Geometría',
    href: '/modulos/geometria',
    icon: Ruler
  },
  {
    name: 'Medida',
    href: '/modulos/medida',
    icon: Ruler
  },
  {
    name: 'Números Racionales',
    href: '/modulos/numeros-racionales',
    icon: TrendingUp
  }
]

const bottomNavigation = [
  {
    name: 'Perfil',
    href: '/perfil',
    icon: Award
  },
  {
    name: 'Configuración',
    href: '/configuracion',
    icon: Settings
  }
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { progress } = useProgress()

  return (
    <div
      className={cn(
        'fixed inset-0 top-14 z-30 flex w-full flex-col border-r bg-background lg:bottom-0 lg:w-80 lg:border-r',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'transition-transform duration-300'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
        <div className="flex items-center space-x-4">
          <span className="font-bold">Dario-Hidalgo</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-auto">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Navegación
              </h2>
              <nav className="grid items-start gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  const moduleProgress = progress.moduleProgress[item.href.split('/').pop() || '']

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        'group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        isActive ? 'bg-accent' : 'transparent'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {moduleProgress !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          {moduleProgress}%
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <nav className="grid items-start gap-2">
              {bottomNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      isActive ? 'bg-accent' : 'transparent'
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
