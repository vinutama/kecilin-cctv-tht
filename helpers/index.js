const User = require('../models/User');
const { ADMIN_USER, ADMIN_PASS, JWT_SECRET} = require('./utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
                    role: "admin"
                });
    
                await newUser.save();
            } else {
                console.log("User admin already exist, ignore this message.");
            }
        } catch (err) {
            console.error('Error when creating admin user: ', err);
        }   
    },
    generateToken: function(user) {
        return jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});
    },
    verifyToken: function(token) {
        return jwt.verify(token, JWT_SECRET);
    },
    verifyPassword: function(pass, hashedPass) {
        try {
            return bcrypt.compareSync(pass, hashedPass);
        } catch (error) {
            return false;
        }
    }
}