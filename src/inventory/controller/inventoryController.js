const {Inventory} = require("../model/inventory.js");
const { Products } = require("../../products/model/index.js");


exports.createInventory = async ( req, res ) => {
    try {
        const {
            product,
            stock,
            reorderLevel = 0
        } = req.body;

        const userCompany = req.user.company;

        const productExists = await Products.find({
            product: product,
            company: userCompany
        });
        if ( !productExists) {
            return res.status(404).json({message: "product not found in database"});
        }

        const inventoryExists = await Inventory.findOne({ product});
        if (inventoryExists) {
            return res.status(409).json({message: "inventory already exists"});
        }

        const inventory = await Inventory.create({
            company: userCompany,
            product,
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

        const userCompany = req.user.company;

        const inventory = await Inventory.findOneAndUpdate(
            { product: productId, company: userCompany},
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
        const userCompany = req.user.company;

        const inventory = await Inventory.findOne({
            company: userCompany,
            product: productId

        });
        if ( !inventory) return res.status(400).json({message: 'Inventory not found'});

        if ( inventory.available < quantity ) {
            return res.status(400).json({message: 'Insufficient available stock'});
        }

        inventory.reserved += quantity;
        await inventory.save();

        res.status(200).json({message: 'Inventory reserved stock'});
    } catch (error) {
        res.status(400).json({message: error });
    }
};

exports.confirmSale = async ( req, res ) => {
    try {
        const {
            productId,
            quantity
        } = req.body;

        const userCompany = req.user.company;

        const inventory = await Inventory.findOneAndUpdate(
            {
            product: productId, reserved: { $gte: quantity}, company: userCompany
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
        const userCompany = req.user.company;

        const inventory = Inventory.findOneAndUpdate(
            {
                product: productId,
                company: userCompany
            },
            { $inc: { reserved: -quantity}},
            {new : true}
        );
        res.status(200).json({ inventory});
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.getInventory = async ( req, res ) => {
    try {
        const userCompany = req.user.company;
        const inventory = await Inventory.find({
            company: userCompany
        });
        if ( !inventory ) return res.status(404).json({message: 'Inventory not found'});
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


// mG5bagOZVei3skGF
// adithyamn_db_user