import React, { useState } from 'react';
import { ServicesGrid } from '../organisms/ServicesGrid';

const initialServices = [
  {
    id: '1',
    title: 'Consulta General',
    category: 'Atención Médica',
    price: 25000,
    description: 'Evaluación física completa para caninos y felinos.'
  },
  {
    id: '2',
    title: 'Vacunación Cúadruple',
    category: 'Inmunización',
    price: 18000,
    description: 'Protección contra moquillo, parvovirus, hepatitis y parainfluenza.'
  },
  {
    id: '3',
    title: 'Peluquería y Baño Canino',
    category: 'Estética',
    price: 22000,
    description: 'Baño medicado, corte de pelo y limpieza de oídos/uñas.'
  }
];

export const ServicesPage = () => {
  const [services] = useState(initialServices);

  const handleSelectService = (id) => {
    alert(`Servicio ${id} seleccionado para agendamiento.`);
  };

  return (
    <ServicesLayout
      filterSection={<p>Filtros de servicio aquí...</p>}
      contentSection={
        <ServicesGrid services={services} onSelectService={handleSelectService} />
      }
    />
  );
};