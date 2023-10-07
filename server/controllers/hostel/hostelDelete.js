import Hostel from "../../models/hostel.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../index.js";

export const hostelDelete = async (req, res) => {
  const { name } = req.body;

  try {
    const hostel = await Hostel.findOne({ name: name });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    const s3Client = new S3Client(s3);
    const deletePromises = [];

    for (const imageUrl of hostel.imageUrl) {
      const imageKey = imageUrl.split("/").pop();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageKey,
      };

      // Add a promise to the array for each object deletion
      deletePromises.push(s3Client.send(new DeleteObjectCommand(params)));
    }

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    // Delete the hostel document from MongoDB
    await Hostel.findByIdAndDelete(hostel._id);

    return res.json({ message: "Hostel details deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
