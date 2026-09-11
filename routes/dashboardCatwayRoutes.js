const express = require('express');
const router = express.Router();
const protectPage = require('../middlewares/authPage');
const {
  listCatways,
  newCatwayForm,
  createCatway,
  editCatwayForm,
  updateCatway,
  deleteCatway,
} = require('../controllers/dashboardCatwayController');

router.use(protectPage);

router.get('/', listCatways);
router.get('/new', newCatwayForm);
router.post('/', createCatway);
router.get('/:id', editCatwayForm);
router.put('/:id', updateCatway);
router.delete('/:id', deleteCatway);

module.exports = router;
