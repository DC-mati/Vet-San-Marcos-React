import Container from 'react-bootstrap/Container';

import logo from '../../assets/logo-san-marcos.png';

export default function AboutSection() {
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

            <h2>Sobre nosotros</h2>

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