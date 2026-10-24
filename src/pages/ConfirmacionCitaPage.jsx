import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useCitas } from '../context/CitasContext'
import { formatoPrecio } from '../utils/formatoPrecio'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function ConfirmacionCitaPage() {
  useTituloPagina('Confirmar solicitud')
  const location = useLocation()
  const navigate = useNavigate()
  const { solicitar } = useCitas()

  const solicitud = location.state?.solicitud

  if (!solicitud) {
    return <Navigate to="/solicitar-cita" replace />
  }

  const confirmar = () => {
    const resultado = solicitar(solicitud)

    if (resultado.ok) {
      navigate('/solicitar-cita/exito', {
        state: { cita: resultado.cita },
      })
    } else {
      navigate('/solicitar-cita/error')
    }
  }

  return (
    <PlantillaPublica>
      <Container className="py-5" style={{ maxWidth: 640 }}>
        <h1 className="mb-3">Resumen de la solicitud</h1>
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
        </ListGroup>

        <Button variant="primary" className="me-2" onClick={confirmar}>
          Confirmar solicitud
        </Button>
        <Button as={Link} to="/solicitar-cita" variant="outline-secondary">
          Editar datos
        </Button>
      </Container>
    </PlantillaPublica>
  )
}
