const {Categories} = require("../model/category-schema.js");

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Categories.findById(id);
        if (!category) {
            return res.status(404).json({
                error: "Category not found",
            });
        }

        await Categories.updateMany(
            { parentId: id },
            { $set: { parentId: null } }
        );

        await Categories.findByIdAndDelete(id);

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