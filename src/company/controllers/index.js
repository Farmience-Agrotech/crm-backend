const { createCompany } = require("./create-company.js");
const { updateCompany } = require("./update-company.js");
const { deleteCompany } = require("./delete-company.js");
const { getCompanyProfile } = require("./list-company-data.js");
module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyProfile
}