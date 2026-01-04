const {customerDetails} = require("../model");

exports.editCustomer = async ( req, res ) => {
    try {

        const {
            customerId,
            values
        } = req.body;

        const userCompany = req.user.company;
        if (values.ownerCompany) delete values.ownerCompany;
        if (values._id) delete values._id;

        const updatedCustomer = await customerDetails.findOneAndUpdate(
            { _id: customerId, ownerCompany: userCompany },
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({
                message: `Customer with id ${customerId} not found or access denied.`
            });
        }

        res.status(200).json({ updatedCustomer });
    } catch ( error ) {
        res.status(400).json({
            error: error
        })
    }
}