import Token from "../../models/token.js";
import Users from "../../models/user.js";

export const verifyEmail = async (req, res) => {
  try {
    // Parse userId and token from request parameters
    const { id, token } = req.params;


    // Find the user in the database based on userId
    const user = await Users.findOne({_id: id})
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (user.verified) {
      return res.json({ message: "User is already verified" });
    }

    // Find the associated verification token and validate it
    const verificationToken = await Token.findOne({
      userId: user._id,
      token,
    });
    console.log(verificationToken)

    if (!verificationToken) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired" });
    }

    // Mark the user as verified and delete the verification token
    await Users.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteOne({ _id: token._id });

    return res.json({ message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred during email verification" });
  }
};
