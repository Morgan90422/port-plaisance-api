const express = require('express');
const router = express.Router();
const protectPage = require('../middlewares/authPage');
const {
  listUsers,
  newUserForm,
  createUser,
  editUserForm,
  updateUser,
  deleteUser,
} = require('../controllers/dashboardUserController');

router.use(protectPage);

router.get('/', listUsers);
router.get('/new', newUserForm);
router.post('/', createUser);
router.get('/:email', editUserForm);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);

module.exports = router;
