import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import RecepcionPacientesContenido from '../components/organisms/RecepcionPacientesContenido'
import { enlacesRecepcion } from '../constants/navegacionPaneles'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function RecepcionPacientesPage() {
  useTituloPagina('Pacientes')

  return (
    <PlantillaAdmin
      titulo="Pacientes registrados"
      descripcion="Consulta de mascotas activas registradas por los dueños."
      enlaces={enlacesRecepcion}
    >
      <RecepcionPacientesContenido />
    </PlantillaAdmin>
  )
}
