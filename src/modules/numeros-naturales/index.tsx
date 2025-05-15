import { Routes, Route } from 'react-router-dom'
import DivisionCocienteResto from './DivisionCocienteResto'

export default function ModuloNumerosNaturales() {
  return (
    <Routes>
      <Route path="/" element={<DivisionCocienteResto />} />
      {/* Aquí puedes agregar más rutas para otras actividades del módulo */}
    </Routes>
  )
}
