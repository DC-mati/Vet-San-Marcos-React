import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useLocation } from 'react-router-dom'

import { formatoPrecio } from '../../utils/formatoPrecio'

/**
 * Detalle de un servicio sin plantilla.
 * rutaCatalogo es la lista a la que regresa el botón Volver.
 */
export default function DetalleServicioContenido({
  servicio,
  rutaCatalogo,
  onSolicitar,
}) {
  const location = useLocation()
  const volver = `${rutaCatalogo}${location.search || ''}`

  if (!servicio) {
    return (
      <>
        <Alert variant="warning">Servicio no encontrado.</Alert>
        <Button as={Link} to={volver} variant="primary">
          Volver al catálogo
        </Button>
      </>
    )
  }

  return (
    <>
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

      <Button variant="primary" className="me-2" onClick={() => onSolicitar?.()}>
        Solicitar cita
      </Button>
      <Button as={Link} to={volver} variant="outline-secondary">
        Volver
      </Button>
    </>
  )
}
