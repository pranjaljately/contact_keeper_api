const express = require('express');
const router = express.Router();

/**
 * @route GET api/contacts
 * @description Get all contacts for user
 * @access Private
 */
router.get('/', (req, res) => {
  res.send('Get all contacts for user');
});

/**
 * @route POST api/contacts
 * @description Add new contact
 * @access Private
 */
router.post('/', (req, res) => {
  res.send('Add new contact');
});

/**
 * @route PUT api/contacts/:id
 * @description Update contact
 * @access Private
 */
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

/**
 * @route DELETE api/contacts/:id
 * @description Delete contact
 * @access Private
 */
router.delete('/:id', (req, res) => {
  res.send('Update contact');
});

module.exports = router;
