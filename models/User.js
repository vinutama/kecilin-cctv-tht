const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const {bcryptSalt, validRoles} = require("../helpers/utils");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must be filled"]
    },
    username: {
        type: String,
        required: [true, "Username must be filled"],
        validate: {
            validator: function (username) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({ username, _id: {$ne: this._id}})
                        .then(found => {
                            if(found) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        })
                })
            }, msg: 'Username already exists'
        }
    },
    password: {
        type: String,
        required: [true, 'Password must be filled'],
        minlength: [6, 'Minimum characters is 6'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contains uppercase, lowercase, number and special characters!']
    },
    role: {
        type: String,
        default: 'User',
        enum: validRoles
    }
});

UserSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;