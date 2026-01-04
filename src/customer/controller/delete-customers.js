const { customerDetails } = require("../model/index.js");

exports.deleteCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const userCompany = req.user.company;

        const deletedCustomer = await customerDetails.findOneAndDelete({
            _id: customerId,
            ownerCompany: userCompany
        });

        if (!deletedCustomer) {
            return res.status(404).json({
                error: "Customer not found or access denied."
            });
        }

        res.status(200).json({
            message: `Successfully deleted customer ${customerId}`,
            id: customerId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}