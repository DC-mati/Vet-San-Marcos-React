import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al cambiar de ruta, muestra la nueva página desde arriba.
 * Si la URL trae ancla (#seccion), no fuerza el scroll para permitir ir a esa sección en Inicio.
 */
export default function ScrollAlCambiarRuta() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
