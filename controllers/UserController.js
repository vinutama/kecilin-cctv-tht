const User = require('../models/User');

module.exports = {
    add: function (req, res) {
        let newUser = {...req.body};
        User
            .create(newUser)
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((err) => {
                let {name, username, password, role} = err.errors;
                let errMsg = name ? name.message : username ? username.message : password ? password.message : role ? role.message: "";
                if (errMsg) {
                    res.status(400).json(errMsg);
                } else {
                    res.status(500).json(err.message);
                }
            })
    }
}