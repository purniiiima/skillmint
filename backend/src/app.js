require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const matchRoutes = require('./routes/matchRoutes');

const app = express();

/* ============================
   MIDDLEWARES
============================ */

// CORS Config
app.use(cors({
  origin: ['http://localhost:3000'], // add production frontend later
  credentials: true
}));

// Body Parser
app.use(express.json());

/* ============================
   DATABASE CONNECTION
============================ */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

/* ============================
   API ROUTES
============================ */

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/match', matchRoutes);

/* ============================
   HEALTH CHECK
============================ */

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 SkillMint API is running'
  });
});

/* ============================
   404 HANDLER
============================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/* ============================
   GLOBAL ERROR HANDLER
============================ */

app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

module.exports = app;
