import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  actualizarEstadoCita,
  crearCita,
  eliminarCita,
  obtenerCitaPorId,
  obtenerCitasPorCorreo,
  obtenerTodasCitas,
  proponerHorarioCita,
} from '../services/citasService'

const CitasContext = createContext(null)

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState(() => obtenerTodasCitas())

  const recargar = useCallback(() => {
    setCitas(obtenerTodasCitas())
  }, [])

  const solicitar = useCallback(
    (datos) => {
      const resultado = crearCita(datos)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const cambiarEstado = useCallback(
    (id, estado, extras) => {
      const resultado = actualizarEstadoCita(id, estado, extras)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const proponerHorario = useCallback(
    (id, fecha, hora) => {
      const resultado = proponerHorarioCita(id, fecha, hora)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const eliminar = useCallback(
    (id) => {
      const resultado = eliminarCita(id)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const valor = useMemo(
    () => ({
      citas,
      recargar,
      solicitar,
      cambiarEstado,
      proponerHorario,
      eliminar,
      obtenerPorId: obtenerCitaPorId,
      porCorreo: obtenerCitasPorCorreo,
    }),
    [citas, recargar, solicitar, cambiarEstado, proponerHorario, eliminar],
  )

  return (
    <CitasContext.Provider value={valor}>{children}</CitasContext.Provider>
  )
}

export function useCitas() {
  const ctx = useContext(CitasContext)
  if (!ctx) {
    throw new Error('useCitas debe usarse dentro de CitasProvider')
  }
  return ctx
}
