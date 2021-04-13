const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const motorSchema = new Schema({
    companyid: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3
    }
}, {
    timestamps: true,
});

const Motor = mongoose.model('Motor', motorSchema);

module.exports = Motor;