const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slot.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post(
  "/create",
  authMiddleware,
  authorizeRoles("PROVIDER"),
  (req, res, next) => slotController.createSlot(req, res, next),
);

router.post(
  "/create/bulk",
  authMiddleware,
  authorizeRoles("PROVIDER"),
  (req, res, next) => slotController.createBulkSlots(req, res, next),
);

// routes/slot.routes.js

router.get("/bydate", authMiddleware, slotController.getSlotsByDate);

module.exports = router;
