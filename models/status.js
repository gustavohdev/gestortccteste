const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        id: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
