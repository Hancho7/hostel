const Staff = require("../../models/staffs");
const Hostel = require("../../models/hostel");
const { AdminUsers } = require("../../models/adminUser");
const {
  saveToBucket,
  getFromBucket,
  deleteFromBucket,
} = require("../../utils/AWSbucket");

// Create and Save a new Staff
module.exports = {
  addNewStaff: async (req, res) => {
    const { name, hostel, admin, email, contact, role, password } = req.body;
    const { ProfilePicture } = req.file;
    if (
      !name ||
      !hostel ||
      !admin ||
      !email ||
      !contact ||
      !role ||
      !password ||
      !ProfilePicture
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
        code: 400,
      });
    }
    try {
      const admin = await AdminUsers.findById(admin);
      if (!admin) {
        return res.status(404).json({
          status: "error",
          message: "Admin not found",
          code: 404,
        });
      }

      const hostel = await Hostel.findById(hostel);
      if (!hostel) {
        return res.status(404).json({
          status: "error",
          message: "Hostel not found",
          code: 404,
        });
      }

      const staff = await Staff.findOne({ email: email });
      if (staff) {
        return res.status(409).json({
          status: "error",
          message: "Staff already exists",
          code: 409,
        });
      }

      const uploadedProfilePicture = await saveToBucket(ProfilePicture);
      if (!uploadedProfilePicture) {
        return res.status(500).json({
          status: "error",
          message: "Image upload failed",
          code: 500,
        });
      }
      const newStaff = new Staff({
        name,
        hostel,
        admin,
        email,
        contact,
        role,
        password,
        profilePicture: uploadedProfilePicture,
      });
      await newStaff.save();
      res.status(201).json({
        status: "success",
        message: "Staff added successfully",
        code: 201,
      });
    } catch (error) {
      console.error("Add Staff Error:", error);
      if (error instanceof Error) {
        return res.status(500).json({
          status: "error",
          message: error.message,
          code: 500,
        });
      }
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },

  // Retrieve and return all staffs from the database.
  getAllStaffs: async (req, res) => {
    const { adminID } = req.params;
    try {
      const admin = await AdminUsers.findById(adminID);
      if (!admin) {
        return res.status(404).json({
          status: "error",
          message: "Admin not found",
          code: 404,
        });
      }
      const staffs = await Staff.find({ admin: adminID });
      if (!staffs) {
        return res.status(404).json({
          status: "error",
          message: "Staff not found",
          code: 404,
        });
      }

      const updatedStaffs = [];

      for (let i = 0; i < staffs.length; i++) {
        const staff = staffs[i];
        const profilePicture = await getFromBucket(staff.profilePicture);
        const updatedStaff = {
          ...staff._doc,
          profilePicture: profilePicture,
        };
        updatedStaffs.push(updatedStaff);
      }
      res.status(200).json({
        status: "success",
        message: "Staffs retrieved successfully",
        code: 200,
        data: updatedStaffs,
      });
    } catch (error) {
      console.error("Get Staffs Error:", error);
      if (error instanceof Error) {
        return res.status(500).json({
          status: "error",
          message: error.message,
          code: 500,
        });
      }
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },

  //Delete a staff with the specified staffId in the request
  deleteStaff: async (req, res) => {
    const { staffID } = req.params;
    try {
      const staff = await Staff.find(staffID);
      if (!staff) {
        return res.status(404).json({
          status: "error",
          message: "Staff not found",
          code: 404,
        });
      }

      // Delete image from S3 bucket
      const deletedStaffPofilePicture = await deleteFromBucket(
        staff.profilePicture
      );
      if (deletedStaffPofilePicture) {
        console.log("Staff profile picture deleted successfully");
      }
      await Staff.remove(staffID);

      res.status(200).json({
        status: "success",
        message: "Staff deleted successfully",
        code: 200,
      });
    } catch (error) {
      console.error("Delete Staff Error:", error);
      if (error instanceof Error) {
        return res.status(500).json({
          status: "error",
          message: error.message,
          code: 500,
        });
      }
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },
};
