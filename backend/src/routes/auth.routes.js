const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',async ( req, res, next) => {
    await authController.register( req, res, next )
});

router.post('/login',async ( req, res, next) => {
    await authController.login( req, res, next )
});

router.post('/logout',authMiddleware , async ( req, res, next) => {
    await authController.logout( req, res, next )
});

router.post('/refresh',async ( req, res, next) => {
    await authController.refresh( req, res, next )
});

router.get('/me',authMiddleware, (req,res) => {
    res.json({
        message:"protected route success",
        user:req.user
    });
});

module.exports = router;

