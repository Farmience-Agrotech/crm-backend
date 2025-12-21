const { Products } = require("../models/products.js");

exports.createProduct = async ( req, res) => {
    try {
        const {
            name,
            description,
            price,
            sku,
        } = req.body;

        const productExists = await Products.findOne({name});
        if (productExists) {
            return res.status(400).json({message: "Product already exists."});
        }

        const product = await Products.create({
            name,
            description,
            price,
            sku
        });

        res.status(201).json(product);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}

exports.listProducts = async (req, res) => {
    try {
        const allProducts = await Products.find();
        if ( !allProducts || allProducts.length === 0){
            res.status(404).json({message: "No products found"});
        }

        res.status(200).json(allProducts);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }

}