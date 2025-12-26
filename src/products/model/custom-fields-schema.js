const mongoose = require("mongoose");
exports.customFieldsSchema = new mongoose.Schema({
    fieldName : {
        type: String,
    },

    fieldType: {
        type: String,
    },

    value: {
        type: String,
    }

});