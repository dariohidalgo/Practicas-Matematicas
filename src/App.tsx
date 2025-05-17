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
import GuiaUnidades from "./modules/medida/GuiaUnidades"
import ListaActividadesNumerosRacionales from "./modules/numeros-racionales/ListaActividades"
import ActividadNumerosRacionales from "./modules/numeros-racionales/Actividad"
import Actividad2NumerosRacionales from "./modules/numeros-racionales/Actividad2"
import Actividad3NumerosRacionales from "./modules/numeros-racionales/Actividad3"
import ListaActividadesAritmetica from "./modules/aritmetica/ListaActividades"
import ActividadAritmetica from "./modules/aritmetica/Actividad"
import ActividadDivisibilidad from "./modules/aritmetica/Actividad2"
import ActividadMCDMCM from "./modules/aritmetica/Actividad3"
import GuiaNumerosNaturales from "./modules/aritmetica/GuiaNumerosNaturales"
import GuiaEstudioNaturales from "./modules/numeros-naturales/GuiaEstudio"
import CalculadoraInteractiva from "./modules/aritmetica/CalculadoraInteractiva"
import CalculadoraProporcionalidad from "./modules/proporcionalidad/CalculadoraProporcionalidad"
// Importaciones de las actividades de proporcionalidad
import ActividadProporcionalidad1 from "./modules/proporcionalidad/Actividad1"
import ActividadProporcionalidad2 from "./modules/proporcionalidad/Actividad2"
import ActividadProporcionalidad3 from "./modules/proporcionalidad/Actividad3"
import GuiaProporcionalidad from "./modules/proporcionalidad/GuiaProporcionalidad"
// Importaciones de las actividades de números naturales
import ActividadNaturales1 from "./modules/numeros-naturales/Actividad1"
import ActividadNaturales2 from "./modules/numeros-naturales/Actividad2"
import ActividadNaturales3 from "./modules/numeros-naturales/Actividad3"
import Actividad1Geometria from "./modules/geometria/Actividad1"
import Actividad2Geometria from "./modules/geometria/Actividad2"
import Actividad3Geometria from "./modules/geometria/Actividad3"
import Actividad2Medida from "./modules/medida/Actividad2"
import Actividad3Medida from "./modules/medida/Actividad3"

const tourSteps = [
  {
    element: "#header",
    popover: {
      title: "Barra de Navegación",
      description: "Aquí encontrarás los módulos principales de la aplicación",
      position: "bottom" as const
    }
  },
  {
    element: "#dashboard-link",
    popover: {
      title: "Dashboard",
      description: "Accede a tu panel principal con estadísticas y progreso",
      position: "right" as const
    }
  },
  {
    element: "#perfil-link",
    popover: {
      title: "Perfil",
      description: "Administra tu información personal y configuración",
      position: "left" as const
    }
  }
];

function App() {
  return (
    <ProgressProvider>
      <div className="w-full min-h-screen">
        <Router>
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
            <Route path="/modulos/proporcionalidad/calculadora-proporcionalidad" element={<CalculadoraProporcionalidad />} />
            <Route path="/modulos/proporcionalidad/guia-proporcionalidad" element={<GuiaProporcionalidad />} />
            {/* Rutas del módulo de números naturales */}
            <Route path="/modulos/numeros-naturales" element={<IntroduccionNaturales />} />
            <Route path="/modulos/numeros-naturales/actividades" element={<ListaActividadesNaturales />} />
            <Route path="/modulos/numeros-naturales/actividad-1" element={<ActividadNaturales1 />} />
            <Route path="/modulos/numeros-naturales/actividad-2" element={<ActividadNaturales2 />} />
            <Route path="/modulos/numeros-naturales/actividad-3" element={<ActividadNaturales3 />} />
            <Route path="/modulos/numeros-naturales/division-cociente-resto" element={<DivisionCocienteResto />} />
            <Route path="/modulos/numeros-naturales/guia-estudio" element={<GuiaEstudioNaturales />} />
            
            {/* Rutas del módulo de aritmética */}
            <Route path="/modulos/aritmetica" element={<IntroduccionAritmetica />} />
            <Route path="/modulos/aritmetica/actividades" element={<ListaActividadesAritmetica />} />
            <Route path="/modulos/aritmetica/actividad-1" element={<ActividadAritmetica />} />
            <Route path="/modulos/aritmetica/actividad-2" element={<ActividadDivisibilidad />} />
            <Route path="/modulos/aritmetica/actividad-3" element={<ActividadMCDMCM />} />
            <Route path="/modulos/aritmetica/guia-numeros-naturales" element={<GuiaNumerosNaturales />} />
            <Route path="/modulos/aritmetica/calculadora-interactiva" element={<CalculadoraInteractiva />} />
            
            {/* Rutas del módulo de geometría */}
            <Route path="/modulos/geometria" element={<IntroduccionGeometria />} />
            <Route path="/modulos/geometria/actividades" element={<ListaActividadesGeometria />} />
            <Route path="/modulos/geometria/actividad-1" element={<Actividad1Geometria />} />
            <Route path="/modulos/geometria/actividad-2" element={<Actividad2Geometria />} />
            <Route path="/modulos/geometria/actividad-3" element={<Actividad3Geometria />} />
            <Route path="/modulos/geometria/actividad" element={<ActividadGeometria />} />
            <Route path="/modulos/geometria/aprende-triangulos" element={<AprendeTriangulos />} />
            <Route path="/modulos/geometria/guia-figuras-geometricas" element={<GuiaFigurasGeometricas />} />
            <Route path="/modulos/geometria/calculadora-areas" element={<CalculadoraAreas />} />
            
            {/* Rutas del módulo de medida */}
            <Route path="/modulos/medida" element={<IntroduccionMedida />} />
            <Route path="/modulos/medida/actividades" element={<ListaActividadesMedida />} />
            <Route path="/modulos/medida/actividad-1" element={<ActividadMedida />} />
            <Route path="/modulos/medida/actividad-2" element={<Actividad2Medida />} />
            <Route path="/modulos/medida/actividad-3" element={<Actividad3Medida />} />
            <Route path="/modulos/medida/conversion-unidades" element={<ConversionUnidades />} />
            <Route path="/modulos/medida/guia-unidades" element={<GuiaUnidades />} />
            
            {/* Rutas del módulo de números racionales */}
            <Route path="/modulos/numeros-racionales" element={<IntroduccionRacionales />} />
            <Route path="/modulos/numeros-racionales/actividades" element={<ListaActividadesNumerosRacionales />} />
            <Route path="/modulos/numeros-racionales/actividad-1" element={<ActividadNumerosRacionales />} />
            <Route path="/modulos/numeros-racionales/actividad-2" element={<Actividad2NumerosRacionales />} />
            <Route path="/modulos/numeros-racionales/actividad-3" element={<Actividad3NumerosRacionales />} />
          </Routes>
        </Router>
      </div>
    </ProgressProvider>
  );
}

export default App