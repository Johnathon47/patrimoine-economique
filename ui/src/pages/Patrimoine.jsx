import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession';  // Assure-toi que le chemin est correct

function Patrimoine() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

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

  const patrimoine = data.find(entry => entry.model === "Patrimoine").data;

  const handleCalculValeur = () => {
    const possessions = patrimoine.possessions;
    const valeurTotale = possessions.reduce((total, possession) => {
      const poss = new Possession(
        null,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        new Date(),
        possession.tauxAmortissement
      );
      return total + poss.getValeur(new Date());
    }, 0);
    setValeurPatrimoine(valeurTotale);
  };

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
          {patrimoine.possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toUTCString()}</td>
              <td>{new Date(possession.dateFin).toUTCString()}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>{new Possession(
                null,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                new Date(),
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
