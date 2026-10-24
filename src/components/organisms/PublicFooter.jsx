import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-san-marcos.png';

export default function PublicFooter() {
  return (
    <footer className="home-footer">
      <Container fluid="xxl" className="px-3 px-lg-4">
        <div className="home-footer__grid">
          <div>
            <img
              src={logo}
              alt="Veterinaria San Marcos"
            />

            <p>Atención veterinaria en Rancagua.</p>
          </div>

          <nav className="home-footer__nav" aria-label="Navegación del pie">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
            <Link to="/login">Iniciar sesión</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}