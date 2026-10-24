import { describe, expect, it } from 'vitest'

import { resolverDestinoTrasLogin } from './destinoLogin'

describe('destinoLogin', () => {
  it('respeta permisos al volver a la ruta guardada en login', () => {
    // Arrange: destinos mezclados entre roles

    // Act: resolver hacia dónde navegar tras autenticarse
    const duenoOk = resolverDestinoTrasLogin('/dueno/catalogo', 'cliente')
    const solicitudPublica = resolverDestinoTrasLogin(
      '/solicitar-cita?codigo=SV001',
      'cliente',
    )
    const adminEnDueno = resolverDestinoTrasLogin('/dueno', 'admin')
    const recepcionAdmin = resolverDestinoTrasLogin(
      '/admin/recepcion',
      'admin',
    )
    const recepcionistaEnAdmin = resolverDestinoTrasLogin(
      '/admin/recepcion',
      'recepcion',
    )

    // Assert: cada rol conserva su panel
    expect(duenoOk).toBe('/dueno/catalogo')
    expect(solicitudPublica).toBe('/solicitar-cita?codigo=SV001')
    expect(adminEnDueno).toBe('/admin')
    expect(recepcionAdmin).toBe('/admin/recepcion')
    expect(recepcionistaEnAdmin).toBe('/recepcion')
  })
})
