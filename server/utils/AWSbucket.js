const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require("sharp"); // const sharp library
const handleResponse = require("./response.js");
const { s3 } = require("./s3bucket.js");

module.exports = {
  saveToBucket: async (files) => {
    const uploadedFiles = [];
    console.log("files in the save bucket\n\n", files);

    try {
      // Ensure that files is an object and not an array
      const filesObject =
        typeof files === "object" && !Array.isArray(files)
          ? files
          : { files: Array.isArray(files) ? files : [files] };
      console.log("filesObject", filesObject);

      for (const fieldname in filesObject) {
        const fileList = filesObject[fieldname];

        for (const file of fileList) {
          if (!file || !Buffer.isBuffer(file.buffer)) {
            throw new Error(`Invalid file buffer for field ${fieldname}`);
          }

          const resizedImageBuffer = await sharp(file.buffer)
            .resize(720, 540)
            .toBuffer();

          const uploadFileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.originalname,
            Body: resizedImageBuffer,
          };

          const putObjectCommand = new PutObjectCommand(uploadFileParams);
          await s3.send(putObjectCommand);

          uploadedFiles.push({
            key: file.originalname,
          });
        }
      }

      console.log('uploadedFiles',uploadedFiles)
      return uploadedFiles;
    } catch (error) {
      throw error;
    }
  },

  deleteFromBucket: async (res, keys) => {
    // Pass the res object
    try {
      // Ensure that keys is an array
      const keysArray = Array.isArray(keys) ? keys : [keys];

      const results = [];
      const errors = [];

      for (const key of keysArray) {
        const deleteObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        };

        try {
          const deleteObjectCommand = new DeleteObjectCommand(
            deleteObjectParams
          );
          await s3.send(deleteObjectCommand);
          results.push({ key, status: "success" });
        } catch (error) {
          errors.push({ key, status: "error", error: error.message });
        }
      }

      if (errors.length > 0) {
        return handleResponse(res, 500, "Error deleting objects", {
          results,
          errors,
        });
      }

      return handleResponse(res, 200, "Objects deleted successfully", {
        results,
      });
    } catch (error) {
      return handleResponse(res, 500, "An unexpected error occurred", null);
    }
  },

  getFromBucket: async (keys) => {
    try {
      const keysArray = Array.isArray(keys) ? keys : [keys];

      const images = [];
      for (key of keysArray) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        };
        const command = new GetObjectCommand(getObjectParams);
        const link = await getSignedUrl(s3, command, { expiresIn: 3600 });
        images.push(link);
      }

      return images;
    } catch (error) {
      console.error("Error getting URL from bucket:", error.message);
      throw error;
    }
  },
};
