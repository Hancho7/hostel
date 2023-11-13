import Users from "../../models/user.js";
import Room from "../../models/room.js";
import Booking from "../../models/booking.js";

export const book = async (req, res) => {
  const { userID, roomID, id } = req.body;
  // const {hostelID}= req.params;
  console.log("userID", userID);
  console.log("roomID", roomID);
  console.log("hostelID", id);
  try {
    const user = await Users.findById({ _id: userID });
    if (!user) {
      return res.status(400).json("Log in to book a room");
    }
    const room = await Room.findById({ _id: roomID });
    if (!room) {
      return res.status(400).send("Room not found");
    }
    const { remainingCapacity } = room;
    if (remainingCapacity == 0) {
      return res.status(400).send("Sorry! This room is fully booked.");
    }
    const book = new Booking({
      user: userID,
      room: roomID,
      hostel: id,
    });
    await book.save();
    room.remainingCapacity -= 1;
    await room.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

// TAKING BOOKINGS FROM THE DATABASE
export const getBooking = async (req, res) => {
  const { userID } = req.params;
  console.log("userID", userID);
  try {
    const user = await Users.findOne({ _id: userID });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    const { role } = user;
    if (role !== "manager") {
      return res.status(403).json("You are not authorized");
    }
    const bookingDetails = await Booking.find()
      .populate({
        path: "user",
        select: "firstName lastName email phone",
      })
      .populate({
        path: "room",
        select: "name",
      })
      .populate({
        path: "hostel",
        select: "name ",
      });

    // Extract specific information
    const formattedBookings = bookingDetails.map((booking) => {
      return {
        _id: booking._id,
        user: {
          _id: booking.user._id,
          firstName: booking.user.firstName,
          lastName: booking.user.lastName,
          email: booking.user.email,
          phone: booking.user.phone,
        },
        hostel: {
          _id: booking.hostel._id,
          name: booking.hostel.name,
        },
        room: {
          _id: booking.room._id,
          name: booking.room.name,
        },
        paid: booking.paid,
        checkInDate: booking.checkInDate,
        __v: booking.__v,
      };
    });

    console.log(formattedBookings);
    return res.status(200).json(formattedBookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error");
  }
};
