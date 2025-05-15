
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { SEO } from '../../components/seo/SEO'
import { Button } from '../../components/ui/button'
import ModuleHeader from '../../components/ModuleHeader'

export default function CalculadoraProporcionalidad() {
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

  const [valorA, setValorA] = useState(0);
const [valorB, setValorB] = useState(0);
const [resultado, setResultado] = useState<number | null>(null);

const calcularProporcion = () => {
    if (valorB !== 0) {
        const proporción = valorA / valorB;
        setResultado(proporción);
    } else {
        alert('El valor B no puede ser cero.');
    }
};

return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 pb-16">
        <SEO 
            title="Calculadora de Porcentajes" 
            description="Calculadora para resolver problemas de proporcionalidad."
            keywords="calculadora, proporcionalidad, matemáticas"
            url="https://matematicas-732ff.web.app/modulos/proporcionalidad/calculadora-proporciones"
        />
        <div className=" ">
            <ModuleHeader title="Calculadora de Porcentajes" backPath="/modulos/proporcionalidad" />
            <h2 className="max-w-3xl mx-auto text-3xl font-bold text-gray-800 mb-4 mt-10">Calculadora de Porcentajes</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-900 mb-4">Introduce los valores para calcular porcentaje.</p>
            <p className="max-w-3xl mx-auto text-lg text-gray-900 mb-4">El porcentaje es una relación entre dos cantidades que se mantienen en una razón constante. Por ejemplo, si duplicas una cantidad, la otra también debe duplicarse para que la relación se mantenga.</p>
            <form className="mt-4 max-w-3xl mx-auto">
    

       
        
  
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-2">Valor A:</label>
            <input type="number" className="border rounded p-2 text-black border-black" placeholder="Ingrese el valor A" value={valorA} onChange={(e) => setValorA(Number(e.target.value))} />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-2">Valor B:</label>
            <input type="number" className="border rounded p-2 text-black border-black" placeholder="Ingrese el valor B" value={valorB} onChange={(e) => setValorB(Number(e.target.value))} />
          </div>
          <Button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={(e) => { e.preventDefault(); calcularProporcion(); }}>Calcular Proporción</Button>
        </form>
        <div className="mt-4 max-w-3xl mx-auto">
         
        
           {resultado !== null && (
               <>
                   <h3 className="text-xl text-gray-900 font-bold">Resultado: </h3>
                   <p className="text-gray-900 font-extrabold text-lg">El porcentaje es: {resultado}%</p>
               </>
           )}
         
          <p className="text-gray-900">Aquí se mostrará el resultado del porcentaje.</p>
        </div>
      </div>
   


    </main>
  )
}
