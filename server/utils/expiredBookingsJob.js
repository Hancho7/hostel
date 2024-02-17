const Room = require("../models/room");
const Booking = require("../models/booking");

// Background job to check for expired bookings

const checkExpiredBookings = async () => {
  try {
    const currentTime = new Date();
    const expiredBookings = await Booking.find({
      expiryDate: { $lte: currentTime },
    });

    for (const booking of expiredBookings) {
      if (!booking.paid) {
        // If the booking is not paid, mark the associated room as available again
        const room = await Room.findById(booking.roomID);
        if (room) {
          room.remainingCapacity++;
          await room.save();
        }
      }
      // Delete the expired booking document
      await Booking.findByIdAndDelete(booking._id);
    }

    console.log("Expired bookings processed successfully");
  } catch (error) {
    console.error("Error processing expired bookings:", error);
  }
};
module.exports = checkExpiredBookings;
