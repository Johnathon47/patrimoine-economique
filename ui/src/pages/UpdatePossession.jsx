import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function UpdatePossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState(null);
  const [dateFin, setDateFin] = useState('');
  const [newLibelle, setNewLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl = 'https://patrimoine-economique-ylhh.onrender.com';

  useEffect(() => {
    fetch(`${backendUrl}/possession/${libelle}`)
      .then(response => response.json())
      .then(data => {
        setPossession(data);
        setDateFin(data.dateFin || '');
        setNewLibelle(data.libelle || '');
        setValeur(data.valeur || '');
        setTauxAmortissement(data.tauxAmortissement || '');
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
  
    const updatedData = {
      newLibelle,
      valeur,
      dateFin,
      tauxAmortissement,
    };
  
    fetch(`${backendUrl}/possession/${libelle}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
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
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            value={newLibelle}
            onChange={(e) => setNewLibelle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDateFin">
          <Form.Label>Date Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formTauxAmortissement">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
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
