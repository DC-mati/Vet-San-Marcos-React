import { useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TarjetaMetricaPanel from '../components/molecules/TarjetaMetricaPanel'
import TarjetaProximaCita from '../components/molecules/TarjetaProximaCita'
import { enlacesVeterinario } from '../constants/navegacionPaneles'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import { listarProximasCitas } from '../utils/citasDueno'

export default function VeterinarioDashboardPage() {
  useTituloPagina('Panel veterinario')
  const { citas } = useCitas()

  const proximas = useMemo(() => listarProximasCitas(citas, new Date(), 8), [citas])

  const resumen = useMemo(() => {
    const confirmadas = citas.filter((c) => c.estado === 'Confirmada').length
    const pendientes = citas.filter((c) => c.estado === 'Pendiente').length
    return { confirmadas, pendientes, total: citas.length }
  }, [citas])

  return (
    <PlantillaAdmin
      titulo="Panel veterinario"
      descripcion="Agenda general de consultas programadas en la clínica."
      enlaces={enlacesVeterinario}
    >
      <Alert variant="secondary" className="small">
        Vista de lectura: no incluye diagnósticos ni historial clínico.
      </Alert>

      <Row className="g-3 mb-4">
        <Col sm={4}>
          <TarjetaMetricaPanel
            titulo="Citas en sistema"
            valor={resumen.total}
            descripcion="Todas las solicitudes registradas"
          />
        </Col>
        <Col sm={4}>
          <TarjetaMetricaPanel
            titulo="Confirmadas"
            valor={resumen.confirmadas}
            descripcion="Listas para atención"
          />
        </Col>
        <Col sm={4}>
          <TarjetaMetricaPanel
            titulo="Pendientes"
            valor={resumen.pendientes}
            descripcion="Esperan confirmación"
          />
        </Col>
      </Row>

      <h2 className="h5 mb-3">Próximas citas</h2>
      {!proximas.length && (
        <p className="text-secondary">No hay citas próximas programadas.</p>
      )}
      <Row className="g-3">
        {proximas.map((cita) => (
          <Col key={cita.id} md={6} xl={4}>
            <TarjetaProximaCita cita={cita} />
          </Col>
        ))}
      </Row>
    </PlantillaAdmin>
  )
}
