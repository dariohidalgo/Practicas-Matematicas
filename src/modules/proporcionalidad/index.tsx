import { Routes, Route } from 'react-router-dom'
import Introduccion from './Introduccion'
import Actividad from './Actividad'

export default function ModuloProporcionalidad() {
  return (
    <Routes>
      <Route path="/" element={<Introduccion />} />
      <Route path="/actividad" element={<Actividad />} />
    </Routes>
  )
}
