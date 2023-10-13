import Token from "../../models/token.js";
import Users from "../../models/user.js";

export const newPassword = async (req, res) => {
  const {id, token} = req.params

  try {
    const user = await Users.findOne({_id: id });
    if (!user) {
      res.json("invalid link");
    }

    const verificationToken = await Token.findOne({
      userId: user._id,
      token: token
    });

    if (!verificationToken) {
      res.json("invalid link");
    }
    await Users.updateOne({ _id: user._id }, { password: req.body.password });
    await Token.deleteOne({ _id: verificationToken._id });
    res.json("password updated");
  } catch (error) {
    res.status(500).json("Error occured")
  }
};
