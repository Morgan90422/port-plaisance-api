const express = require('express');
const router = express.Router({ mergeParams: true });
const protect = require('../middlewares/auth');
const {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservationController');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations (sous-ressource d'un catway)
 *
 * /catways/{id}/reservations:
 *   get:
 *     summary: Liste les réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Numéro du catway
 *     responses:
 *       200: { description: Liste des réservations }
 *   post:
 *     summary: Crée une réservation sur un catway
 *     tags: [Reservations]
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
 *             required: [clientName, boatName, startDate, endDate]
 *             properties:
 *               clientName: { type: string }
 *               boatName: { type: string }
 *               startDate: { type: string, format: date-time }
 *               endDate: { type: string, format: date-time }
 *     responses:
 *       201: { description: Réservation créée }
 *       404: { description: Catway introuvable }
 *
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Détail d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Détail de la réservation }
 *       404: { description: Réservation introuvable }
 *   put:
 *     summary: Modifie une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Réservation mise à jour }
 *       404: { description: Réservation introuvable }
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Réservation supprimée }
 *       404: { description: Réservation introuvable }
 */
router.use(protect);

router.get('/', getAllReservations);
router.get('/:idReservation', getReservationById);
router.post('/', createReservation);
router.put('/:idReservation', updateReservation);
router.delete('/:idReservation', deleteReservation);

module.exports = router;
