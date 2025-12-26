const { customerDetails} = require('./customer-schema.js');
const { companyDetails } = require("./company-details-schema.js")
const { bankDetails } = require("./bank-details-schema.js");

module.exports = {
    customerDetails,
    companyDetails,
    bankDetails,
}