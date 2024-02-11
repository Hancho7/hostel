const Booking = require("../../models/booking");
const Hostel = require("../../models/hostel");
const { Users } = require("../../models/user");
const Room = require("../../models/room");

module.exports = {
  // FOR THE USERS OR STUDENTS
  addBooking: async (req, res) => {
    const { roomID, hostelID, userID } = req.body;
    try {
      if (!roomID || !hostelID || !userID) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
          code: 400,
        });
      }
      const user = await Users.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "This user does not exist",
          code: 404,
        });
      }
      const hostel = await Hostel.findOne({ _id: hostelID });
      if (!hostel) {
        return res.status(404).json({
          status: "error",
          message: "This hostel does not exist",
          code: 404,
        });
      }
      const room = await Room.findOne({ _id: roomID, hostel: hostelID });
      if (!room) {
        return res.status(404).json({
          status: "error",
          message: "This room does not exist in this hostel",
          code: 404,
        });
      }
      
      // Check if user has already booked this same hostel or room
      const existingBooking = await Booking.findOne({
        userID: userID,
        $or: [
          { roomID: roomID },
          { hostelID: hostelID },
          { hostelID: hostelID, roomID: { $ne: roomID } },
        ],
      });
      if (existingBooking) {
        return res.status(409).json({
          status: "error",
          message: "User has already booked this same hostel or room",
          code: 409,
        });
      }

      // Check if user's gender matches the room's gender
      if (user.gender !== room.gender) {
        return res.status(400).json({
          status: "error",
          message: "User's gender does not match the room's gender",
          code: 400,
        });
      }

      // Check if remaining capacity of the room is greater than 0
      if (room.remainingCapacity <= 0) {
        return res.status(400).json({
          status: "error",
          message: "Rooms are fully booked",
          code: 400,
        });
      }

      const booking = new Booking({
        userID: userID,
        roomID: roomID,
        hostelID: hostelID,
      }).save();

      if (!booking) {
        return res.status(500).json({
          status: "error",
          message: "Booking failed",
          code: 500,
        });
      }
      room.remainingCapacity--;
      await room.save();

      return res.status(201).json({
        status: "success",
        message: "Booking was successful",
        code: 201,
      });
    } catch (error) {
      console.error("Add Booking Error:", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },



  // STUDENT OR USER CAN VIEW ALL HIS BOOKINGS
  viewPersonalBookingss: async (req, res) => {
    const { userID } = req.params;
    try {
      const user = await Users.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "This user does not exist",
          code: 404,
        });
      }
      const bookings = await Booking.find({ userID });
      if (!bookings) {
        return res.status(404).json({
          status: "error",
          message: "No booking found",
          code: 404,
        });
      }
      // Calculate time left for each booking to expire
      const currentTime = new Date();
      const bookingsWithTimeLeft = bookings.map((booking) => {
        const timeLeft = booking.expiryDate - currentTime;
        return {
          ...booking._doc,
          timeLeft,
        };
      });

      return res.status(200).json({
        status: "success",
        message: "Bookings retrieved successfully",
        code: 200,
        bookings: bookingsWithTimeLeft,
      });
    } catch (error) {
      console.error("View Personal Bookings Error:", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },
};
