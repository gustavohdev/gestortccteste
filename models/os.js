const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OsSchema = new Schema({
    companyid: {
        type: String,
        required: true,
        trim: true
    },
    /*workerid: {
        type: String,
        required: true,
        trim: true
    },*/
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
    },
    obs: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Os = mongoose.model('Os', OsSchema);

module.exports = Os;