const mongoose = require('mongoose');
const { addressSchema } = require('../../customer/model/index.js');
const orderItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    _id: false
});

const orderSchema = new mongoose.Schema({
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerDetails',
    },

    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    products: {
        type: [orderItemSchema],
        required: true,
        validate: total => total.length > 0,
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    currency: {
        type: String,
        default: "INR"
    },

    status : {
        type: String,
        enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING",
    },
    shippingAddress: {
        type: addressSchema
    },
    shippingCost : {
        type: Number,
    },
    notes: {
        type: String
    },
    discount: {
        type: Number
    },
    priority: {
        type: String,
        enum: ["HIGH", "MID", "LOW"]
    }
}, {
    timestamps: true
})

orderSchema.index({
    company : 1,
    orderId : 1
}, {
    unique: true
})

const Orders = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = {
    Orders
};