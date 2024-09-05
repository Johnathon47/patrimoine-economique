import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import possessionRoutes from './routes/possessionRoutes.js';

// Crée une instance de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configure les middleware pour gérer les requêtes CORS et le parsing des données JSON
app.use(cors());
app.use(bodyParser.json());

// Définit le chemin du fichier de données JSON
const dataFilePath = path.join(process.cwd(), 'public', 'data.json');
let data = { personnes: [], patrimoines: [] };

// Fonction pour lire les données
const loadData = () => {
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return;
    }
    try {
      data = JSON.parse(jsonData);
      // Filtrer les données invalides si nécessaire
      data = data.filter(item => item && item.possesseur && item.dateDebut && item.dateFin);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
    }
  });
};


// Charge les données au démarrage de l'application
loadData();

// Fonction pour sauvegarder les données en mémoire dans le fichier JSON
const saveData = () => {
  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing data file:', err);
    }
  });
};

// Utilise les routes définies dans le module `possessionRoutes`
app.use('/possession', possessionRoutes);

// Route pour recharger les données depuis le fichier JSON
app.post('/reload-data', (req, res) => {
  loadData();
  res.send('Data reloaded');
});

// Démarre le serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporte l'application Express et les fonctions pour accéder aux données et les sauvegarder
export default app;
export { data, saveData };
