import Users from "../../models/user.js";
import Room from "../../models/room.js";
import Booking from "../../models/booking.js";

export const book = async (req, res) => {
  const { userID, roomID, hostelID } = req.body;
  console.log("request body", req.body);

  try {
    // Check if the user is an admin
    const user = await Users.findById({ _id: userID });
    if (!user || user.role === "manager") {
      return res.status(400).json("Managers are not allowed to book hostels.");
    }

    // Check if the user has already booked the same room in the same hostel
    const existingBooking = await Booking.findOne({
      user: userID,
      room: roomID,
      hostel: hostelID,
    });

    if (existingBooking) {
      return res.status(400).json("You have already booked this room.");
    }

    const room = await Room.findById({ _id: roomID });
    if (!room) {
      return res.status(400).send("Room not found");
    }

    // Check if the room is already fully booked
    if (room.remainingCapacity === 0) {
      return res.status(400).send("Sorry! This room is fully booked.");
    }

    // Check if the user has already booked a room in the same hostel
    const userBookingsInHostel = await Booking.find({
      user: userID,
      hostel: hostelID,
    });

    if (userBookingsInHostel.length > 0) {
      return res
        .status(400)
        .json("You can only book one room in a particular hostel.");
    }

    // Create and save the booking
    const newBooking = new Booking({
      user: userID,
      room: roomID,
      hostel: hostelID,
    });

    await newBooking.save();

    // Update the remaining capacity of the room
    room.remainingCapacity -= 1;
    await room.save();

    res.status(200).json("Booking successful");
  } catch (error) {
    console.error(error);
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

//USER GETTING THE BOOKINGS IF THERE ARE ANY
export const getUserBooking = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await Users.findOne({ _id: userID });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    const booking = await Booking.find({ user: user._id });
    if (!booking) {
      return res.status(404).send("No bookings found");
    }
    const bookingDetails = await Booking.find()
      .populate({
        path: "room",
        select: "name",
      })
      .populate({
        path: "hostel",
        select: "name phone",
      });
    // Format the data to be sent back as a response
    return res.status(200).json(bookingDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};
