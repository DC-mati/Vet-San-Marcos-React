import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const enlaces = [{ to: '/recepcion', texto: 'Gestión de citas' }]

export default function RecepcionPage() {
  useTituloPagina('Recepción')
  const { citas, cambiarEstado, proponerHorario } = useCitas()

  return (
    <PlantillaAdmin titulo="Panel de recepción" enlaces={enlaces}>
      <Alert variant="info">
        Confirma solicitudes pendientes o propone otra fecha u hora. Los
        cambios se guardan en localStorage.
      </Alert>

      <TablaCitas
        citas={citas}
        modo="recepcion"
        onConfirmar={(id) => cambiarEstado(id, 'Confirmada')}
        onProponer={(id, fecha, hora) => {
          if (!fecha || !hora) {
            return
          }
          proponerHorario(id, fecha, hora)
        }}
      />
    </PlantillaAdmin>
  )
}
