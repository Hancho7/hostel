const express = require("express");
const {addBooking, viewPersonalBookingss}= require("../controllers/hostelRoom/booking");
const StudentBookingRouter=express.Router();

StudentBookingRouter.post("/add-booking",addBooking);
StudentBookingRouter.get("/view-personal-bookings/:userID",viewPersonalBookingss);

module.exports={StudentBookingRouter};