const Catway = require('../models/Catway');

// GET /catways
const getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// GET /catways/:id
const getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// POST /catways
const createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    res.status(201).json(catway);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ce numéro de catway existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// PUT /catways/:id
const updateCatwayState = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    if (!req.body.catwayState) {
      return res.status(400).json({ message: 'Le champ catwayState est requis' });
    }

    catway.catwayState = req.body.catwayState;
    await catway.save();

    res.status(200).json(catway);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// DELETE /catways/:id
const deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatwayState,
  deleteCatway,
};
