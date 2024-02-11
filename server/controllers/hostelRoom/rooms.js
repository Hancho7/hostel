const Room = require("../../models/room");
const { AdminUsers } = require("../../models/adminUser");
const Hostel = require("../../models/hostel");

module.exports = {
  createRooms: async (req, res) => {
    const {
      nameOfHostel,
      price,
      secondID,
      numberInRoom,
      available,
      gender,
      description,
    } = req.body;
    console.log("nameOfHostel:", nameOfHostel);
    console.log("price:", price);
    console.log("secondID:", secondID);
    console.log("numberInRoom:", numberInRoom);
    console.log("available:", available);
    console.log("gender:", gender);
    console.log("description:", description);

    try {
      const admin = await AdminUsers.findOne({ secondID: secondID });
      if (!admin) {
        return res.status(409).json({
          status: "unauthorized",
          message: "This admin does not exist",
          code: 409,
        });
      }

      const hostel = await Hostel.findOne({ name: nameOfHostel });
      if (!hostel) {
        return res.status(409).json({
          status: "unauthorized",
          message: "This hostel does not exist",
          code: 409,
        });
      }

      const capacity = numberInRoom * available;

      const rooms = new Room({
        nameOfHostel,
        secondID: admin.secondID,
        numberInRoom,
        price,
        available,
        remainingCapacity: capacity,
        gender,
        description,
        hostel: hostel._id,
      });

      await rooms.save();
      res.status(201).json({
        status: "success",
        message: "Rooms have successfully been created",
        code: 201,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: null,
        error: "Error uploading room details",
        message: error.message,
        code: 500,
      });
    }
  },
};
