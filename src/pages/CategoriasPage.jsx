import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function CategoriasPage() {
  useTituloPagina('Categorías')
  const { categorias, filtrarCategoria } = useServicios()

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <h1 className="mb-4">Categorías de servicios</h1>
        <ListGroup>
          {categorias.map((cat) => (
            <ListGroup.Item
              key={cat}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{cat}</span>
              <span className="text-muted">
                {filtrarCategoria(cat).length} servicios
              </span>
              <Link to={`/servicios?categoria=${encodeURIComponent(cat)}`}>
                Ver catálogo
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </PlantillaPublica>
  )
}
