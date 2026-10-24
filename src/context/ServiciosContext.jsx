import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  actualizarServicio,
  buscarServicios,
  crearServicio,
  eliminarServicio,
  filtrarServiciosPorCategoria,
  obtenerCategorias,
  obtenerServicioPorCodigo,
  obtenerTodosServicios,
} from '../services/serviciosService'

const ServiciosContext = createContext(null)

export function ServiciosProvider({ children }) {
  const [servicios, setServicios] = useState(() => obtenerTodosServicios())

  const recargar = useCallback(() => {
    setServicios(obtenerTodosServicios())
  }, [])

  const agregar = useCallback(
    (datos) => {
      const resultado = crearServicio(datos)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const editar = useCallback(
    (codigo, datos) => {
      const resultado = actualizarServicio(codigo, datos)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const eliminar = useCallback(
    (codigo) => {
      const resultado = eliminarServicio(codigo)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const valor = useMemo(
    () => ({
      servicios,
      categorias: obtenerCategorias(),
      recargar,
      agregar,
      editar,
      eliminar,
      buscar: buscarServicios,
      filtrarCategoria: filtrarServiciosPorCategoria,
      obtenerPorCodigo: obtenerServicioPorCodigo,
    }),
    [servicios, recargar, agregar, editar, eliminar],
  )

  return (
    <ServiciosContext.Provider value={valor}>
      {children}
    </ServiciosContext.Provider>
  )
}

export function useServicios() {
  const ctx = useContext(ServiciosContext)
  if (!ctx) {
    throw new Error('useServicios debe usarse dentro de ServiciosProvider')
  }
  return ctx
}
