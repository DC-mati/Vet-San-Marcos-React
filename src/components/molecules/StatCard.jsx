import Card from 'react-bootstrap/Card';

function StatCard({ title, value, description }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <h2>{value}</h2>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default StatCard;
