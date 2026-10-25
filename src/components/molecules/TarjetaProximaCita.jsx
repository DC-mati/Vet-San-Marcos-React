import Card from 'react-bootstrap/Card'

import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'

export default function TarjetaProximaCita({ cita }) {
  const mascota = cita.nombreMascota || cita.pacienteId || 'Mascota'

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title className="h6 mb-0">{mascota}</Card.Title>
          <EtiquetaEstadoCita estado={cita.estado} tipo={cita.tipo} />
        </div>
        <p className="mb-1 text-secondary small">{cita.servicio}</p>
        <p className="mb-0 fw-semibold">
          {cita.fecha} · {cita.hora}
        </p>
        {cita.propuestaFecha && (
          <p className="small text-muted mt-2 mb-0">
            Propuesta recepción: {cita.propuestaFecha} {cita.propuestaHora}
          </p>
        )}
      </Card.Body>
    </Card>
  )
}
