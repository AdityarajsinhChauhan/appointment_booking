const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/provider', require('./provider.routes'));

module.exports = router;