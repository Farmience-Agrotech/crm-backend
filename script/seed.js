const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Companies} = require('../src/company/model/company-schema.js');
const { Users } = require('../src/users/model/user.js');
const { Roles } = require('../src/users/model/role-schema.js');

mongoose.connect('mongodb://localhost:27017').then(() => console.log("DB Connected"));

const seed = async () => {
    try {
        // 1. Create the Company
        console.log("Creating Company...");
        const company = await Companies.create({
            name: "TechCorp",
            status: "ACTIVE",
            subscriptionPlan: "PRO"
        });

        // 2. Create the System Admin Role
        console.log("Creating Admin Role...");
        const adminRole = await Roles.create({
            name: "Super Admin",
            company: company._id,
            isSystemRole: true,
            permissions: [
                "user.create", "user.view", "user.edit", "user.delete",
                "role.create", "role.view", "role.edit", "role.delete",
                "customer.create", "customer.view", "customer.edit", "customer.delete"
            ]
        });

        // 3. Create the Admin User
        console.log("Creating Admin User...");

        await Users.create({
            userName: "techcorp_admin",
            password: "admin123",
            type: "COMPANY_USER",
            role: adminRole._id,
            company: company._id
        });

        console.log("Seed Successful! You can now login with 'techcorp_admin' / 'admin123'");
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

seed();