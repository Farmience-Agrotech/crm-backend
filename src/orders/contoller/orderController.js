const {Orders} = require("../model/orders.js");
const { customerDetails } = require("../../customer/model/customer-schema.js")
const { Inventory } = require("../../inventory/model/inventory.js");
const { nanoid } = require("nanoid");


exports.createOrder = async (req, res) => {
    try {
        const { customerId, products, shippingAddress, shippingCost, notes, discount, priority } = req.body;

        const userCompany = req.user.company;
        const generatedOrderId = `ORD-${nanoid(8).toUpperCase()}`;

        const customer = await customerDetails.findOne({
            _id: customerId,
            ownerCompany: userCompany
        });
        if ( !customer ) {
            return res.status(400).json("Customer not found");
        }



        for (const item of products) {
            const inventory = await Inventory.findOne({
                product: item.productId,
                company: userCompany
            });

            if (!inventory) {
                return res.status(400).json({
                    error: `Product ${ item.productId } is not available in inventory.`
                });
            }

            // const availableStock = inventory.stock - inventory.reserved;
            // if ( availableStock <= item.quantity ) {
            //     return res.status(400).json({
            //         error: `Insufficient stock for product ${ item.productId }.`
            //     })
            // }
        }

        // const reservationPromises = products.map(item =>
        //     Inventory.findOneAndUpdate(
        //         { product: item.productId },
        //         { $inc: { reserved: item.quantity } }
        //     )
        // );
        // await Promise.all(reservationPromises);
        const totalAmount = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const newOrder = await Orders.create({
            company: userCompany,
            orderId : generatedOrderId,
            customerId : customerId,
            products,
            totalAmount,
            shippingAddress: shippingAddress || customer.companyInfo.billingAddress || "",
            status: "PENDING",
            shippingCost,
            notes,
            discount,
            priority
        });

        res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listOrders = async ( req, res) => {
    try {
        const userCompany = req.user.company;
        const orders = await Orders.find({
            company: userCompany
        })
            .populate('customerId', 'fullName email')
            .sort({ createdAt: -1 });

        if ( !orders || !orders.length === 0) {
            return res.status(404).json({error: "No orders found."});
        }

        res.status(200).json(orders);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}


exports.updateOrder = async ( req, res ) => {
    try {

        const {
            orderId,
            values
        } = req.body;

        const userCompany = req.user.company;

        delete values.company;
        delete values.totalAmount;
        delete values.products;


        const order = await Orders.findOne({ orderId});

        if ( !order ) {
            return res.status(404).json({error: `No order with id ${ orderId }.`});
        }

        const updateOrder = await Orders.findOneAndUpdate(
            { orderId: orderId, company: userCompany },
            { $set: values },
            { new: true, runValidators: true }
        );

        res.status(200).json(updateOrder);

    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}