const { createCustomer } = require("./create-customer.js");
const { listCustomers } = require("./list-customers.js");
const { deleteCustomer } = require("./delete-customers.js");
const { editCustomer } = require("./edit-customers.js");
module.exports = {
    createCustomer,
    listCustomers,
    deleteCustomer,
    editCustomer
}