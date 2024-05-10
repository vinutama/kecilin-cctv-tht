const User = require('../models/User');
const { verifyToken } = require('../helpers');
const Report = require('../models/Report');

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
                        message: err.message
                    })
                })
        } else {
            res.status(401).json({
                message: 'Missing token'
            })
        }
    },
    isSuperAdmin: function(req, res, next) {
        if (req.currentUser.role == 'superadmin') {
            next();
        } else {
            res.status(401).json({
                message: 'Only Super Admin can perform this action'
            });
        }
    },
    isAdmin: function(req, res, next) {
        if (req.currentUser.role == 'superadmin' || req.currentUser.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                message: 'Only Admin can perform this action'
            });
        }
    },
    isReportOwner: function(req, res, next) {
        let role = req.currentUser.role;
        if (role === 'superadmin') {
            next();
        } else {
            Report
                .findOne({owner: req.currentUser._id})
                .then((owner) => {
                    if(owner) {
                        next();
                    } else {
                        res.status(401).json({message: "You don't have permission to perform this action"});
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err.message
                    })
                })
        }

    }

}