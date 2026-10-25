import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, useLocation } from 'react-router-dom'

import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import { formatoPrecio } from '../../utils/formatoPrecio'

/**
 * Tarjeta reutilizable del catálogo.
 * Recibe un servicio completo por props (no consulta el catálogo).
 */
export default function TarjetaServicio({
  servicio,
  onSolicitar,
  rutaDetalle,
}) {
  const location = useLocation()

  const enlaceDetalle =
    typeof rutaDetalle === 'function'
      ? rutaDetalle(servicio.codigo, location.search)
      : `${rutaDetalle || `/servicios/${servicio.codigo}`}${location.search}`

  return (
    <Card className="h-100 shadow-sm border-0 service-preview">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title className="mb-0 fs-5">{servicio.nombre}</Card.Title>
          <small className="text-muted">{servicio.codigo}</small>
        </div>

        <p className="text-secondary small mb-2">{servicio.categoria}</p>
        <EtiquetaEspecie especie={servicio.especie} />

        <Card.Text className="text-secondary mt-2 mb-3">
          {servicio.duracion && `Duración: ${servicio.duracion}`}
          {servicio.observaciones && (
            <>
              <br />
              {servicio.observaciones}
            </>
          )}
        </Card.Text>

        <p className="service-preview__price fw-semibold mt-auto">
          {formatoPrecio(servicio.precio)}
        </p>

        <div className="d-flex flex-wrap gap-2 mt-2">
          <Button
            as={Link}
            to={enlaceDetalle}
            variant="outline-primary"
            size="sm"
          >
            Ver detalle
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSolicitar?.(servicio.codigo)}
          >
            Solicitar cita
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
