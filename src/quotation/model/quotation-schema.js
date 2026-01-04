const mongoose = require('mongoose');


const quotationSchema = new mongoose.Schema({

    company : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
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
        enum: ["ACCEPTED", "REJECTED", "NEGOTIATING", "PENDING", "QUOTE_SENT", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED" ],
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

quotationSchema.index({
    company: 1,
    quotationNumber: 1,
},{
    unique: true,
})

const quotation = mongoose.model("Quotation", quotationSchema);

module.exports = {
    quotation,
}