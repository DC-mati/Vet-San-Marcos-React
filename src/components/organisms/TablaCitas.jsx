import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import { formatoPrecio } from '../../utils/formatoPrecio'

export default function TablaCitas({
  citas,
  modo = 'lectura',
  onConfirmar,
  onProponer,
  onEliminar,
}) {
  if (!citas.length) {
    return <p>No hay citas registradas.</p>
  }

  return (
    <div className="table-responsive">
      <Table striped hover className="align-middle">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Mascota</th>
            <th>Servicio</th>
            <th>Dueño</th>
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
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

function FilaCitaAdmin({
  cita,
  modo,
  onConfirmar,
  onProponer,
  onEliminar,
}) {
  const [fechaPropuesta, setFechaPropuesta] = useState('')
  const [horaPropuesta, setHoraPropuesta] = useState('')

  return (
    <tr>
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
      <td>
        {cita.nombreDueno}
        <div className="small text-muted">{cita.correoDueno}</div>
      </td>
      <td>
        <EtiquetaEstadoCita estado={cita.estado} tipo={cita.tipo} />
        {cita.propuestaFecha && (
          <div className="small mt-1">
            Propuesta: {cita.propuestaFecha} {cita.propuestaHora}
          </div>
        )}
      </td>
      {modo !== 'lectura' && (
        <td>
          <div className="d-flex flex-column gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => onConfirmar?.(cita.id)}
            >
              Confirmar
            </Button>
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
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() =>
                onProponer?.(cita.id, fechaPropuesta, horaPropuesta)
              }
            >
              Proponer horario
            </Button>
            {modo === 'admin' && (
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onEliminar?.(cita.id)}
              >
                Eliminar
              </Button>
            )}
          </div>
        </td>
      )}
    </tr>
  )
}
