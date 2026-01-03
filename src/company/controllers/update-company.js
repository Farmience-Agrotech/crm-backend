const { Companies } = require('../model/company-schema.js');

exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params; // ID from URL
        const updates = req.body;

        let targetCompanyId;

        if (req.user.type === 'SUPER_ADMIN') {
            targetCompanyId = id;
        } else {
            targetCompanyId = req.user.company;
        }

        delete updates.slug;

        if (req.user.type !== 'SUPER_ADMIN') {
            delete updates.status;
            delete updates.maxUsers;
        }

        const updatedCompany = await Companies.findByIdAndUpdate(
            targetCompanyId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.status(200).json({
            message: "Company profile updated",
            company: updatedCompany
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};