const { quotation } = require("../model/index.js");
const { Orders } = require("../../orders/model/orders.js");
const {nanoid} = require("nanoid");
exports.createQuotation = async (req, res) => {
    try {
         const {
             customerId,
             products,
             orderId
         } = req.body;

         const order = await Orders.findOne({ orderId});

         if ( order ) {
             return res.status(400).json({
                 message: "Order already exists, no need to quote",
             });
         }

         const generatedQuotationNumber = `ORD-${nanoid(8).toUpperCase()}`

         const newQuotation = await quotation.create({
             quotationNumber: generatedQuotationNumber,
             customerId,
             products,
             orderId
         });

         res.status(200).json(newQuotation);

    } catch ( error ) {
        res.status(400).json({
            error: error
        } );
    }
}