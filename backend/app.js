import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import possessionRoutes from './routes/possessionRoutes.js';
import patrimoineRoutes from './routes/patrimoineRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(process.cwd(), 'data', 'data.json');
let data = {
  personnes: [],
  patrimoines: []
};

fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }
  data = JSON.parse(jsonData);
});

app.use('/possession', possessionRoutes);
app.use('/patrimoine', patrimoineRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { data }; // Exporter les données pour les contrôleurs
