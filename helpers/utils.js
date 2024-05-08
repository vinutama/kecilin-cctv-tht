
const validRoles = ['Admin', 'Maintainer', 'User'];
const bcryptSalt = process.env.BCRYPT_SALT;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    validRoles,
    bcryptSalt,
    jwtSecret
};