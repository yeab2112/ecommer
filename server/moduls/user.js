import mongoose from "mongoose";

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartdata: {
        type: Object,
        default: {}
    }
}, { minimize: false });

const UserModel = mongoose.model('user', UserSchema);

export { UserModel };  // Correct export
