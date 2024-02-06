const { saveToBucket } = require("../../utils/AWSbucket.js");
const Hostel = require("../../models/hostel.js");
const { AdminUsers } = require("../../models/adminUser.js");

module.exports = {
  pushHostel: async (req, res) => {
    const { name, phone, address, description, prices, adminId } = req.body;
    const { images } = req.files;

    console.log("request body", req.body);
    console.log("request files", req.files);

    try {
      // Find the admin user by their ID
      const admin = await AdminUsers.findOne({ secondID: adminId });

      if (!admin) {
        return res.status(404).json({
          status: "error",
          message: "This user does not exist!",
          code: 404,
        });
      }

      // Create a new Hostel object
      const hostelData = new Hostel({
        name,
        address,
        description,
        prices,
        phone,
        adminId,
      });

      // Upload files to S3 and retrieve the object keys
      const uploadedFiles = await saveToBucket(images);
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({
          status: "Error",
          error: "No files uploaded",
          code: 400,
        });
      }
      uploadedFiles.forEach((file) => {
        hostelData.images.push(file.key); // Save the S3 object key
      });

      // Save the hostel data
      await hostelData.save();
      console.log("Hostel updated with keys:", hostelData);

      return res.status(201).json({
        status: "success",
        message: "Hostel uploaded successfully",
        data: hostelData,
        code: 201,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: null,
        error: "Error uploading hostel",
        message: error.message,
        code: 500,
      });
    }
  },
};
