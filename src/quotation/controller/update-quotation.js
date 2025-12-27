const {
    quotation
} = require("../model/index.js");

exports.updateQuotation = async (req, res) => {
    try {
        const {
            quotationId,
            values
        } = req.body;

        const existingQuotation = await quotation.find({quotationId});

        if (!existingQuotation) {
            return res.status(400).json({
                error: "Could not find quotation"
            });
        }

        const updatedQuotation = await quotation.findByIdAndUpdate(
            quotationId,
            { $set: values},
            {new: true, runValidators: true}
        )

        res.status(200).json(updatedQuotation);

    } catch ( error ) {
        res.status(400).json({error: error});
    }
}