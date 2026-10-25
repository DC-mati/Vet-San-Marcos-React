import Badge from 'react-bootstrap/Badge'

const variantes = {
  ok: 'success',
  warning: 'warning',
  info: 'info',
  danger: 'danger',
  muted: 'secondary',
}

/** Muestra el estado de una cita con color coherente. */
export default function EtiquetaEstadoCita({ estado, tipo = 'info' }) {
  return (
    <Badge bg={variantes[tipo] || 'secondary'}>{estado}</Badge>
  )
}
