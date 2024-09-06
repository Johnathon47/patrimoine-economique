import fs from 'fs/promises'; // Utilisation des promesses intégrées
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data.json');

// Fonction pour lire les données depuis le fichier JSON
const readDataFromFile = async () => {
  try {
    const jsonData = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (err) {
    throw new Error('Error reading or parsing data file:', err);
  }
};

// Fonction pour écrire les données dans le fichier JSON
const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error('Error writing data file:', err);
  }
};

// Nouvelle route pour récupérer une possession par libelle
export const getPossessionByLibelle = async (req, res) => {
  const { libelle } = req.params;

  try {
    const data = await readDataFromFile();
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const possession = patrimoine.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
      res.json(possession);
    } else {
      res.status(404).send('Possession not found');
    }
  } catch (error) {
    console.error('Error retrieving possession:', error);
    res.status(500).send('Error retrieving possession');
  }
};

// Route pour récupérer toutes les possessions
export const getPossessions = async (req, res) => {
  try {
    const data = await readDataFromFile();
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const possessions = patrimoine.possessions.filter(p => p.possesseur.nom === 'John Doe');
    res.json(possessions);
  } catch (error) {
    console.error('Error retrieving possessions:', error);
    res.status(500).send('Error retrieving possessions');
  }
};

// Route pour créer une nouvelle possession
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
      tauxAmortissement: taux || null
    };
    
    patrimoine.possessions.push(newPossession);
    await writeDataToFile(data);
    res.status(201).json(newPossession);
  } catch (error) {
    console.error('Error creating possession:', error);
    res.status(500).send('Error creating possession');
  }
};

// Route pour mettre à jour une possession
export const updatePossession = async (req, res) => {
  const { libelle } = req.params;
  const { newLibelle, valeur, dateFin, tauxAmortissement } = req.body;

  try {
    const data = await readDataFromFile();
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const possession = patrimoine.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
      if (newLibelle) possession.libelle = newLibelle;
      if (valeur) possession.valeur = valeur;
      if (dateFin) possession.dateFin = new Date(dateFin);
      if (tauxAmortissement) possession.tauxAmortissement = tauxAmortissement;
      
      await writeDataToFile(data);
      res.json(possession);
    } else {
      res.status(404).send('Possession not found');
    }
  } catch (error) {
    console.error('Error updating possession:', error);
    res.status(500).send('Error updating possession');
  }
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
    
    patrimoine.possessions.splice(index, 1);
    await writeDataToFile(data);
    res.status(200).send('Possession deleted successfully');
  } catch (error) {
    console.error('Error deleting possession:', error);
    res.status(500).send('Error deleting possession');
  }
};

// Fonction pour fermer une possession (mettre à jour la date de fin)
export const closePossession = async (req, res) => {
  const { libelle } = req.params;

  try {
    const data = await readDataFromFile();
    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    
    if (!patrimoineData) {
      return res.status(404).send('Patrimoine not found');
    }
    
    const patrimoine = patrimoineData.data;
    const possession = patrimoine.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
      possession.dateFin = new Date();
      await writeDataToFile(data);
      res.json(possession);
    } else {
      res.status(404).send('Possession not found');
    }
  } catch (error) {
    console.error('Error closing possession:', error);
    res.status(500).send('Error closing possession');
  }
};
