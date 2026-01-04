const { customerDetails } = require("../model/index.js");

exports.listCustomers = async (req, res) => {
    try {
        const userCompany = req.user.company;

        const customers = await customerDetails.find({ ownerCompany: userCompany })
            .sort({ createdAt: -1 });

        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}