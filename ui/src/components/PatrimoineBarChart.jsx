import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PatrimoineBarChart = ({ patrimoines }) => {
  const data = {
    labels: patrimoines.map(p => p.libelle),
    datasets: [
      {
        label: 'Valeur',
        data: patrimoines.map(p => p.valeur),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div>
      <h2>Valeur du Patrimoine</h2>
      <Bar data={data} />
    </div>
  );
};

export default PatrimoineBarChart;
