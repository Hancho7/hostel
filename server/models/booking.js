import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the user who made the booking.
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room' // Reference to the room being booked.
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    expiryDate: {
        type: Date,
        default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    }
});

// Create a TTL index for the expiryDate field
BookingSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
