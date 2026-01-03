const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    permissions: [
        {
            type: String,
            required: true,
        }
    ],

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    isSystemRole : {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

roleSchema.index({ company: 1, name: 1 }, { unique: true });

const Roles = mongoose.model("Role", roleSchema);
module.exports = {
    Roles
}