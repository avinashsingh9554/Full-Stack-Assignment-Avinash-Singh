const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService');
const bcrypt = require('bcrypt');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);
  res.status(200).json({ message: 'OTP sent to your email' });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp, otpExpires: { $gte: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.otp = undefined; // Clear OTP after successful login
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ token });
};
