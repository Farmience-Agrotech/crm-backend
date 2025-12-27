const {customerDetails} = require("../model");

exports.editCustomer = async ( req, res ) => {
    try {

        const {
            customerId,
            values
        } = req.body;

        const customer = await customerDetails.findOne({ _id: customerId});

        if ( !customer ) {
            return res.status(400).json({
                message: `Customer with id ${customerId} not found`
            });
        }

        const updatedCustomer = await customerDetails.findByIdAndUpdate(
            customerId,
            { $set: values },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            updatedCustomer
        })



    } catch ( error ) {
        res.status(400).json({
            error: error
        })
    }
}