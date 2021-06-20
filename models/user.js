const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        companyid: {
            type: String,
            trim: true,
        },
        usertype: {
            type: String,
            required: true,
            trim: true,
            default: 0,
        },
        control: {
            type: String,
            required: true,
            trim: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
