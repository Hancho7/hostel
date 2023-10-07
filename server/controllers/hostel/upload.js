import multer from "multer";
import saveToBucket from "./saveToBucket.js";
import Hostel from "../../models/hostel.js";

export const mult = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 4, // Only allow 4 images to be uploaded
  },
});

export const upload = async (req, res) => {
    const { name, location, hostelDescription, prices, phone } = req.body;

    try {
      // Create a new Hostel object
      const hostelData = new Hostel({
        name: name,
        location: location,
        hostelDescription: hostelDescription,
        prices: [],
        phone: phone,
      });
  
      // Upload files to S3 and retrieve the object keys
      const uploadedFiles = await saveToBucket(req.files);
      uploadedFiles.forEach((file) => {
        hostelData.imageUrl.push(file.key); // Save the S3 object key
      });
  
      // Save the hostel data
      await hostelData.save();
      console.log("Hostel updated with keys:", hostelData);
  
      res.status(200).json({
        message: "Hostel uploaded successfully",
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error uploading hostel",
        error: error.message,
      });
    }
};
