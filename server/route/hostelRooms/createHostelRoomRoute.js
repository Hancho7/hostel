import { createRooms, adminGetRooms } from "../../controllers/hostelRoom/createHostelRooms.js";
import express from "express"

const router = express.Router();
// /admin/add-rooms/:userID/:id
router.post("/add-rooms", createRooms)
router.get('/add-rooms/:userID/:id', adminGetRooms)

export default router;