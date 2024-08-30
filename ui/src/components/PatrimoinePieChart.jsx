// src/components/PatrimoinePieChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PatrimoinePieChart = () => {
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    fetch('/patrimoine')  // Assure-toi que ce chemin est correct
      .then(response => response.json())
      .then(data => {
        const labels = data.map(item => item.libelle);
        const values = data.map(item => item.valeur);

        setData({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        });
      })
      .catch(error => console.error('Erreur de récupération des données:', error));
  }, []);

  return (
    <div>
      <h2>Répartition du Patrimoine</h2>
      <Pie data={data} />
    </div>
  );
};

export default PatrimoinePieChart;
