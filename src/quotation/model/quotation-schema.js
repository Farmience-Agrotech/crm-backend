const mongoose = require('mongoose');


const quotationSchema = new mongoose.Schema({

    quotationNumber : {
        type: String,
        unique: true,
    },

    customerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerDetails',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
            },
            targetPrice: {
                type: Number,
            },
            quotedPrice: {
                type: Number,
            }
        }
    ],

    status: {
        type: String,
        enum: ["ACCEPTED", "REJECTED", "NEGOTIATING", "PENDING"],
        default: 'PENDING'

    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null,
    }
}, {
    timestamps: true,
});

const quotation = mongoose.model("Quotation", quotationSchema);

module.exports = {
    quotation,
}