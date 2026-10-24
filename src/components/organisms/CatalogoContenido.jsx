import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import BuscadorServicios from '../molecules/BuscadorServicios'
import ListaServicios from './ListaServicios'
import { useServicios } from '../../context/ServiciosContext'

/**
 * Listado de servicios reutilizable.
 * Las rutas de detalle y solicitud las define la página padre (pública o privada).
 */
export default function CatalogoContenido({
  onSolicitar,
  rutaDetalle,
  mostrarEncabezado = true,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { servicios, categorias, buscar } = useServicios()
  const [termino, setTermino] = useState('')

  // La categoría vive en la URL para conservar filtros al ir al detalle y volver
  const categoria = searchParams.get('categoria') || ''

  const cambiarCategoria = (valor) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (valor) {
          next.set('categoria', valor)
        } else {
          next.delete('categoria')
        }
        return next
      },
      { replace: true },
    )
  }

  const listado = useMemo(() => {
    const porTexto = buscar(termino)
    if (!categoria) {
      return porTexto
    }
    return porTexto.filter((s) => s.categoria === categoria)
  }, [buscar, termino, categoria])

  return (
    <>
      {mostrarEncabezado && (
        <>
          <h1 className="mb-2">Catálogo de servicios</h1>
          <p className="text-secondary mb-4">
            {servicios.length} servicios veterinarios de San Marcos, Rancagua.
          </p>
        </>
      )}

      <BuscadorServicios
        termino={termino}
        categoria={categoria}
        categorias={categorias}
        onTerminoChange={setTermino}
        onCategoriaChange={cambiarCategoria}
      />

      <ListaServicios
        servicios={listado}
        onSolicitar={onSolicitar}
        rutaDetalle={rutaDetalle}
      />
    </>
  )
}
