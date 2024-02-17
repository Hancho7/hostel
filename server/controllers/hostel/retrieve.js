const Hostel = require("../../models/hostel.js");
const { getFromBucket } = require("../../utils/AWSbucket");
const { AdminUsers } = require("../../models/adminUser");

module.exports = {
  // RETRIEVING ONLY THE NAME AND FIRST PICTURE OF ALL HOSTELS
  retrieveHostelsForHomePage: async (req, res) => {
    try {
      const hostels = await Hostel.find().limit(8);

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

  //#########################################################################################
  //retrieve all hostels for the users page
  retrieveAllHostels: async (req, res) => {
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

  // USER SEARCH FOR SPECIFIC HOSTEL THROUGH SEARCH BAR
  userSearchHostels: async function (req, res) {
    const query = req.query.searchQuery;

    if (!query || typeof query !== "string") {
      return res.status(400).send("Invalid request");
    }

    let filterObj = {};
    if (req.query.accommodationType) {
      filterObj["accommodationType"] = req.query.accommodationType;
    }

    try {
      // Perform text search using $text operator
      const results = await Hostel.find(
        { $text: { $search: query } },
        filterObj
      );

      if (results.length === 0) {
        return res.status(404).json({
          status: "failure",
          message: `No hostels found for the given search criteria`,
          code: 404,
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: `Search successful`,
          data: results,
          code: 200,
        });
      }
    } catch (err) {
      console.log(`Error in searching hostels : ${err}`);
      return res.status(500).json({
        status: "server_error",
        message: "Internal server error",
        error: err.message,
        code: 500,
      });
    }
  },

  // #########################################################################################
  // USER REQUESTING FOR SPECIFIC HOSTEL
  getSpecificHostelDetails: async (req, res) => {
    console.log(req.params);
    const { hostelID } = req.params;
    console.log(hostelID);

    try {
      const hostel = await Hostel.findOne({ _id: hostelID })
        .populate({
          path: "rooms", // optional: exclude the __v field
        })
        .exec();

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
        imageUrl: updatedImageUrls,
        manager: {
          name: manager.name,
          email: manager.email,
          profilePic: managerProfilePhotoLink || null,
        },
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
      const hostels = await Hostel.find({ adminID: secondID });
      console.log("hostels", hostels);
      if (!hostels) {
        return res.status(404).json({
          status: "Not found",
          message: "No hostels are registered under this admin",
          code: 404,
        });
      }
      const names = [];
      for (let i = 0; i < hostels.length; i++) {
        const hostel = hostels[i];
        names.push(hostel.name);
      }
      console.log("names", names);
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
  // ADMIN REQUESTING FOR HOSTEL NAMES FOR ROOMS INPUT
};
