const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    companyid: {
        type: String,
        required: true,
        trim: true
    },
    userid: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    plate: {
        type: String,
        required: true,
        trim: true
    },
    motor: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;