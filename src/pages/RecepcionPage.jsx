import { useMemo, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import TarjetaMetricaPanel from '../components/molecules/TarjetaMetricaPanel'
import { enlacesRecepcion } from '../constants/navegacionPaneles'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import {
  ordenarCitasRecepcion,
  validarPropuestaHorario,
} from '../utils/citasEstados'

const FILTROS = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'Pendiente', etiqueta: 'Pendientes' },
  { valor: 'Confirmada', etiqueta: 'Confirmadas' },
  { valor: 'Propuesta de horario', etiqueta: 'Con propuesta' },
]

export default function RecepcionPage() {
  useTituloPagina('Recepción')
  const { citas, cambiarEstado, proponerHorario } = useCitas()
  const [filtro, setFiltro] = useState('todas')
  const [mensaje, setMensaje] = useState('')

  const resumen = useMemo(
    () => ({
      pendientes: citas.filter((c) => c.estado === 'Pendiente').length,
      confirmadas: citas.filter((c) => c.estado === 'Confirmada').length,
      propuestas: citas.filter((c) => c.estado === 'Propuesta de horario').length,
    }),
    [citas],
  )

  const citasVisibles = useMemo(() => {
    const base =
      filtro === 'todas'
        ? citas
        : citas.filter((c) => c.estado === filtro)
    return ordenarCitasRecepcion(base)
  }, [citas, filtro])

  const confirmar = (id) => {
    const resultado = cambiarEstado(id, 'Confirmada')
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
    <PlantillaAdmin
      titulo="Panel de recepción"
      descripcion="Gestiona las solicitudes y horarios de atención"
      enlaces={enlacesRecepcion}
    >
      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      <Row className="g-3 mb-4">
        <Col md={4}>
          <TarjetaMetricaPanel
            titulo="Solicitudes pendientes"
            valor={resumen.pendientes}
            descripcion="Requieren confirmación o propuesta"
          />
        </Col>
        <Col md={4}>
          <TarjetaMetricaPanel
            titulo="Citas confirmadas"
            valor={resumen.confirmadas}
            descripcion="Horario validado"
          />
        </Col>
        <Col md={4}>
          <TarjetaMetricaPanel
            titulo="Propuestas de horario"
            valor={resumen.propuestas}
            descripcion="Esperan respuesta del dueño"
          />
        </Col>
      </Row>

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
        mensajeVacio="No hay citas con el filtro seleccionado."
      />
    </PlantillaAdmin>
  )
}
