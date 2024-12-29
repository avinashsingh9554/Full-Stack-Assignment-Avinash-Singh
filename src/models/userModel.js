const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
  password: { type: String }, // Optional if you later want password-based login
});

module.exports = mongoose.model('User', userSchema);
