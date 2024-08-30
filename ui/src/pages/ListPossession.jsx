// src/pages/ListPossession.jsx
import Possession from "../../../models/possessions/Possession.js";
import Personne from "../../../models/Personne.js";
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListPossession() {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/possession')
      .then(response => response.json())
      .then(data => {
        setPossessions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des possessions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des possessions...</p>;
  }

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toUTCString()}</td>
              <td>{possession.dateFin ? new Date(possession.dateFin).toUTCString() : 'Non défini'}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>
                <Link to={`/possession/${possession.libelle}/update`}>
                  <Button variant="warning">Modifier</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListPossession;
