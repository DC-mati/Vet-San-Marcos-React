import PlantillaPublica from '../components/templates/PlantillaPublica'
import AboutSection from '../components/organisms/SobreNosotros'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/** Página dedicada reutilizando la misma sección que aparece en Inicio */
export default function NosotrosPage() {
  useTituloPagina('Nosotros')

  return (
    <PlantillaPublica>
      <AboutSection tituloPrincipal />
    </PlantillaPublica>
  )
}
