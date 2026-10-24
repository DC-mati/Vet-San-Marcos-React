import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import CatalogoContenido from '../components/organisms/CatalogoContenido'
import { rutasCatalogoPublico } from '../constants/rutasCatalogo'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function ServiciosPage() {
  useTituloPagina('Servicios')
  const navigate = useNavigate()

  const solicitar = (codigo) => {
    navigate(`/solicitar-cita?codigo=${encodeURIComponent(codigo)}`)
  }

  const rutaDetalle = (codigo, search = '') =>
    `${rutasCatalogoPublico.detalle(codigo)}${search}`

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <CatalogoContenido
          onSolicitar={solicitar}
          rutaDetalle={rutaDetalle}
        />
      </Container>
    </PlantillaPublica>
  )
}
