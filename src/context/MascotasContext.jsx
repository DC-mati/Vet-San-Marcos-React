import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  actualizarMascota,
  crearMascota,
  desactivarMascota,
  obtenerMascotaPorId,
  obtenerMascotasPorTutor,
} from '../services/mascotasService'

const MascotasContext = createContext(null)

export function MascotasProvider({ children }) {
  const [mascotas, setMascotas] = useState(() =>
    obtenerMascotasPorTutor(''),
  )

  const recargar = useCallback((correoTutor) => {
    if (!correoTutor) {
      setMascotas([])
      return
    }
    setMascotas(obtenerMascotasPorTutor(correoTutor))
  }, [])

  const registrar = useCallback(
    (datos) => {
      const resultado = crearMascota(datos)
      if (resultado.ok) {
        recargar(datos.tutorCorreo)
      }
      return resultado
    },
    [recargar],
  )

  const editar = useCallback(
    (id, datos, correoTutor) => {
      const resultado = actualizarMascota(id, datos, correoTutor)
      if (resultado.ok) {
        recargar(correoTutor)
      }
      return resultado
    },
    [recargar],
  )

  const desactivar = useCallback(
    (id, correoTutor) => {
      const resultado = desactivarMascota(id, correoTutor)
      if (resultado.ok) {
        recargar(correoTutor)
      }
      return resultado
    },
    [recargar],
  )

  const valor = useMemo(
    () => ({
      mascotas,
      recargar,
      registrar,
      editar,
      desactivar,
      obtenerPorId: obtenerMascotaPorId,
      delTutor: obtenerMascotasPorTutor,
    }),
    [mascotas, recargar, registrar, editar, desactivar],
  )

  return (
    <MascotasContext.Provider value={valor}>{children}</MascotasContext.Provider>
  )
}

export function useMascotas() {
  const ctx = useContext(MascotasContext)
  if (!ctx) {
    throw new Error('useMascotas debe usarse dentro de MascotasProvider')
  }
  return ctx
}
