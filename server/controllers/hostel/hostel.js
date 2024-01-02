import Hostel from "../../models/hostel.js";
import { s3 } from "../../index.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import Users from "../../models/user.js";


// HOME REQUESTING FOR THE HOSTELS IMAGE AND DESCRIPTION
export const homeGetHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    const updatedHostels = [];

    for (let i = 0; i < hostels.length; i++) {
      const hostel = hostels[i];
      const firstImageUrl = hostel.imageUrl[0]; // Retrieve only the first image URL

      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: firstImageUrl,
      };
      const command = new GetObjectCommand(getObjectParams);
      const link = await getSignedUrl(s3, command, { expiresIn: 3600 });

      // Create a new hostel object with specific data and the first image URL
      const updatedHostel = {
        _id: hostel._id,
        name: hostel.name,
        firstImageUrl: link, // Include only the first image URL
      };

      updatedHostels.push(updatedHostel);
    }

    res.status(200).json(updatedHostels);
  } catch (error) {
    console.error("Error in getHostelsWithFirstImage:", error);
    res.status(500).json({ message: error.message });
  }
};
// #########################################################################

// USER REQUESTING FOR SPECIFIC HOSTEL
export const getHostel = async (req, res) => {
  const { hostelID } = req.params;
  console.log(hostelID);

  try {
    const hostel = await Hostel.findOne({ _id: hostelID })
      .populate({
        path: "admin", // Populate the 'admin' field
        select: "firstName lastName email phone", // Select the fields you want to populate
      })
      .populate("fullRooms");

    const imageUrls = hostel.imageUrl;
    const updatedImageUrls = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageUrls[i],
      };
      const command = new GetObjectCommand(getObjectParams);
      const link = await getSignedUrl(s3, command, { expiresIn: 3600 }); // Expires in one day (86400 seconds)

      updatedImageUrls.push(link);
    }

    // Create a new hostel object with updated imageUrls
    const updatedHostel = {
      ...hostel.toObject(),
      imageUrl: updatedImageUrls,
    };

    res.status(200).json(updatedHostel);
  } catch (error) {
    console.error("Error in getHostels:", error);
    res.status(500).json({ message: error.message });
  }
};

// ADMIN REQUESTING FOR HOSTELS
export const adminGetHostels = async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await Users.findOne({ _id: userID });

    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const allowedRoles = ["manager"]; // Add other allowed roles if needed
    if (!allowedRoles.includes(user.role)) {
      return res.status(400).json("You are not authorized to view hostels");
    }

    // Get the admin's own hostels
    const adminHostels = await Hostel.find({ admin: user._id });

    // Count the admin's own hostels
    const adminHostelsCount = adminHostels.length;

    // Get the total count of hostels
    const totalHostelsCount = await Hostel.countDocuments();

    const updatedAdminHostels = [];

    for (let i = 0; i < adminHostels.length; i++) {
      const hostel = adminHostels[i];
      const imageUrls = hostel.imageUrl;
      const updatedImageUrls = [];

      for (let j = 0; j < imageUrls.length; j++) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: imageUrls[j],
        };
        const command = new GetObjectCommand(getObjectParams);
        const link = await getSignedUrl(s3, command, { expiresIn: 3600 });

        updatedImageUrls.push(link);
      }

      const updatedHostel = {
        ...hostel.toObject(),
        imageUrl: updatedImageUrls,
      };

      updatedAdminHostels.push(updatedHostel);
    }

    const response = {
      adminHostels: updatedAdminHostels,
      adminHostelsCount,
      totalHostelsCount,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("Server error");
  }
};
