const Users = require("../../models/user.js");
const Token = require("../../models/token.js");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/sendEmail.js");

module.exports = {
  reset: async (req, res) => {
    console.log("request body", req.body);
    const { email } = req.body;

    console.log(email);
    try {
      const user = await Users.findOne({ email: email });
      if (!user) {
        return res.json("User not found");
      }

      console.log(user);
      // CREATING THE TOKEN USING CRYPTO USING USER-ID AS TOKEN-ID
      const token = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });

      // CREATING THE URL LINK FOR USER TO VERIFY E-MAIL
      const url = `${process.env.FRONT_END_URL}/forgotten-password/${user._id}/verify/${token.token}`;
      console.log("url:", url);
      const emailSent = await sendEmail(
        user.email,
        "reset password",
        "verificationEmail.ejs",
        { firstName: user.firstName, verificationLink: url }
      );
      if (emailSent === "sendEmailError") {
        return res.json("emailNotSent");
      } else {
        await token.save();
        return res.json("checkEmail"); // Inform the user to check their email for verification
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json("error occurred: " + error.message);
    }
  },
};
