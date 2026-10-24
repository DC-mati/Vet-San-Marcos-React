import Card from 'react-bootstrap/Card'

/** Tarjeta de métrica reutilizable en todos los paneles privados. */
export default function TarjetaMetricaPanel({ titulo, valor, descripcion }) {
  return (
    <Card className="h-100 border-0 shadow-sm panel-metrica">
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
