const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

/**
 * @route GET api/contacts
 * @description Get all contacts for user
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: 'desc',
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route POST api/contacts
 * @description Add new contact
 * @access Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'A valid email is required').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error.' });
    }
  }
);

/**
 * @route PUT api/contacts/:id
 * @description Update contact
 * @access Private
 */
router.put('/:id', auth, (req, res) => {
  res.send('Update contact');
});

/**
 * @route DELETE api/contacts/:id
 * @description Delete contact
 * @access Private
 */
router.delete('/:id', auth, (req, res) => {
  res.send('Update contact');
});

module.exports = router;
