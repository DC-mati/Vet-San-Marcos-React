import PublicHeader from '../components/organisms/HeaderPublico';
import HomeHero from '../components/organisms/Home';
import AboutSection from '../components/organisms/SobreNosotros';
import ServicesPreview from '../components/organisms/PreVistaServicios';
import ContactSection from '../components/organisms/Contacto';
import PublicFooter from '../components/organisms/PublicFooter';

import { servicios } from '../data/servicios';
import '../Homecss.css';

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main>
        <HomeHero />
        <AboutSection />
        <ServicesPreview services={servicios} />
        <ContactSection />
      </main>

      <PublicFooter />
    </>
  );
}