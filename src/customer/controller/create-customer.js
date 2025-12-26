const { customerDetails } = require('../model/index.js');
exports.createCustomer = async (req, res) => {
    try {

        const {
            fullName,
            email,
            phoneNumber,
            designation,
            companyInfo,
            bankDetails
        } = req.body;

        if ( !fullName || !email || !phoneNumber || !designation || !companyInfo ) {
            return res.status(400).send({
                error: 'Please fill all fields'
            });
        }

        const newCustomer = await customerDetails.create({
            fullName,
            email,
            phoneNumber,
            designation,
            companyInfo,
            bankDetails
        });

        res.status(200).send(newCustomer);

    } catch ( error ) {
        return res.status(400).send({
            error: error,
        })
    }
}