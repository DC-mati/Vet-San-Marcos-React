import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useLocation } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function ResultadoCitaPage({ tipo = 'exito' }) {
  useTituloPagina(tipo === 'exito' ? 'Cita registrada' : 'Error')
  const location = useLocation()
  const cita = location.state?.cita

  const esExito = tipo === 'exito'

  return (
    <PlantillaPublica>
      <Container className="py-5 text-center" style={{ maxWidth: 560 }}>
        <Alert variant={esExito ? 'success' : 'danger'}>
          {esExito
            ? 'Tu solicitud fue registrada correctamente.'
            : 'No pudimos registrar la solicitud. Intenta nuevamente.'}
        </Alert>

        {esExito && cita && (
          <p>
            ID: <strong>{cita.id}</strong>
            <br />
            Estado inicial: <strong>{cita.estado}</strong>
          </p>
        )}

        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <Button as={Link} to="/mis-citas" variant="primary">
            Ver mis citas
          </Button>
          <Button as={Link} to="/" variant="outline-secondary">
            Inicio
          </Button>
        </div>
      </Container>
    </PlantillaPublica>
  )
}
