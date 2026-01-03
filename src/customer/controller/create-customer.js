const { customerDetails } = require('../model/index.js');
exports.createCustomer = async (req, res) => {
    try {

        const {
            fullName,
            email,
            phoneNumber,
            designation,
            companyInfo,
            bankDetails,
            creditLimit,
            type
        } = req.body;

        const userCompany = req.user.company;

        if ( !userCompany ) {
            return res.status(400).json({ error: 'User Not in company.' });
        }

        if ( !fullName || !email || !phoneNumber || !designation || !companyInfo ) {
            return res.status(400).send({
                error: 'Please fill all fields'
            });
        }

        const newCustomer = await customerDetails.create({
            ownerCompany: userCompany,
            type: type || "BUYER",
            fullName,
            email,
            phoneNumber,
            designation,
            companyInfo,
            bankDetails,
            creditLimit
        });

        res.status(200).send(newCustomer);

    } catch ( error ) {
        return res.status(400).send({
            error: error,
        })
    }
}