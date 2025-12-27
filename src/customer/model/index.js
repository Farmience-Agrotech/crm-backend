const { customerDetails} = require('./customer-schema.js');
const { companyDetails, addressSchema, companyDetailsSchema } = require("./company-details-schema.js")
const { bankDetails } = require("./bank-details-schema.js");

module.exports = {
    customerDetails,
    companyDetails,
    bankDetails,
    addressSchema,
    companyDetailsSchema
}