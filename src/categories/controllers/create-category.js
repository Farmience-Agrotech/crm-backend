const { Categories } = require("../model/category-schema.js");

exports.createCategory = async (req, res) => {
    try {

        const {
            name,
            parentId,
            description
        } = req.body;

        const existingCategory = await Categories.findOne({name});
        if (existingCategory) {
            return res.status(400).json({
                error: 'Category already exists',
            });
        }


        if ( parentId ) {
            const parentExists = await Categories.findById(parentId);
            if (!parentExists) {
                return res.status(400).json({
                    error: "Parent does not exist",
                })
            }
        }

        const createdCategory = await Categories.create({
            name,
            parentId,
            description,
        });

        res.status(201).json({
            createdCategory
        })

    } catch ( error ) {
        res.status(400).send({
            error: error.message,
        })
    }
}