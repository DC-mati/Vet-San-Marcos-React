import { useEffect, useMemo, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function ServiciosPage() {
  useTituloPagina('Servicios')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { servicios, categorias, buscar } = useServicios()
  const [termino, setTermino] = useState('')

  const categoriaUrl = searchParams.get('categoria') || ''
  const [categoriaManual, setCategoriaManual] = useState(null)

  // Si cambia la URL (por ejemplo desde Categorías), vuelve a usar el filtro de la URL
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

  const irSolicitar = (codigo) => {
    navigate(`/solicitar-cita?codigo=${codigo}`)
  }

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <h1 className="mb-2">Catálogo de servicios</h1>
        <p className="text-secondary mb-4">
          {servicios.length} servicios veterinarios oficiales de San Marcos,
          Rancagua.
        </p>

        <BuscadorServicios
          termino={termino}
          categoria={categoria}
          categorias={categorias}
          onTerminoChange={setTermino}
          onCategoriaChange={setCategoriaManual}
        />

        <ListaServicios servicios={listado} onSolicitar={irSolicitar} />
      </Container>
    </PlantillaPublica>
  )
}
