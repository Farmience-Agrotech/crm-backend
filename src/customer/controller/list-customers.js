const { customerDetails } = require("../model/index.js");

exports.listCustomers = async ( req, res) => {
    try {
        const customers = await customerDetails.find({});

        if ( !customers) {
            return res.status(400).send({
                status: "No customers found",
            });
        }

        res.status(200).json(customers);

    } catch ( error ) {
        return res.status(200).json({
            error: error,
        })
    }
}
