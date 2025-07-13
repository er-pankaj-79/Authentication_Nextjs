import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter a username"],
        unique:true,

    },
    email: {
        type: String,
        required: [true,"Please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Please enter a password"],
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    veriftToken: String,
    verifyTokenExpiry: Date,
});

export default mongoose.model("User", userSchema);