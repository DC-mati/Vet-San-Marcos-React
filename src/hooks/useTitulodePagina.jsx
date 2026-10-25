import { useEffect } from "react";

export function useTituloPagina(titulo) {
  // Los hooks se llaman siempre en el nivel superior, nunca dentrode bucles ni funciones internas.
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = `${titulo} | Vet San Marcos`;

    //al salir de la página se restaurará el título anterior.
    return () => {
      document.title = tituloAnterior;
    };
    // Se vuelve a ejecutar solo si cambia el título.
  }, [titulo]);
}
