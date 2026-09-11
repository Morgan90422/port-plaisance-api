const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;
  const wantsHTML = req.accepts(['html', 'json']) === 'html';

  if (!email || !password) {
    if (wantsHTML) return res.redirect('/?error=missing');
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      if (wantsHTML) return res.redirect('/?error=invalid');
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user._id);

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (wantsHTML) return res.redirect('/dashboard');

    res.status(200).json({
      message: 'Connexion réussie',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    if (wantsHTML) return res.redirect('/?error=server');
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// GET /logout
const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);

  const wantsHTML = req.accepts(['html', 'json']) === 'html';
  if (wantsHTML) return res.redirect('/');

  res.status(200).json({ message: 'Déconnexion réussie' });
};

module.exports = { login, logout };
