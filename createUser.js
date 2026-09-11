require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB();

const [, , username, email, password] = process.argv;

const createUser = async () => {
  if (!username || !email || !password) {
    console.log('Utilisation : node createUser.js <username> <email> <password>');
    process.exit(1);
  }

  try {
    const user = await User.create({ username, email, password });
    console.log(`✅ Utilisateur créé : ${user.email}`);
    process.exit();
  } catch (error) {
    console.error('❌ Erreur création utilisateur :', error.message);
    process.exit(1);
  }
};

createUser();