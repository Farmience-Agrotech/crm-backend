const { Companies } = require('../model/company-schema.js');

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Companies.findById(id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        await Companies.findByIdAndDelete(id);

        res.status(200).json({
            message: `Company '${company.name}' deleted successfully`
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};