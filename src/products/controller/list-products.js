const { Products } = require("../model/product-schema.js");

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

