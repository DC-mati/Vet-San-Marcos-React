import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useNavigate } from 'react-router-dom'

import EnlaceVolverInicio from '../components/atoms/EnlaceVolverInicio'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function RegistroPage() {
  useTituloPagina('Registro')
  const { registro, login } = useAuth()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    clave: '',
    confirmacion: '',
  })
  const [mensaje, setMensaje] = useState('')
  const [tipo, setTipo] = useState('danger')

  const enviar = (evento) => {
    evento.preventDefault()
    setMensaje('')

    if (datos.clave !== datos.confirmacion) {
      setMensaje('Las contraseñas no coinciden.')
      return
    }

    const resultado = registro({
      nombre: datos.nombre,
      correo: datos.correo,
      clave: datos.clave,
    })

    if (!resultado.ok) {
      setTipo('danger')
      setMensaje(resultado.error)
      return
    }

    login(datos.correo, datos.clave)
    setTipo('success')
    setMensaje('Cuenta creada. Redirigiendo...')
    setTimeout(() => navigate('/dueno'), 800)
  }

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <div className="mx-auto" style={{ maxWidth: 480 }}>
          <EnlaceVolverInicio className="d-inline-block mb-3" />
          <h1 className="mb-4">Registro de dueño de mascota</h1>
          <p className="text-secondary small">
            Crea tu cuenta para gestionar mascotas y solicitar citas en línea.
          </p>

          {mensaje && <Alert variant={tipo}>{mensaje}</Alert>}

          <Form onSubmit={enviar}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={datos.nombre}
                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={datos.correo}
                onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={datos.clave}
                onChange={(e) => setDatos({ ...datos, clave: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                value={datos.confirmacion}
                onChange={(e) =>
                  setDatos({ ...datos, confirmacion: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Crear cuenta
            </Button>
          </Form>

          <p className="mt-3 text-center">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </Container>
    </PlantillaPublica>
  )
}
