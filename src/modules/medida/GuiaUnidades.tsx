import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, Scale, Clock } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import ModuleHeader from '../../components/ModuleHeader'
import { useAuth } from '../../contexts/auth-context'
import { SEO } from '../../components/seo/SEO'

export default function GuiaUnidades() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const sistemasUnidades = [
    {
      icono: <Scale className="h-8 w-8 text-green-600" />,
      titulo: "Sistemas de Medida",
      descripcion: "Conoce los diferentes sistemas de unidades utilizados en ciencia y vida cotidiana.",
      categorias: [
        "Sistema Métrico Decimal",
        "Sistema Imperial",
        "Sistema Internacional (SI)"
      ]
    },
    {
      icono: <Calculator className="h-8 w-8 text-blue-600" />,
      titulo: "Conversiones Básicas",
      descripcion: "Aprende a convertir entre diferentes unidades de manera sencilla y práctica.",
      categorias: [
        "Longitud: m, km, cm, mm",
        "Masa: kg, g, mg",
        "Capacidad: l, ml, cl",
        "Tiempo: h, min, s"
      ]
    },
    {
      icono: <Clock className="h-8 w-8 text-purple-600" />,
      titulo: "Factores de Conversión",
      descripcion: "Comprende cómo multiplicar o dividir para cambiar entre unidades.",
      categorias: [
        "1 km = 1000 m",
        "1 m = 100 cm",
        "1 kg = 1000 g",
        "1 l = 1000 ml"
      ]
    }
  ]

  return (
    <>
      <SEO 
        title="Guía de Unidades de Medida | Módulo de Medida" 
        description="Guía completa sobre sistemas de unidades, conversiones y factores de conversión para longitud, masa, capacidad y tiempo."
        keywords="unidades, medida, conversión, sistemas de medida, guía, matemáticas"
        url="https://matematicas-732ff.web.app/modulos/medida/guia-unidades"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 pb-16">
        <ModuleHeader title="Guía de Unidades" backPath="/modulos/medida" />

        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <BookOpen className="h-12 w-12 mx-auto text-teal-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Guía Completa de Unidades de Medida</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explora los diferentes sistemas de unidades, aprende a realizar conversiones y comprende los conceptos fundamentales de medición.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {sistemasUnidades.map((sistema, index) => (
                <Card key={index} className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {sistema.icono}
                    <h3 className="ml-4 text-xl font-semibold text-gray-800">{sistema.titulo}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{sistema.descripcion}</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {sistema.categorias.map((categoria, catIndex) => (
                      <li key={catIndex} className="flex items-center">
                        <span className="mr-2 text-teal-500">•</span>
                        {categoria}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                onClick={() => navigate("/modulos/medida/conversion-unidades")}
                className="mx-auto"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Ir al Conversor de Unidades
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
