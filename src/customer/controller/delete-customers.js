const {
    customerDetails
} = require("../model/index.js");


exports.deleteCustomer = async ( req, res) => {
    try {
        const {
            customerId
        } = req.params;

        const customer = await customerDetails.findOne({ _id: customerId});
        if ( !customer ) {
            return res.status(404).send({
                status: "Not Found"
            });
        }

        const deleteCustomer = await customerDetails.deleteOne({ _id: customerId });

        res.status(200).json({
            message: `successfully deleted customer ${customerId}`
        });

    } catch ( error ) {
        res.status(400).json({
            error: error
        })
    }
}