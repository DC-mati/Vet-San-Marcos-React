# Cobertura de pruebas

## Configuración

- Vitest + jsdom + `@vitest/coverage-v8`
- Setup: `src/test/setup.js`
- Config: `vite.config.js` → `test.coverage`

## Ejecución (última corrida en desarrollo)

```bash
npm run test:cov
```

- **Archivos de prueba:** 7
- **Pruebas exitosas:** 27
- **Pruebas fallidas:** 0
- **Build:** PASS (`npm run build`)
- **Lint:** PASS con advertencias menores (oxlint)

## Cobertura global aproximada (v8)

- Statements ~35%
- Branches ~29%
- Functions ~29%
- Lines ~35%

La cobertura es baja en páginas porque las pruebas se concentraron en **services**, **utils**, login y `TarjetaServicio`. Ampliar tests de organismos subiría el porcentaje.

## Errores corregidos

- Login con selector libre de rol → validación con cuentas demo.
- `ServicesPage.jsx` roto → reemplazado por `ServiciosPage.jsx`.
- Catálogo incompleto (6 ítems) → 31 servicios oficiales.

## Limitaciones

- No hay pruebas E2E automatizadas de navegador en CI.
- `ServicesGrid.jsx` obsoleto fue eliminado (evitaba parseo en coverage).
