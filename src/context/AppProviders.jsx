import { AuthProvider } from './AuthContext'
import { CitasProvider } from './CitasContext'
import { ServiciosProvider } from './ServiciosContext'

/** Agrupa todos los contextos de la aplicación. */
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ServiciosProvider>
        <CitasProvider>{children}</CitasProvider>
      </ServiciosProvider>
    </AuthProvider>
  )
}
