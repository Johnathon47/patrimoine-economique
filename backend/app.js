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

const loadData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
      if (err) {
        reject('Error reading data file:', err);
      } else {
        data = JSON.parse(jsonData);
        resolve();
      }
    });
  });
};

const saveData = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        reject('Error writing data file:', err);
      } else {
        resolve();
      }
    });
  });
};

// Load initial data
loadData()
  .then(() => {
    app.use('/possession', possessionRoutes);
    app.use('/patrimoine', patrimoineRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
  });

export { data, saveData }; // Exporter les données et la fonction de sauvegarde pour les contrôleurs
