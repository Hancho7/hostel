const express = require("express");
const { reset } = require("../../controllers/reset/resetPwd.js");

const router = express.Router();

router.post("/forgotten-password", reset);

module.exports = router;
