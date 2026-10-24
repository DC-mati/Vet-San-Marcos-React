import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import DashboardStats from '../components/organisms/DashBoardStats'
import TarjetaMetricaPanel from '../components/molecules/TarjetaMetricaPanel'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { useServicios } from '../context/ServiciosContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function AdminPage() {
  useTituloPagina('Admin')
  const { servicios } = useServicios()
  const { citas } = useCitas()

  return (
    <PlantillaAdmin
      titulo="Panel de administración"
      descripcion="Resumen operativo calculado desde el catálogo y las citas."
      enlaces={enlacesAdmin}
    >
      <Row className="g-3 mb-4">
        <Col sm={6} lg={4}>
          <TarjetaMetricaPanel
            titulo="Servicios en catálogo"
            valor={servicios.length}
            descripcion="Incluye altas y ediciones locales"
          />
        </Col>
        <Col sm={6} lg={4}>
          <TarjetaMetricaPanel
            titulo="Citas registradas"
            valor={citas.length}
            descripcion="Todas las solicitudes en localStorage"
          />
        </Col>
      </Row>

      <h2 className="h5 mb-3">Indicadores de citas y usuarios</h2>
      <DashboardStats />

      <div className="d-flex flex-wrap gap-2 mt-4">
        <Button as={Link} to="/admin/servicios" variant="primary">
          Gestionar servicios
        </Button>
        <Button as={Link} to="/admin/citas" variant="outline-primary">
          Gestionar citas
        </Button>
        <Button as={Link} to="/admin/usuarios" variant="outline-secondary">
          Ver usuarios demo
        </Button>
      </div>
    </PlantillaAdmin>
  )
}
