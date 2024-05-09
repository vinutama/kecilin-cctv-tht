const User = require('../models/User');
const { verifyToken } = require('../helpers');

module.exports = {
    authenticate: function(req, res, next) {
        let token = req.headers.authorization;
        if(token) {
            let decoded = verifyToken(token);
            User
                .findOne({username: decoded.username})
                .then((user) => {
                    if (user) {
                        req.currentUser = {
                            _id: user._id,
                            name: user.name,
                            username: user.username,
                            role: user.role
                        };
                        next();
                    } else {
                        res.status(401).json({
                            message: 'Token expired'
                        })
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        message: `Internal server error ${err}`
                    })
                })
        } else {
            res.status(401).json({
                message: 'Missing token'
            })
        }
    },
    isAdmin: function(req, res, next) {
        if (req.currentUser.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                message: 'Only Admin can perform this action'
            });
        }
    },
    isMaintainer: function(req, res, next) {
        let role = req.currentUser.role
        if (role === 'admin' || role || 'maintainer') {
            next();
        } else {
            res.status(401).json({
                message: `You don't have Maintainer role to perform this action`
            })
        }
    }

}