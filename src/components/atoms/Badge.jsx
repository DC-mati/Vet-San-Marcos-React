import Form from 'react-bootstrap/Form'

export const Badge = ({ text, type = 'info' }) => {
  return <span className={`badge badge--${type}`}>{text}</span>;
};