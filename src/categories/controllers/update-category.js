const { Categories } = require("../model/category-schema.js");

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parentId, description } = req.body;
        const userCompany = req.user.company;

        const category = await Categories.findOne({ _id: id, company: userCompany });

        if (!category) {
            return res.status(404).json({
                error: "Category not found or access denied.",
            });
        }

        if (name && name !== category.name) {
            const duplicate = await Categories.findOne({
                name: name,
                company: userCompany
            });

            if (duplicate) {
                return res.status(409).json({
                    error: "Category name already exists in your records.",
                });
            }
        }

        if (parentId) {
            if (String(parentId) === String(id)) {
                return res.status(400).json({
                    error: "Category cannot be its own parent.",
                });
            }

            const parentExists = await Categories.findOne({
                _id: parentId,
                company: userCompany
            });

            if (!parentExists) {
                return res.status(400).json({
                    error: "Parent category does not exist or access denied.",
                });
            }
        }


        const updatedCategory = await Categories.findOneAndUpdate(
            { _id: id, company: userCompany },
            {
                $set: {
                    name: name || category.name,
                    description: description || category.description,
                    parentId: parentId === undefined ? category.parentId : parentId
                }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ updatedCategory });
    } catch ( error ) {
        return res.status(404).json({
            error: error.message,
        })
    }
}