import PublicHeader from '../organisms/HeaderPublico'
import PublicFooter from '../organisms/PublicFooter'

/** Layout común de páginas públicas: navbar, contenido y footer a ancho completo */
export default function PlantillaPublica({ children }) {
  return (
    <>
      <PublicHeader />
      <main className="site-main page-public">{children}</main>
      <PublicFooter />
    </>
  )
}
