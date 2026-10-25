import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

/**
 * La ruta antigua /mis-citas ya no es pública.
 * Redirige según sesión y rol.
 */
export default function RedireccionMisCitas() {
  const { usuario } = useAuth()

  if (!usuario) {
    return (
      <Navigate to="/login" state={{ desde: '/dueno/mis-citas' }} replace />
    )
  }

  if (usuario.rol === 'cliente') {
    return <Navigate to="/dueno/mis-citas" replace />
  }

  return <Navigate to="/" replace />
}
