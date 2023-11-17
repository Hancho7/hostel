import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2
        },
        lastName: {
            type: String,
            required: true,
            min: 2
        },
        email: {
            type: String,
            required: true,
            min: 2
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        role: {
            type: String,
            default: "user"
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, result) => {
            if (err) return next(err);
            this.password = result;
            next();
        });
    } else {
        next(); // Call next() here to ensure the middleware continues
    }
});

UserSchema.methods.comparePassword = async function (password) {
    if (!password) return 'there is no password';
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (err) {
        console.error("Compare Password Error:", err);
        return false;
    }
};

const Users = mongoose.model("Users", UserSchema);
export default Users;
