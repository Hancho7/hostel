import mongoose from "mongoose";
import Users from "./user.js";
const BookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the user who made the booking.
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', // Reference to the room being booked.
        required: true
    },
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600
    },
    paid: {
        type: Boolean,
        default: false
    },
});

// Create a TTL index for the expiryDate field
BookingSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
