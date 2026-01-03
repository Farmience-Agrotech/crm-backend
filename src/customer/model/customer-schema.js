const mongoose = require("mongoose");
const { companyDetails } = require('./company-details-schema.js');
const { bankDetails } = require('./bank-details-schema.js');
const customerSchema = new mongoose.Schema({
    ownerCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["BUYER", "SUPPLIER", "BOTH"],
      required: true,
      default: "BUYER",
    },
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
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    creditLimit : {
        type: Number,
    }
}, {
    timestamps: true
});

const customerDetails = mongoose.model('CustomerDetails', customerSchema);
module.exports = {
    customerDetails
};

