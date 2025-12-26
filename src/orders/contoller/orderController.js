const {Orders} = require("../model/orders.js");
const { Inventory } = require("../../inventory/model/inventory.js");

exports.createOrder = async (req, res) => {
    try {
        const { orderId, products, totalAmount, status } = req.body;

        const existingOrder = await Orders.findOne({ orderId });
        if (existingOrder) {
            return res.status(409).json({ error: "Order with same ID already exists." });
        }

        for (const item of products) {
            const inventory = await Inventory.findOne({ product: item.productId });

            if (!inventory) {
                return res.status(400).json({
                    error: `Product ${ item.productId } is not available in inventory.`
                });
            }

            const availableStock = inventory.stock - inventory.reserved;
            if ( availableStock <= item.quantity ) {
                return res.status(400).json({
                    error: `Insufficient stock for product ${ item.productId }.`
                })
            }
        }

        const reservationPromises = products.map(item =>
            Inventory.findOneAndUpdate(
                { product: item.productId },
                { $inc: { reserved: item.quantity } },
                { new: true }
            )
        );
        await Promise.all(reservationPromises);

        const newOrder = await Orders.create({
            orderId,
            products,
            totalAmount,
            status: status || 'PENDING'
        });

        res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listOrders = async ( req, res) => {
    try {
        const orders = await Orders.find({});
        if ( !orders || !orders.length === 0) {
            return res.status(404).json({error: "No orders found."});
        }

        res.status(200).json(orders);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}