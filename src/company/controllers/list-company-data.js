const { Companies } = require('../model/company-schema.js');

exports.getCompanyProfile = async (req, res) => {
    try {
        const userCompanyId = req.user.company;

        if (!userCompanyId) {
            return res.status(400).json({ error: "User is not linked to any company" });
        }

        const company = await Companies.findById(userCompanyId);

        if (!company) {
            return res.status(404).json({ error: "Company profile not found" });
        }

        res.status(200).json({
            company
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.listCompanies = async (req, res) => {
//     try {
//         // Only allow pagination/filtering if needed
//         const companies = await Companies.find({})
//             .select('name status contactEmail maxUsers createdAt') // Select specific fields for list view
//             .sort({ createdAt: -1 });
//
//         res.status(200).json({ count: companies.length, companies });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };