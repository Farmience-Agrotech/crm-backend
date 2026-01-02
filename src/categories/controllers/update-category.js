const { Categories } = require("../model/category-schema.js");

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parentId, description } = req.body;
        const category = await Categories.findById(id);
        if (!category) {
            return res.status(404).json({
                error: "Category not found",
            });
        }

        if ( name && name !== category.name ){
            const duplicate = await Categories.findOne({ name });
            if ( duplicate ) {
                return res.status(400).json({
                    error: "Category already exists",
                })
            }
        }

        if ( parentId ) {
            if ( parentId === id ) {
                return res.status(400).json({
                    error: "Category cannot be its own parent",
                })
            }
        }

        const parentExists = await Categories.findById(parentId);

        if (parentId && !parentExists) {
            return res.status(400).json({
                error: "Parent category does not exists",
            })
        }


        const updatedCategory = await Categories.findByIdAndUpdate(
            id,
            { name, parentId, description },
            { new: true, runValidators: true}
        )
        res.status(200).json({
            updatedCategory,
        })
    } catch ( error ) {
        return res.status(404).json({
            error: error.message,
        })
    }
}