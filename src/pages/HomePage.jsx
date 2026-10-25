import PublicHeader from '../components/organisms/HeaderPublico'
import HomeHero from '../components/organisms/Home'
import AboutSection from '../components/organisms/SobreNosotros'
import ServicesPreview from '../components/organisms/PreVistaServicios'
import ContactSection from '../components/organisms/Contacto'
import PublicFooter from '../components/organisms/PublicFooter'

import { useServicios } from '../context/ServiciosContext'

export default function HomePage() {
  const { servicios } = useServicios()
  const destacados = servicios.slice(0, 6)

  return (
    <>
      <PublicHeader />

      <main className="site-main page-public">
        <HomeHero />
        <AboutSection />
        <ServicesPreview services={destacados} />
        <ContactSection />
      </main>

      <PublicFooter />
    </>
  )
}
