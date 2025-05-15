import type { ReactNode } from 'react'
import { Card } from './ui/card'

// Tipo para los recursos
export type Recurso = {
  id: string
  titulo: string
  descripcion: string
  icono: ReactNode
  enlace?: string
  accion?: () => void
}

type RecursosAdicionalesProps = {
  titulo?: string
  recursos: Recurso[]
  colorTema?: string
  className?: string
}

export default function RecursosAdicionales({
  titulo = "Recursos adicionales",
  recursos,
  colorTema = "indigo",
  className = ""
}: RecursosAdicionalesProps) {
  // Mapa de colores por tema
  const colores = {
    indigo: {
      titulo: "text-indigo-700",
      icono: "text-indigo-600"
    },
    teal: {
      titulo: "text-teal-700",
      icono: "text-teal-600"
    },
    yellow: {
      titulo: "text-yellow-700",
      icono: "text-yellow-600"
    },
    blue: {
      titulo: "text-blue-700",
      icono: "text-blue-600"
    },
    red: {
      titulo: "text-red-700",
      icono: "text-red-600"
    }
  }

  const colorClases = colores[colorTema as keyof typeof colores] || colores.indigo

  return (
    <div className={`mt-8 ${className}`}>
      <h3 className={`text-lg font-semibold ${colorClases.titulo} mb-3`}>{titulo}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recursos.map((recurso) => (
          <Card 
            key={recurso.id}
            className="p-4 bg-white shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => recurso.accion && recurso.accion()}
          >
            <div className={colorClases.icono}>
              {recurso.icono}
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{recurso.titulo}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {recurso.descripcion}
              </p>
              {recurso.enlace && (
                <a 
                  href={recurso.enlace} 
                  className={`text-sm ${colorClases.icono} mt-2 inline-block hover:underline`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ver recurso
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
