import { data } from '../app.js'; // Assurez-vous que le chemin est correct
import Possession from '../../models/possessions/Possession.js';

export const getPossessions = (req, res) => {
  const patrimoine = data.patrimoines.find(p => p.possesseur.nom === 'John Doe');
  if (patrimoine) {
    res.json(patrimoine.possessions);
  } else {
    res.status(404).send('Patrimoine not found');
  }
};

export const createPossession = (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  const patrimoine = data.patrimoines.find(p => p.possesseur.nom === 'John Doe');
  if (patrimoine) {
    const newPossession = new Possession(null, libelle, valeur, new Date(dateDebut), null, taux);
    patrimoine.possessions.push(newPossession);
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing data file:', err);
        res.status(500).send('Error saving data');
        return;
      }
      res.status(201).json(newPossession);
    });
  } else {
    res.status(404).send('Patrimoine not found');
  }
};

export const updatePossession = (req, res) => {
  const { libelle } = req.params;
  const { dateFin } = req.body;
  const patrimoine = data.patrimoines.find(p => p.possesseur.nom === 'John Doe');
  if (patrimoine) {
    const possession = patrimoine.possessions.find(p => p.libelle === libelle);
    if (possession) {
      possession.dateFin = new Date(dateFin);
      fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error writing data file:', err);
          res.status(500).send('Error saving data');
          return;
        }
        res.json(possession);
      });
    } else {
      res.status(404).send('Possession not found');
    }
  } else {
    res.status(404).send('Patrimoine not found');
  }
};

export const closePossession = (req, res) => {
  const { libelle } = req.params;
  const patrimoine = data.patrimoines.find(p => p.possesseur.nom === 'John Doe');
  if (patrimoine) {
    const possession = patrimoine.possessions.find(p => p.libelle === libelle);
    if (possession) {
      possession.dateFin = new Date();
      fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error writing data file:', err);
          res.status(500).send('Error saving data');
          return;
        }
        res.json(possession);
      });
    } else {
      res.status(404).send('Possession not found');
    }
  } else {
    res.status(404).send('Patrimoine not found');
  }
};
