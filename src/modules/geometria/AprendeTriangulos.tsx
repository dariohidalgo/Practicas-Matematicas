import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function AprendeTriangulos() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tipos')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Aprende sobre Triángulos" backPath="/modulos/geometria" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4 ">
        <div className="max-w-3xl mx-auto ">
          <div className="w-full">
            <div className="flex mb-4 border-b gap-4">
              <button 
                onClick={() => setActiveTab('tipos')}
                className={`py-2 px-4 font-medium ${activeTab === 'tipos' ? 'text-white-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              >
                Tipos de Triángulos
              </button>
              <button 
                onClick={() => setActiveTab('propiedades')}
                className={`py-2 px-4 font-medium ${activeTab === 'propiedades' ? 'text-white-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              >
                Propiedades
              </button>
              <button 
                onClick={() => setActiveTab('calculos')}
                className={`py-2 px-4 font-medium ${activeTab === 'calculos' ? 'text-white-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              >
                Cálculos
              </button>
            </div>
            
            {/* Pestaña de tipos de triángulos */}
            {activeTab === 'tipos' && (
              <div className="p-6 bg-white rounded-lg shadow-sm ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Tipos de Triángulos</h2>
                
                <div className="space-y-6">
                  {/* Introducción */}
                  <div>
                    <p className="text-gray-600 mb-4">
                      Un triángulo es un polígono de tres lados. Los triángulos se pueden clasificar según sus lados o según sus ángulos.
                    </p>
                  </div>
                  
                  {/* Clasificación por lados */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium text-gray-800">Clasificación por lados</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="60,10 10,90 110,90" fill="none" stroke="#4F46E5" strokeWidth="2" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2  text-gray-800">Triángulo Equilátero</h4>
                          <p className="text-sm text-gray-600">
                            Tiene los tres lados iguales y también los tres ángulos iguales (60° cada uno).
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="30,10 10,90 110,90" fill="none" stroke="#4F46E5" strokeWidth="2" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2  text-gray-800" >Triángulo Isósceles</h4>
                          <p className="text-sm text-gray-600">
                            Tiene dos lados iguales y dos ángulos iguales (los opuestos a los lados iguales).
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="20,20 10,90 110,70" fill="none" stroke="#4F46E5" strokeWidth="2" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2  text-gray-800">Triángulo Escaleno</h4>
                          <p className="text-sm text-gray-600">
                            Tiene los tres lados y los tres ángulos diferentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clasificación por ángulos */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium  text-gray-800">Clasificación por ángulos</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="60,10 10,90 110,90" fill="none" stroke="#4F46E5" strokeWidth="2" />
                              <path d="M 10,90 A 20,20 0 0 0 30,90" fill="none" stroke="#4F46E5" strokeWidth="1" />
                              <text x="20" y="75" fill="#4F46E5" fontSize="12">90°</text>
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2">Triángulo Rectángulo</h4>
                          <p className="text-sm text-gray-600">
                            Tiene un ángulo recto (90°).
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="60,20 20,80 100,80" fill="none" stroke="#4F46E5" strokeWidth="2" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2">Triángulo Acutángulo</h4>
                          <p className="text-sm text-gray-600">
                            Tiene los tres ángulos agudos (menores de 90°).
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-center mb-3">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="10,30 30,90 110,70" fill="none" stroke="#4F46E5" strokeWidth="2" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-2">Triángulo Obtusángulo</h4>
                          <p className="text-sm text-gray-600">
                            Tiene un ángulo obtuso (mayor de 90°).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dato curioso */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">¿Sabías que...?</h3>
                    <p className="text-gray-600">
                      Un triángulo es una figura muy estable. Por eso se utiliza en muchas estructuras arquitectónicas como puentes y torres.
                      La suma de los ángulos internos de cualquier triángulo siempre es 180°.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Pestaña de propiedades */}
            {activeTab === 'propiedades' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Propiedades de los Triángulos</h2>
                
                <div className="space-y-6">
                  {/* Propiedades generales */}
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Propiedades generales</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>La suma de los ángulos internos de un triángulo es 180°.</li>
                      <li>La suma de las longitudes de dos lados cualesquiera de un triángulo es siempre mayor que la longitud del tercer lado.</li>
                      <li>El lado más largo de un triángulo está opuesto al ángulo mayor.</li>
                      <li>Un triángulo tiene tres medianas, tres alturas, tres bisectrices y tres mediatrices.</li>
                    </ul>
                  </div>
                  
                  {/* Elementos notables */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium  text-gray-800">Elementos notables</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Altura</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Es la línea perpendicular trazada desde un vértice al lado opuesto o a su prolongación.
                          </p>
                          <div className="flex justify-center">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="20,80 100,80 60,20" fill="none" stroke="#4F46E5" strokeWidth="2" />
                              <line x1="60" y1="20" x2="60" y2="80" stroke="#E11D48" strokeWidth="2" strokeDasharray="4" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Mediana</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Es el segmento que une un vértice con el punto medio del lado opuesto.
                          </p>
                          <div className="flex justify-center">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="20,80 100,80 60,20" fill="none" stroke="#4F46E5" strokeWidth="2" />
                              <line x1="60" y1="20" x2="60" y2="80" stroke="#E11D48" strokeWidth="2" strokeDasharray="4" />
                              <circle cx="60" cy="80" r="3" fill="#E11D48" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Bisectriz</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Es la recta que divide un ángulo del triángulo en dos partes iguales.
                          </p>
                          <div className="flex justify-center">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="20,80 100,80 60,20" fill="none" stroke="#4F46E5" strokeWidth="2" />
                              <line x1="60" y1="20" x2="60" y2="80" stroke="#E11D48" strokeWidth="2" strokeDasharray="4" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Mediatriz</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Es la recta perpendicular a un lado que pasa por su punto medio.
                          </p>
                          <div className="flex justify-center">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                              <polygon points="20,80 100,80 60,20" fill="none" stroke="#4F46E5" strokeWidth="2" />
                              <line x1="60" y1="80" x2="60" y2="40" stroke="#E11D48" strokeWidth="2" strokeDasharray="4" />
                              <circle cx="60" cy="80" r="3" fill="#E11D48" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Puntos notables */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium text-gray-800">Puntos notables</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Baricentro</h4>
                          <p className="text-sm text-gray-600">
                            Es el punto de intersección de las tres medianas. Es el centro de gravedad del triángulo.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Ortocentro</h4>
                          <p className="text-sm text-gray-600">
                            Es el punto de intersección de las tres alturas.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Incentro</h4>
                          <p className="text-sm text-gray-600">
                            Es el punto de intersección de las tres bisectrices. Es el centro de la circunferencia inscrita.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-gray-800">Circuncentro</h4>
                          <p className="text-sm text-gray-600">
                            Es el punto de intersección de las tres mediatrices. Es el centro de la circunferencia circunscrita.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Pestaña de cálculos */}
            {activeTab === 'calculos' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cálculos en Triángulos</h2>
                
                <div className="space-y-6">
                  {/* Perímetro */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium text-gray-800">Perímetro</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 mb-3">
                        El perímetro de un triángulo es la suma de las longitudes de sus tres lados.
                      </p>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="font-medium text-center">P = a + b + c</p>
                        <p className="text-sm text-gray-600 text-center mt-2">
                          Donde a, b y c son las longitudes de los lados del triángulo.
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Ejemplo:</strong> Si un triángulo tiene lados de 3 cm, 4 cm y 5 cm, su perímetro es:
                        </p>
                        <p className="text-sm font-medium mt-1">
                          P = 3 cm + 4 cm + 5 cm = 12 cm
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Área */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium text-gray-800">Área</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-gray-800">Fórmula con base y altura</h4>
                        <p className="text-gray-600 mb-3">
                          El área de un triángulo es igual a la mitad del producto de la base por la altura.
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-center">A = (b × h) / 2</p>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            Donde b es la base y h es la altura correspondiente.
                          </p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Ejemplo:</strong> Si un triángulo tiene una base de 6 cm y una altura de 4 cm, su área es:
                          </p>
                          <p className="text-sm font-medium mt-1">
                            A = (6 cm × 4 cm) / 2 = 12 cm²
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-gray-800">Fórmula de Herón</h4>
                        <p className="text-gray-600 mb-3">
                          Si conocemos los tres lados del triángulo, podemos usar la fórmula de Herón.
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-center">A = √(s(s-a)(s-b)(s-c))</p>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            Donde s = (a + b + c) / 2 (semiperímetro) y a, b, c son los lados.
                          </p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Ejemplo:</strong> Para un triángulo con lados 3 cm, 4 cm y 5 cm:
                          </p>
                          <p className="text-sm mt-1">
                            s = (3 + 4 + 5) / 2 = 6 cm
                          </p>
                          <p className="text-sm font-medium mt-1">
                            A = √(6(6-3)(6-4)(6-5)) = √(6 × 3 × 2 × 1) = √36 = 6 cm²
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Teorema de Pitágoras */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-indigo-100 p-3">
                      <h3 className="font-medium text-gray-800">Teorema de Pitágoras</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 mb-3">
                        En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.
                      </p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-center">c² = a² + b²</p>
                        <p className="text-sm text-gray-600 text-center mt-2">
                          Donde c es la hipotenusa y a, b son los catetos.
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Ejemplo:</strong> En un triángulo rectángulo con catetos de 3 cm y 4 cm, la hipotenusa es:
                        </p>
                        <p className="text-sm mt-1">
                          c² = 3² + 4² = 9 + 16 = 25
                        </p>
                        <p className="text-sm font-medium mt-1">
                          c = √25 = 5 cm
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Consejos prácticos */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Consejos prácticos</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Para calcular el área, elige la fórmula que mejor se adapte a los datos que tienes.</li>
                      <li>Recuerda que cualquier lado puede ser considerado como base.</li>
                      <li>En problemas de triángulos, dibuja la figura y etiqueta los datos conocidos.</li>
                      <li>Utiliza el teorema de Pitágoras solo en triángulos rectángulos.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recursos adicionales */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recursos sobre triángulos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white shadow-sm border rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Guía completa de triángulos</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Material educativo con ejemplos y ejercicios sobre todos los tipos de triángulos.
                    </p>
                    <Link 
                      to="/modulos/geometria/guia-figuras" 
                      className="text-sm text-indigo-600 mt-2 inline-block hover:underline"
                    >
                      Ver guía
                    </Link>
                  </div>
                </div>
                
                <div className="p-4 bg-white shadow-sm border rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="10" x2="12" y2="16"></line><line x1="9" y1="13" x2="15" y2="13"></line></svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Calculadora de triángulos</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Herramienta interactiva para calcular áreas, perímetros y ángulos de cualquier triángulo.
                    </p>
                    <Link 
                      to="/modulos/geometria/calculadora-areas" 
                      className="text-sm text-indigo-600 mt-2 inline-block hover:underline"
                    >
                      Usar calculadora
                    </Link>
                  </div>
                </div>
                
                <div className="p-4 bg-white shadow-sm border rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Propiedades de triángulos</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Información detallada sobre las propiedades de los triángulos.
                    </p>
                    <Link 
                      to="/modulos/geometria/guia-figuras" 
                      className="text-sm text-indigo-600 mt-2 inline-block hover:underline"
                    >
                      Ver propiedades
                    </Link>
                  </div>
                </div>
                
                <div className="p-4 bg-white shadow-sm border rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Video: Teorema de Pitágoras</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Explicación visual del teorema de Pitágoras y sus aplicaciones.
                    </p>
                    <a 
                      href="https://www.youtube.com/watch?v=CAkMUdeB06o" 
                      className="text-sm text-indigo-600 mt-2 inline-block hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver recurso
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de navegación */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => navigate("/modulos/geometria")}
                className="flex items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                type="button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Geometría
              </button>
              
              <button 
                onClick={() => navigate("/modulos/geometria/actividades")}
                className="flex items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                type="button"
              >
                Ir a Actividades
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
