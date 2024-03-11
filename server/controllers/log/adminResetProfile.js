const { AdminUsers } = require("../../models/adminUser.js");

module.exports = {
  retrieveAdminInfo: async (req, res) => {
    try {
      const admin = await AdminUsers.findOne({ email: req.body.email });
    } catch (error) {}
  },
};
