const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactUsCotroller');

// POST route to submit the contact form
router.post('/contact-us', contactController.Contactus);

module.exports = router;