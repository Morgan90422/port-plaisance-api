require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Routes API (JSON)
const authRoutes = require('./routes/authRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes pages (EJS / dashboard)
const pageRoutes = require('./routes/pageRoutes');
const dashboardCatwayRoutes = require('./routes/dashboardCatwayRoutes');
const dashboardReservationRoutes = require('./routes/dashboardReservationRoutes');
const dashboardUserRoutes = require('./routes/dashboardUserRoutes');

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares globaux
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', { error: req.query.error || null });
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth (login/logout)
app.use('/', authRoutes);

// Pages du dashboard
app.use('/', pageRoutes);
app.use('/dashboard/catways', dashboardCatwayRoutes);
app.use('/dashboard/reservations', dashboardReservationRoutes);
app.use('/dashboard/users', dashboardUserRoutes);

// API REST (JSON)
app.use('/catways', catwayRoutes);
app.use('/users', userRoutes);

// 404 — aucune route ne correspond
app.use((req, res) => {
  const wantsHTML = req.accepts(['html', 'json']) === 'html';
  if (wantsHTML) {
    return res.status(404).render('error', { code: 404, message: 'Page introuvable' });
  }
  res.status(404).json({ message: 'Route introuvable' });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  const wantsHTML = req.accepts(['html', 'json']) === 'html';
  if (wantsHTML) {
    return res.status(500).render('error', { code: 500, message: 'Une erreur interne est survenue' });
  }
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
