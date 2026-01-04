const {Categories} = require("../model/category-schema.js");

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const userCompany = req.user.company;
        const category = await Categories.findOne({
            _id: id,
            company: userCompany
        });

        if (!category) {
            return res.status(404).json({
                error: "Category not found or access denied.",
            });
        }

        await Categories.updateMany(
            { parentId: id , company: userCompany },
            { $set: { parentId: null } }
        );

        await Categories.deleteOne({ _id: id });
        res.status(200).json({
            message: "Category deleted successfully. Subcategories are now top-level.",
            deletedId: id
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};