const { UserToken, AdminToken } = require("../models/token.js");
const AdminUsers = require("../models/adminUser.js");
const { Users } = require("../models/user.js");

// Function to delete users with expired tokens
const deleteExpiredUsers = async () => {
  try {
    const expiredTokens = await UserToken.find({ expiresAt: { $lte: new Date() } });

    for (const token of expiredTokens) {
      // Delete the associated user
      await Users.deleteOne({ _id: token.userId });

      // Delete the token
      await UserToken.deleteOne({ _id: token._id });
    }

    const expiredAdminTokens = await AdminToken.find({ expiresAt: { $lte: new Date() } });

    for (const adminToken of expiredAdminTokens) {
      // Delete the associated admin user
      await AdminUsers.deleteOne({ _id: adminToken.userId });

      // Delete the admin token
      await AdminToken.deleteOne({ _id: adminToken._id });
    }

    console.log("Expired users and admin users deleted successfully.");
  } catch (error) {
    console.error("Error deleting expired users:", error);
  }
};

module.exports = deleteExpiredUsers;
