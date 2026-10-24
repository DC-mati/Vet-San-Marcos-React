# Guía de defensa oral

## Catálogo de servicios

1. **Qué hace:** Muestra 31 servicios, búsqueda y filtro.
2. **Archivo:** `src/pages/ServiciosPage.jsx`
3. **Mostrar:** uso de `useServicios()` y `ListaServicios`.
4. **Cómo funciona:** Context lee services → `serviciosService` → localStorage.
5. **Decir:** "La lista no está hardcodeada en la página; viene del service y persiste."
6. **Pregunta posible:** ¿Dónde está el CRUD? → `src/services/serviciosService.js` y admin en `/admin/servicios`.

## Solicitud de cita

1. **Qué hace:** Formulario validado, resumen, guardado pendiente.
2. **Archivos:** `FormularioSolicitudCita.jsx`, `ConfirmacionCitaPage.jsx`, `citasService.js`.
3. **Mostrar:** `validarSolicitudCita` y `crearCita`.
4. **Decir:** "Primero valido, luego muestro resumen, al confirmar guardo con estado Pendiente."
5. **Pregunta:** ¿Calendario real? → No, es simulación frontend.

## Login simulado

1. **Archivo:** `FormularioLogin.jsx`, `authService.js`, `usuariosDemo.js`.
2. **Decir:** "El rol lo da la cuenta demo, no un combo libre."
3. **Pregunta:** ¿Es seguro? → No, es solo para la evaluación.

## Atomic Design

1. **Archivo:** `components/molecules/TarjetaServicio.jsx`.
2. **Decir:** "Es molécula porque combina átomos y no guarda datos sola."

## Pruebas

1. **Archivo:** `src/services/serviciosService.test.js`.
2. **Decir:** "Pruebo el service sin montar toda la app."
