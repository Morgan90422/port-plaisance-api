const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'],
    unique: true,
  },
  catwayType: {
    type: String,
    required: [true, 'Le type de catway est obligatoire'],
    enum: {
      values: ['long', 'short'],
      message: 'Le type doit être "long" ou "short"',
    },
  },
  catwayState: {
    type: String,
    required: [true, "L'état du catway est obligatoire"],
    trim: true,
  },
});

module.exports = mongoose.model('Catway', catwaySchema);
