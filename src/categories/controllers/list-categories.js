const { Categories } = require('../model/category-schema.js');

exports.getAllCategories = async (req, res) => {
    try {
        const userCompany = req.user.company;
        const categories = await Categories.find({ company: userCompany })
            .populate('parentId', 'name')
            .sort({ name: 1 });

        res.status(200).json({
            count: categories.length,
            categories
        });

    } catch ( error ) {
        res.status(500).json({
            error: error.message
        })
    }
}