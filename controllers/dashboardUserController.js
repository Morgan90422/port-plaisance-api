const User = require('../models/User');

// GET /dashboard/users
const listUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ username: 1 });
  res.render('users/list', { user: req.user, users });
};

// GET /dashboard/users/new
const newUserForm = (req, res) => {
  res.render('users/form', { user: req.user, editUser: null, error: null });
};

// POST /dashboard/users
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.redirect('/dashboard/users');
  } catch (error) {
    const message =
      error.code === 11000 ? 'Cet email est déjà utilisé' : error.message;
    res.render('users/form', { user: req.user, editUser: req.body, error: message });
  }
};

// GET /dashboard/users/:email
const editUserForm = async (req, res) => {
  const editUser = await User.findOne({ email: req.params.email }).select('-password');
  if (!editUser) return res.redirect('/dashboard/users');
  res.render('users/form', { user: req.user, editUser, error: null });
};

// PUT /dashboard/users/:email
const updateUser = async (req, res) => {
  try {
    const targetUser = await User.findOne({ email: req.params.email });
    if (!targetUser) return res.redirect('/dashboard/users');

    const { username, email, password } = req.body;

    if (username) targetUser.username = username;
    if (email) targetUser.email = email;
    if (password) targetUser.password = password;

    await targetUser.save();
    res.redirect('/dashboard/users');
  } catch (error) {
    const message =
      error.code === 11000 ? 'Cet email est déjà utilisé' : error.message;
    res.render('users/form', {
      user: req.user,
      editUser: { ...req.body, email: req.params.email },
      error: message,
    });
  }
};

// DELETE /dashboard/users/:email
const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });

  if (req.user.email === req.params.email) {
    res.clearCookie(process.env.COOKIE_NAME);
    return res.redirect('/');
  }

  res.redirect('/dashboard/users');
};

module.exports = {
  listUsers,
  newUserForm,
  createUser,
  editUserForm,
  updateUser,
  deleteUser,
};
