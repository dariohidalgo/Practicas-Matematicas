import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Award, Settings, Home } from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  {
    to: '/',
    label: 'Explorar',
    icon: Home
  },
  {
    to: '/biblioteca',
    label: 'Biblioteca',
    icon: BookOpen
  },
  {
    to: '/logros',
    label: 'Logros',
    icon: Award
  },
  {
    to: '/ajustes',
    label: 'Ajustes',
    icon: Settings
  }
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div className="container mx-auto flex justify-around items-center p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
