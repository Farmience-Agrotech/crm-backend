const mongoose = require('mongoose');
const { customFieldsSchema } = require('./custom-fields-schema.js');


const productSchema = new mongoose.Schema({

    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
    },

    sku: {
        type: String,
        unique: true,
        index: true
    },

    unit: {
        type: String,
        required: true,
    },

    categories : {
        type: Array,
        required: true,
    },

    minPrice: {
        type: Number,
        required: true,
        min: 0
    },

    maxPrice: {
        type: Number,
        required: true,
        min: 0
    },

    taxRate: {
        type: Number,
        required: true,
        min: 0
    },

    inventoryLocation  : {
        type: String,
        required: true,
    },

    stockQuantity : {
        type: Number,
        required: true,
    },

    minStockLevel : {
        type: Number,
        required: true,
    },

    minOrderLevel : {
        type: Number,
        required: true,
    },

    additionalFields : {
        type: [customFieldsSchema]
    },

    templateId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
    },
    hsnCode : {
        type: String,
    }

}, {
    timestamps: true
    });

productSchema.index({
    company: 1,
    sku:1
}, {
    unique: true
});

const Products = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports  = {
    Products
};

