import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  cerrarSesion as cerrarSesionService,
  iniciarSesion,
  leerSesion,
  registrarUsuario,
  rutaPorRol,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leerSesion())

  const login = useCallback((correo, clave) => {
    const resultado = iniciarSesion(correo, clave)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
    }
    return resultado
  }, [])

  const registro = useCallback((datos) => {
    return registrarUsuario(datos)
  }, [])

  const logout = useCallback(() => {
    cerrarSesionService()
    setUsuario(null)
  }, [])

  const valor = useMemo(
    () => ({
      usuario,
      estaAutenticado: Boolean(usuario),
      login,
      registro,
      logout,
      rutaPorRol,
    }),
    [usuario, login, registro, logout],
  )

  return (
    <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return ctx
}
