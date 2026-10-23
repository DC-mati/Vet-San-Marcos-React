import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import heroImage from '../../assets/hero-veterinaria.png';

export default function HomeHero() {
  return (
    <section id="inicio" className="home-hero">
      <Container>
        <div className="home-hero__grid">
          <div>
            <p className="home-eyebrow">
              Veterinaria San Marcos
            </p>

            <h1>Tu mascota, nuestra prioridad</h1>

            <p className="home-hero__description">
              Atención veterinaria para perros, gatos,
              conejos y aves en Rancagua.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Button href="#servicios" variant="primary">
                Ver servicios
              </Button>

              <Button as={Link} to="/login" variant="dark">
                Solicitar una cita
              </Button>
            </div>
          </div>

          <div>
            <img
              className="home-hero__image"
              src={heroImage}
              alt="Atención y cuidado de mascotas"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}