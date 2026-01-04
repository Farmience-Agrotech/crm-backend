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
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true
    },
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

templateSchema.index({ company: 1, name: 1 }, { unique: true });
const Templates = mongoose.model("Template", templateSchema);
module.exports = {
    Templates
}