import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const enlaces = [
  { to: '/cliente', texto: 'Mi panel' },
  { to: '/mis-citas', texto: 'Mis citas' },
  { to: '/servicios', texto: 'Catálogo' },
]

export default function ClientePage() {
  useTituloPagina('Cliente')
  const { usuario } = useAuth()

  return (
    <PlantillaAdmin titulo="Panel del dueño de mascota" enlaces={enlaces}>
      <Alert variant="success">
        Bienvenida/o, {usuario?.nombre}. Desde aquí puedes solicitar citas y
        revisar el estado de tus solicitudes.
      </Alert>
      <Button as={Link} to="/solicitar-cita" variant="primary" className="me-2">
        Nueva solicitud de cita
      </Button>
      <Button as={Link} to="/mis-citas" variant="outline-primary">
        Ver mis citas
      </Button>
    </PlantillaAdmin>
  )
}
