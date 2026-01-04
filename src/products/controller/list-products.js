const { Products } = require("../model/product-schema.js");

exports.listProducts = async (req, res) => {
    try {

        const userCompany = req.user.company;

        const allProducts = await Products.find({
            company: userCompany
        })
            .sort({ createdAt: -1 });

        if ( !allProducts || allProducts.length === 0){
            res.status(404).json({message: "No products found"});
        }

        res.status(200).json(allProducts);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }

}

