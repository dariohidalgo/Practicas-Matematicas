import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/auth/Login'
import Dashboard from "./pages/Dashboard"
import Perfil from "./pages/Perfil"
import ListaActividades from "./modules/proporcionalidad/ListaActividades"
import { ProgressProvider } from "./contexts/progress-context"

// Importaciones de números naturales
import IntroduccionNaturales from "./modules/numeros-naturales/Introduccion"
import DivisionCocienteResto from "./modules/numeros-naturales/DivisionCocienteResto"
import ListaActividadesNaturales from "./modules/numeros-naturales/ListaActividades"

// Importaciones de introducciones
import IntroduccionGeometria from "./modules/geometria/Introduccion"
import IntroduccionMedida from "./modules/medida/Introduccion"
import IntroduccionRacionales from "./modules/numeros-racionales/Introduccion"
import IntroduccionProporcionalidad from "./modules/proporcionalidad/Introduccion"
import IntroduccionAritmetica from "./modules/aritmetica/Introduccion"

// Importaciones de los nuevos módulos
import ListaActividadesGeometria from "./modules/geometria/ListaActividades"
import ActividadGeometria from "./modules/geometria/Actividad"
import AprendeTriangulos from "./modules/geometria/AprendeTriangulos"
import GuiaFigurasGeometricas from "./modules/geometria/GuiaFigurasGeometricas"
import CalculadoraAreas from "./modules/geometria/CalculadoraAreas"
import ListaActividadesMedida from "./modules/medida/ListaActividades"
import ActividadMedida from "./modules/medida/Actividad"
import ConversionUnidades from "./modules/medida/ConversionUnidades"
import ListaActividadesNumerosRacionales from "./modules/numeros-racionales/ListaActividades"
import ActividadNumerosRacionales from "./modules/numeros-racionales/Actividad"
import ListaActividadesAritmetica from "./modules/aritmetica/ListaActividades"
import ActividadAritmetica from "./modules/aritmetica/Actividad"
import GuiaNumerosNaturales from "./modules/aritmetica/GuiaNumerosNaturales"
import CalculadoraInteractiva from "./modules/aritmetica/CalculadoraInteractiva"

// Importaciones de las actividades de proporcionalidad
import ActividadProporcionalidad1 from "./modules/proporcionalidad/Actividad1"
import ActividadProporcionalidad2 from "./modules/proporcionalidad/Actividad2"
import ActividadProporcionalidad3 from "./modules/proporcionalidad/Actividad3"

// Importaciones de las actividades de números naturales
import ActividadNaturales1 from "./modules/numeros-naturales/Actividad1"
import ActividadNaturales2 from "./modules/numeros-naturales/Actividad2"
import ActividadNaturales3 from "./modules/numeros-naturales/Actividad3"

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <ProgressProvider>
          <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          
          {/* Rutas del módulo de proporcionalidad */}
          <Route path="/modulos/proporcionalidad" element={<IntroduccionProporcionalidad />} />
          <Route path="/modulos/proporcionalidad/actividades" element={<ListaActividades />} />
          <Route path="/modulos/proporcionalidad/actividad-1" element={<ActividadProporcionalidad1 />} />
          <Route path="/modulos/proporcionalidad/actividad-2" element={<ActividadProporcionalidad2 />} />
          <Route path="/modulos/proporcionalidad/actividad-3" element={<ActividadProporcionalidad3 />} />
          
          {/* Rutas del módulo de números naturales */}
          <Route path="/modulos/numeros-naturales" element={<IntroduccionNaturales />} />
          <Route path="/modulos/numeros-naturales/actividades" element={<ListaActividadesNaturales />} />
          <Route path="/modulos/numeros-naturales/actividad-1" element={<ActividadNaturales1 />} />
          <Route path="/modulos/numeros-naturales/actividad-2" element={<ActividadNaturales2 />} />
          <Route path="/modulos/numeros-naturales/actividad-3" element={<ActividadNaturales3 />} />
          <Route path="/modulos/numeros-naturales/division-cociente-resto" element={<DivisionCocienteResto />} />
          
          {/* Rutas del módulo de aritmética */}
          <Route path="/modulos/aritmetica" element={<IntroduccionAritmetica />} />
          <Route path="/modulos/aritmetica/actividades" element={<ListaActividadesAritmetica />} />
          <Route path="/modulos/aritmetica/actividad-1" element={<ActividadAritmetica />} />
          <Route path="/modulos/aritmetica/guia-numeros-naturales" element={<GuiaNumerosNaturales />} />
          <Route path="/modulos/aritmetica/calculadora-interactiva" element={<CalculadoraInteractiva />} />
          
          {/* Rutas del módulo de geometría */}
          <Route path="/modulos/geometria" element={<IntroduccionGeometria />} />
          <Route path="/modulos/geometria/actividades" element={<ListaActividadesGeometria />} />
          <Route path="/modulos/geometria/actividad-1" element={<ActividadGeometria />} />
          <Route path="/modulos/geometria/aprende-triangulos" element={<AprendeTriangulos />} />
          <Route path="/modulos/geometria/guia-figuras" element={<GuiaFigurasGeometricas />} />
          <Route path="/modulos/geometria/calculadora-areas" element={<CalculadoraAreas />} />
          
          {/* Rutas del módulo de medida */}
          <Route path="/modulos/medida" element={<IntroduccionMedida />} />
          <Route path="/modulos/medida/actividades" element={<ListaActividadesMedida />} />
          <Route path="/modulos/medida/actividad-1" element={<ActividadMedida />} />
          <Route path="/modulos/medida/conversion-unidades" element={<ConversionUnidades />} />
          
          {/* Rutas del módulo de números racionales */}
          <Route path="/modulos/numeros-racionales" element={<IntroduccionRacionales />} />
          <Route path="/modulos/numeros-racionales/actividades" element={<ListaActividadesNumerosRacionales />} />
          <Route path="/modulos/numeros-racionales/actividad-1" element={<ActividadNumerosRacionales />} />
        </Routes>
        </ProgressProvider>
      </Router>
    </div>
  )
}

export default App