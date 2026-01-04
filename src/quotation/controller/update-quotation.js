const {
    quotation
} = require("../model/index.js");

exports.updateQuotation = async (req, res) => {
    try {
        const {
            quotationId,
            values
        } = req.body;
        const userCompany = req.user.company;

        delete values.company;
        delete values.quotationNumber;
        delete values._id;


        const updatedQuotation = await quotation.findOneAndUpdate(
            {_id: quotationId, company: userCompany},
            { $set: values},
            {new: true, runValidators: true}
        );

        if (!updatedQuotation) {
            return res.status(404).json({
                error: "Quotation not found or access denied."
            });
        }

        res.status(200).json(updatedQuotation);

    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}