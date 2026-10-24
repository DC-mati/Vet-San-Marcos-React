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

  /** Crea cuenta de dueño e inicia sesión en un solo paso (flujo público de citas). */
  const registroYLogin = useCallback((datos) => {
    const registroResultado = registrarUsuario(datos)
    if (!registroResultado.ok) {
      return registroResultado
    }

    const loginResultado = iniciarSesion(datos.correo, datos.clave)
    if (!loginResultado.ok) {
      return loginResultado
    }

    setUsuario(loginResultado.usuario)
    return loginResultado
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
      registroYLogin,
      logout,
      rutaPorRol,
    }),
    [usuario, login, registro, registroYLogin, logout],
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
