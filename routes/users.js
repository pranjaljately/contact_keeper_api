const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({ msg: 'Email already in use.' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error.' });
    }
  }
);

module.exports = router;
