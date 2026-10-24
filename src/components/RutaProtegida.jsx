import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Bloquea rutas si no hay sesión o si el rol no coincide.
 */
export default function RutaProtegida({ rolesPermitidos, children }) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" state={{ desde: location.pathname }} replace />
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />
  }

  return children
}
