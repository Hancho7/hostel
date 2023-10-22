import { createRooms } from "../../controllers/hostelRoom/createHostelRooms.js";
import express from "express"

const router = express.Router();

router.post("/add-Rooms", createRooms)

export default router;