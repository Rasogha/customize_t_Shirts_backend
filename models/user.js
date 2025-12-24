import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["customer", "admin"],
        default: ""
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        // required: true,
        default: "https://www.vecteezy.com/free-vector/default-profile-picture"
    }
    //optional fields for future use
    // savedDesigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }]},
    //                {timestamps: true

},{timestamps: true})

const User = mongoose.model('users', userSchema)

export default User