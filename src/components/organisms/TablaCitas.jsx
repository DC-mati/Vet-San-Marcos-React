import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import { formatoPrecio } from '../../utils/formatoPrecio'
import {
  puedeConfirmarCita,
  puedeMarcarRealizada,
  puedeProponerHorario,
  validarPropuestaHorario,
} from '../../utils/citasEstados'

export default function TablaCitas({
  citas,
  modo = 'lectura',
  onConfirmar,
  onProponer,
  onEliminar,
  onMarcarRealizada,
  mensajeVacio = 'No hay citas registradas.',
}) {
  if (!citas.length) {
    return (
      <div className="p-4 bg-white border rounded shadow-sm text-center">
        <p className="text-secondary mb-0">{mensajeVacio}</p>
      </div>
    )
  }

  return (
    <>
      <div className="d-md-none d-flex flex-column gap-3">
        {citas.map((cita) => (
          <TarjetaCitaMovil
            key={cita.id}
            cita={cita}
            modo={modo}
            onConfirmar={onConfirmar}
            onProponer={onProponer}
            onEliminar={onEliminar}
            onMarcarRealizada={onMarcarRealizada}
          />
        ))}
      </div>

      <div className="table-responsive d-none d-md-block">
        <Table striped hover className="align-middle">
          <thead>
            <tr>
              {modo === 'lectura' && <th>ID</th>}
              <th>Fecha</th>
              <th>Hora</th>
              <th>Mascota</th>
              <th>Servicio</th>
              {modo !== 'lectura' && <th>Dueño</th>}
              <th>Estado</th>
              {modo !== 'lectura' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <FilaCitaAdmin
                key={cita.id}
                cita={cita}
                modo={modo}
                onConfirmar={onConfirmar}
                onProponer={onProponer}
              onEliminar={onEliminar}
              onMarcarRealizada={onMarcarRealizada}
            />
          ))}
        </tbody>
        </Table>
      </div>
    </>
  )
}

function TarjetaCitaMovil({
  cita,
  modo,
  onConfirmar,
  onProponer,
  onEliminar,
  onMarcarRealizada,
}) {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between gap-2 mb-2">
          <strong>{cita.nombreMascota || cita.pacienteId}</strong>
          <EtiquetaEstadoCita estado={cita.estado} tipo={cita.tipo} />
        </div>
        <p className="small mb-1">{cita.servicio}</p>
        <p className="small mb-1">
          {cita.fecha} · {cita.hora}
        </p>
        {modo === 'lectura' && (
          <p className="small text-muted mb-0">ID: {cita.id}</p>
        )}
        {modo !== 'lectura' && (
          <AccionesCita
            cita={cita}
            modo={modo}
            onConfirmar={onConfirmar}
            onProponer={onProponer}
            onEliminar={onEliminar}
            onMarcarRealizada={onMarcarRealizada}
          />
        )}
      </Card.Body>
    </Card>
  )
}

function FilaCitaAdmin({
  cita,
  modo,
  onConfirmar,
  onProponer,
  onEliminar,
  onMarcarRealizada,
}) {
  return (
    <tr>
      {modo === 'lectura' && <td className="small text-muted">{cita.id}</td>}
      <td>{cita.fecha}</td>
      <td>{cita.hora}</td>
      <td>{cita.nombreMascota || cita.pacienteId}</td>
      <td>
        {cita.servicio}
        {cita.precioEstimado > 0 && (
          <div className="small text-muted">
            {formatoPrecio(cita.precioEstimado)}
          </div>
        )}
      </td>
      {modo !== 'lectura' && (
        <td>
          {cita.nombreDueno}
          <div className="small text-muted">{cita.correoDueno}</div>
        </td>
      )}
      <td>
        <EtiquetaEstadoCita estado={cita.estado} tipo={cita.tipo} />
        {cita.propuestaFecha && (
          <div className="small mt-1">
            Propuesta: {cita.propuestaFecha} {cita.propuestaHora}
          </div>
        )}
      </td>
      {modo !== 'lectura' && (
        <td style={{ minWidth: 220 }}>
          <AccionesCita
            cita={cita}
            modo={modo}
            onConfirmar={onConfirmar}
            onProponer={onProponer}
            onEliminar={onEliminar}
            onMarcarRealizada={onMarcarRealizada}
          />
        </td>
      )}
    </tr>
  )
}

function AccionesCita({
  cita,
  modo,
  onConfirmar,
  onProponer,
  onEliminar,
  onMarcarRealizada,
}) {
  const [fechaPropuesta, setFechaPropuesta] = useState('')
  const [horaPropuesta, setHoraPropuesta] = useState('')
  const [errorPropuesta, setErrorPropuesta] = useState('')
  const [mostrarEliminar, setMostrarEliminar] = useState(false)

  const confirmarDisponible = puedeConfirmarCita(cita)
  const proponerDisponible = puedeProponerHorario(cita)
  const realizarDisponible = puedeMarcarRealizada(cita)

  const enviarPropuesta = () => {
    const validacion = validarPropuestaHorario(fechaPropuesta, horaPropuesta)
    if (!validacion.ok) {
      setErrorPropuesta(validacion.error)
      return
    }
    setErrorPropuesta('')
    onProponer?.(cita.id, fechaPropuesta, horaPropuesta)
  }

  return (
    <div className="d-flex flex-column gap-2">
      {confirmarDisponible && (
        <Button
          size="sm"
          variant="success"
          onClick={() => onConfirmar?.(cita.id)}
        >
          Confirmar
        </Button>
      )}

      {realizarDisponible && onMarcarRealizada && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onMarcarRealizada(cita.id)}
        >
          Marcar realizada
        </Button>
      )}

      {proponerDisponible && (
        <>
          <Form.Control
            type="date"
            size="sm"
            value={fechaPropuesta}
            onChange={(e) => setFechaPropuesta(e.target.value)}
          />
          <Form.Control
            type="time"
            size="sm"
            value={horaPropuesta}
            onChange={(e) => setHoraPropuesta(e.target.value)}
          />
          {errorPropuesta && (
            <Alert variant="warning" className="py-1 px-2 small mb-0">
              {errorPropuesta}
            </Alert>
          )}
          <Button
            size="sm"
            variant="outline-primary"
            onClick={enviarPropuesta}
          >
            Proponer horario
          </Button>
        </>
      )}

      {modo === 'admin' && (
        <>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setMostrarEliminar(true)}
          >
            Eliminar
          </Button>
          <Modal show={mostrarEliminar} onHide={() => setMostrarEliminar(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Eliminar la solicitud de {cita.nombreMascota || cita.pacienteId}?
              Esta acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMostrarEliminar(false)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onEliminar?.(cita.id)
                  setMostrarEliminar(false)
                }}
              >
                Sí, eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  )
}
