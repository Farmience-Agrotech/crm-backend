const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
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


// a dynamic type to keep track of AVAILABLE product.

inventorySchema.virtual('available').get(function () {
    return this.stock - this.reserved;
})

exports.Inventory = mongoose.model('Inventory', inventorySchema);