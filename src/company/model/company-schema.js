const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
      type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', "SUSPENDED"],
        default: 'ACTIVE'
    },
    contactEmail: {
        type: String,
    },
    maxUsers: {
        type: Number,
        default: 100,
    }

}, {
    timestamps: true,
})

const Companies = mongoose.model('Company', companySchema);
module.exports = {
    Companies
}