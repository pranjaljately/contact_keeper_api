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
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    /**
     * Could do - Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
     * The $set operator replaces the value of a field with the specified value.
     * By default, if you don't include any update operators in doc, Mongoose will wrap doc in $set for you.
     * new: bool - true to return the modified document rather than the original. defaults to false
     */
    contact = await Contact.findByIdAndUpdate(req.params.id, contactFields, {
      new: true,
    });
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

/**
 * @route DELETE api/contacts/:id
 * @description Delete contact
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;
