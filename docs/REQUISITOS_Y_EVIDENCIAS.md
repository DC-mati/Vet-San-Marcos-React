# Requisitos y evidencias (Parcial 2)

| Requisito | Implementación | Evidencia | Estado |
|-----------|----------------|-----------|--------|
| Catálogo oficial 31 servicios | `data/catalogoInicial.js` | `serviciosService.test.js` (31) | PASS |
| Atomic Design | `components/*` | `TarjetaServicio.jsx` | PASS |
| CRUD en services | `serviciosService.js` | tests + `/admin/servicios` | PASS |
| Context API | `context/*` | `AppProviders` en `main.jsx` | PASS |
| Flujo cita | páginas solicitar/confirmación | `RECORRIDO_PRUEBAS.md` | PASS |
| Login simulado por rol | `authService.js` | `FormularioLogin.test.jsx` | PASS |
| ≥10 tests Vitest | `*.test.js(x)` | `npm run test:run` (27) | PASS |
| Regla urgencia +$10.000 | `calcularPrecioUrgencia.js` | test dedicado | PASS |
| Bootstrap responsive | plantillas + tablas responsive | manual 360/768/1280 | Verificar manual |
| Guía 16 vistas extra | blog, categorías, paneles | rutas en `App.jsx` | PASS |

Documentos PDF 1–6 y DOCX oficial: no se pudieron parsear automáticamente en este entorno; requisitos aplicados según prompt académico y catálogo Excel vía `data.js` / `catalogoInicial.js`.
