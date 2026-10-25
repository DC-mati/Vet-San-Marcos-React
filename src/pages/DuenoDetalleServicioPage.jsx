import { useNavigate, useParams } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import DetalleServicioContenido from '../components/organisms/DetalleServicioContenido'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCatalogoDueno } from '../constants/rutasCatalogo'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoDetalleServicioPage() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const { obtenerPorCodigo } = useServicios()
  const servicio = obtenerPorCodigo(codigo)

  useTituloPagina(servicio ? servicio.nombre : 'Servicio')

  const solicitar = () => {
    navigate(
      `${rutasCitaDueno.formulario}?codigo=${encodeURIComponent(servicio.codigo)}`,
    )
  }

  return (
    <PlantillaAdmin
      titulo="Detalle del servicio"
      descripcion={servicio?.categoria || ''}
      enlaces={enlacesPanelDueno}
    >
      <DetalleServicioContenido
        servicio={servicio}
        rutaCatalogo={rutasCatalogoDueno.lista}
        onSolicitar={servicio ? solicitar : undefined}
      />
    </PlantillaAdmin>
  )
}
