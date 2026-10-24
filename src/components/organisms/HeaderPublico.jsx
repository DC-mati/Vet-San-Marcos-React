import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo-san-marcos.png'

export default function PublicHeader() {
  return (
    <Navbar expand="lg" sticky="top" className="public-navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="public-brand d-flex align-items-center"
        >
          <img src={logo} alt="" />
          <span>Veterinaria San Marcos</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="public-navbar-nav"
          aria-label="Abrir navegación"
        />

        <Navbar.Collapse id="public-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/categorias">
              Categorías
            </Nav.Link>
            <Nav.Link href="/#nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link href="/#contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/solicitar-cita">
              Solicitar cita
            </Nav.Link>
            <Nav.Link as={Link} to="/mis-citas">
              Mis citas
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
