import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function UpdatePossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState(null);
  const [dateFin, setDateFin] = useState('');
  const [error, setError] = useState('');
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
        setError('Erreur lors du chargement de la possession.');
      });
  }, [libelle]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Assurer que la date de fin est une date valide
    if (dateFin && new Date(dateFin).toString() === 'Invalid Date') {
      setError('Date de fin invalide.');
      return;
    }

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
        setError('Erreur lors de la mise à jour de la possession.');
      });
  };

  if (!possession) {
    return <p>Chargement de la possession...</p>;
  }

  return (
    <div>
      <h1>Modifier la Possession</h1>
      {error && <Alert variant="danger">{error}</Alert>}
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
