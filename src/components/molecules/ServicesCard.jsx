import Form from 'react-bootstrap/Form'
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export const ServiceCard = ({ id, title, category, price, description, onSelect }) => {
  return (
    <div className="service-card">
      <div className="service-card__header">
        <h3>{title}</h3>
        <Badge text={category} type="secondary" />
      </div>
      <p className="service-card__description">{description}</p>
      <div className="service-card__footer">
        <span className="service-card__price">${price}</span>
        <Button onClick={() => onSelect(id)} variant="primary">
          Agendar
        </Button>
      </div>
    </div>
  );
};