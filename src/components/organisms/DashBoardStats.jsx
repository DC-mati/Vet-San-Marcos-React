import { useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TarjetaMetricaPanel from '../molecules/TarjetaMetricaPanel'
import { useServicios } from '../../context/ServiciosContext'
import { useCitas } from '../../context/CitasContext'
import { contarUsuariosVisibles } from '../../services/usuariosService'

/**
 * Métricas del admin calculadas desde Context y services.
 * No usa cifras fijas de demostración.
 */
function DashboardStats() {
  const { servicios } = useServicios()
  const { citas } = useCitas()

  const metricas = useMemo(() => {
    const pendientes = citas.filter((c) => c.estado === 'Pendiente').length
    const confirmadas = citas.filter((c) => c.estado === 'Confirmada').length
    const propuestas = citas.filter(
      (c) => c.estado === 'Propuesta de horario',
    ).length

    const categorias = new Set(servicios.map((s) => s.categoria))

    return {
      pendientes,
      confirmadas,
      propuestas,
      categorias: categorias.size,
      usuarios: contarUsuariosVisibles(),
    }
  }, [citas, servicios])

  return (
    <Row className="g-3">
      <Col sm={6} xl={3}>
        <TarjetaMetricaPanel
          titulo="Solicitudes pendientes"
          valor={metricas.pendientes}
          descripcion="Esperan acción de recepción"
        />
      </Col>
      <Col sm={6} xl={3}>
        <TarjetaMetricaPanel
          titulo="Citas confirmadas"
          valor={metricas.confirmadas}
          descripcion="Horario validado"
        />
      </Col>
      <Col sm={6} xl={3}>
        <TarjetaMetricaPanel
          titulo="Propuestas de horario"
          valor={metricas.propuestas}
          descripcion="Recepción sugirió otro horario"
        />
      </Col>
      <Col sm={6} xl={3}>
        <TarjetaMetricaPanel
          titulo="Usuarios registrados"
          valor={metricas.usuarios}
          descripcion="Cuentas activas en el sistema"
        />
      </Col>
      <Col sm={6} xl={3}>
        <TarjetaMetricaPanel
          titulo="Categorías activas"
          valor={metricas.categorias}
          descripcion="Según el catálogo actual"
        />
      </Col>
    </Row>
  )
}

export default DashboardStats
