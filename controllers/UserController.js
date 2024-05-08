const User = require('../models/User');

module.exports = {
    add: function (req, res) {
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
    }
};