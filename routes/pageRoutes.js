const express = require('express');
const router = express.Router();
const protectPage = require('../middlewares/authPage');
const { renderDashboard } = require('../controllers/pageController');

router.get('/dashboard', protectPage, renderDashboard);

module.exports = router;
