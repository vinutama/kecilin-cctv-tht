
const validRoles = ['superadmin', 'admin', 'maintainer'];
const validCctvStatus = ['active', 'inactive'];
const validReportStatus = ['investigate', 'suspicious', 'criminal_detected', 'clear'];
const {BCRYPT_SALT, JWT_SECRET, ADMIN_USER, ADMIN_PASS} = process.env;

module.exports = {
    validRoles,
    BCRYPT_SALT,
    JWT_SECRET,
    ADMIN_USER,
    ADMIN_PASS,
    validCctvStatus,
    validReportStatus
};