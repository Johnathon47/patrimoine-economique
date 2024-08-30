import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PatrimoinePieChart = () => {
  const [data, setData] = useState({
    labels: ['Aucune donnée'],
    datasets: [
      {
        data: [1],
        backgroundColor: ['#FFCE56'],
      },
    ],
  });

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.patrimoines.length > 0) {
          const labels = data.patrimoines.map(item => item.libelle);
          const values = data.patrimoines.map(item => item.valeur);

          setData({
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              },
            ],
          });
        }
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
