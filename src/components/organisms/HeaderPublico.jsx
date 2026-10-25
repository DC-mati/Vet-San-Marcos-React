import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import logo from '../../assets/logo-san-marcos.png'
import { useAuth } from '../../context/AuthContext'

/** Enlace con estado activo para rutas internas */
function enlaceNav({ isActive }) {
  return isActive ? 'nav-link active fw-semibold' : 'nav-link'
}

export default function PublicHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { usuario, logout, rutaPorRol } = useAuth()
  const navigate = useNavigate()

  const cerrarMenu = () => setMenuAbierto(false)

  const cerrarSesion = () => {
    logout()
    cerrarMenu()
    navigate('/')
  }

  const panelDelUsuario =
    usuario?.rol === 'cliente' ? '/dueno' : rutaPorRol(usuario?.rol)

  return (
    <Navbar
      expand="xl"
      sticky="top"
      className="public-navbar py-2"
      expanded={menuAbierto}
      onToggle={setMenuAbierto}
    >
      <Container fluid="xxl" className="px-3 px-lg-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="public-brand d-flex align-items-center flex-shrink-0"
          onClick={cerrarMenu}
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
            <NavLink to="/" className={enlaceNav} end onClick={cerrarMenu}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" className={enlaceNav} onClick={cerrarMenu}>
              Servicios
            </NavLink>
            <NavLink to="/categorias" className={enlaceNav} onClick={cerrarMenu}>
              Categorías
            </NavLink>

            <NavDropdown title="Más" id="nav-mas" className="public-nav__dropdown">
              <NavDropdown.Item as={Link} to="/nosotros" onClick={cerrarMenu}>
                Nosotros
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contacto" onClick={cerrarMenu}>
                Contacto
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blog" onClick={cerrarMenu}>
                Blog
              </NavDropdown.Item>
            </NavDropdown>

            <Button
              as={Link}
              to="/solicitar-cita"
              variant="primary"
              size="sm"
              className="public-nav__cta ms-xl-2 my-2 my-xl-0"
              onClick={cerrarMenu}
            >
              Solicitar cita
            </Button>

            {!usuario && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${enlaceNav({ isActive })} public-nav__login ms-xl-1`
                }
                onClick={cerrarMenu}
              >
                Iniciar sesión
              </NavLink>
            )}

            {usuario && (
              <>
                <NavLink
                  to={panelDelUsuario}
                  className={enlaceNav}
                  onClick={cerrarMenu}
                >
                  Mi panel
                </NavLink>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-xl-2 my-2 my-xl-0"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
