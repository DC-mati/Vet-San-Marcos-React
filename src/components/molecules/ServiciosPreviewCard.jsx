import Card from 'react-bootstrap/Card'
import { formatoPrecio } from '../../utils/formatoPrecio'

export default function ServicePreviewCard({ servicio }) {
  return (
    <Card className="h-100 shadow-sm border-0 service-preview">
      <Card.Body>
        <Card.Title>{servicio.nombre}</Card.Title>

        <Card.Text className="text-secondary mb-2">
          {servicio.especie || servicio.descripcion}
          {servicio.duracion && ` · ${servicio.duracion}`}
        </Card.Text>

        <p className="service-preview__price mb-0">
          {formatoPrecio(servicio.precio)}
        </p>
      </Card.Body>
    </Card>
  )
}
