const { createRooms } = require("../controllers/hostelRoom/rooms");
const express = require("express");

const AdminRoomsRouter = express.Router();
// /admin/add-rooms/:userID/:id
AdminRoomsRouter.post("/add", createRooms);
// router.get('/add-rooms/:userID/:id', adminGetRooms)

module.exports = { AdminRoomsRouter };
