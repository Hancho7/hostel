import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp"; // Import sharp library
import { s3 } from "../../index.js";

export default async function saveToBucket(files) {
  const uploadedFiles = [];

  try {
    for (const file of files) {
      if (!Buffer.isBuffer(file.buffer)) {
        throw new Error("Invalid file buffer");
      }

      // Use sharp to resize the image to the desired dimensions
      const resizedImageBuffer = await sharp(file.buffer)
        .resize(1080, 1928) // Set the width and height
        .toBuffer();

      const uploadFileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.originalname,
        Body: resizedImageBuffer, // Use the resized image buffer
      };

      const putObjectCommand = new PutObjectCommand(uploadFileParams);
      await s3.send(putObjectCommand);

      uploadedFiles.push({
        key: file.originalname, // Save the S3 object key
      });
    }

    return uploadedFiles;
  } catch (error) {
    throw error;
  }
}
