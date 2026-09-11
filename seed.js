require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');

connectDB();

// Lecture des fichiers JSON fournis
const catways = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'catways.json'), 'utf-8')
);
const reservations = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'reservations.json'), 'utf-8')
);

const importData = async () => {
  try {
    await Catway.deleteMany();       // on vide la collection avant d'importer
    await Reservation.deleteMany();

    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log('✅ Données importées avec succès');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur import :', error.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Catway.deleteMany();
    await Reservation.deleteMany();
    console.log('🗑️  Données supprimées');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur suppression :', error.message);
    process.exit(1);
  }
};

// On choisit l'action selon l'argument passé en ligne de commande
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Utilise : node seed.js -i (importer) ou node seed.js -d (supprimer)');
  process.exit();
}