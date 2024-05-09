
const validRoles = ['Admin', 'Maintainer', 'User'];
const {BCRYPT_SALT, JWT_SECRET, ADMIN_USER, ADMIN_PASS} = process.env;

module.exports = {
    validRoles,
    BCRYPT_SALT,
    JWT_SECRET,
    ADMIN_USER,
    ADMIN_PASS
};