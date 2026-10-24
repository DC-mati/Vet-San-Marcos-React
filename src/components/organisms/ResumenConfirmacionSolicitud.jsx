import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

import { formatoPrecio } from '../../utils/formatoPrecio'

export default function ResumenConfirmacionSolicitud({
  solicitud,
  enviando,
  onConfirmar,
  rutaEditar,
  ocultarEditar = false,
}) {
  return (
    <>
      <p className="text-secondary">
        Revisa los datos antes de enviar. La cita quedará en estado
        <strong> Pendiente </strong>
        hasta que recepción la confirme.
      </p>

      <ListGroup className="mb-4">
        <ListGroup.Item>
          Mascota: {solicitud.nombreMascota} ({solicitud.especie})
        </ListGroup.Item>
        <ListGroup.Item>Servicio: {solicitud.nombreServicio}</ListGroup.Item>
        <ListGroup.Item>
          Fecha y hora: {solicitud.fecha} · {solicitud.hora}
        </ListGroup.Item>
        <ListGroup.Item>
          Dueño: {solicitud.nombreDueno} — {solicitud.correo}
        </ListGroup.Item>
        <ListGroup.Item>
          Precio estimado: {formatoPrecio(solicitud.precioEstimado)}
        </ListGroup.Item>
        <ListGroup.Item>Estado inicial: Pendiente</ListGroup.Item>
      </ListGroup>

      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={onConfirmar} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Confirmar solicitud'}
        </Button>
        {!ocultarEditar && (
          <Button as={Link} to={rutaEditar} variant="outline-secondary">
            Editar solicitud
          </Button>
        )}
      </div>
    </>
  )
}
