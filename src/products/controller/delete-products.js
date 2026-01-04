const {Products} = require("../model/product-schema");

exports.deleteProduct = async ( req, res) => {
    try {
        const {
            productId,
        } = req.params;

        const userCompany = req.user.company;

        // const productExists = await Products.findOne({ _id: productId});
        // if ( !productExists) {
        //     return res.status(404).json({message: "Product not found"});
        // }
        //
        // const deleteProduct = await Products.deleteOne({ _id: productId });
        const deleteProduct = await Products.findOneAndDelete({
            _id: productId,
            company: userCompany,
        });

        if ( !deleteProduct ) {
            return res.status(404).json({error: 'Product not found or access denied'});
        }


        res.status(200).json({
            status: `successfully deleted product ${deleteProduct.name}`,
            id: productId,
        })

    } catch ( error ) {
        res.status(400).json({error: error.message});
    }
}