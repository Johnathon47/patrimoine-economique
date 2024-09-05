import express from 'express';
import { getPossessions, createPossession, updatePossession, closePossession, getPossessionByLibelle, deletePossession } from '../controllers/possessionController.js';

const router = express.Router();

router.get('/', getPossessions);
router.post('/', createPossession);
router.get('/:libelle', getPossessionByLibelle);
router.patch('/:libelle', updatePossession);
router.post('/:libelle/close', closePossession);
router.delete('/:libelle', deletePossession);

export default router;
