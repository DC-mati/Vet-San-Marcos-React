import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios({ servicios, onSolicitar }) {
  if (!servicios.length) {
    return (
      <Alert variant="info">
        No hay servicios que coincidan con tu búsqueda.
      </Alert>
    )
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {servicios.map((servicio) => (
        <Col key={servicio.codigo}>
          <TarjetaServicio servicio={servicio} onSolicitar={onSolicitar} />
        </Col>
      ))}
    </Row>
  )
}
