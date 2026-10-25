import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import DetalleServicioContenido from '../components/organisms/DetalleServicioContenido'
import { rutasCatalogoPublico } from '../constants/rutasCatalogo'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DetalleServicioPage() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const { obtenerPorCodigo } = useServicios()
  const servicio = obtenerPorCodigo(codigo)

  useTituloPagina(servicio ? servicio.nombre : 'Servicio')

  const solicitar = () => {
    navigate(
      `/solicitar-cita?codigo=${encodeURIComponent(servicio.codigo)}`,
    )
  }

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <DetalleServicioContenido
          servicio={servicio}
          rutaCatalogo={rutasCatalogoPublico.lista}
          onSolicitar={servicio ? solicitar : undefined}
        />
      </Container>
    </PlantillaPublica>
  )
}
