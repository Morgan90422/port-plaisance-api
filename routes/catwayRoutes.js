const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatwayState,
  deleteCatway,
} = require('../controllers/catwayController');
const reservationRoutes = require('./reservationRoutes');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 *
 * /catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200: { description: Liste des catways }
 *   post:
 *     summary: Crée un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [catwayNumber, catwayType, catwayState]
 *             properties:
 *               catwayNumber: { type: integer }
 *               catwayType: { type: string, enum: [long, short] }
 *               catwayState: { type: string }
 *     responses:
 *       201: { description: Catway créé }
 *       400: { description: Données invalides }
 *       409: { description: Numéro déjà existant }
 *
 * /catways/{id}:
 *   get:
 *     summary: Détail d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Numéro du catway
 *     responses:
 *       200: { description: Détail du catway }
 *       404: { description: Catway introuvable }
 *   put:
 *     summary: Modifie l'état d'un catway (numéro et type non modifiables)
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState: { type: string }
 *     responses:
 *       200: { description: Catway mis à jour }
 *       404: { description: Catway introuvable }
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Catway supprimé }
 *       404: { description: Catway introuvable }
 */
router.use(protect);

router.get('/', getAllCatways);
router.get('/:id', getCatwayById);
router.post('/', createCatway);
router.put('/:id', updateCatwayState);
router.delete('/:id', deleteCatway);

router.use('/:id/reservations', reservationRoutes);

module.exports = router;
