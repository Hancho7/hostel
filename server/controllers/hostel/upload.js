import saveToBucket from './saveToBucket.js';
import Hostel from '../../models/hostel.js';
import Users from '../../models/user.js';

export const upload = async (req, res) => {
  const { name, location, hostelDescription, prices, phone, adminId } = req.body;

  console.log('request body', req.body);
  console.log('request files', req.files);

  try {
    // Find the admin user by their ID
    const admin = await Users.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Create a new Hostel object
    const hostelData = new Hostel({
      name,
      location,
      hostelDescription,
      prices,
      phone,
      admin: admin._id,
    });

    // Upload files to S3 and retrieve the object keys
    const uploadedFiles = await saveToBucket(req.files);
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    uploadedFiles.forEach((file) => {
      hostelData.imageUrl.push(file.key); // Save the S3 object key
    });

    // Save the hostel data
    await hostelData.save();
    console.log('Hostel updated with keys:', hostelData);

    return res.status(201).json({
      message: 'Hostel uploaded successfully',
      hostelData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error uploading hostel',
      message: error.message,
    });
  }
};
