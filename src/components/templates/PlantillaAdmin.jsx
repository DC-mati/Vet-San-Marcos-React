import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { etiquetaRol } from '../../constants/navegacionPaneles'
import '../../admin.css'

function claseEnlaceActivo({ isActive }) {
  return isActive ? 'nav-link active fw-semibold' : 'nav-link'
}

function MenuLateral({ enlaces, onNavigate, onCerrarSesion }) {
  return (
    <>
      <Nav className="flex-column gap-1 panel-nav">
        {enlaces.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={
              item.to === '/dueno'
              || item.to === '/admin'
              || item.to === '/recepcion'
              || item.to === '/veterinario'
              || item.to === '/tecnico'
            }
            className={claseEnlaceActivo}
            onClick={onNavigate}
          >
            {item.texto}
          </NavLink>
        ))}
      </Nav>

      <Button
        variant="outline-danger"
        className="mt-4 w-100"
        onClick={onCerrarSesion}
      >
        Cerrar sesión
      </Button>
    </>
  )
}

/**
 * Layout privado compartido por todos los roles con panel.
 */
export default function PlantillaAdmin({
  titulo,
  descripcion,
  children,
  enlaces = [],
}) {
  const { logout, usuario } = useAuth()
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarSesion = () => {
    logout()
    setMenuAbierto(false)
    navigate('/login')
  }

  const rolTexto = etiquetaRol[usuario?.rol] || 'Usuario'

  const identidad = (
    <div className="panel-identidad mb-4">
      <Link to="/" className="panel-marca text-decoration-none">
        Veterinaria San Marcos
      </Link>
      <p className="small fw-semibold mb-0 mt-2">
        {usuario?.nombre || usuario?.correo}
      </p>
      <p className="small text-muted mb-0">{rolTexto}</p>
    </div>
  )

  return (
    <Container fluid className="admin-page min-vh-100 px-0">
      <Navbar expand="lg" className="panel-topbar d-lg-none border-bottom bg-white">
        <Container fluid className="px-3">
          <Navbar.Brand className="fs-6 fw-semibold">Panel VSM</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="panel-offcanvas"
            onClick={() => setMenuAbierto(true)}
          />
        </Container>
      </Navbar>

      <Offcanvas
        show={menuAbierto}
        onHide={() => setMenuAbierto(false)}
        placement="start"
        className="panel-offcanvas d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú del panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {identidad}
          <MenuLateral
            enlaces={enlaces}
            onNavigate={() => setMenuAbierto(false)}
            onCerrarSesion={cerrarSesion}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <Row className="g-0">
        <Col lg={3} xl={2} className="d-none d-lg-block sidebar p-3">
          {identidad}
          <MenuLateral enlaces={enlaces} onCerrarSesion={cerrarSesion} />
        </Col>

        <Col lg={9} xl={10} className="admin-content">
          {titulo && <h1 className="panel-titulo">{titulo}</h1>}
          {descripcion && (
            <p className="text-secondary panel-descripcion">{descripcion}</p>
          )}
          {children}
        </Col>
      </Row>
    </Container>
  )
}
