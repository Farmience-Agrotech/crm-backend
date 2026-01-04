const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({

    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true,
    },

    // product ID,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },


    // available quantity
    stock : {
        type: Number,
        required: true,
        min: 0
    },

    // reserved

    reserved : {
        type: Number,
        default: 0,
        min: 0
    },

    // reorder level for alerting admin.

    reorderLevel : {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
    }
);


inventorySchema.virtual('available').get(function () {
    return this.stock - this.reserved;
})
inventorySchema.index({
    company: 1,
    product: 1
}, {
    unique: true
})
exports.Inventory = mongoose.model('Inventory', inventorySchema);