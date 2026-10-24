import PlantillaPublica from '../components/templates/PlantillaPublica'
import ContactSection from '../components/organisms/Contacto'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/** Página de contacto con el mismo formulario funcional que en Inicio */
export default function ContactoPage() {
  useTituloPagina('Contacto')

  return (
    <PlantillaPublica>
      <ContactSection tituloPrincipal />
    </PlantillaPublica>
  )
}
