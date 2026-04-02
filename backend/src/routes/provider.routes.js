const express = require('express')
const router = express.Router();

const providerController = require('../controllers/provider.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.post('/create',
    authMiddleware,
    authorizeRoles('ADMIN'),
    ( req, res, next ) => providerController.createProvider( req, res, next)
 );

 module.exports = router;