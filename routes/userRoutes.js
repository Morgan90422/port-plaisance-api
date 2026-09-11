const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs de la capitainerie
 *
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200: { description: Liste des utilisateurs }
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string, minLength: 6 }
 *     responses:
 *       201: { description: Utilisateur créé }
 *       409: { description: Email déjà utilisé }
 *
 * /users/{email}:
 *   get:
 *     summary: Détail d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Détail de l'utilisateur }
 *       404: { description: Utilisateur introuvable }
 *   put:
 *     summary: Modifie un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Utilisateur mis à jour }
 *       404: { description: Utilisateur introuvable }
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Utilisateur supprimé }
 *       404: { description: Utilisateur introuvable }
 */
router.use(protect);

router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.post('/', createUser);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);

module.exports = router;
