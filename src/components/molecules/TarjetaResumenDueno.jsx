import Card from 'react-bootstrap/Card'

export default function TarjetaResumenDueno({ titulo, valor, descripcion }) {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <p className="text-muted mb-1 small">{titulo}</p>
        <p className="fs-3 fw-semibold mb-0">{valor}</p>
        {descripcion && (
          <p className="text-secondary small mb-0 mt-2">{descripcion}</p>
        )}
      </Card.Body>
    </Card>
  )
}
