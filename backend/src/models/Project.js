const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requiredSkills: { type: [String], default: [] },
  offeredSkills: { type: [String], default: [] },
  applicants: [
    { 
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      proposal: String, 
      createdAt: { type: Date, default: Date.now } 
    }
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  status: { type: String, enum: ['open','in_progress','completed','cancelled'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
