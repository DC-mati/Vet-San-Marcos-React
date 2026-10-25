import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import ServicePreviewCard from '../molecules/ServiciosPreviewCard'

export default function ServicesPreview({ services }) {
  return (
    <section id="servicios" className="home-section home-section--soft">
      <Container fluid="xxl" className="px-3 px-lg-4">
        <div className="home-section-heading">
          <p className="home-eyebrow">Nuestros servicios</p>
          <h2>Servicios veterinarios</h2>
          <p>Destacados del catálogo oficial (31 servicios en total).</p>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((servicio) => (
            <Col key={servicio.codigo || servicio.id}>
              <ServicePreviewCard servicio={servicio} />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button as={Link} to="/servicios" variant="primary">
            Ver catálogo completo
          </Button>
        </div>
      </Container>
    </section>
  )
}
