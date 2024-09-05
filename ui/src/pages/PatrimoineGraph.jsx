import React, { useState, useEffect } from 'react';
import PatrimoinePieChart from '../components/PatrimoinePieChart';
import PatrimoineBarChart from '../components/PatrimoineBarChart';

const PatrimoineGraph = () => {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupération des données des possessions
    fetch('http://localhost:5000/possession')
      .then(response => response.json())
      .then(data => {
        setPossessions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur de récupération des possessions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="container">
      <h1>Graphiques du Patrimoine</h1>
      {/* Passe les possessions aux composants graphiques */}
      <PatrimoinePieChart patrimoines={possessions} />
      <PatrimoineBarChart patrimoines={possessions} />
    </div>
  );
};

export default PatrimoineGraph;
