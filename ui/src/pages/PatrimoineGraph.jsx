import React, { useState, useEffect } from 'react';
import PatrimoinePieChart from '../components/PatrimoinePieChart';
import PatrimoineBarChart from '../components/PatrimoineBarChart';

const PatrimoineGraph = () => {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState('2023-01-01:2023-12-31');

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

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const parseDateRange = (range) => {
    const [start, end] = range.split(':');
    return { start: new Date(start), end: new Date(end) };
  };

  const filteredData = (interval) => {
    const { start, end } = parseDateRange(interval);
    return possessions.filter(possession => {
      const dateDebut = new Date(possession.dateDebut);
      const dateFin = possession.dateFin ? new Date(possession.dateFin) : new Date();
      return dateDebut <= end && dateFin >= start;
    });
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="container">
      <h1>Graphiques du Patrimoine</h1>
      <div>
        <label htmlFor="interval">Sélectionner l'intervalle :</label>
        <select id="interval" value={selectedInterval} onChange={handleIntervalChange}>
          <option value="2019-01-01:2022-12-31">1 Jan 2019 - 31 Dec 2022</option>
          <option value="2022-01-01:2023-12-31">1 Jan 2022 - 31 Dec 2023</option>
          <option value="2023-12-25:2024-09-04">25 Dec 2023 - Today</option>
          <option value="2024-06-26:2025-06-26">26 Jun 2024 - 26 Jun 2025</option>
        </select>
      </div>
      <PatrimoinePieChart patrimoines={filteredData(selectedInterval)} />
      <PatrimoineBarChart patrimoines={filteredData(selectedInterval)} />
    </div>
  );
};

export default PatrimoineGraph;
