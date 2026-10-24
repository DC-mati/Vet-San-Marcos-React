import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import DashboardStats from '../components/organisms/DashBoardStats'
import { useServicios } from '../context/ServiciosContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const enlaces = [
  { to: '/admin', texto: 'Dashboard' },
  { to: '/admin/servicios', texto: 'Servicios (CRUD)' },
  { to: '/admin/citas', texto: 'Citas' },
  { to: '/recepcion', texto: 'Recepción' },
]

export default function AdminPage() {
  useTituloPagina('Admin')
  const { servicios } = useServicios()
  const { citas } = useCitas()

  const pendientes = citas.filter((c) => c.estado === 'Pendiente').length

  return (
    <PlantillaAdmin titulo="Panel de administración" enlaces={enlaces}>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <div className="p-3 bg-white border rounded shadow-sm">
            <p className="text-muted mb-1">Servicios en catálogo</p>
            <p className="fs-3 fw-semibold mb-0">{servicios.length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 bg-white border rounded shadow-sm">
            <p className="text-muted mb-1">Citas registradas</p>
            <p className="fs-3 fw-semibold mb-0">{citas.length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 bg-white border rounded shadow-sm">
            <p className="text-muted mb-1">Solicitudes pendientes</p>
            <p className="fs-3 fw-semibold mb-0">{pendientes}</p>
          </div>
        </Col>
      </Row>

      <DashboardStats />

      <div className="d-flex flex-wrap gap-2 mt-4">
        <Button as={Link} to="/admin/servicios" variant="primary">
          CRUD de servicios
        </Button>
        <Button as={Link} to="/admin/citas" variant="outline-primary">
          Gestionar citas
        </Button>
      </div>
    </PlantillaAdmin>
  )
}
