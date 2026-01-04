const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    company : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company ',
      required: true,
      index: true,
    },
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
categorySchema.index({ company: 1, name: 1 }, { unique: true });
const Categories = mongoose.model('Category', categorySchema);
module.exports = {
    Categories
};