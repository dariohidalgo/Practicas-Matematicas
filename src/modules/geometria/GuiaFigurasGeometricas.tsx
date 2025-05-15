import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function GuiaFigurasGeometricas() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Guía de Figuras Geométricas" backPath="/modulos/geometria" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Figuras Geométricas Planas</h2>
            
            {/* Triángulos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Triángulos</h3>
              <p className="text-gray-600 mb-4">
                Un triángulo es un polígono de tres lados. Según sus lados y ángulos, se clasifican en:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="50,10 10,80 90,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Equilátero</h4>
                  <p className="text-sm text-gray-600">
                    Tres lados iguales y tres ángulos iguales (60° cada uno).
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="30,10 10,80 90,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Isósceles</h4>
                  <p className="text-sm text-gray-600">
                    Dos lados iguales y dos ángulos iguales.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="20,20 10,80 90,60" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Escaleno</h4>
                  <p className="text-sm text-gray-600">
                    Tres lados y tres ángulos diferentes.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="10,10 10,80 80,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                      <path d="M 10,80 L 10,70 L 20,70 Z" fill="#4F46E5" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Rectángulo</h4>
                  <p className="text-sm text-gray-600">
                    Tiene un ángulo recto (90°).
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="50,10 10,80 90,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                      <path d="M 45,75 L 45,65 L 55,65 L 55,75 Z" fill="#4F46E5" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Acutángulo</h4>
                  <p className="text-sm text-gray-600">
                    Todos sus ángulos son agudos (menores de 90°).
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="10,30 50,80 90,30" fill="none" stroke="#4F46E5" strokeWidth="2" />
                      <path d="M 45,30 L 55,30 L 50,40 Z" fill="#4F46E5" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Obtusángulo</h4>
                  <p className="text-sm text-gray-600">
                    Tiene un ángulo obtuso (mayor de 90°).
                  </p>
                </div>
              </div>
            </div>
            
            {/* Cuadriláteros */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cuadriláteros</h3>
              <p className="text-gray-600 mb-4">
                Un cuadrilátero es un polígono de cuatro lados. Los principales tipos son:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <rect x="20" y="20" width="60" height="60" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Cuadrado</h4>
                  <p className="text-sm text-gray-600">
                    Cuatro lados iguales y cuatro ángulos rectos.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Área:</strong> lado × lado
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Perímetro:</strong> 4 × lado
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <rect x="20" y="30" width="60" height="40" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Rectángulo</h4>
                  <p className="text-sm text-gray-600">
                    Lados opuestos iguales y cuatro ángulos rectos.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Área:</strong> base × altura
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Perímetro:</strong> 2 × (base + altura)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="20,40 40,20 80,20 60,40 80,80 60,80 20,80 40,40" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Rombo</h4>
                  <p className="text-sm text-gray-600">
                    Cuatro lados iguales y ángulos opuestos iguales.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Área:</strong> (diagonal mayor × diagonal menor) ÷ 2
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <polygon points="20,40 30,20 70,20 80,40 70,80 30,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Trapecio</h4>
                  <p className="text-sm text-gray-600">
                    Cuadrilátero con solo dos lados paralelos.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Área:</strong> ((base mayor + base menor) × altura) ÷ 2
                  </p>
                </div>
              </div>
            </div>
            
            {/* Círculo */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Círculo</h3>
              <p className="text-gray-600 mb-4">
                Un círculo es el conjunto de puntos que están a la misma distancia (radio) de un punto fijo llamado centro.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#4F46E5" strokeWidth="2" />
                      <line x1="50" y1="50" x2="90" y2="50" stroke="#4F46E5" strokeWidth="1" />
                      <text x="65" y="45" fill="#4F46E5" fontSize="10">r</text>
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Elementos</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Radio (r):</strong> Distancia del centro a cualquier punto del círculo.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Diámetro (d):</strong> Segmento que pasa por el centro y cuyos extremos están en el círculo. d = 2r
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-center mb-2">Fórmulas</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Área:</strong> π × r²
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Perímetro (circunferencia):</strong> 2 × π × r
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>π (pi):</strong> Aproximadamente 3.14159...
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botones de navegación */}
          <div className="flex justify-between">
            <button 
              onClick={() => navigate("/modulos/geometria")}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver a Geometría
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
