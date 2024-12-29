const mongoose = require('mongoose');

const layoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardOrder: { type: [String], required: true }, // Array of card IDs or layout positions
});

module.exports = mongoose.model('Layout', layoutSchema);
