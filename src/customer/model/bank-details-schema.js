const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
    accountHolderName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    bankName: {
        type: String,
    },
    upiId: {
        type: String,
    }
});

const bankDetails = mongoose.model('BankDetails', bankDetailsSchema);
module.exports = {
    bankDetails,
}