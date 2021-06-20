const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        usernameid: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        company: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
