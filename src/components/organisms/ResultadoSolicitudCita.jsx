import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default function ResultadoSolicitudCita({
  tipo = 'exito',
  cita,
  rutaMisCitas,
  rutaPanel,
  rutaReintentar,
}) {
  const esExito = tipo === 'exito'

  return (
    <div className="mx-auto" style={{ maxWidth: 560 }}>
      <Alert variant={esExito ? 'success' : 'danger'}>
        {esExito
          ? 'Tu solicitud fue registrada correctamente.'
          : 'No pudimos registrar la solicitud. Intenta nuevamente.'}
      </Alert>

      {esExito && cita && (
        <div className="mb-3">
          <p className="mb-1">
            Identificador: <strong>{cita.id}</strong>
          </p>
          <p className="mb-0">
            Estado: <strong>{cita.estado}</strong>
          </p>
        </div>
      )}

      <div className="d-flex flex-wrap gap-2">
        {esExito && (
          <Button as={Link} to={rutaMisCitas} variant="primary">
            Ver mis citas
          </Button>
        )}
        {!esExito && rutaReintentar && (
          <Button as={Link} to={rutaReintentar} variant="primary">
            Volver al formulario
          </Button>
        )}
        <Button as={Link} to={rutaPanel} variant="outline-secondary">
          Volver a mi panel
        </Button>
      </div>
    </div>
  )
}
