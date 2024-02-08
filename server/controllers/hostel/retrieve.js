const Hostel = require("../../models/hostel.js");
const { getFromBucket } = require("../../utils/AWSbucket");
const { AdminUsers } = require("../../models/adminUser");

module.exports = {
  // RETRIEVING ONLY THE NAME AND FIRST PICTURE OF ALL HOSTELS
  retrieveHostelsForHomePage: async (req, res) => {
    try {
      const hostels = await Hostel.find();

      const updatedHostels = [];

      for (let i = 0; i < hostels.length; i++) {
        const hostel = hostels[i];
        const firstImageUrl =
          hostel.images && hostel.images.length > 0 ? hostel.images[0] : null;

        const link = await getFromBucket(firstImageUrl);

        // Create a new hostel object with specific data and the first image URL
        const updatedHostel = {
          _id: hostel._id,
          name: hostel.name,
          firstImageUrl: link, // Include only the first image URL
          address: hostel.address.formattedAddress,
        };

        updatedHostels.push(updatedHostel);
      }

      res.status(200).json({
        status: "success",
        message: "Retrieved all hostels.",
        data: updatedHostels,
        code: 200,
      });
    } catch (error) {
      console.log(`Error in getting hostels from database : ${error}`);
      return res.status(500).json({
        status: "failure",
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  // #########################################################################################
  // USER REQUESTING FOR SPECIFIC HOSTEL
  getSpecificHostelDetails: async (req, res) => {
    const { hostelID } = req.params;
    console.log(hostelID);

    try {
      const hostel = await Hostel.findOne({ _id: hostelID }).populate(
        "fullRooms"
      );

      const manager = await AdminUsers.findOne({ secondID: hostel.adminID });

      const imageKeys = hostel.images;
      const updatedImageUrls = [];

      for (let i = 0; i < imageKeys.length; i++) {
        const link = await getFromBucket(imageKeys[i]);
        updatedImageUrls.push(link);
      }

      const managerProfilePhotoLink = await getFromBucket(
        manager.profilePicture
      );

      //UPDATING THE UPDATED OBJECT WITH THE HOSTEL OBJECT
      const updatedHostel = {
        ...hostel.toObject(),
        name: manager.name,
        email: manager.email,
        imageUrl: updatedImageUrls,
        profilePic: managerProfilePhotoLink,
      };

      res.status(200).json({
        success: true,
        data: updatedHostel,
        message: "Hostel retrieved successfully",
        code: 200,
      });
    } catch (error) {
      console.log(`Error in getting hostel from database : ${error}`);
      res.status(500).json({
        status: "failure",
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  //##############################################################################
  //ADMIN PAGE REQUESTING THE NAME OF HOSTELS ONLY FOR INPUT
  getNamesOfHostelForthisAdmin: async (req, res) => {
    const { secondID } = req.params;
    try {
      const admin = await AdminUsers.findOne({ secondID: secondID });
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid second ID",
        });
      }
      const hostels = await Hostel.findOne({ adminID: secondID });
      if (!hostels) {
        return res.status(404).json({
          status: "Not found",
          message: "No hostels are registered under this admin",
          code: 404,
        });
      }
      const names = [];
      for (hostel in hostels) {
        names.push(hostel.name);
      }
      res.status(200).json({
        status: "success",
        data: names,
        code: 200,
        message: "names retrieved successfully",
      });
    } catch (error) {
      console.log(
        "Error at getting the name of hostels from database : ",
        error
      );
      res.status(500).json({
        status: "Server Error",
        code: 500,
        message: "Something went wrong!",
      });
    }
  },

  //#################################################################################
  // ADMIN REQUESTING FOR HOSTELS
};
