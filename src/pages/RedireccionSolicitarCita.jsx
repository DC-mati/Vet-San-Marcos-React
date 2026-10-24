import { Navigate, useSearchParams } from 'react-router-dom'

import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'

/** La solicitud pública redirige al flujo privado del dueño. */
export default function RedireccionSolicitarCita() {
  const [params] = useSearchParams()
  const { usuario } = useAuth()
  const codigo = params.get('codigo')
  const destino = codigo
    ? `${rutasCitaDueno.formulario}?codigo=${encodeURIComponent(codigo)}`
    : rutasCitaDueno.formulario

  if (!usuario) {
    return <Navigate to="/login" state={{ desde: destino }} replace />
  }

  if (usuario.rol === 'cliente') {
    return <Navigate to={destino} replace />
  }

  return <Navigate to="/" replace />
}
