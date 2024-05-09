const User = require('../models/User');
const { ADMIN_USER, ADMIN_PASS} = require('./utils');

module.exports = {
    // create admin user
    createAdminUser: async function() {
        try {
            const existingAdmin = await User.findOne({username: ADMIN_USER});
            if (!existingAdmin) {    
                const newUser = new User({
                    name: 'admin',
                    username: ADMIN_USER,
                    password: ADMIN_PASS,
                    role: "Admin"
                });
    
                await newUser.save();
            } else {
                console.log("User admin already exist, ignore this message.");
            }
        } catch (err) {
            console.error('Error when creating admin user: ', err);
        }   
    }
}