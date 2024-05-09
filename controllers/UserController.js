const User = require('../models/User');
const { verifyPassword, generateToken } = require('../helpers')

module.exports = {
    add: function (req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        let newUser = {name, username, password, role} = req.body;
        User
            .create(newUser)
            .then((user) => {
                res.status(201).json({message: "Success add user", data: user});
            })
            .catch((err) => {
                err = err.errors;
                badReqErr = res.status(400);
                if (err.hasOwnProperty('name')) {
                    badReqErr.json({message: err.name.message})
                } else if (err.hasOwnProperty('username')) {
                    badReqErr.json({message: err.username.message})
                } else if (err.hasOwnProperty('password')) {
                    badReqErr.json({message: err.password.message})
                } else if (err.hasOwnProperty('role')) {
                    badReqErr.json({message: err.role.message})
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
                    message: `Internal server error: ${err}`
                });
            })
    }
};