import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { CLAVE_DEMO } from '../../data/usuariosDemo'

/**
 * Login simulado: valida contra cuentas demo (correo + clave).
 * El rol lo define la cuenta, no un selector libre.
 */
export default function FormularioLogin() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [mensaje, setMensaje] = useState('')

  const navigate = useNavigate()
  const { login, rutaPorRol } = useAuth()

  const handleSubmit = (evento) => {
    evento.preventDefault()
    setMensaje('')

    const resultado = login(correo, clave)

    if (!resultado.ok) {
      setMensaje(resultado.error)
      return
    }

    navigate(rutaPorRol(resultado.usuario.rol))
  }

  return (
    <Form onSubmit={handleSubmit} id="login-form">
      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

      <Alert variant="secondary" className="small">
        Demo: admin@sanmarcos.cl / {CLAVE_DEMO}
      </Alert>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="admin@sanmarcos.cl"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="••••••••"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mt-2">
        Iniciar sesión
      </Button>

      <p className="text-center mt-3 mb-0">
        <Link to="/registro">Crear cuenta de dueño</Link>
      </p>
    </Form>
  )
}
