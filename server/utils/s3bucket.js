
const { S3Client } = require("@aws-sdk/client-s3"); // Updated const
// AMAZON WEB SERVICE
module.exports = {
    s3: new S3Client({
      region: process.env.BUCKET_REGION, // Use BUCKET_REGION environment variable
      credentials: {
        accessKeyId: process.env.ACCESS_KEY, // Use ACCESS_KEY environment variable
        secretAccessKey: process.env.SECRET_ACCESS_KEY, // Use SECRET_ACCESS_KEY environment variable
      },
    }),
  };