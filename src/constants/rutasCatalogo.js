/** Rutas del catálogo en el sitio público. */
export const rutasCatalogoPublico = {
  lista: '/servicios',
  detalle: (codigo) => `/servicios/${codigo}`,
  conCategoria: (categoria) =>
    `/servicios?categoria=${encodeURIComponent(categoria)}`,
}

/** Rutas del catálogo dentro del panel del dueño. */
export const rutasCatalogoDueno = {
  lista: '/dueno/catalogo',
  detalle: (codigo) => `/dueno/catalogo/${codigo}`,
  conCategoria: (categoria) =>
    `/dueno/catalogo?categoria=${encodeURIComponent(categoria)}`,
}
