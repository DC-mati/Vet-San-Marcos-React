import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  actualizarProducto,
  buscarInventario,
  filtrarInventarioPorCategoria,
  obtenerCategoriasInventario,
  obtenerInventario,
  productosConStockBajo,
} from '../services/inventarioService'

const InventarioContext = createContext(null)

export function InventarioProvider({ children }) {
  const [productos, setProductos] = useState(() => obtenerInventario())

  const recargar = useCallback(() => {
    setProductos(obtenerInventario())
  }, [])

  const editar = useCallback(
    (codigo, datos) => {
      const resultado = actualizarProducto(codigo, datos)
      if (resultado.ok) {
        recargar()
      }
      return resultado
    },
    [recargar],
  )

  const valor = useMemo(
    () => ({
      productos,
      recargar,
      editar,
      buscar: buscarInventario,
      filtrarCategoria: filtrarInventarioPorCategoria,
      categorias: obtenerCategoriasInventario,
      stockBajo: productosConStockBajo,
    }),
    [productos, recargar, editar],
  )

  return (
    <InventarioContext.Provider value={valor}>
      {children}
    </InventarioContext.Provider>
  )
}

export function useInventario() {
  const ctx = useContext(InventarioContext)
  if (!ctx) {
    throw new Error('useInventario debe usarse dentro de InventarioProvider')
  }
  return ctx
}
