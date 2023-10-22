import Room from "../../models/room.js";
import Hostel from "../../models/hostel.js";


export const createRooms = async (req, res) => {
  const { name, capacity, hostelID } = req.body;

  try {
    const hostel = await Hostel.findOne({ _id: hostelID });

    if (!hostel) {
      return res.status(400).json({ error: "This hostel does not exist" });
    }

    const room = await Room.findOne({ name: name });

    if (room) {
      return res.status(400).json({ error: "This room already exists" });
    }

    const newHostelRoom = new Room({
      name,
      capacity,
      hostel: hostel._id,
    });

    await newHostelRoom.save();

    return res.status(201).json(newHostelRoom); // Consider using a 201 status code for successful resource creation
  } catch (error) {
    return res.status(500).json({ error: "Error creating the room" });
  }
};
