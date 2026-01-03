import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        select: false
    },
    refreshToken: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema)

export default User;