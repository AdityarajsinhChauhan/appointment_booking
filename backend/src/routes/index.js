const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/provider', require('./provider.routes'));
router.use('/appointment', require('./appointments.routes'));

module.exports = router;