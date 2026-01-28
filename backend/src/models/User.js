const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  skillsOffered: { type: [String], default: [] },
  skillsWanted: { type: [String], default: [] },
  github: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
