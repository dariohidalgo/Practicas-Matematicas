import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, RefreshCw, Check, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ModuleHeader from '../../components/ModuleHeader'
import { useAuth } from '../../contexts/auth-context'
import { SEO } from '../../components/seo/SEO'

// Definición de las unidades por categoría
const unidades = {
  longitud: [
    { valor: 1000, nombre: 'km', texto: 'Kilómetro' },
    { valor: 1, nombre: 'm', texto: 'Metro' },
    { valor: 0.01, nombre: 'cm', texto: 'Centímetro' },
    { valor: 0.001, nombre: 'mm', texto: 'Milímetro' }
  ],
  masa: [
    { valor: 1000, nombre: 'kg', texto: 'Kilogramo' },
    { valor: 1, nombre: 'g', texto: 'Gramo' },
    { valor: 0.001, nombre: 'mg', texto: 'Miligramo' }
  ],
  capacidad: [
    { valor: 1000, nombre: 'kl', texto: 'Kilolitro' },
    { valor: 1, nombre: 'l', texto: 'Litro' },
    { valor: 0.01, nombre: 'cl', texto: 'Centilitro' },
    { valor: 0.001, nombre: 'ml', texto: 'Mililitro' }
  ],
  tiempo: [
    { valor: 86400, nombre: 'día', texto: 'Día' },
    { valor: 3600, nombre: 'h', texto: 'Hora' },
    { valor: 60, nombre: 'min', texto: 'Minuto' },
    { valor: 1, nombre: 's', texto: 'Segundo' }
  ]
}

// Tipo para el historial
interface HistorialItem {
  categoria: string;
  valorOriginal: string;
  unidadOrigen: string;
  unidadDestino: string;
  resultado: number;
}

