import Container from 'react-bootstrap/Container';

import logo from '../../assets/logo-san-marcos.png';

/**
 * @param {boolean} tituloPrincipal - true en /nosotros (H1), false en Inicio (H2)
 */
export default function AboutSection({ tituloPrincipal = false }) {
  const Titulo = tituloPrincipal ? 'h1' : 'h2'

  return (
    <section id="nosotros" className="home-section">
      <Container fluid="xxl" className="px-3 px-lg-4">
        <div className="home-about__grid">
          <div className="home-about__visual">
            <img
              src={logo}
              alt="Logo de Veterinaria San Marcos"
            />
          </div>

          <div>
            <p className="home-eyebrow">Quiénes somos</p>

            <Titulo>Sobre nosotros</Titulo>

            <p>
              Veterinaria San Marcos fue fundada en 2009.
              Atendemos principalmente perros y gatos,
              además de conejos y aves.
            </p>

            <p>
              Nuestro equipo está compuesto por médicos
              veterinarios, un técnico veterinario y una
              recepcionista administrativa.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}