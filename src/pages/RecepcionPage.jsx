import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import RecepcionContenido from '../components/organisms/RecepcionContenido'
import { enlacesRecepcion } from '../constants/navegacionPaneles'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function RecepcionPage() {
  useTituloPagina('Recepción')

  return (
    <PlantillaAdmin
      titulo="Panel de recepción"
      descripcion="Gestiona las solicitudes y horarios de atención"
      enlaces={enlacesRecepcion}
    >
      <RecepcionContenido />
    </PlantillaAdmin>
  )
}