export default function ConversionUnidades() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('conversor')
  
  // Estados para la calculadora con persistencia en localStorage
  const [categoria, setCategoria] = useState<keyof typeof unidades>(() => {
    const savedCategoria = localStorage.getItem('conversionCategoria')
    return savedCategoria ? (savedCategoria as keyof typeof unidades) : 'longitud'
  })
  
  const [valorEntrada, setValorEntrada] = useState<string>(() => {
    return localStorage.getItem('conversionValor') || ''
  })
  
  const [unidadOrigen, setUnidadOrigen] = useState<string>(() => {
    return localStorage.getItem('conversionUnidadOrigen') || 'm'
  })
  
  const [unidadDestino, setUnidadDestino] = useState<string>(() => {
    return localStorage.getItem('conversionUnidadDestino') || 'cm'
  })
  
  const [resultado, setResultado] = useState<number | null>(() => {
    const savedResultado = localStorage.getItem('conversionResultado')
    return savedResultado ? parseFloat(savedResultado) : null
  })
  
  const [historial, setHistorial] = useState<HistorialItem[]>(() => {
    const savedHistorial = localStorage.getItem('conversionHistorial')
    return savedHistorial ? JSON.parse(savedHistorial) : []
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])
  
  // Guardar estado en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('conversionCategoria', categoria)
    localStorage.setItem('conversionValor', valorEntrada)
    localStorage.setItem('conversionUnidadOrigen', unidadOrigen)
    localStorage.setItem('conversionUnidadDestino', unidadDestino)
    if (resultado !== null) {
      localStorage.setItem('conversionResultado', resultado.toString())
    }
    localStorage.setItem('conversionHistorial', JSON.stringify(historial))
  }, [categoria, valorEntrada, unidadOrigen, unidadDestino, resultado, historial])

  // Actualizar unidades cuando cambia la categoría
  useEffect(() => {
    setUnidadOrigen(unidades[categoria][0].nombre)
    setUnidadDestino(unidades[categoria][1].nombre)
    setResultado(null)
  }, [categoria])

  // Función para realizar la conversión
  const convertir = () => {
    if (!valorEntrada || isNaN(parseFloat(valorEntrada))) {
      return
    }

    const valor = parseFloat(valorEntrada)
    
    // Encontrar los factores de conversión
    const unidadOrigenObj = unidades[categoria].find(u => u.nombre === unidadOrigen)
    const unidadDestinoObj = unidades[categoria].find(u => u.nombre === unidadDestino)
    
    if (!unidadOrigenObj || !unidadDestinoObj) {
      return
    }
    
    // Realizar la conversión
    const factorOrigen = unidadOrigenObj.valor
    const factorDestino = unidadDestinoObj.valor
    const resultadoCalculado = (valor * factorOrigen) / factorDestino
    
    setResultado(resultadoCalculado)
    
    // Añadir al historial
    setHistorial(prev => [
      {
        categoria,
        valorOriginal: valorEntrada,
        unidadOrigen,
        unidadDestino,
        resultado: resultadoCalculado
      },
      ...prev.slice(0, 4) // Mantener solo las últimas 5 conversiones
    ])
  }

  // Función para intercambiar unidades
  const intercambiarUnidades = () => {
    setUnidadOrigen(unidadDestino)
    setUnidadDestino(unidadOrigen)
    setResultado(null)
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Conversión de Unidades | Módulo de Medida" 
        description="Aprende a convertir entre diferentes unidades de medida: longitud, masa, capacidad y tiempo. Incluye conversor interactivo y ejemplos prácticos."
        keywords="conversión, unidades, medida, longitud, masa, capacidad, tiempo, matemáticas, educación"
        url="https://matematicas-732ff.web.app/modulos/medida/conversion-unidades"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 pb-16">
      <ModuleHeader title="Medida" backPath="/modulos/medida/actividades" />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="w-full">
            <div className="flex mb-4 border-b gap-4">
              <button 
                onClick={() => setActiveTab('conversor')}
                className={`py-2 px-4 font-medium ${activeTab === 'conversor' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
              >
                <span className="flex items-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  Conversor
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('aprende')}
                className={`py-2 px-4 font-medium ${activeTab === 'aprende' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
              >
                Aprende
              </button>
            </div>
            
            {/* Pestaña del conversor */}
            {activeTab === 'conversor' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/modulos/medida/actividad-1')} 
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la actividad anterior
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversor de Unidades</h2>
                
                <div className="space-y-4">
                  {/* Selector de categoría */}
                  <div className="mb-4">
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select 
                      id="categoria"
                      value={categoria} 
                      onChange={(e) => setCategoria(e.target.value as keyof typeof unidades)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="longitud">Longitud</option>
                      <option value="masa">Masa</option>
                      <option value="capacidad">Capacidad</option>
                      <option value="tiempo">Tiempo</option>
                    </select>
                  </div>
                  
                  {/* Valor a convertir */}
                  <div className="mb-4">
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                    <input
                      id="valor"
                      type="number"
                      placeholder="Introduce un valor"
                      value={valorEntrada}
                      onChange={(e) => setValorEntrada(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  {/* Unidades de conversión */}
                  <div className="grid grid-cols-5 gap-2 items-center mb-4">
                    <div className="col-span-2">
                      <label htmlFor="unidadOrigen" className="block text-sm font-medium text-gray-700 mb-1">De</label>
                      <select 
                        id="unidadOrigen"
                        value={unidadOrigen} 
                        onChange={(e) => setUnidadOrigen(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        {unidades[categoria].map((unidad) => (
                          <option key={unidad.nombre} value={unidad.nombre}>
                            {unidad.texto} ({unidad.nombre})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        onClick={intercambiarUnidades}
                        className="p-2 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="unidadDestino" className="block text-sm font-medium text-gray-700 mb-1">A</label>
                      <select 
                        id="unidadDestino"
                        value={unidadDestino} 
                        onChange={(e) => setUnidadDestino(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        {unidades[categoria].map((unidad) => (
                          <option key={unidad.nombre} value={unidad.nombre}>
                            {unidad.texto} ({unidad.nombre})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Botón de conversión */}
                  <div>
                    <Button 
                      onClick={convertir}
                      className="w-full"
                    >
                      Convertir
                    </Button>
                  </div>
                  
                  {/* Resultado */}
                  {resultado !== null && (
                    <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Check className="h-5 w-5 text-teal-600 mr-2" />
                        <h3 className="font-medium text-teal-800">Resultado</h3>
                      </div>
                      <p className="text-center text-lg font-semibold text-gray-800">
                        {valorEntrada} {unidadOrigen} = {resultado.toLocaleString(undefined, { maximumFractionDigits: 6 })} {unidadDestino}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Historial de conversiones */}
                {historial.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Historial de conversiones</h3>
                    <div className="space-y-2">
                      {historial.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
                          <span className="font-medium text-gray-700">
                            {item.valorOriginal} {item.unidadOrigen} = {item.resultado.toLocaleString(undefined, { maximumFractionDigits: 6 })} {item.unidadDestino}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">({item.categoria})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Pestaña de aprendizaje */}
            {activeTab === 'aprende' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aprende sobre Conversiones</h2>
                
                <div className="space-y-6">
                  {/* Explicación general */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">¿Cómo convertir unidades?</h3>
                    <p className="text-gray-600 mb-4">
                      Para convertir entre unidades del mismo tipo, necesitas conocer la relación entre ellas. 
                      Por ejemplo, 1 metro equivale a 100 centímetros. Esto significa que para convertir de metros 
                      a centímetros, debes multiplicar por 100.
                    </p>
                    <p className="text-gray-600">
                      La conversión se basa en factores de conversión. Multiplicamos o dividimos según 
                      vayamos de unidades mayores a menores (multiplicar) o de menores a mayores (dividir).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Ejemplos por categoría</h3>
                    
                    <div className="space-y-4">
                      {/* Longitud */}
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Longitud</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>1 kilómetro (km) = 1000 metros (m)</li>
                          <li>1 metro (m) = 100 centímetros (cm)</li>
                          <li>1 centímetro (cm) = 10 milímetros (mm)</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Ejemplo:</p>
                          <p className="text-gray-600">
                            Para convertir 2.5 metros a centímetros: 2.5 m × 100 = 250 cm
                          </p>
                        </div>
                      </div>
                      
                      {/* Masa */}
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Masa</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>1 kilogramo (kg) = 1000 gramos (g)</li>
                          <li>1 gramo (g) = 1000 miligramos (mg)</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Ejemplo:</p>
                          <p className="text-gray-600">
                            Para convertir 3.5 kg a gramos: 3.5 kg × 1000 = 3500 g
                          </p>
                        </div>
                      </div>
                      
                      {/* Capacidad */}
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">Capacidad</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>1 kilolitro (kl) = 1000 litros (l)</li>
                          <li>1 litro (l) = 100 centilitros (cl)</li>
                          <li>1 litro (l) = 1000 mililitros (ml)</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Ejemplo:</p>
                          <p className="text-gray-600">
                            Para convertir 2 litros a mililitros: 2 l × 1000 = 2000 ml
                          </p>
                        </div>
                      </div>
                      
                      {/* Tiempo */}
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Tiempo</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>1 día = 24 horas (h)</li>
                          <li>1 hora (h) = 60 minutos (min)</li>
                          <li>1 minuto (min) = 60 segundos (s)</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Ejemplo:</p>
                          <p className="text-gray-600">
                            Para convertir 2.5 horas a minutos: 2.5 h × 60 = 150 min
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Consejos prácticos</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Escribe siempre las unidades junto a los números para evitar confusiones.</li>
                      <li>Verifica que tu respuesta tenga sentido (por ejemplo, 2 km son más que 500 m).</li>
                      <li>Cuando conviertas entre unidades, asegúrate de usar el factor de conversión correcto.</li>
                      <li>Practica con el conversor para familiarizarte con las relaciones entre unidades.</li>
                      <li>Recuerda que al convertir de una unidad mayor a una menor, el número aumenta.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
