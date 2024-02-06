const crypto = require("crypto");

function generateRandomId(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

module.exports = { generateRandomId };
