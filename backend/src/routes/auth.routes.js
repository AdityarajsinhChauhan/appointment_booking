const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post("/register", async (req, res, next) => {
  await authController.register(req, res, next);
});

router.post("/login", async (req, res, next) => {
  await authController.login(req, res, next);
});

router.post("/logout", async (req, res, next) => {
  await authController.logout(req, res, next);
});

router.post("/refresh", async (req, res, next) => {
  await authController.refresh(req, res, next);
});


router.get("/", authMiddleware, authController.getAllUsers);

router.get("/health",authMiddleware,authorizeRoles('ADMIN'),authController.getHealth);

router.patch('/update',authMiddleware, async(req,res,next)=>{
  await authController.updateUser(req, res, next)
})

router.put('/password',authMiddleware,async(req, res, next)=>{
  await authController.updatePassword(req, res, next);
})

module.exports = router;
