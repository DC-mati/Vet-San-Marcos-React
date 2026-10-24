import { useNavigate } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import CatalogoContenido from '../components/organisms/CatalogoContenido'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCatalogoDueno } from '../constants/rutasCatalogo'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoCatalogoPage() {
  useTituloPagina('Catálogo')
  const navigate = useNavigate()

  const solicitar = (codigo) => {
    navigate(`${rutasCitaDueno.formulario}?codigo=${encodeURIComponent(codigo)}`)
  }

  const rutaDetalle = (codigo, search = '') =>
    `${rutasCatalogoDueno.detalle(codigo)}${search}`

  return (
    <PlantillaAdmin
      titulo="Catálogo de servicios"
      descripcion="Consulta precios y solicita citas sin salir de tu panel."
      enlaces={enlacesPanelDueno}
    >
      <div className="panel-catalogo-dueno">
        <CatalogoContenido
          onSolicitar={solicitar}
          rutaDetalle={rutaDetalle}
          mostrarEncabezado={false}
        />
      </div>
    </PlantillaAdmin>
  )
}
