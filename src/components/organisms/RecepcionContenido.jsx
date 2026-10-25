import { useMemo, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import TablaCitas from './TablaCitas'
import TarjetaMetricaPanel from '../molecules/TarjetaMetricaPanel'
import { useCitas } from '../../context/CitasContext'
import {
  ordenarCitasRecepcion,
  validarPropuestaHorario,
} from '../../utils/citasEstados'
import { ESTADOS_CITA } from '../../utils/estadosCita'
import { citaEnFechaIso, fechaIsoHoy } from '../../utils/fechasCita'

const FILTROS = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'Pendiente', etiqueta: 'Pendientes' },
  { valor: 'Confirmada', etiqueta: 'Confirmadas' },
  { valor: 'Propuesta de horario', etiqueta: 'Con propuesta' },
]

/**
 * Herramientas operativas de recepción sin layout.
 * Se reutiliza en el panel de recepcionista y en la vista admin /admin/recepcion.
 */
export default function RecepcionContenido() {
  const { citas, cambiarEstado, proponerHorario } = useCitas()
  const [filtro, setFiltro] = useState('todas')
  // Sin fecha inicial: se listan todas las solicitudes; el filtro por día es opcional.
  const [fechaAgenda, setFechaAgenda] = useState('')
  const [mensaje, setMensaje] = useState('')

  const resumen = useMemo(
    () => ({
      pendientes: citas.filter((c) => c.estado === 'Pendiente').length,
      confirmadas: citas.filter((c) => c.estado === 'Confirmada').length,
      propuestas: citas.filter((c) => c.estado === ESTADOS_CITA.propuesta).length,
      hoy: citas.filter((c) => citaEnFechaIso(c, fechaIsoHoy())).length,
    }),
    [citas],
  )

  const citasVisibles = useMemo(() => {
    let base = citas
    if (filtro !== 'todas') {
      base = base.filter((c) => c.estado === filtro)
    }
    if (fechaAgenda) {
      base = base.filter((c) => citaEnFechaIso(c, fechaAgenda))
    }
    return ordenarCitasRecepcion(base)
  }, [citas, filtro, fechaAgenda])

  const confirmar = (id) => {
    const resultado = cambiarEstado(id, ESTADOS_CITA.confirmada)
    setMensaje(
      resultado.ok ? 'Cita confirmada correctamente.' : resultado.error,
    )
  }

  const proponer = (id, fecha, hora) => {
    const validacion = validarPropuestaHorario(fecha, hora)
    if (!validacion.ok) {
      setMensaje(validacion.error)
      return
    }

    const resultado = proponerHorario(id, fecha, hora)
    setMensaje(
      resultado.ok ? 'Propuesta de horario registrada.' : resultado.error,
    )
  }

  return (
    <>
      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      <Row className="g-3 mb-4">
        <Col md={3}>
          <TarjetaMetricaPanel
            titulo="Citas del día"
            valor={resumen.hoy}
            descripcion="Según fecha de hoy"
          />
        </Col>
        <Col md={3}>
          <TarjetaMetricaPanel
            titulo="Solicitudes pendientes"
            valor={resumen.pendientes}
            descripcion="Requieren confirmación o propuesta"
          />
        </Col>
        <Col md={3}>
          <TarjetaMetricaPanel
            titulo="Citas confirmadas"
            valor={resumen.confirmadas}
            descripcion="Horario validado"
          />
        </Col>
        <Col md={3}>
          <TarjetaMetricaPanel
            titulo="Propuestas de horario"
            valor={resumen.propuestas}
            descripcion="Esperan respuesta del dueño"
          />
        </Col>
      </Row>

      <Form.Group className="mb-3" style={{ maxWidth: 320 }}>
        <Form.Label>Filtrar por fecha de agenda (opcional)</Form.Label>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <Form.Control
            type="date"
            value={fechaAgenda}
            onChange={(e) => setFechaAgenda(e.target.value)}
          />
          {fechaAgenda ? (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setFechaAgenda('')}
            >
              Ver todas las fechas
            </button>
          ) : null}
        </div>
        <Form.Text muted>
          Por defecto se muestran citas de cualquier día. Las métricas de arriba
          siguen usando la fecha de hoy.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" style={{ maxWidth: 320 }}>
        <Form.Label>Filtrar por estado</Form.Label>
        <Form.Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          {FILTROS.map((f) => (
            <option key={f.valor} value={f.valor}>
              {f.etiqueta}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <TablaCitas
        citas={citasVisibles}
        modo="recepcion"
        onConfirmar={confirmar}
        onProponer={proponer}
        onMarcarRealizada={(id) => {
          const resultado = cambiarEstado(id, ESTADOS_CITA.realizada)
          setMensaje(
            resultado.ok ? 'Atención marcada como realizada.' : resultado.error,
          )
        }}
        mensajeVacio="No hay citas con el filtro seleccionado."
      />
    </>
  )
}
