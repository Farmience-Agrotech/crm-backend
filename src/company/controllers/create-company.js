const { Companies } = require('../model/company-schema.js');

exports.createCompany = async (req, res) => {
    try {
        const {
            name,
            status,
            companyInfo,
            bankDetails,
            maxUsers
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Company name is required" });
        }

        const existing = await Companies.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: "Company already exists" });
        }

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newCompany = await Companies.create({
            name,
            slug,
            status: status || 'ACTIVE',
            companyInfo,
            bankDetails,
            maxUsers
        });

        res.status(201).json({
            message: "Company created successfully",
            company: newCompany
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};