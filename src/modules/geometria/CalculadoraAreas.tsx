import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import ModuleHeader from '../../components/ModuleHeader'

export default function CalculadoraAreas() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  // Estado para la figura seleccionada y sus dimensiones
  const [figura, setFigura] = useState('cuadrado')
  const [dimensiones, setDimensiones] = useState<{[key: string]: number}>({
    lado: 0,
    base: 0,
    altura: 0,
    radio: 0,
    baseMayor: 0,
    baseMenor: 0,
    diagonalMayor: 0,
    diagonalMenor: 0
  })
  
  // Estado para los resultados
  const [area, setArea] = useState<number | null>(null)
  const [perimetro, setPerimetro] = useState<number | null>(null)
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Función para actualizar dimensiones
  const handleDimensionChange = (dimension: string, value: string) => {
    const numValue = parseFloat(value) || 0
    setDimensiones({
      ...dimensiones,
      [dimension]: numValue
    })
  }
  
  // Función para calcular área y perímetro
  const calcular = () => {
    let areaCalculada = 0
    let perimetroCalculado = 0
    
    switch(figura) {
      case 'cuadrado':
        areaCalculada = dimensiones.lado * dimensiones.lado
        perimetroCalculado = 4 * dimensiones.lado
        break
      case 'rectangulo':
        areaCalculada = dimensiones.base * dimensiones.altura
        perimetroCalculado = 2 * (dimensiones.base + dimensiones.altura)
        break
      case 'triangulo':
        areaCalculada = (dimensiones.base * dimensiones.altura) / 2
        // Para el perímetro del triángulo necesitaríamos los tres lados
        // Aquí asumimos un triángulo isósceles con dos lados iguales
        const hipotenusa = Math.sqrt(Math.pow(dimensiones.base/2, 2) + Math.pow(dimensiones.altura, 2))
        perimetroCalculado = dimensiones.base + 2 * hipotenusa
        break
      case 'circulo':
        areaCalculada = Math.PI * Math.pow(dimensiones.radio, 2)
        perimetroCalculado = 2 * Math.PI * dimensiones.radio
        break
      case 'rombo':
        areaCalculada = (dimensiones.diagonalMayor * dimensiones.diagonalMenor) / 2
        // Para el perímetro del rombo necesitamos el lado
        const lado = Math.sqrt(Math.pow(dimensiones.diagonalMayor/2, 2) + Math.pow(dimensiones.diagonalMenor/2, 2))
        perimetroCalculado = 4 * lado
        break
      case 'trapecio':
        areaCalculada = ((dimensiones.baseMayor + dimensiones.baseMenor) * dimensiones.altura) / 2
        // Para el perímetro del trapecio necesitaríamos los cuatro lados
        // Aquí hacemos una aproximación
        const ladoIzquierdo = Math.sqrt(Math.pow((dimensiones.baseMayor - dimensiones.baseMenor)/2, 2) + Math.pow(dimensiones.altura, 2))
        perimetroCalculado = dimensiones.baseMayor + dimensiones.baseMenor + 2 * ladoIzquierdo
        break
      default:
        areaCalculada = 0
        perimetroCalculado = 0
    }
    
    setArea(areaCalculada)
    setPerimetro(perimetroCalculado)
  }

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
      <ModuleHeader title="Calculadora de Áreas" backPath="/modulos/geometria" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Calcula el área y perímetro de figuras geométricas</h2>
            
            <div className="mb-6">
              <Label htmlFor="figura" className="block text-sm font-medium text-gray-700 mb-1">
                Selecciona una figura
              </Label>
              <Select
                value={figura}
                onValueChange={(value) => setFigura(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una figura" />
                </SelectTrigger>
                <SelectContent className='text-gray-800 bg-amber-50'>
                  <SelectItem value="cuadrado">Cuadrado</SelectItem>
                  <SelectItem value="rectangulo">Rectángulo</SelectItem>
                  <SelectItem value="triangulo">Triángulo</SelectItem>
                  <SelectItem value="circulo">Círculo</SelectItem>
                  <SelectItem value="rombo">Rombo</SelectItem>
                  <SelectItem value="trapecio">Trapecio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Dimensiones</h3>
              
              {figura === 'cuadrado' && (
                <div className="mb-4">
                  <Label htmlFor="lado" className="block text-sm font-medium text-gray-700 mb-1">
                    Lado
                  </Label>
                  <Input
                    id="lado"
                    type="number"
                    min="0"
                    step="0.01"
                    value={dimensiones.lado || ''}
                    onChange={(e) => handleDimensionChange('lado', e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
              
              {figura === 'rectangulo' && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="base" className="block text-sm font-medium text-gray-700 mb-1">
                      Base
                    </Label>
                    <Input
                      id="base"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.base || ''}
                      onChange={(e) => handleDimensionChange('base', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">
                      Altura
                    </Label>
                    <Input
                      id="altura"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.altura || ''}
                      onChange={(e) => handleDimensionChange('altura', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              {figura === 'triangulo' && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="base" className="block text-sm font-medium text-gray-700 mb-1">
                      Base
                    </Label>
                    <Input
                      id="base"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.base || ''}
                      onChange={(e) => handleDimensionChange('base', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">
                      Altura
                    </Label>
                    <Input
                      id="altura"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.altura || ''}
                      onChange={(e) => handleDimensionChange('altura', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              {figura === 'circulo' && (
                <div className="mb-4">
                  <Label htmlFor="radio" className="block text-sm font-medium text-gray-700 mb-1">
                    Radio
                  </Label>
                  <Input
                    id="radio"
                    type="number"
                    min="0"
                    step="0.01"
                    value={dimensiones.radio || ''}
                    onChange={(e) => handleDimensionChange('radio', e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
              
              {figura === 'rombo' && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="diagonalMayor" className="block text-sm font-medium text-gray-700 mb-1">
                      Diagonal Mayor
                    </Label>
                    <Input
                      id="diagonalMayor"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.diagonalMayor || ''}
                      onChange={(e) => handleDimensionChange('diagonalMayor', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="diagonalMenor" className="block text-sm font-medium text-gray-700 mb-1">
                      Diagonal Menor
                    </Label>
                    <Input
                      id="diagonalMenor"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.diagonalMenor || ''}
                      onChange={(e) => handleDimensionChange('diagonalMenor', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              {figura === 'trapecio' && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="baseMayor" className="block text-sm font-medium text-gray-700 mb-1">
                      Base Mayor
                    </Label>
                    <Input
                      id="baseMayor"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.baseMayor || ''}
                      onChange={(e) => handleDimensionChange('baseMayor', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="baseMenor" className="block text-sm font-medium text-gray-700 mb-1">
                      Base Menor
                    </Label>
                    <Input
                      id="baseMenor"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.baseMenor || ''}
                      onChange={(e) => handleDimensionChange('baseMenor', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">
                      Altura
                    </Label>
                    <Input
                      id="altura"
                      type="number"
                      min="0"
                      step="0.01"
                      value={dimensiones.altura || ''}
                      onChange={(e) => handleDimensionChange('altura', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              <Button 
                onClick={calcular}
                className="mt-2 bg-blue-600 hover:bg-blue-700"
              >
                Calcular
              </Button>
            </div>
            
            {(area !== null || perimetro !== null) && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Resultados</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-blue-50">
                    <h4 className="font-medium text-gray-800 mb-2">Área</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {area !== null ? area.toFixed(2) : '-'} u²
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-green-50">
                    <h4 className="font-medium text-gray-800 mb-2">Perímetro</h4>
                    <p className="text-2xl font-bold text-green-700">
                      {perimetro !== null ? perimetro.toFixed(2) : '-'} u
                    </p>
                  </Card>
                </div>
              </div>
            )}
            
            <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fórmulas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Cuadrado</h4>
                  <p className="text-sm text-gray-600">Área = lado²</p>
                  <p className="text-sm text-gray-600">Perímetro = 4 × lado</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Rectángulo</h4>
                  <p className="text-sm text-gray-600">Área = base × altura</p>
                  <p className="text-sm text-gray-600">Perímetro = 2 × (base + altura)</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Triángulo</h4>
                  <p className="text-sm text-gray-600">Área = (base × altura) ÷ 2</p>
                  <p className="text-sm text-gray-600">Perímetro = suma de los tres lados</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Círculo</h4>
                  <p className="text-sm text-gray-600">Área = π × radio²</p>
                  <p className="text-sm text-gray-600">Perímetro = 2 × π × radio</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Rombo</h4>
                  <p className="text-sm text-gray-600">Área = (diagonal mayor × diagonal menor) ÷ 2</p>
                  <p className="text-sm text-gray-600">Perímetro = 4 × lado</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Trapecio</h4>
                  <p className="text-sm text-gray-600">Área = ((base mayor + base menor) × altura) ÷ 2</p>
                  <p className="text-sm text-gray-600">Perímetro = suma de los cuatro lados</p>
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
