import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { blogEntradas } from '../data/blogEntradas'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function BlogDetallePage() {
  const { id } = useParams()
  const entrada = blogEntradas.find((e) => e.id === id)
  useTituloPagina(entrada?.titulo || 'Blog')

  if (!entrada) {
    return (
      <PlantillaPublica>
        <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
          <p>Entrada no encontrada.</p>
          <Button as={Link} to="/blog">
            Volver al blog
          </Button>
        </Container>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <p className="text-muted">{entrada.fecha}</p>
          <h1>{entrada.titulo}</h1>
          <p className="lead">{entrada.resumen}</p>
          <p>{entrada.contenido}</p>
          <Button as={Link} to="/blog" variant="outline-primary">
            Volver
          </Button>
        </div>
      </Container>
    </PlantillaPublica>
  )
}
