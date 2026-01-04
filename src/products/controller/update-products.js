const { Products } = require("../model/product-schema.js");

exports.updateProducts = async (req, res) => {
    try {

        const {
            productId,
            values
        } = req.body;
        const userCompany = req.user.company;

        if ( values.company) delete values.company;
        if ( values._id ) delete values._id;


        const updatedProduct = await Products.findOneAndUpdate(
            {_id: productId, company: userCompany},
            { $set: values },
            { new: true , runValidators: true}
        );

        if ( !updatedProduct ){
            return res.status(404).json({
                error: `Product with id ${productId} not found or access denied.`
            });
        }

        res.status(200).json(updatedProduct);

    } catch ( error ) {
        res.status(500).json({error: error.message});
    }

}

