const { Products } = require("../model/product-schema.js");

exports.updateProducts = async (req, res) => {
    try {

        const {
            productId,
            values
        } = req.body;

        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({error: `Product with id ${ productId }. not found`});
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            { $set: values },
            { new: true , runValidators: true}
        );

        res.status(200).json(updatedProduct);

    } catch ( error ) {
        res.status(500).json({error: error.message});
    }

}

