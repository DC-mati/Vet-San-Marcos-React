import PublicHeader from '../organisms/HeaderPublico'
import PublicFooter from '../organisms/PublicFooter'

/** Layout común de páginas públicas: navbar, contenido y footer. */
export default function PlantillaPublica({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
