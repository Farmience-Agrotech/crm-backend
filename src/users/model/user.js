const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type : {
        type: String,
        enum: ["SUPER_ADMIN", "COMPANY_USER"],
        default: "COMPANY_USER"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required : function () { return this.type === 'COMPANY_USER'}
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: function () { return this.role !== 'SUPER_ADMIN'; },
    }
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if ( !this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    // next();
})

userSchema.methods.comparePassword = async function ( candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const Users = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = {
    Users
}