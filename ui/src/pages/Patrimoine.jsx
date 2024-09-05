import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession';

function Patrimoine() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/possession')
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
      return total + poss.getValeur(new Date());
    }, 0);
    setValeurPatrimoine(valeurTotale);
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
      <Button onClick={handleCalculValeur}>Calculer Valeur Totale</Button>
      {valeurPatrimoine !== null && <h3>Valeur Totale du Patrimoine: {valeurPatrimoine}</h3>}
    </>
  );
}

export default Patrimoine;
