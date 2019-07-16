const express = require('express');
const router = express.Router();

/**
 * @route GET api/auth
 * @description Get logged in user
 * @access Private
 */
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

/**
 * @route POST api/auth
 * @description Authenticate user and send token
 * @access Private
 */
router.post('/', (req, res) => {
  res.send('Authenticate user and send token');
});

module.exports = router;
