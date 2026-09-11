const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

// GET /dashboard/reservations
const listReservations = async (req, res) => {
  const reservations = await Reservation.find().sort({ startDate: -1 });
  res.render('reservations/list', { user: req.user, reservations });
};

// GET /dashboard/reservations/new
const newReservationForm = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.render('reservations/form', {
    user: req.user,
    reservation: null,
    catways,
    error: null,
  });
};

// POST /dashboard/reservations
const createReservation = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      return res.render('reservations/form', {
        user: req.user,
        reservation: req.body,
        catways,
        error: 'Ce catway n’existe pas',
      });
    }

    await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate });
    res.redirect('/dashboard/reservations');
  } catch (error) {
    res.render('reservations/form', {
      user: req.user,
      reservation: req.body,
      catways,
      error: error.message,
    });
  }
};

// GET /dashboard/reservations/:id
const editReservationForm = async (req, res) => {
  const [reservation, catways] = await Promise.all([
    Reservation.findById(req.params.id),
    Catway.find().sort({ catwayNumber: 1 }),
  ]);

  if (!reservation) return res.redirect('/dashboard/reservations');

  res.render('reservations/form', { user: req.user, reservation, catways, error: null });
};

// PUT /dashboard/reservations/:id
const updateReservation = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.redirect('/dashboard/reservations');

    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    reservation.catwayNumber = catwayNumber;
    reservation.clientName = clientName;
    reservation.boatName = boatName;
    reservation.startDate = startDate;
    reservation.endDate = endDate;

    await reservation.save();
    res.redirect('/dashboard/reservations');
  } catch (error) {
    res.render('reservations/form', {
      user: req.user,
      reservation: { ...req.body, _id: req.params.id },
      catways,
      error: error.message,
    });
  }
};

// DELETE /dashboard/reservations/:id
const deleteReservation = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard/reservations');
};

module.exports = {
  listReservations,
  newReservationForm,
  createReservation,
  editReservationForm,
  updateReservation,
  deleteReservation,
};
