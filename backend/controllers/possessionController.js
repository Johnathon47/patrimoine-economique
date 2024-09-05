import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data.json');

// Fonction pour lire les données depuis le fichier JSON
const readDataFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
      if (err) {
        return reject(new Error('Error reading data file:', err));
      }
      try {
        const data = JSON.parse(jsonData);
        resolve(data);
      } catch (parseError) {
        reject(new Error('Error parsing JSON data:', parseError));
      }
    });
  });
};

// Fonction pour écrire les données dans le fichier JSON
const writeDataToFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return reject(new Error('Error writing data file:', err));
      }
      resolve();
    });
  });
};

// Nouvelle route pour récupérer une possession par libelle
export const getPossessionByLibelle = (req, res) => {
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
        res.json(possession);
      } else {
        res.status(404).send('Possession not found');
      }
    } else {
      res.status(404).send('Patrimoine not found');
    }
  });
};


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

export const createPossession = async (req, res) => {
  const { libelle, valeur, dateDebut, dateFin, taux } = req.body;
  
  try {
    const data = await readDataFromFile();
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const newPossession = {
      possesseur: { nom: 'John Doe' },
      libelle,
      valeur,
      dateDebut: dateDebut ? new Date(dateDebut) : null,
      dateFin: dateFin ? new Date(dateFin) : null,
      tauxAmortissement: taux
    };
    
    patrimoine.possessions.push(newPossession);
    await writeDataToFile(data);
    
    res.status(201).json(newPossession);
  } catch (error) {
    console.error('Error creating possession:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de la possession.' });
  }
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

// Fonction pour supprimer une possession par libelle
export const deletePossession = async (req, res) => {
  const { libelle } = req.params;

  try {
    const data = await readDataFromFile();
    
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const index = patrimoine.possessions.findIndex(p => p.libelle === libelle);
    
    if (index === -1) {
      return res.status(404).send('Possession not found');
    }
    
    // Supprimer la possession du tableau
    patrimoine.possessions.splice(index, 1);
    
    await writeDataToFile(data);
    
    res.status(200).send('Possession deleted successfully');
  } catch (error) {
    console.error('Error deleting possession:', error);
    res.status(500).json({ error: 'An error occurred while deleting the possession.' });
  }
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
