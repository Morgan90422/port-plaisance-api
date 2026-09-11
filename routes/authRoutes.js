const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion (renvoie un cookie JWT)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Connexion réussie }
 *       401: { description: Identifiants incorrects }
 * /logout:
 *   get:
 *     summary: Déconnexion
 *     tags: [Auth]
 *     responses:
 *       200: { description: Déconnexion réussie }
 */
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
