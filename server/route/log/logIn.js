const express = require("express");
const { logIn } = require("../../controllers/log/logIn.js");

const router = express.Router();

router.post("/log-In", logIn);

module.exports = router;
