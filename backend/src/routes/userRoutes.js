const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/userController');
const { body } = require('express-validator');

/* ============================
   GET USER PROFILE
============================ */
router.get('/me', auth, getProfile);


/* ============================
   UPDATE USER PROFILE
============================ */
router.put(
  '/me',
  auth,
  [
    body('name')
      .optional()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),

    body('email')
      .optional()
      .isEmail()
      .withMessage('Enter a valid email'),

    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  updateProfile
);

module.exports = router;
