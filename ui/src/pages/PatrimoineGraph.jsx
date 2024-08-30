// src/pages/PatrimoineGraph.jsx
import React from 'react';
import PatrimoinePieChart from '../components/PatrimoinePieChart';
import PatrimoineBarChart from '../components/PatrimoineBarChart';

const PatrimoineGraph = () => (
  <div className="container">
    <h1>Graphique du Patrimoine</h1>
    <PatrimoinePieChart />
    <PatrimoineBarChart />
  </div>
);

export default PatrimoineGraph;
