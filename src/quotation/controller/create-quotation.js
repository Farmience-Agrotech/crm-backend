const { quotation } = require("../model/index.js");
const { Orders } = require("../../orders/model/orders.js");
const {nanoid} = require("nanoid");
const {customerDetails} = require("../../customer/model/customer-schema");
exports.createQuotation = async (req, res) => {
    try {
         const {
             customerId,
             products,
             orderId
         } = req.body;
         const userCompany = req.user.company;


         const customer = await customerDetails.findOne({
             _id: customerId,
             ownerCompany: userCompany
         })

        if (!customer) {
            return res.status(404).json({ message: "Customer not found in your records." });
        }

        if (req.body.orderId) {
            const existingOrder = await Orders.findOne({
                _id: req.body.orderId,
                company: userCompany
            });

            if (existingOrder) {
                return res.status(400).json({
                    message: "An active Order already exists for this ID. No need to create a new Quote.",
                });
            }
        }

         const generatedQuotationNumber = `ORD-${nanoid(8).toUpperCase()}`


        const totalAmount = products.reduce(( acc, item) => {
            const price = item.quotedPrice || item.targetPrice || 0;
            return acc + ( price * item.quantity);
        }, 0)

         const newQuotation = await quotation.create({
             company: userCompany,
             quotationNumber: generatedQuotationNumber,
             customerId,
             products,
             orderId,
             totalAmount,
             status: "PENDING",
         });

         res.status(200).json(newQuotation);

    } catch ( error ) {
        res.status(400).json({
            error: error
        } );
    }
}