import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, Grid, Layers, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import ModuleHeader from '../../components/ModuleHeader'
import { useAuth } from '../../contexts/auth-context'
import { SEO } from '../../components/seo/SEO'

export default function GuiaEstudioNaturales() {
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
      icono: <Grid className="h-8 w-8 text-blue-600" />,
      titulo: "Conceptos Fundamentales",
      descripcion: "Fundamentos de los números naturales y su importancia.",
      temas: [
        "Definición de números naturales",
        "Origen y uso histórico",
        "Representación en la recta numérica",
        "Comparación y orden"
      ]
    },
    {
      icono: <Calculator className="h-8 w-8 text-green-600" />,
      titulo: "Operaciones Básicas",
      descripcion: "Domina las operaciones fundamentales con números naturales.",
      temas: [
        "Suma y sus propiedades",
        "Resta y sus reglas",
        "Multiplicación y sus técnicas",
        "División y residuo",
        "Orden de operaciones"
      ]
    },
    {
      icono: <Layers className="h-8 w-8 text-purple-600" />,
      titulo: "Propiedades Avanzadas",
      descripcion: "Explora propiedades matemáticas más complejas.",
      temas: [
        "Conmutatividad",
        "Asociatividad",
        "Distributividad",
        "Elemento neutro",
        "Propiedades de divisibilidad"
      ]
    }
  ]

  const recursosAdicionales = [
    {
      titulo: "Calculadora Interactiva",
      descripcion: "Practica operaciones con números naturales",
      ruta: "/modulos/aritmetica/calculadora-interactiva",
      color: "bg-blue-50",
      icono: <Calculator className="h-6 w-6 text-blue-600" />
    },
    {
      titulo: "División y Cociente",
      descripcion: "Aprende sobre división y resto",
      ruta: "/modulos/numeros-naturales/division-cociente-resto",
      color: "bg-green-50",
      icono: <BookOpen className="h-6 w-6 text-green-600" />
    }
  ]

  return (
    <>
      <SEO 
        title="Guía de Estudio de Números Naturales" 
        description="Guía completa para aprender y comprender números naturales, operaciones básicas y propiedades matemáticas."
        keywords="números naturales, matemáticas, guía de estudio, operaciones, propiedades"
        url="https://matematicas-732ff.web.app/modulos/numeros-naturales/guia-estudio"
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
        <ModuleHeader title="Guía de Estudio" backPath="/modulos/numeros-naturales" />

        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <BookOpen className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Guía Completa de Números Naturales</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Una guía detallada para comprender y dominar los números naturales, desde conceptos básicos hasta propiedades avanzadas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {temasEstudio.map((tema, index) => (
                <Card key={index} className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {tema.icono}
                    <h3 className="ml-4 text-xl font-semibold text-gray-800">{tema.titulo}</h3>
                  </div>
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

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Recursos Adicionales</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {recursosAdicionales.map((recurso, index) => (
                  <div 
                    key={index} 
                    className={`${recurso.color} p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer`}
                    onClick={() => navigate(recurso.ruta)}
                  >
                    <div className="flex items-center">
                      {recurso.icono}
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-800">{recurso.titulo}</h4>
                        <p className="text-sm text-gray-600">{recurso.descripcion}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button 
                onClick={() => navigate("/modulos/numeros-naturales/actividades")}
                className="mx-auto"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Ir a Actividades
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
