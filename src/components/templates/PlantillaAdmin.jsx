import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

export default function PlantillaAdmin({
  titulo,
  children,
  enlaces = [],
}) {
  const { logout, usuario } = useAuth()
  const navigate = useNavigate()

  const cerrar = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container fluid className="admin-page min-vh-100">
      <Row>
        <Col md={3} className="sidebar p-3 bg-light border-end">
          <h4 className="mb-1">Veterinaria San Marcos</h4>
          <p className="small text-muted mb-4">
            {usuario?.nombre || usuario?.correo}
          </p>

          <Nav className="flex-column gap-1">
            {enlaces.map((item) => (
              <Nav.Link key={item.to} as={Link} to={item.to}>
                {item.texto}
              </Nav.Link>
            ))}
          </Nav>

          <Button
            variant="outline-danger"
            className="mt-4 w-100"
            onClick={cerrar}
          >
            Cerrar sesión
          </Button>
        </Col>

        <Col md={9} className="admin-content p-4">
          {titulo && <h1 className="mb-4">{titulo}</h1>}
          {children}
        </Col>
      </Row>
    </Container>
  )
}
