import { AuthProvider } from './AuthContext'
import { CitasProvider } from './CitasContext'
import { InventarioProvider } from './InventarioContext'
import { MascotasProvider } from './MascotasContext'
import { ServiciosProvider } from './ServiciosContext'

/** Agrupa todos los contextos de la aplicación. */
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ServiciosProvider>
        <InventarioProvider>
          <MascotasProvider>
            <CitasProvider>{children}</CitasProvider>
          </MascotasProvider>
        </InventarioProvider>
      </ServiciosProvider>
    </AuthProvider>
  )
}
