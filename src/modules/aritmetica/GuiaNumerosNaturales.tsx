import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'

export default function GuiaNumerosNaturales() {
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
      <ModuleHeader title="Guía de Números Naturales" backPath="/modulos/aritmetica" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Números Naturales</h2>
            
            {/* Introducción */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Qué son los números naturales?</h3>
              <p className="text-gray-600 mb-4">
                Los números naturales son aquellos que utilizamos para contar elementos. Comienzan en 1 y continúan indefinidamente: 1, 2, 3, 4, 5, ...
              </p>
              <p className="text-gray-600 mb-4">
                En algunas definiciones, el 0 también se incluye como número natural, formando lo que se conoce como números naturales con cero: 0, 1, 2, 3, 4, ...
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Notación:</strong> El conjunto de los números naturales se representa con el símbolo ℕ.
                </p>
                <p className="text-blue-800 mt-2">
                  <strong>ℕ = {'{1, 2, 3, 4, 5, ...}'}</strong>
                </p>
                <p className="text-blue-800 mt-2">
                  Si incluimos el cero: <strong>ℕ₀ = {'{0, 1, 2, 3, 4, 5, ...}'}</strong>
                </p>
              </div>
            </div>
            
            {/* Propiedades */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Propiedades de los números naturales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Propiedad clausurativa</h4>
                  <p className="text-sm text-gray-600">
                    La suma y multiplicación de dos números naturales siempre da como resultado otro número natural.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">a + b ∈ ℕ</p>
                    <p className="text-blue-700">a × b ∈ ℕ</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Propiedad asociativa</h4>
                  <p className="text-sm text-gray-600">
                    El modo de agrupar los números no altera el resultado final.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">(a + b) + c = a + (b + c)</p>
                    <p className="text-blue-700">(a × b) × c = a × (b × c)</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Propiedad conmutativa</h4>
                  <p className="text-sm text-gray-600">
                    El orden de los números no altera el resultado en la suma y multiplicación.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">a + b = b + a</p>
                    <p className="text-blue-700">a × b = b × a</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Propiedad distributiva</h4>
                  <p className="text-sm text-gray-600">
                    La multiplicación se distribuye respecto a la suma.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">a × (b + c) = (a × b) + (a × c)</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Elemento neutro</h4>
                  <p className="text-sm text-gray-600">
                    El 0 es el elemento neutro de la suma y el 1 es el elemento neutro de la multiplicación.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">a + 0 = a</p>
                    <p className="text-blue-700">a × 1 = a</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Elemento absorbente</h4>
                  <p className="text-sm text-gray-600">
                    El 0 es el elemento absorbente de la multiplicación.
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-blue-700">a × 0 = 0</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Operaciones */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Operaciones con números naturales</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Suma</h4>
                <p className="text-gray-600 mb-2">
                  La suma de dos números naturales a y b es el número natural que resulta de añadir b unidades a a.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-blue-700 font-medium">Ejemplo: 5 + 3 = 8</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Resta</h4>
                <p className="text-gray-600 mb-2">
                  La resta de dos números naturales a y b es el número natural que, sumado a b, da como resultado a.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Nota:</strong> La resta no siempre da como resultado un número natural. Solo está definida en ℕ cuando a ≥ b.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-blue-700 font-medium">Ejemplo: 8 - 3 = 5</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Multiplicación</h4>
                <p className="text-gray-600 mb-2">
                  La multiplicación de dos números naturales a y b es el número natural que resulta de sumar a consigo mismo b veces.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-blue-700 font-medium">Ejemplo: 4 × 3 = 4 + 4 + 4 = 12</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">División</h4>
                <p className="text-gray-600 mb-2">
                  La división de dos números naturales a y b (b ≠ 0) es el número natural q (cociente) tal que a = b × q + r, donde r (resto) es un número natural menor que b.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Nota:</strong> La división no siempre da como resultado un número natural. Solo es exacta cuando el resto es 0.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-blue-700 font-medium">Ejemplo: 12 ÷ 3 = 4 (división exacta)</p>
                  <p className="text-center text-blue-700 font-medium mt-2">Ejemplo: 14 ÷ 3 = 4 con resto 2 (división no exacta)</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Potenciación</h4>
                <p className="text-gray-600 mb-2">
                  La potencia de un número natural a elevado a un exponente natural n es el producto de a multiplicado por sí mismo n veces.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-blue-700 font-medium">Ejemplo: 2³ = 2 × 2 × 2 = 8</p>
                  <p className="text-center text-blue-700 font-medium mt-2">Ejemplo: 5² = 5 × 5 = 25</p>
                </div>
              </div>
            </div>
            
            {/* Divisibilidad */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Divisibilidad</h3>
              
              <p className="text-gray-600 mb-4">
                Un número natural a es divisible por otro número natural b si existe un número natural c tal que a = b × c.
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Criterios de divisibilidad</h4>
                
                <ul className="list-disc pl-5 text-gray-600">
                  <li className="mb-2">
                    <strong>Divisibilidad por 2:</strong> Un número es divisible por 2 si su última cifra es par (0, 2, 4, 6, 8).
                  </li>
                  <li className="mb-2">
                    <strong>Divisibilidad por 3:</strong> Un número es divisible por 3 si la suma de sus cifras es divisible por 3.
                  </li>
                  <li className="mb-2">
                    <strong>Divisibilidad por 4:</strong> Un número es divisible por 4 si sus dos últimas cifras forman un número divisible por 4.
                  </li>
                  <li className="mb-2">
                    <strong>Divisibilidad por 5:</strong> Un número es divisible por 5 si su última cifra es 0 o 5.
                  </li>
                  <li className="mb-2">
                    <strong>Divisibilidad por 9:</strong> Un número es divisible por 9 si la suma de sus cifras es divisible por 9.
                  </li>
                  <li>
                    <strong>Divisibilidad por 10:</strong> Un número es divisible por 10 si su última cifra es 0.
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Conceptos relacionados</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">
                      <strong>Número primo:</strong> Un número natural mayor que 1 que solo es divisible por 1 y por sí mismo.
                    </p>
                    <p className="text-blue-700 text-sm">Ejemplos: 2, 3, 5, 7, 11, 13, 17, ...</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">
                      <strong>Número compuesto:</strong> Un número natural mayor que 1 que tiene más divisores además de 1 y él mismo.
                    </p>
                    <p className="text-blue-700 text-sm">Ejemplos: 4, 6, 8, 9, 10, 12, ...</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">
                      <strong>Máximo común divisor (MCD):</strong> El mayor número natural que divide a dos o más números.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">
                      <strong>Mínimo común múltiplo (MCM):</strong> El menor número natural que es múltiplo de dos o más números.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Problemas de aplicación */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Problemas de aplicación</h3>
              
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Problema 1</h4>
                <p className="text-gray-600 mb-2">
                  María tiene 24 caramelos y quiere repartirlos entre sus amigos de manera que todos reciban la misma cantidad. ¿De cuántas formas diferentes puede hacerlo?
                </p>
                <div className="mt-3 bg-white p-3 rounded border border-green-200">
                  <p className="text-gray-700">
                    <strong>Solución:</strong> Debemos encontrar todos los divisores de 24.
                  </p>
                  <p className="text-gray-700 mt-1">
                    Los divisores de 24 son: 1, 2, 3, 4, 6, 8, 12 y 24.
                  </p>
                  <p className="text-gray-700 mt-1">
                    Por lo tanto, María puede repartir los caramelos de 8 formas diferentes:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mt-1">
                    <li>24 amigos con 1 caramelo cada uno</li>
                    <li>12 amigos con 2 caramelos cada uno</li>
                    <li>8 amigos con 3 caramelos cada uno</li>
                    <li>6 amigos con 4 caramelos cada uno</li>
                    <li>4 amigos con 6 caramelos cada uno</li>
                    <li>3 amigos con 8 caramelos cada uno</li>
                    <li>2 amigos con 12 caramelos cada uno</li>
                    <li>1 amigo con 24 caramelos</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Problema 2</h4>
                <p className="text-gray-600 mb-2">
                  Juan tiene 15 manzanas y 20 naranjas. Quiere hacer paquetes con la misma cantidad de cada fruta, sin que sobre ninguna. ¿Cuál es el mayor número de paquetes que puede hacer?
                </p>
                <div className="mt-3 bg-white p-3 rounded border border-green-200">
                  <p className="text-gray-700">
                    <strong>Solución:</strong> Debemos encontrar el máximo común divisor (MCD) de 15 y 20.
                  </p>
                  <p className="text-gray-700 mt-1">
                    Factorizando: 15 = 3 × 5 y 20 = 2² × 5
                  </p>
                  <p className="text-gray-700 mt-1">
                    El MCD(15, 20) = 5
                  </p>
                  <p className="text-gray-700 mt-1">
                    Por lo tanto, Juan puede hacer como máximo 5 paquetes, con 3 manzanas y 4 naranjas en cada uno.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botones de navegación */}
          <div className="flex justify-between">
            <button 
              onClick={() => navigate("/modulos/aritmetica")}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver a Aritmética
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
