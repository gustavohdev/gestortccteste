const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    companyid: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;