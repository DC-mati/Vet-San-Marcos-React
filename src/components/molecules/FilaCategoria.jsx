import { Link } from 'react-router-dom'

/**
 * Fila de una categoría: nombre y cantidad agrupados, acción a la derecha.
 */
export default function FilaCategoria({ nombre, cantidad, enlaceCatalogo }) {
  const textoCantidad =
    cantidad === 1 ? '1 servicio' : `${cantidad} servicios`

  return (
    <li className="categoria-fila">
      <div className="categoria-fila__info">
        <p className="categoria-fila__nombre">{nombre}</p>
        <p className="categoria-fila__cantidad">{textoCantidad}</p>
      </div>

      <Link
        to={enlaceCatalogo}
        className="categoria-fila__accion btn btn-outline-primary"
      >
        Ver servicios →
      </Link>
    </li>
  )
}
