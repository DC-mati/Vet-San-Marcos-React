import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import heroImage from '../../assets/hero-veterinaria.png'

export default function HomeHero() {
  return (
    <section id="inicio" className="home-hero">
      <Container fluid="xxl" className="px-3 px-lg-4">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="home-eyebrow">Veterinaria San Marcos</p>

            <h1>Tu mascota, nuestra prioridad</h1>

            <p className="home-hero__description">
              Atención veterinaria para perros, gatos, conejos y aves en
              Rancagua.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-4 home-hero__actions">
              <Button as={Link} to="/servicios" variant="primary" size="lg">
                Ver servicios
              </Button>

              <Button
                as={Link}
                to="/solicitar-cita"
                variant="outline-dark"
                size="lg"
              >
                Solicitar una cita
              </Button>
            </div>
          </div>

          <div className="home-hero__media">
            <img
              className="home-hero__image"
              src={heroImage}
              alt="Atención y cuidado de mascotas"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
