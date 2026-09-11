const Reservation = require('../models/Reservation');

// GET /dashboard
const renderDashboard = async (req, res) => {
  try {
    const now = new Date();

    const currentReservations = await Reservation.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ endDate: 1 });

    res.render('dashboard', {
      user: req.user,
      today: now,
      reservations: currentReservations,
    });
  } catch (error) {
    res.status(500).send('Erreur lors du chargement du tableau de bord');
  }
};

module.exports = { renderDashboard };
