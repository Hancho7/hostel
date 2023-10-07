import mongoose from "mongoose";

const HostelSchema= mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            min: 2
        },
        location: {
            type: String,
            required : true,
            min: 10,
            max:50
        },
        hostelDescription: {
            type: String,
            required : true,
            min: 10,
            max: 100
        },
        prices:[{
            numberInRoom: {type: String},
            price: {type: Number}
        }],
        imageUrl: [{
            type: String,
            unique: true
        }],
        phone: {
            type: String,
            required : true,
            unique: true
        }
    }
)

HostelSchema.methods.toJSON = function () {
    const hostelObject = this.toObject();
    delete hostelObject.client; // Exclude the circular reference
  
    return hostelObject;
  };

const Hostel = mongoose.model("Hostel", HostelSchema)
export default Hostel