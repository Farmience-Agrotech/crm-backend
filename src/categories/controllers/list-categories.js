const { Categories } = require('../model/category-schema.js');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.status(200).json({categories});
    } catch ( error ) {
        res.status(500).json({
            error: error.message
        })
    }
}