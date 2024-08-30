// backend/controllers/patrimoineController.js
let possessions = []; // Utilise le même tableau pour les données simulées

exports.getValeurPatrimoineByDate = (req, res) => {
  const { date } = req.params;
  // Calcul de la valeur du patrimoine pour la date donnée
  const valeur = 0; // Logique de calcul ici
  res.json({ valeur });
};

exports.getValeurPatrimoineRange = (req, res) => {
  const { type, dateDebut, dateFin, jour } = req.body;
  // Calcul de la valeur du patrimoine pour la plage de dates donnée
  const valeur = 0; // Logique de calcul ici
  res.json({ valeur });
};
