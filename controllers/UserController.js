const User = require('../models/User');
const { verifyPassword, generateToken } = require('../helpers')

module.exports = {
    add: function (req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ message: "Request body is empty" });
        }

        let newUser = {name, username, password, role} = req.body;
        if (role == 'superadmin') {
            res.status(401).json({message: "You cannot create user more than 1 superadmin role"});
        }

        User
            .create(newUser)
            .then((user) => {
                res.status(201).json({message: "Success add user", data: user});
            })
            .catch((err) => {
                const customErr = err.errors;
                const badReqErr = res.status(400);
                if (customErr.hasOwnProperty('name')) {
                    badReqErr.json({message: customErr.name.message})
                } else if (customErr.hasOwnProperty('username')) {
                    badReqErr.json({message: customErr.username.message})
                } else if (customErr.hasOwnProperty('password')) {
                    badReqErr.json({message: customErr.password.message})
                } else if (customErr.hasOwnProperty('role')) {
                    badReqErr.json({message: customErr.role.message})
                } else {
                    res.status(500).json({message: err.message})
                }
            })
    },
    login: function(req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        User
            .findOne({username: req.body.username })
            .then((user) => {
                if(user) {
                    if (verifyPassword(req.body.password, user.password)) {
                        let token = generateToken({
                            name: user.name,
                            username: user.username
                        });
                        res.status(200).json({
                            message: "Login successfully",
                            data: {
                                accessToken: token,
                                name: user.name,
                                username: user.username,
                                role: user.role
                            }
                        });
                    } else {
                        res.status(400).json({
                            message: 'Wrong password'
                        });
                    }
                } else {
                    res.status(400).json({
                        message: 'Wrong useranme'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                });
            })
    },
    findAll: function(req, res) {
        User
            .find({})
            .then((users) => {
                res.status(200).json({message: "Users retrieved", data: users});
            })
            .catch((err) => {
                res.status(500).json({message: err.message});
            })
    },
    delete: function(req, res) {
        User
            .findOne({_id: req.params.id})
            .then((user) => {
                if (user) {
                    return User
                            .deleteOne({_id: req.params.id})
                } else {
                    res.status(404).json({message: "User does not exist"});
                }
            })
            .then(() => {
                res.status(200).json({message: "Success delete user"});
            })
            .catch((err) => {
                res.status(500).json({message: err.message});
            })
    },
    update: function(req, res) {
        let editUser = {name, username, password, role} = req.body;
        if (role == 'superadmin') {
            res.status(401).json({message: "You cannot assign user to the superadmin"});
        }
        User
            .findOneAndUpdate({_id: req.params.id}, editUser, {new: true, runValidators: true})
            .then((user) => {
                if (user) {
                    res.status(200).json({message: "Success edit user", data: user});
                } else {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
            })
            .catch((err) => {
                const customErr = err.errors;
                const badReqErr = res.status(400);
                if (customErr.hasOwnProperty('name')) {
                    badReqErr.json({message: customErr.name.message})
                } else if (customErr.hasOwnProperty('username')) {
                    badReqErr.json({message: customErr.username.message})
                } else if (customErr.hasOwnProperty('password')) {
                    badReqErr.json({message: customErr.password.message})
                } else if (customErr.hasOwnProperty('role')) {
                    badReqErr.json({message: customErr.role.message})
                } else {
                    res.status(500).json({message: err.message})
                }
            })
    }
};