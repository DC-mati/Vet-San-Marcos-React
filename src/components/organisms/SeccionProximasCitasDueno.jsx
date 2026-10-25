import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import TarjetaProximaCita from '../molecules/TarjetaProximaCita'
import { rutasCitaDueno } from '../../constants/rutasDuenoCita'

export default function SeccionProximasCitasDueno({ proximasCitas }) {
  if (!proximasCitas.length) {
    return (
      <div className="p-4 bg-white border rounded shadow-sm text-center">
        <h2 className="h5 mb-2">Aún no tienes citas próximas</h2>
        <p className="text-secondary mb-3">
          Cuando solicites una cita aparecerá aquí con su estado actualizado.
        </p>
        <Button as={Link} to={rutasCitaDueno.formulario} variant="primary">
          Solicitar mi primera cita
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="h5 mb-3">Próximas citas</h2>
      <Row className="g-3">
        {proximasCitas.map((cita) => (
          <Col key={cita.id} md={6} xl={4}>
            <TarjetaProximaCita cita={cita} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
