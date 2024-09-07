import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession';

function Patrimoine() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [dateCalcul, setDateCalcul] = useState(new Date());

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/possession`)
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

  const handleCalculValeur = () => {
    const valeurTotale = data.reduce((total, possession) => {
      const poss = new Possession(
        null,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        possession.dateFin ? new Date(possession.dateFin) : new Date(),
        possession.tauxAmortissement
      );
      return total + poss.getValeur(new Date(dateCalcul));
    }, 0);
    setValeurPatrimoine(valeurTotale);
  };

  const handleDateChange = (event) => {
    setDateCalcul(new Date(event.target.value));
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (!data.length) {
    return <p>Aucune donnée disponible</p>;
  }

  return (
    <>
      <h1>Patrimoine</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date de Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {data.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toUTCString()}</td>
              <td>{possession.dateFin ? new Date(possession.dateFin).toUTCString() : 'Non défini'}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>{new Possession(
                null,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : new Date(),
                possession.tauxAmortissement
              ).getValeur(new Date())}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <label htmlFor="dateCalcul">Calculer la valeur à la date :</label>
        <div className='mb-2'>
        <input
          type="date"
          id="dateCalcul"
          value={dateCalcul.toISOString().split('T')[0]} // format yyyy-mm-dd
          onChange={handleDateChange}
        />
        </div>
        <div className='mb-2'>
        <Button onClick={handleCalculValeur}>Calculer Valeur Totale</Button>
        </div>
        {valeurPatrimoine !== null && <h3>Valeur Totale du Patrimoine à {dateCalcul.toDateString()}: {valeurPatrimoine}</h3>}
      </div>
    </>
  );
}

export default Patrimoine;
