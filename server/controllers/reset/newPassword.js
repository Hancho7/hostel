import Users from "../../models/user.js";
import Token from "../../models/token.js";
import bcrypt from "bcrypt";

export const newPassword = async (req, res) => {
  const { id, token, password } = req.body;
  console.log('id', id)
  console.log('token', token)
  console.log('password', password)

  try {
    const user = await Users.findOne({ _id: id });
    if (!user) {
      return res.status(400).json("Invalid link: User not found");
    }

    const verificationToken = await Token.findOne({
      userId: user._id,
      token: token,
    });

    if (!verificationToken) {
      return res.status(400).json("Invalid link: Token not found");
    }

    // Add logging to check the value of req.body.password
    console.log("New password:", password);

    user.password = password;

    const updated = await user.save();

    if (!updated) {
      return res.status(500).json("Error updating password");
    }

    await Token.deleteOne({ _id: verificationToken._id });
    return res.json("Password updated");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Error occurred");
  }
};
