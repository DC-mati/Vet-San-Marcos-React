import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import { blogEntradas } from '../data/blogEntradas'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function BlogPage() {
  useTituloPagina('Blog')

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <h1 className="mb-4">Blog veterinario</h1>
        <div className="row g-4">
          {blogEntradas.map((entrada) => (
            <div className="col-md-4" key={entrada.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    {entrada.fecha}
                  </Card.Subtitle>
                  <Card.Title>{entrada.titulo}</Card.Title>
                  <Card.Text>{entrada.resumen}</Card.Text>
                  <Link to={`/blog/${entrada.id}`}>Leer más</Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </PlantillaPublica>
  )
}
