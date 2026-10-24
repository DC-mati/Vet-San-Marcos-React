import { useEffect, useMemo, useState } from 'react'
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
  const [searchParams] = useSearchParams()
  const { servicios, categorias, buscar } = useServicios()
  const [termino, setTermino] = useState('')

  const categoriaUrl = searchParams.get('categoria') || ''
  const [categoriaManual, setCategoriaManual] = useState(null)

  useEffect(() => {
    setCategoriaManual(null)
  }, [categoriaUrl])

  const categoria = categoriaManual ?? categoriaUrl

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
        onCategoriaChange={setCategoriaManual}
      />

      <ListaServicios
        servicios={listado}
        onSolicitar={onSolicitar}
        rutaDetalle={rutaDetalle}
      />
    </>
  )
}
