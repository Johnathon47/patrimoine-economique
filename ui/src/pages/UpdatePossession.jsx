// src/pages/UpdatePossession.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function UpdatePossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState(null);
  const [dateFin, setDateFin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/possession/${libelle}`)
      .then(response => response.json())
      .then(data => {
        setPossession(data);
        setDateFin(data.dateFin || '');
      })
      .catch(error => {
        console.error('Erreur lors du chargement de la possession:', error);
      });
  }, [libelle]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/possession/${libelle}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateFin }),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/possession');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la possession:', error);
      });
  };

  if (!possession) {
    return <p>Chargement de la possession...</p>;
  }

  return (
    <div>
      <h1>Modifier la Possession</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDateFin">
          <Form.Label>Date Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sauvegarder
        </Button>
      </Form>
    </div>
  );
}

export default UpdatePossession;
