import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, ChevronRight, RefreshCw, Check, ArrowLeft } from 'lucide-react'

import ModuleHeader from '../../components/ModuleHeader'
import { useAuth } from '../../contexts/auth-context'

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

export default function ConversionUnidades() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('conversor')
  const [categoria, setCategoria] = useState('longitud')
  const [valorEntrada, setValorEntrada] = useState('')
  const [unidadOrigen, setUnidadOrigen] = useState(unidades[categoria as keyof typeof unidades][0].nombre)
  const [unidadDestino, setUnidadDestino] = useState(unidades[categoria as keyof typeof unidades][1].nombre)
  const [resultado, setResultado] = useState<number | null>(null)
  const [historial, setHistorial] = useState<Array<{
    categoria: string;
    valorOriginal: string;
    unidadOrigen: string;
    unidadDestino: string;
    resultado: number;
  }>>([])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  // Actualizar unidades cuando cambia la categoría
  useEffect(() => {
    setUnidadOrigen(unidades[categoria as keyof typeof unidades][0].nombre)
    setUnidadDestino(unidades[categoria as keyof typeof unidades][1].nombre)
    setResultado(null)
  }, [categoria])

  // Función para realizar la conversión
  const convertir = () => {
    if (!valorEntrada || isNaN(parseFloat(valorEntrada))) {
      alert('Por favor, introduce un valor numérico válido')
      return
    }

    const valor = parseFloat(valorEntrada)
    const unidadesActuales = unidades[categoria as keyof typeof unidades]
    
    const unidadOrigenObj = unidadesActuales.find(u => u.nombre === unidadOrigen)
    const unidadDestinoObj = unidadesActuales.find(u => u.nombre === unidadDestino)
    
    if (!unidadOrigenObj || !unidadDestinoObj) {
      alert('Error en las unidades seleccionadas')
      return
    }
    
    // Convertir a la unidad base y luego a la unidad destino
    const valorEnUnidadBase = valor * unidadOrigenObj.valor
    const resultadoCalculado = valorEnUnidadBase / unidadDestinoObj.valor
    
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 pb-16">
      {/* Header */}
      <ModuleHeader title="Conversión de Unidades" backPath="/modulos/medida" />

      {/* Contenido */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="w-full">
            <div className="flex mb-4 border-b gap-4">
              <button 
                onClick={() => setActiveTab('conversor')}
                className={`py-2 px-4 font-medium ${activeTab === 'conversor' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
              >
                Conversor
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversor de Unidades</h2>
                
                <div className="space-y-4">
                  {/* Selector de categoría */}
                  <div className="mb-4">
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select 
                      id="categoria"
                      value={categoria} 
                      onChange={(e) => setCategoria(e.target.value)}
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
                        {unidades[categoria as keyof typeof unidades].map((unidad) => (
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
                        {unidades[categoria as keyof typeof unidades].map((unidad) => (
                          <option key={unidad.nombre} value={unidad.nombre}>
                            {unidad.texto} ({unidad.nombre})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Botón de conversión */}
                  <button 
                    onClick={convertir}
                    className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md flex items-center justify-center"
                    type="button"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Convertir
                  </button>
                  
                  {/* Resultado */}
                  {resultado !== null && (
                    <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <p className="text-center">
                        <span className="font-semibold">{valorEntrada} {unidadOrigen}</span>
                        {' = '}
                        <span className="font-bold text-teal-700">{resultado.toLocaleString('es-ES', { maximumFractionDigits: 6 })} {unidadDestino}</span>
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Historial de conversiones */}
                {historial.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Historial reciente</h3>
                    <div className="space-y-2">
                      {historial.map((item, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded text-sm flex items-center">
                          <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>
                            {item.valorOriginal} {item.unidadOrigen} = {item.resultado.toLocaleString('es-ES', { maximumFractionDigits: 4 })} {item.unidadDestino}
                            <span className="text-gray-500 ml-1">({item.categoria})</span>
                          </span>
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
                      Para convertir unidades, necesitamos conocer la relación entre ellas. Podemos usar factores de conversión
                      o multiplicar/dividir por potencias de 10 en el caso del sistema métrico decimal.
                    </p>
                  </div>
                  
                  {/* Reglas generales */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Reglas generales</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Para convertir de una unidad mayor a una menor, multiplica por la potencia de 10 correspondiente.</li>
                      <li>Para convertir de una unidad menor a una mayor, divide por la potencia de 10 correspondiente.</li>
                      <li>En el sistema métrico, los prefijos indican la potencia de 10: kilo (1000), centi (0.01), mili (0.001), etc.</li>
                    </ul>
                  </div>
                  
                  {/* Ejemplos por categoría */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Ejemplos por categoría</h3>
                    
                    <div className="space-y-4">
                      {/* Longitud */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-teal-100 p-3">
                          <h4 className="font-medium text-gray-800">Longitud</h4>
                        </div>
                        <div className="p-3">
                          <p className="mb-2 text-gray-600">Relaciones: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-800 p-2 rounded ">
                              <strong>Ejemplo 1:</strong> 2.5 km a m
                              <p>2.5 × 1000 = 2500 m</p>
                            </div>
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 2:</strong> 350 cm a m
                              <p>350 ÷ 100 = 3.5 m</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Masa */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-green-100 p-3">
                          <h4 className="font-medium text-gray-800">Masa</h4>
                        </div>
                        <div className="p-3">
                          <p className="mb-2 text-gray-600">Relaciones: 1 kg = 1000 g, 1 g = 1000 mg</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 1:</strong> 3.2 kg a g
                              <p>3.2 × 1000 = 3200 g</p>
                            </div>
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 2:</strong> 4500 mg a g
                              <p>4500 ÷ 1000 = 4.5 g</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Capacidad */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-100 p-3">
                          <h4 className="font-medium text-gray-800">Capacidad</h4>
                        </div>
                        <div className="p-3">
                          <p className="mb-2 text-gray-600">Relaciones: 1 kl = 1000 l, 1 l = 100 cl, 1 l = 1000 ml</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 1:</strong> 1.5 l a ml
                              <p>1.5 × 1000 = 1500 ml</p>
                            </div>
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 2:</strong> 250 ml a l
                              <p>250 ÷ 1000 = 0.25 l</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tiempo */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-100 p-3">
                          <h4 className="font-medium text-gray-800">Tiempo</h4>
                        </div>
                        <div className="p-3">
                          <p className="mb-2 text-gray-600">Relaciones: 1 día = 24 h, 1 h = 60 min, 1 min = 60 s</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-800 p-2 rounded">
                              <strong>Ejemplo 1:</strong> 2.5 h a min
                              <p>2.5 × 60 = 150 min</p>
                            </div>
                            <div className="bg-gray-800  p-2 rounded">
                              <strong>Ejemplo 2:</strong> 90 min a h
                              <p>90 ÷ 60 = 1.5 h</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Consejos prácticos */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Consejos prácticos</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Escribe siempre las unidades junto a los números para evitar confusiones.</li>
                      <li>Verifica que tu respuesta tenga sentido (por ejemplo, 2 km son más que 500 m).</li>
                      <li>Usa el conversor interactivo para practicar y comprobar tus cálculos.</li>
                      <li>Recuerda que en el sistema métrico, las conversiones son siempre potencias de 10.</li>
                    </ul>
                  </div>
                  
                  {/* Botón para ir al conversor */}
                  <button 
                    onClick={() => setActiveTab('conversor')}
                    className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md flex items-center justify-center"
                    type="button"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Ir al conversor para practicar
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => navigate("/modulos/medida")}
              className="flex items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              type="button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Introducción
            </button>
            
            <button 
              onClick={() => navigate("/modulos/medida/actividades")}
              className="flex items-center py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
              type="button"
            >
              Ir a Actividades
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
