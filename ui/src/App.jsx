import { useEffect, useState } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';
import Possession from '../../models/possessions/Possession';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [datesFin, setDatesFin] = useState({});

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des données:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (!data) {
    return <p>Aucune donnée disponible</p>;
  }

  const personne = data.find(entry => entry.model === "Personne").data;
  const patrimoine = data.find(entry => entry.model === "Patrimoine").data;

  const handleGetValeur = (possession, date) => {
    if (date) {
      const dateObject = new Date(date);
      return possession.getValeur(dateObject);
    }
    return 'Non défini';
  };

  const handleCalculValeur = () => {
    const possessions = patrimoine.possessions;
    const valeurTotale = possessions.reduce((total, possession) => {
      const dateObject = new Date(datesFin[possession.libelle] || inputValue);
      const poss = new Possession(
        null,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        dateObject,
        possession.tauxAmortissement
      );
      return total + poss.getValeur(dateObject);
    }, 0);
    setValeurPatrimoine(valeurTotale);
  };

  const handleDateChange = (libelle, date) => {
    setDatesFin(prevDatesFin => ({
      ...prevDatesFin,
      [libelle]: date
    }));
  };

  return (
    <>
      <h1>Information sur {personne.nom}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {patrimoine.possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toUTCString()}</td>
              <td>
                <input
                  type="date"
                  value={datesFin[possession.libelle] || ''}
                  onChange={(e) => handleDateChange(possession.libelle, e.target.value)}
                />
              </td>
              <td>{possession.tauxAmortissement}</td>
              <td>{handleGetValeur(new Possession(
                null,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                new Date(datesFin[possession.libelle] || inputValue),
                possession.tauxAmortissement
              ), datesFin[possession.libelle] || inputValue)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleCalculValeur}>Valider</Button>
      {valeurPatrimoine !== null && <h3>Valeur du patrimoine: {valeurPatrimoine}</h3>}
    </>
  );
}

export default App;
