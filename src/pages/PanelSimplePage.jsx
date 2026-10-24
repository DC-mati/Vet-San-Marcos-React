import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/** Panel informativo para roles secundarios del caso (veterinario / técnico). */
export default function PanelSimplePage({ titulo, descripcion, enlaces = [] }) {
  useTituloPagina(titulo)

  return (
    <PlantillaAdmin titulo={titulo} enlaces={enlaces}>
      <Alert variant="info">{descripcion}</Alert>
    </PlantillaAdmin>
  )
}
