import Room from "../../models/room.js";
import Hostel from "../../models/hostel.js";
import Users from "../../models/user.js";

export const createRooms = async (req, res) => {
  const { name, capacity, hostelID } = req.body;
  console.log("request body", req.body);

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
      remainingCapacity: capacity,
      hostel: hostel._id,
    });

    const saved = await newHostelRoom.save();

    if (!saved) {
      return res.status(400).json("Failed to save the room");
    }
    return res.status(201).json(newHostelRoom); // Consider using a 201 status code for successful resource creation
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: "Error creating the room" });
  }
};


// ROOMS CREATED BY ADMIN
export const adminGetRooms = async (req, res) => {
  const { userID, id } = req.params;
  console.log("userID", userID)
  console.log("id", id)
  try {
    const user = await Users.findOne({ _id: userID });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    if (user.role !== "manager") {
      return res.status(401).json("Unauthorized");
    }
    const rooms = await Room.find({ hostel: id });
    if (!rooms) {
      return res.status(400).json("No Rooms Found in this hostel");
    }
    console.log("rooms", rooms)
    const formattedrooms = rooms.map((room)=>
      {return {
        name: room.name,
        capacity: room.capacity,
        remainingCapacity: room.remainingCapacity,

      }})
      console.log("formattedrooms", formattedrooms)
    return res.status(200).json(formattedrooms);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("Server Error");
  }
};
