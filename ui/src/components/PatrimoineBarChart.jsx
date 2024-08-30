import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PatrimoineBarChart = () => {
  const [data, setData] = useState({
    labels: ['Aucune donnée'],
    datasets: [
      {
        label: 'Valeur',
        data: [0],
        backgroundColor: '#36A2EB',
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
                label: 'Valeur',
                data: values,
                backgroundColor: '#36A2EB',
              },
            ],
          });
        }
      })
      .catch(error => console.error('Erreur de récupération des données:', error));
  }, []);

  return (
    <div>
      <h2>Valeur du Patrimoine</h2>
      <Bar data={data} />
    </div>
  );
};

export default PatrimoineBarChart;
