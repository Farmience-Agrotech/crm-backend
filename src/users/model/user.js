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
    role: {
        type: String,
        enum: ["ADMIN", "USER", "EDITOR"],
        default: "USER"
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