const { createCategory } = require('./create-category.js');
const { getAllCategories } = require('./list-categories.js');
const { updateCategory } = require('./update-category.js');
const { deleteCategory } = require('./delete-category.js');
module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
}