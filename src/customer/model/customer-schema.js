const mongoose = require("mongoose");
const { companyDetails } = require('./company-details-schema.js');
const { bankDetails } = require('./bank-details-schema.js');
const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
    },

    companyInfo : {
        type: companyDetails.schema,
    },

    bankDetails: {
        type: bankDetails.schema,
    }
});

const customerDetails = mongoose.model('CustomerDetails', customerSchema);
module.exports = {
    customerDetails
};

