const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

// GET /catways/:id/reservations
const getAllReservations = async (req, res) => {
  try {
    const catwayNumber = req.params.id;
    const reservations = await Reservation.find({ catwayNumber });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// GET /catways/:id/reservations/:idReservation
const getReservationById = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    const reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: id,
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// POST /catways/:id/reservations
const createReservation = async (req, res) => {
  try {
    const catwayNumber = req.params.id;

    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    const { clientName, boatName, startDate, endDate } = req.body;

    const reservation = await Reservation.create({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });

    res.status(201).json(reservation);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// PUT /catways/:id/reservations/:idReservation
const updateReservation = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    const reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: id,
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    const { clientName, boatName, startDate, endDate } = req.body;

    if (clientName) reservation.clientName = clientName;
    if (boatName) reservation.boatName = boatName;
    if (startDate) reservation.startDate = startDate;
    if (endDate) reservation.endDate = endDate;

    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// DELETE /catways/:id/reservations/:idReservation
const deleteReservation = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    const reservation = await Reservation.findOneAndDelete({
      _id: idReservation,
      catwayNumber: id,
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
