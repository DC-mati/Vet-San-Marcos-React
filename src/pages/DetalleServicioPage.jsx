import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useNavigate, useParams } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useServicios } from '../context/ServiciosContext'
import { formatoPrecio } from '../utils/formatoPrecio'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DetalleServicioPage() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const { obtenerPorCodigo } = useServicios()
  const servicio = obtenerPorCodigo(codigo)

  useTituloPagina(servicio ? servicio.nombre : 'Servicio')

  if (!servicio) {
    return (
      <PlantillaPublica>
        <Container className="py-5">
          <Alert variant="warning">Servicio no encontrado.</Alert>
          <Button as={Link} to="/servicios" variant="primary">
            Volver al catálogo
          </Button>
        </Container>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <p className="text-muted mb-1">{servicio.codigo}</p>
        <h1>{servicio.nombre}</h1>
        <p className="lead">{servicio.categoria}</p>

        <ul className="list-unstyled mb-4">
          <li>
            <strong>Especie:</strong> {servicio.especie}
          </li>
          <li>
            <strong>Duración:</strong> {servicio.duracion || '—'}
          </li>
          <li>
            <strong>Precio:</strong> {formatoPrecio(servicio.precio)}
          </li>
          {servicio.observaciones && (
            <li>
              <strong>Observaciones:</strong> {servicio.observaciones}
            </li>
          )}
        </ul>

        <Button
          variant="primary"
          className="me-2"
          onClick={() => navigate(`/solicitar-cita?codigo=${servicio.codigo}`)}
        >
          Solicitar cita
        </Button>
        <Button as={Link} to="/servicios" variant="outline-secondary">
          Volver
        </Button>
      </Container>
    </PlantillaPublica>
  )
}
