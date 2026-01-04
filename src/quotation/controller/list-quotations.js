const {
    quotation
} = require("../model/index.js");

exports.listQuotations = async ( req, res ) => {
    try {
        const userCompany = req.user.company;
        const {
            status,
            customerId
        } = req.body;

        let query = {
            company: userCompany,
        }

        if ( status ) {
            query.status = status;
        }

        if ( customerId){
            query.customerId = customerId;
        }

        const allQuotations = await quotation.find(query)
            .populate('customerId', 'fullName email companyName')
            .populate('products.productId', 'name sku')
            .sort({ createdAt: -1 });

        if (!allQuotations || allQuotations.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(allQuotations);
    } catch ( error ) {
        res.status(400).json({error: error});
    }
}