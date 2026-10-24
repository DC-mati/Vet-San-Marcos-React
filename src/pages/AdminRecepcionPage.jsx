import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import RecepcionContenido from '../components/organisms/RecepcionContenido'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/**
 * Recepción dentro del dashboard admin.
 * Conserva el menú administrativo y el rol en sesión.
 */
export default function AdminRecepcionPage() {
  useTituloPagina('Recepción')

  return (
    <PlantillaAdmin
      titulo="Panel de recepción"
      descripcion="Gestiona las solicitudes y horarios de atención"
      enlaces={enlacesAdmin}
    >
      <RecepcionContenido />
    </PlantillaAdmin>
  )
}
