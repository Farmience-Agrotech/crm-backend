const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false,
    }
});

const companyContactDetailsSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    }
})

const companyDetailsSchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    gstNumber: {
        type: String
    },
    panNumber: {
        type: String
    },
    billingAddress: {
        type: addressSchema
    },
    shippingAddress: {
        type: [addressSchema]
    },
    contactDetails:{
        type: companyContactDetailsSchema
    }
})

const companyDetails = mongoose.model("CompanyDetails", companyDetailsSchema);
module.exports = {
    companyDetails
}