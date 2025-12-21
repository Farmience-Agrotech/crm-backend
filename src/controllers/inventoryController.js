const {Inventory} = require("../models/inventory.js");
const {Products} = require("../models/products.js");


exports.createInventory = async ( req, res ) => {
    try {
        const {
            productId,
            stock,
            reorderLevel = 0
        } = req.body;

        const product = await Products.find({productId});
        if ( product) {
            return res.status(404).json({message: "product already exists"});
        }

        // const exists = await Inventory.findOne({ product: productId});
        // if (exists) {
        //     return res.status(409).json({message: "inventory already exists"});
        // }

        const inventory = await Inventory.create({
            productId,
            stock,
            reorderLevel,
        });

        res.status(200).json(inventory);
    } catch ( err ) {
        res.status(400).json({message: err.message});
    }
}


exports.updateStock = async( req, res ) => {
    try {
        const {
            productId,
            quantity,
        } = req.body;

        const inventory = await Inventory.findOneAndUpdate(
            { product: productId},
            { $inc : { stock : quantity }},
            { new: true, runValidators: true}
        );

        if ( !inventory ) return res.status(400).json({message: 'Inventory not found'});

        const alert = inventory.stock <= inventory.reorderLevel;
        res.status(200).json({ inventory, reorderAlert: alert});
    } catch (error) {
        res.status(400).json({message: 'Inventory not found'});
    }
};

exports.reserveStock = async( req, res ) => {
    try {
        const {
            productId,
            quantity
        } = req.body;

        const inventory = await Inventory.findOne({ product: productId});
        if ( !inventory) return res.status(400).json({message: 'Inventory not found'});

        if ( inventory.available < quantity ) {
            return res.status(400).json({message: 'Insufficient available stock'});
        }

        inventory.reserved += quantity;
        await inventory.save();

        res.status(200).json({message: 'Inventory reserved stock'});
    } catch (error) {
        res.status(400).json({message: error });
    };
};

exports.confirmSale = async ( req, res ) => {
    try {
        const {
            productId,
            quantity
        } = req.body;

        const inventory = await Inventory.findOneAndUpdate({
            product: productId, reserved: { $gte: quantity}
        },{
            $inc: {
                stock: -quantity,
                reserved: -quantity
            }
        }, {
            new: true,
        });

        if ( !inventory ) return res.status(400).json({message: 'sale failed'});
        res.status(200).json(inventory);
    } catch( error) {
        res.status(400).json({ message: error});
    }
};


exports.releaseReservation = async ( req, res ) => {
    try {
        const {
            productId, quantity
        } = req.body;
        const inventory = Inventory.findOneAndUpdate(
            { product: productId},
            { $inc: { reserved: -quantity}},
            {new : true}
        );
        res.status(400).json({ inventory});
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


// mG5bagOZVei3skGF
// adithyamn_db_user