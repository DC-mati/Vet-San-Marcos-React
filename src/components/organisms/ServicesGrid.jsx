import React from 'react';
import { ServiceCard } from '../molecules/ServiceCard';

export const ServicesGrid = ({ services, onSelectService }) => {
  if (!services.length) {
    return <p className="services-empty">No se encontraron servicios disponibles.</p>;
  }

  return (
    <div className="services-grid">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
          onSelect={onSelectService}
        />
      ))}
    </div>
  );
};