import fs from 'fs';
import path from 'path';
import Possession from '../../models/possessions/Possession.js';

const dataFilePath = path.join(process.cwd(), 'public', 'data.json');

export const getPossessions = (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Error reading data');
    }
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return res.status(500).send('Error parsing data');
    }
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (patrimoineData) {
      const patrimoine = patrimoineData.data;
      const possessions = patrimoine.possessions.filter(p => p.possesseur.nom === 'John Doe');
      res.json(possessions);
    } else {
      res.status(404).send('Patrimoine not found');
    }
  });
};

export const createPossession = (req, res) => {
  const { libelle, valeur, dateDebut, dateFin, taux } = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Error reading data');
    }
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return res.status(500).send('Error parsing data');
    }
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (patrimoineData) {
      const patrimoine = patrimoineData.data;
      const newPossession = {
        possesseur: { nom: 'John Doe' },
        libelle,
        valeur,
        dateDebut: new Date(dateDebut),
        dateFin: dateFin ? new Date(dateFin) : null,
        tauxAmortissement: taux
      };
      patrimoine.possessions.push(newPossession);
      fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error writing data file:', err);
          return res.status(500).send('Error saving data');
        }
        res.status(201).json(newPossession);
      });
    } else {
      res.status(404).send('Patrimoine not found');
    }
  });
};

export const updatePossession = (req, res) => {
  const { libelle } = req.params;
  const { dateFin } = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Error reading data');
    }
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return res.status(500).send('Error parsing data');
    }
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (patrimoineData) {
      const patrimoine = patrimoineData.data;
      const possession = patrimoine.possessions.find(p => p.libelle === libelle);
      if (possession) {
        possession.dateFin = new Date(dateFin);
        fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.error('Error writing data file:', err);
            return res.status(500).send('Error saving data');
          }
          res.json(possession);
        });
      } else {
        res.status(404).send('Possession not found');
      }
    } else {
      res.status(404).send('Patrimoine not found');
    }
  });
};

export const closePossession = (req, res) => {
  const { libelle } = req.params;
  fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Error reading data');
    }
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return res.status(500).send('Error parsing data');
    }
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (patrimoineData) {
      const patrimoine = patrimoineData.data;
      const possession = patrimoine.possessions.find(p => p.libelle === libelle);
      if (possession) {
        possession.dateFin = new Date();
        fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.error('Error writing data file:', err);
            return res.status(500).send('Error saving data');
          }
          res.json(possession);
        });
      } else {
        res.status(404).send('Possession not found');
      }
    } else {
      res.status(404).send('Patrimoine not found');
    }
  });
};
