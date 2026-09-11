const Catway = require('../models/Catway');

// GET /dashboard/catways
const listCatways = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.render('catways/list', { user: req.user, catways });
};

// GET /dashboard/catways/new
const newCatwayForm = (req, res) => {
  res.render('catways/form', { user: req.user, catway: null, error: null });
};

// POST /dashboard/catways
const createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    await Catway.create({ catwayNumber, catwayType, catwayState });
    res.redirect('/dashboard/catways');
  } catch (error) {
    const message =
      error.code === 11000 ? 'Ce numéro de catway existe déjà' : error.message;
    res.render('catways/form', { user: req.user, catway: req.body, error: message });
  }
};

// GET /dashboard/catways/:id
const editCatwayForm = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.redirect('/dashboard/catways');
  res.render('catways/form', { user: req.user, catway, error: null });
};

// PUT /dashboard/catways/:id
const updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.redirect('/dashboard/catways');

    catway.catwayState = req.body.catwayState;
    await catway.save();

    res.redirect('/dashboard/catways');
  } catch (error) {
    res.render('catways/form', {
      user: req.user,
      catway: { ...req.body, catwayNumber: req.params.id },
      error: error.message,
    });
  }
};

// DELETE /dashboard/catways/:id
const deleteCatway = async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  res.redirect('/dashboard/catways');
};

module.exports = {
  listCatways,
  newCatwayForm,
  createCatway,
  editCatwayForm,
  updateCatway,
  deleteCatway,
};
