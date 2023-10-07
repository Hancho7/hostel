import Hostel from "../../models/hostel.js";
import { s3 } from "../../index.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    const updatedHostels = [];

    for (let i = 0; i < hostels.length; i++) {
      const hostel = hostels[i];
      const imageUrls = hostel.imageUrl;
      const updatedImageUrls = [];

      for (let j = 0; j < imageUrls.length; j++) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: imageUrls[j],
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

      updatedHostels.push(updatedHostel);
    }

    res.status(200).json(updatedHostels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
