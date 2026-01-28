const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { suggest } = require('../controllers/matchController');

router.get('/suggest', auth, suggest);

module.exports = router;
