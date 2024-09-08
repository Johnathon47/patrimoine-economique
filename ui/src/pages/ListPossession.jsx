import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListPossession() {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = 'https://patrimoine-economique-ylhh.onrender.com';

  useEffect(() => {
    fetch(`${backendUrl}/possession`)
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

  const handleClosePossession = (libelle) => {
    fetch(`${backendUrl}/possession/${libelle}/close`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(updatedPossession => {
        // Met à jour la possession dans la liste avec la nouvelle date de fin
        setPossessions(possessions.map(p => 
          p.libelle === libelle ? { ...p, dateFin: updatedPossession.dateFin } : p
        ));
      })
      .catch(error => {
        console.error("Erreur lors de la clôture de la possession :", error);
      });
  };

  const handleDelete = (libelle) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette possession ?')) {
      fetch(`${backendUrl}/possession/${libelle}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setPossessions(possessions.filter(possession => possession.libelle !== libelle));
          } else {
            console.error('Erreur lors de la suppression de la possession');
          }
        })
        .catch(error => console.error('Erreur lors de la suppression:', error));
    }
  };

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
                <div className='mb-2'>
                <Link to={`/possession/update/${possession.libelle}`}>
                  <Button variant="warning">Modifier</Button>
                </Link>
                </div>
                <div className='mb-2'>
                <Button variant="danger" onClick={() => handleDelete(possession.libelle)}>
                  Supprimer
                </Button>
                </div>
                {!possession.dateFin && (
                  <div className='mb-2'>
                    <Button variant="primary" onClick={() => handleClosePossession(possession.libelle)}>
                    Clôturer
                  </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListPossession;
