const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { check, validationResult } = require('express-validator');

/**
 * @route POST api/users
 * @description Register a user
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Please enter a name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send('Passed');
  }
);

module.exports = router;
