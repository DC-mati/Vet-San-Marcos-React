import Card from 'react-bootstrap/Card';

export default function ServicePreviewCard({ servicio }) {
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
  }).format(servicio.precio);

  return (
    <Card className="h-100 shadow-sm border-0 service-preview">
      <Card.Body>
        <Card.Title>{servicio.nombre}</Card.Title>

        <Card.Text className="text-secondary mb-2">
          {servicio.descripcion}
          {servicio.duracion && ` · ${servicio.duracion}`}
        </Card.Text>

        <p className="service-preview__price mb-0">
          ${precioFormateado}
        </p>
      </Card.Body>
    </Card>
  );
}