import Patrimoine from '../../models/Patrimoine.js';
import Possession from '../../models/possessions/Possession.js'; // Assuming you have a Possession model

const patrimoine = new Patrimoine('John Doe', []); // This should ideally be replaced with a database

export const getValeurPatrimoine = (req, res) => {
  const { date } = req.params;
  const valeur = patrimoine.getValeur(new Date(date));
  res.json({ valeur });
};

export const getValeurPatrimoineRange = (req, res) => {
  const { type, dateDebut, dateFin, jour } = req.body;
  
  // Implement the range calculation here
  const valeur = patrimoine.getValeur(new Date(dateFin)); // Example
  res.json({ valeur });
};

