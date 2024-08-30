import express from 'express';
import { getPossessions, createPossession, updatePossession, closePossession } from '../controllers/possessionController.js';

const router = express.Router();

router.get('/', getPossessions);
router.post('/', createPossession);
router.put('/:libelle', updatePossession);
router.post('/:libelle/close', closePossession);

export default router;
