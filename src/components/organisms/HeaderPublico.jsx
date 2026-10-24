import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import { Link, NavLink } from 'react-router-dom'

import logo from '../../assets/logo-san-marcos.png'

/** Enlace con estado activo para rutas internas */
function enlaceNav({ isActive }) {
  return isActive ? 'nav-link active fw-semibold' : 'nav-link'
}

export default function PublicHeader() {
  return (
    <Navbar
      expand="xl"
      sticky="top"
      className="public-navbar py-2"
    >
      <Container fluid="xxl" className="px-3 px-lg-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="public-brand d-flex align-items-center flex-shrink-0"
        >
          <img src={logo} alt="" />
          <span className="public-brand__text">Veterinaria San Marcos</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="public-navbar-nav"
          aria-label="Abrir navegación"
        />

        <Navbar.Collapse id="public-navbar-nav">
          <Nav className="ms-auto align-items-xl-center public-nav">
            <NavLink to="/" className={enlaceNav} end>
              Inicio
            </NavLink>
            <NavLink to="/servicios" className={enlaceNav}>
              Servicios
            </NavLink>
            <NavLink to="/categorias" className={enlaceNav}>
              Categorías
            </NavLink>

            <NavDropdown title="Más" id="nav-mas" className="public-nav__dropdown">
              <NavDropdown.Item href="/#nosotros">
                Nosotros
              </NavDropdown.Item>
              <NavDropdown.Item href="/#contacto">
                Contacto
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blog">
                Blog
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mis-citas">
                Mis citas
              </NavDropdown.Item>
            </NavDropdown>

            <Button
              as={Link}
              to="/solicitar-cita"
              variant="primary"
              size="sm"
              className="public-nav__cta ms-xl-2 my-2 my-xl-0"
            >
              Solicitar cita
            </Button>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${enlaceNav({ isActive })} public-nav__login ms-xl-1`
              }
            >
              Iniciar sesión
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
