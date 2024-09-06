import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function CreatePossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [taux, setTaux] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPossession = {
      libelle,
      valeur: parseFloat(valeur) || null,
      dateDebut: dateDebut || null,
      dateFin: dateFin || null,
      taux: parseFloat(taux) || null
    };

    try {
      const response = await fetch('http://localhost:5000/possession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPossession),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      setLibelle('');
      setValeur('');
      setDateDebut('');
      setDateFin('');
      setTaux('');
      navigate('/possession');
    } catch (error) {
      console.error('Erreur lors de la création de la possession:', error);
      setError('Une erreur est survenue lors de la création de la possession.');
    }
  };

  return (
    <div className="container">
      <h1>Créer une Nouvelle Possession</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLibelle">
          <Form.Label>Libelle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez la valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateDebut">
          <Form.Label>Date Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
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
        <Form.Group controlId="formTaux">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Entrez le taux d'amortissement"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default CreatePossession;
