const express = require("express");
const { route } = require("./auth.routes");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/provider", require("./provider.routes"));
router.use("/appointment", require("./appointments.routes"));
router.use("/slot", require("./slot.routes"));

module.exports = router;
