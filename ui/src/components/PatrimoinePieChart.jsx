import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PatrimoinePieChart = ({ patrimoines }) => {
  const data = {
    labels: patrimoines.map(p => p.libelle),
    datasets: [
      {
        data: patrimoines.map(p => p.valeur),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div>
      <h2>Répartition du Patrimoine</h2>
      <Pie data={data} />
    </div>
  );
};

export default PatrimoinePieChart;
