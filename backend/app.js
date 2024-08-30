import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import possessionRoutes from './routes/possessionRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(process.cwd(), 'public', 'data.json'); // Assure-toi que le chemin est correct
let data = { personnes: [], patrimoines: [] };

// Fonction pour lire les données
const loadData = () => {
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return;
    }
    data = JSON.parse(jsonData);
  });
};

// Charger les données au démarrage
loadData();

// Middleware pour sauvegarder les données
const saveData = () => {
  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing data file:', err);
    }
  });
};

// Assure-toi que les contrôleurs utilisent les données mises à jour
app.use('/possession', possessionRoutes);

// Route pour recharger les données (pour tester)
app.post('/reload-data', (req, res) => {
  loadData();
  res.send('Data reloaded');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { data, saveData }; // Exporter les données et la fonction pour sauvegarder les données
