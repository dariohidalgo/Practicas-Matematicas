import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import ModuleHeader from '../../components/ModuleHeader'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function CalculadoraInteractiva() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  // Estado para las operaciones básicas
  const [operacion, setOperacion] = useState('suma')
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Estado para divisibilidad
  const [numeroDivisibilidad, setNumeroDivisibilidad] = useState('')
  const [resultadosDivisibilidad, setResultadosDivisibilidad] = useState<{[key: string]: boolean}>({})
  
  // Estado para MCD y MCM
  const [numMCD1, setNumMCD1] = useState('')
  const [numMCD2, setNumMCD2] = useState('')
  const [resultadoMCD, setResultadoMCD] = useState<number | null>(null)
  const [resultadoMCM, setResultadoMCM] = useState<number | null>(null)
  
  // Estado para factorización
  const [numeroFactorizacion, setNumeroFactorizacion] = useState('')
  const [resultadoFactorizacion, setResultadoFactorizacion] = useState<string | null>(null)
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Función para calcular operaciones básicas
  const calcularOperacion = () => {
    setError(null)
    
    const n1 = parseInt(num1)
    const n2 = parseInt(num2)
    
    if (isNaN(n1) || isNaN(n2)) {
      setError('Por favor, ingresa números válidos')
      setResultado(null)
      return
    }
    
    if (n1 < 0 || n2 < 0) {
      setError('Esta calculadora solo funciona con números naturales (≥ 0)')
      setResultado(null)
      return
    }
    
    let res: number | string
    
    switch(operacion) {
      case 'suma':
        res = n1 + n2
        break
      case 'resta':
        if (n1 < n2) {
          setError('En los números naturales, el minuendo debe ser mayor o igual que el sustraendo')
          setResultado(null)
          return
        }
        res = n1 - n2
        break
      case 'multiplicacion':
        res = n1 * n2
        break
      case 'division':
        if (n2 === 0) {
          setError('No se puede dividir por cero')
          setResultado(null)
          return
        }
        if (n1 % n2 === 0) {
          res = n1 / n2
        } else {
          const cociente = Math.floor(n1 / n2)
          const resto = n1 % n2
          res = `${cociente} con resto ${resto}`
        }
        break
      case 'potencia':
        if (n2 > 100) {
          setError('El exponente es demasiado grande')
          setResultado(null)
          return
        }
        res = Math.pow(n1, n2)
        break
      default:
        res = 0
    }
    
    setResultado(res.toString())
  }
  
  // Función para verificar divisibilidad
  const verificarDivisibilidad = () => {
    setError(null)
    
    const num = parseInt(numeroDivisibilidad)
    
    if (isNaN(num)) {
      setError('Por favor, ingresa un número válido')
      setResultadosDivisibilidad({})
      return
    }
    
    if (num <= 0) {
      setError('Esta calculadora solo funciona con números naturales positivos')
      setResultadosDivisibilidad({})
      return
    }
    
    const resultados: {[key: string]: boolean} = {}
    
    // Divisibilidad por 2
    resultados['2'] = num % 2 === 0
    
    // Divisibilidad por 3
    const sumaCifras3 = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    resultados['3'] = sumaCifras3 % 3 === 0
    
    // Divisibilidad por 4
    const ultimas2Cifras = num % 100
    resultados['4'] = ultimas2Cifras % 4 === 0
    
    // Divisibilidad por 5
    const ultimaCifra = num % 10
    resultados['5'] = ultimaCifra === 0 || ultimaCifra === 5
    
    // Divisibilidad por 6
    resultados['6'] = resultados['2'] && resultados['3']
    
    // Divisibilidad por 8
    const ultimas3Cifras = num % 1000
    resultados['8'] = ultimas3Cifras % 8 === 0
    
    // Divisibilidad por 9
    const sumaCifras9 = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    resultados['9'] = sumaCifras9 % 9 === 0
    
    // Divisibilidad por 10
    resultados['10'] = ultimaCifra === 0
    
    setResultadosDivisibilidad(resultados)
  }
  
  // Función para calcular MCD y MCM
  const calcularMCDyMCM = () => {
    setError(null)
    
    const n1 = parseInt(numMCD1)
    const n2 = parseInt(numMCD2)
    
    if (isNaN(n1) || isNaN(n2)) {
      setError('Por favor, ingresa números válidos')
      setResultadoMCD(null)
      setResultadoMCM(null)
      return
    }
    
    if (n1 <= 0 || n2 <= 0) {
      setError('Esta calculadora solo funciona con números naturales positivos')
      setResultadoMCD(null)
      setResultadoMCM(null)
      return
    }
    
    // Algoritmo de Euclides para MCD
    const calcularMCD = (a: number, b: number): number => {
      while (b !== 0) {
        const temp = b
        b = a % b
        a = temp
      }
      return a
    }
    
    const mcd = calcularMCD(n1, n2)
    const mcm = (n1 * n2) / mcd
    
    setResultadoMCD(mcd)
    setResultadoMCM(mcm)
  }
  
  // Función para factorizar en números primos
  const factorizarNumero = () => {
    setError(null)
    
    const num = parseInt(numeroFactorizacion)
    
    if (isNaN(num)) {
      setError('Por favor, ingresa un número válido')
      setResultadoFactorizacion(null)
      return
    }
    
    if (num <= 1) {
      setError('Por favor, ingresa un número natural mayor que 1')
      setResultadoFactorizacion(null)
      return
    }
    
    let n = num
    let factores: number[] = []
    let divisor = 2
    
    while (n > 1) {
      while (n % divisor === 0) {
        factores.push(divisor)
        n = n / divisor
      }
      divisor++
      
      // Optimización: si el divisor es mayor que la raíz cuadrada de n, entonces n es primo
      if (divisor * divisor > n && n > 1) {
        factores.push(n)
        break
      }
    }
    
    // Agrupar factores con exponentes
    const factorizacion: {[key: number]: number} = {}
    factores.forEach(factor => {
      factorizacion[factor] = (factorizacion[factor] || 0) + 1
    })
    
    // Formatear resultado
    const resultado = Object.entries(factorizacion)
      .map(([factor, exponente]) => exponente === 1 ? factor : `${factor}^${exponente}`)
      .join(' × ')
    
    setResultadoFactorizacion(resultado)
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
      <ModuleHeader title="Calculadora Interactiva" backPath="/modulos/aritmetica" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculadora de Números Naturales</h2>
            
            <Tabs defaultValue="operaciones" className="mt-6">
              <TabsList className="grid grid-cols-4 mb-4 gap-4">
                <TabsTrigger value="operaciones">Operaciones</TabsTrigger>
                <TabsTrigger value="divisibilidad">Divisibilidad</TabsTrigger>
                <TabsTrigger value="mcd-mcm">MCD y MCM</TabsTrigger>
                <TabsTrigger value="factorizacion">Factorización</TabsTrigger>
              </TabsList>
              
              {/* Pestaña de operaciones básicas */}
              <TabsContent value="operaciones">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Operaciones Básicas</h3>
                  
                  <div className="mb-4">
                    <Label htmlFor="operacion" className="block text-sm font-medium text-gray-700 mb-1">
                      Selecciona una operación
                    </Label>
                    <Select
                      value={operacion}
                      onValueChange={(value) => setOperacion(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una operación" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-800 bg-amber-50">
                        <SelectItem value="suma">Suma</SelectItem>
                        <SelectItem value="resta">Resta</SelectItem>
                        <SelectItem value="multiplicacion">Multiplicación</SelectItem>
                        <SelectItem value="division">División</SelectItem>
                        <SelectItem value="potencia">Potencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="num1" className="block text-sm font-medium text-gray-700 mb-1">
                        {operacion === 'potencia' ? 'Base' : 'Primer número'}
                      </Label>
                      <Input
                        id="num1"
                        type="number"
                        min="0"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="num2" className="block text-sm font-medium text-gray-700 mb-1">
                        {operacion === 'potencia' ? 'Exponente' : 
                         operacion === 'resta' ? 'Sustraendo' : 
                         operacion === 'division' ? 'Divisor' : 'Segundo número'}
                      </Label>
                      <Input
                        id="num2"
                        type="number"
                        min="0"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calcularOperacion}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Calcular
                  </Button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  {resultado !== null && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Resultado</h4>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-700 text-center">
                          {resultado}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              {/* Pestaña de divisibilidad */}
              <TabsContent value="divisibilidad">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Verificar Divisibilidad</h3>
                  
                  <div className="mb-4">
                    <Label htmlFor="numeroDivisibilidad" className="block text-sm font-medium text-gray-700 mb-1">
                      Ingresa un número
                    </Label>
                    <Input
                      id="numeroDivisibilidad"
                      type="number"
                      min="1"
                      value={numeroDivisibilidad}
                      onChange={(e) => setNumeroDivisibilidad(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    onClick={verificarDivisibilidad}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Verificar
                  </Button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  {Object.keys(resultadosDivisibilidad).length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Resultados de divisibilidad</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {[2, 3, 4, 5, 6, 8, 9, 10].map(num => (
                          <div 
                            key={num} 
                            className={`p-3 rounded-lg text-center ${
                              resultadosDivisibilidad[num.toString()] 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <p className="font-medium">Divisible por {num}</p>
                            <p className="text-lg font-bold mt-1">
                              {resultadosDivisibilidad[num.toString()] ? 'Sí' : 'No'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              {/* Pestaña de MCD y MCM */}
              <TabsContent value="mcd-mcm">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Calcular MCD y MCM</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="numMCD1" className="block text-sm font-medium text-gray-700 mb-1">
                        Primer número
                      </Label>
                      <Input
                        id="numMCD1"
                        type="number"
                        min="1"
                        value={numMCD1}
                        onChange={(e) => setNumMCD1(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="numMCD2" className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo número
                      </Label>
                      <Input
                        id="numMCD2"
                        type="number"
                        min="1"
                        value={numMCD2}
                        onChange={(e) => setNumMCD2(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calcularMCDyMCM}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Calcular
                  </Button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  {(resultadoMCD !== null || resultadoMCM !== null) && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Máximo Común Divisor (MCD)</h4>
                        <p className="text-2xl font-bold text-blue-700 text-center">
                          {resultadoMCD}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Mínimo Común Múltiplo (MCM)</h4>
                        <p className="text-2xl font-bold text-purple-700 text-center">
                          {resultadoMCM}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              {/* Pestaña de factorización */}
              <TabsContent value="factorizacion">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Factorización en Números Primos</h3>
                  
                  <div className="mb-4">
                    <Label htmlFor="numeroFactorizacion" className="block text-sm font-medium text-gray-700 mb-1">
                      Ingresa un número
                    </Label>
                    <Input
                      id="numeroFactorizacion"
                      type="number"
                      min="2"
                      value={numeroFactorizacion}
                      onChange={(e) => setNumeroFactorizacion(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    onClick={factorizarNumero}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Factorizar
                  </Button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  {resultadoFactorizacion !== null && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Factorización</h4>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <p className="text-xl font-bold text-amber-800 text-center">
                          {numeroFactorizacion} = {resultadoFactorizacion}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Información</h3>
              <p className="text-gray-600">
                Esta calculadora te permite realizar operaciones con números naturales, verificar la divisibilidad de un número, 
                calcular el Máximo Común Divisor (MCD) y el Mínimo Común Múltiplo (MCM) de dos números, y factorizar un número en sus factores primos.
              </p>
              <p className="text-gray-600 mt-2">
                Recuerda que los números naturales son los números enteros positivos que se utilizan para contar: 1, 2, 3, 4, 5, ...
              </p>
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
            <button 
              onClick={() => navigate("/modulos/aritmetica/guia-numeros-naturales")}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ver guía de números naturales
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
