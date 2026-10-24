import { Link } from 'react-router-dom'

/** Enlace discreto para regresar al inicio público desde login o registro. */
export default function EnlaceVolverInicio({ className = '' }) {
  return (
    <Link
      to="/"
      className={`login-volver-inicio text-decoration-none ${className}`.trim()}
    >
      ← Volver al inicio
    </Link>
  )
}
