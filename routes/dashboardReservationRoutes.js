const express = require('express');
const router = express.Router();
const protectPage = require('../middlewares/authPage');
const {
  listReservations,
  newReservationForm,
  createReservation,
  editReservationForm,
  updateReservation,
  deleteReservation,
} = require('../controllers/dashboardReservationController');

router.use(protectPage);

router.get('/', listReservations);
router.get('/new', newReservationForm);
router.post('/', createReservation);
router.get('/:id', editReservationForm);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

module.exports = router;
