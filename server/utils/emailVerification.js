const verifyEmail = async (id, token, userModel, tokenModel) => {
  try {
    // Find the user in the database based on userId
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return {
        status: "not found",
        message: "User not found!",
        code: 404,
      };
    } else if (user.verified) {
      return {
        status: "error",
        message: "User is already verified!",
        code: 409,
      };
    } else {
      // Find the associated verification token and validate it
      const verificationToken = await tokenModel.findOne({
        userId: user._id,
        token,
      });

      if (!verificationToken) {
        return {
          status: "error",
          message: "Invalid token or token expired!",
          code: 400,
        };
      } else {
        // Mark the user as verified and delete the verification token
        await userModel.updateOne({ _id: user._id }, { verified: true });
        await tokenModel.deleteOne({ _id: verificationToken._id });
        return {
          status: "success",
          message: "Email verification successful!",
          code: 200,
        };
      }
    }
  } catch (e) {
    console.log(e);

    // Handle errors
    return {
      status: "error",
      message: e.message,
      code: 500,
    };
  }
};

module.exports = verifyEmail;
