const {Products} = require("../model/product-schema");

exports.deleteProduct = async ( req, res) => {
    try {
        const {
            productId,
        } = req.params;

        const productExists = await Products.findOne({ _id: productId});
        if ( !productExists) {
            return res.status(404).json({message: "Product not found"});
        }

        const deleteProduct = await Products.deleteOne({ _id: productId });


        res.status(200).json({
            status: `successfully deleted product ${productId}`,
        })

    } catch ( error ) {
        res.status(400).json({error: error.message});
    }
}