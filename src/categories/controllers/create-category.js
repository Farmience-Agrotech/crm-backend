const { Categories } = require("../model/category-schema.js");

exports.createCategory = async (req, res) => {
    try {

        const {
            name,
            parentId,
            description
        } = req.body;
        const userCompany = req.user.company;

        const existingCategory = await Categories.findOne({
            name: name,
            company: userCompany
        });
        if (existingCategory) {
            return res.status(400).json({
                error: 'Category already exists',
            });
        }


        if (parentId) {
            const parentExists = await Categories.findOne({
                _id: parentId,
                company: userCompany // Ensure parent also belongs to you
            });

            if (!parentExists) {
                return res.status(404).json({
                    error: "Parent category does not exist or access denied.",
                });
            }
        }

        const createdCategory = await Categories.create({
            company: userCompany,
            name,
            parentId: parentId || null,
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