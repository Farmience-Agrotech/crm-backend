const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxLength: 250
    },

    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    description : {
        type: String,
    }
});

const Categories = mongoose.model('Category', categorySchema);
module.exports = {
    Categories
};