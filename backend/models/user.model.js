import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false,
    },
    coverImage: {
        type: String,
        required: false,
    },
    headLine: {
        type: String,
    },
    skills: {
        type: String,
    },
    aducation: [
        {
            college: {
                type: String,
            },
            degree: {
                type: String,
            },
            fielOfStudy: {
                type: String,
            },
        }
    ],
    location: {
        type: String,
    },
    gender: {
        type: String,
        enum:["male","female","other"],
    },
    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    ],
    connections: [
       { 
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
       }

    ]
}, {timestamps: true,});

const User = mongoose.model("User", userSchema);
export default User;