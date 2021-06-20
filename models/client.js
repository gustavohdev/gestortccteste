const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        companyid: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        surname: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        cellphone: {
            type: String,
            required: true,
            trim: true,
        },
        car: {
            type: Array,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
