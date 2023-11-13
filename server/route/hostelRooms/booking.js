import express from 'express'
import {book} from '../../controllers/hostelRoom/booking.js'
import { getBooking } from '../../controllers/hostelRoom/booking.js'
const router = express.Router()

router.post('/book-room', book)
router.get('/get-bookings/:userID', getBooking);

export default router;