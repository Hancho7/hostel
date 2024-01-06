import express from 'express'
import {book, getUserBooking, getBooking} from '../../controllers/hostelRoom/booking.js'
const router = express.Router()

router.post('/book-room', book)
router.get('/get-bookings/:userID', getBooking);
router.get('/user-bookings/:userID',getUserBooking)


export default router;