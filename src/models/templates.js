const mongoose = require('mongoose');

const customFieldsSchema = new mongoose.Schema({
    fieldName : {
        type: String,
    },

    fieldType: {
        type: String,
    },

    isRequired: {
        type: Boolean,
    }

})

const templateSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },

    description : {
        type: String,
        required: false,
    },
    templateFields : {
        type: [customFieldsSchema],
        required: false,
    }
})


const Templates = mongoose.model("Template", templateSchema);
module.exports = {
    Templates
}