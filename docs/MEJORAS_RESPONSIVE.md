# Mejoras de diseño y responsive

## 1. Qué problema existía

En pantallas grandes la web se veía como una columna angosta centrada con franjas blancas a los lados. La navbar apretaba los enlaces, el hero se veía pequeño y el login mostraba la foto solo dentro de ese bloque central.

## 2. Qué archivo lo causaba

La causa principal estaba en `src/index.css`, reglas heredadas de la plantilla Vite:

```css
#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}
```

Eso limitaba **toda** la aplicación React, incluidos navbar, fondos y login.

## 3. Qué cambié

1. Reescribí `src/index.css` con tokens de color veterinaria y `#root { width: 100%; text-align: left; }`.
2. Importé `Homecss.css` desde `main.jsx` para todos los estilos públicos.
3. Mejoré navbar en `HeaderPublico.jsx` (colapso en `xl`, menú "Más", botón CTA).
4. Login en pantalla completa con `Login.css` y estructura en `LoginPage.jsx`.
5. Secciones con fondo a ancho completo y contenido en `Container fluid="xxl"`.
6. Ajustes en `admin.css` y páginas internas con `page-section`.

## 4. Por qué

Bootstrap ya trae contenedores responsivos. El error era un contenedor fijo en `#root` por encima de Bootstrap. La solución correcta es: **fondo al 100%**, **contenido dentro de Container**.

## 5. Cómo funciona ahora el ancho global

```text
#root (100% del navegador)
└── Navbar / Hero / Footer (width 100%, color de fondo completo)
    └── Container fluid="xxl" (contenido alineado, ~1320px máx)
```

## 6. Contenedores Bootstrap usados

- `Container fluid="xxl"` en navbar, hero, secciones y páginas públicas.
- `px-3 px-lg-4` para padding lateral cómodo.
- Formularios estrechos: `div.mx-auto` con `maxWidth` 480–720 px dentro del container ancho.

## 7. Responsive

- Navbar colapsa desde **1200px** (`expand="xl"`) para evitar textos en dos líneas antes de móvil.
- Hero: grid 2 columnas en escritorio, imagen arriba en móvil.
- Tablas: siguen usando `table-responsive`.
- Login: `min-height: 100svh` y scroll vertical en pantallas bajas.

## 8. Breakpoints revisados

| Ancho | Qué comprobar |
|-------|----------------|
| 360–390 | Menú hamburguesa, formularios legibles |
| 768 | Grid a una columna, navbar colapsada |
| 1024–1280 | Container xxl, hero equilibrado |
| 1440–1920 | Sin franjas blancas por `#root` |

## 9. Cómo comprobar tú misma

1. `npm run dev` (o `npm.cmd run dev` en PowerShell).
2. Abre `/` y `/login` en ventana maximizada.
3. DevTools → modo responsive → 360, 768, 1280, 1920.
4. Verifica que los fondos azules/oscuros lleguen a los bordes laterales.

## 10. Verificaciones de esta entrega

| Comprobación | Resultado |
|--------------|-----------|
| `npm run build` | Ejecutar tras pull |
| `npm run test:run` | Ejecutar tras pull |
| Vista 1920px en navegador | NO VERIFICADO automáticamente en esta sesión |
| Vista 360px | NO VERIFICADO automáticamente en esta sesión |

Después de actualizar, vuelve a correr build y tests en tu PC para confirmar PASS.
