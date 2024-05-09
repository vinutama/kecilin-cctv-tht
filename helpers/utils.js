
const validRoles = ['admin', 'maintainer', 'user'];
const validCctvStatus = ['active', 'inactive'];
const validActStatus = ['investigate', 'suspicious', 'criminal_detected', 'clear'];
const {BCRYPT_SALT, JWT_SECRET, ADMIN_USER, ADMIN_PASS} = process.env;

module.exports = {
    validRoles,
    BCRYPT_SALT,
    JWT_SECRET,
    ADMIN_USER,
    ADMIN_PASS,
    validCctvStatus
};