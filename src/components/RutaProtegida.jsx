import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { rutaPorRol } from '../services/authService'

/**
 * Bloquea rutas si no hay sesión o si el rol no coincide.
 */
export default function RutaProtegida({ rolesPermitidos, children }) {
  const { usuario } = useAuth()
  const location = useLocation()

  const destinoCompleto = `${location.pathname}${location.search}`

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{ desde: destinoCompleto }}
        replace
      />
    )
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to={rutaPorRol(usuario.rol)} replace />
  }

  return children
}
