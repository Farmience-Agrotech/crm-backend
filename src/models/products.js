const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
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

    price: {
        type: Number,
        required: true,
        min: 0
    },

    currency: {
        type: String,
        default: "INR"
    },

    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
    });

const Products = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports  = {
    Products
};

