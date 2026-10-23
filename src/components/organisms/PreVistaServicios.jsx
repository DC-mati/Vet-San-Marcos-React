import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ServicePreviewCard from '../molecules/ServiciosPreviewCard';

export default function ServicesPreview({ services }) {
  return (
    <section
      id="servicios"
      className="home-section home-section--soft"
    >
      <Container>
        <div className="home-section-heading">
          <p className="home-eyebrow">Nuestros servicios</p>

          <h2>Servicios veterinarios</h2>

          <p>
            Estos son algunos de los servicios disponibles.
          </p>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((servicio) => (
            <Col key={servicio.id}>
              <ServicePreviewCard servicio={servicio} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}