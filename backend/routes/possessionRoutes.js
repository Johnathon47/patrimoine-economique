// backend/routes/possessionRoutes.js
const express = require('express');
const router = express.Router();
const possessionController = require('../controllers/possessionController');

router.get('/', possessionController.getPossessions);
router.post('/', possessionController.createPossession);
router.put('/:libelle', possessionController.updatePossession);
router.post('/:libelle/close', possessionController.closePossession);

module.exports = router;
