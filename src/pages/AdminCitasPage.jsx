import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import { validarPropuestaHorario } from '../utils/citasEstados'

export default function AdminCitasPage() {
  useTituloPagina('Admin citas')
  const { citas, cambiarEstado, proponerHorario, eliminar } = useCitas()
  const [mensaje, setMensaje] = useState('')

  return (
    <PlantillaAdmin titulo="Gestión de citas" enlaces={enlacesAdmin}>
      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}
      <TablaCitas
        citas={citas}
        modo="admin"
        onConfirmar={(id) => {
          const resultado = cambiarEstado(id, 'Confirmada')
          setMensaje(resultado.ok ? 'Cita confirmada.' : resultado.error)
        }}
        onProponer={(id, fecha, hora) => {
          const validacion = validarPropuestaHorario(fecha, hora)
          if (!validacion.ok) {
            setMensaje(validacion.error)
            return
          }
          const resultado = proponerHorario(id, fecha, hora)
          setMensaje(resultado.ok ? 'Propuesta registrada.' : resultado.error)
        }}
        onEliminar={(id) => {
          const resultado = eliminar(id)
          setMensaje(resultado.ok ? 'Cita eliminada.' : resultado.error)
        }}
      />
    </PlantillaAdmin>
  )
}
