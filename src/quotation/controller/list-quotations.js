const {
    quotation
} = require("../model/index.js");

exports.listQuotations = async ( req, res ) => {
    try {
        const allQuotations = await quotation.find({});
        res.status(200).json(allQuotations);
    } catch ( error ) {
        res.status(400).json({error: error});
    }
}