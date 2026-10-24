import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { resolverDestinoTrasLogin } from '../../utils/destinoLogin'
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
  const location = useLocation()
  const { login } = useAuth()

  const handleSubmit = (evento) => {
    evento.preventDefault()
    setMensaje('')

    const resultado = login(correo, clave)

    if (!resultado.ok) {
      setMensaje(resultado.error)
      return
    }

    const destino = resolverDestinoTrasLogin(
      location.state?.desde,
      resultado.usuario.rol,
    )
    navigate(destino)
  }

  return (
    <Form onSubmit={handleSubmit} id="login-form">
      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="tu@correo.cl"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          autoComplete="username"
        />
      </Form.Group>

      <details className="mb-3 small text-secondary">
        <summary className="user-select-none">Cuentas de demostración (evaluación)</summary>
        <p className="mb-1 mt-2">
          Contraseña común: <strong>{CLAVE_DEMO}</strong>
        </p>
        <ul className="mb-0 ps-3">
          <li>admin@sanmarcos.cl — Administrador</li>
          <li>recepcion@sanmarcos.cl — Recepción</li>
          <li>camila@correo.cl — Dueño</li>
        </ul>
      </details>

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
