# Recorrido manual de pruebas

Ejecuta `npm run dev` y sigue estos pasos.

## Inicio y catálogo

1. Abre `/` → debe verse hero, servicios destacados y footer.
2. Abre `/servicios` → 31 servicios.
3. Busca "hemograma" → debe quedar EX001.
4. Filtra categoría "Vacunación" → solo vacunas.

## Detalle y cita

5. Entra a un servicio → `/servicios/SV001`.
6. Clic "Solicitar cita" → formulario con validaciones.
7. Envía vacío → errores junto a campos (sin `alert`).
8. Completa y revisa resumen → confirma → pantalla de éxito con ID.
9. En `/mis-citas` escribe el mismo correo → aparece la solicitud pendiente.

## Recepción

10. Login `recepcion@sanmarcos.cl` / `demo123`.
11. En `/recepcion` confirma o propone fecha/hora → estado cambia.

## Admin CRUD

12. Login `admin@sanmarcos.cl` / `demo123`.
13. `/admin/servicios` → crear, editar, eliminar → recarga y persiste (F5).

## Roles

14. `/admin` sin login → redirige a login.
15. Cliente no puede entrar a `/admin`.

## Responsive

16. DevTools → 360px, 768px, 1280px → menú hamburguesa y tablas con scroll horizontal controlado.
