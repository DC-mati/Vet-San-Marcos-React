import Container from 'react-bootstrap/Container'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import FilaCategoria from '../components/molecules/FilaCategoria'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

import './CategoriasPage.css'

export default function CategoriasPage() {
  useTituloPagina('Categorías')
  const { categorias, filtrarCategoria } = useServicios()

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <h1 className="mb-2">Categorías de servicios</h1>
        <p className="text-secondary mb-4">
          Elige una categoría para ver solo esos servicios en el catálogo.
        </p>

        <ul className="categorias-lista">
          {categorias.map((cat) => {
            const cantidad = filtrarCategoria(cat).length
            const enlace = `/servicios?categoria=${encodeURIComponent(cat)}`

            return (
              <FilaCategoria
                key={cat}
                nombre={cat}
                cantidad={cantidad}
                enlaceCatalogo={enlace}
              />
            )
          })}
        </ul>
      </Container>
    </PlantillaPublica>
  )
}
