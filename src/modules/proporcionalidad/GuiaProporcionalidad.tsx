import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import ModuleHeader from '../../components/ModuleHeader'
import { useAuth } from '../../contexts/auth-context'
import { SEO } from '../../components/seo/SEO'

export default function GuiaProporcionalidad() {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const temasEstudio = [
    {
      titulo: "Conceptos de Proporcionalidad",
      descripcion: "Entiende qué es la proporcionalidad y cómo se aplica en la vida diaria.",
      temas: [
        "Definición de proporcionalidad",
        "Proporcionalidad directa e inversa",
        "Ejemplos cotidianos"
      ]
    },
    {
      titulo: "Cálculo de Proporciones",
      descripcion: "Aprende a resolver problemas de proporciones y cómo calcularlas.",
      temas: [
        "Método de regla de tres",
        "Ejercicios prácticos",
        "Aplicaciones en la vida real"
      ]
    }
  ]

  return (
    <>
      <SEO 
        title="Guía de Proporcionalidad" 
        description="Guía completa para aprender sobre proporcionalidad, sus conceptos y aplicaciones."
        keywords="proporcionalidad, matemáticas, guía de estudio, proporciones"
        url="https://matematicas-732ff.web.app/modulos/proporcionalidad/guia"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
        <ModuleHeader title="Guía de Proporcionalidad" backPath="/modulos/proporcionalidad" />

        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <BookOpen className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Guía Completa de Proporcionalidad</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Aprende sobre la proporcionalidad y cómo aplicarla en diferentes situaciones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {temasEstudio.map((tema, index) => (
                <Card key={index} className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{tema.titulo}</h3>
                  <p className="text-gray-600 mb-4">{tema.descripcion}</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {tema.temas.map((subtema, subIndex) => (
                      <li key={subIndex} className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                        {subtema}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                onClick={() => navigate("/modulos/proporcionalidad/calculadora-proporcionalidad")}
                className="mx-auto"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Ir a la Calculadora de Proporciones
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
