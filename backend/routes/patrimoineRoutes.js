// backend/routes/patrimoineRoutes.js
const express = require('express');
const router = express.Router();
const patrimoineController = require('../controllers/patrimoineController');

router.get('/:date', patrimoineController.getValeurPatrimoineByDate);
router.post('/range', patrimoineController.getValeurPatrimoineRange);

module.exports = router;
