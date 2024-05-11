const User = require('../models/User');
const { verifyToken } = require('../helpers');
const Report = require('../models/Report');
const { TokenExpiredError } = require('jsonwebtoken');

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
                        return res.status(404).json({
                            message: 'User not founnd'
                        })
                    }
                })
                .catch((err) => {
                    if (err instanceof TokenExpiredError) {
                        return res.status(401).json({
                            message: "Token expired"
                        })
                    }
                    return res.status(500).json({
                        message: err.message
                    })
                })
        } else {
            return res.status(401).json({
                message: 'Missing token'
            })
        }
    },
    isSuperAdmin: function(req, res, next) {
        if (req.currentUser.role == 'superadmin') {
            next();
        } else {
            return res.status(401).json({
                message: 'Only Super Admin can perform this action'
            });
        }
    },
    isAdmin: function(req, res, next) {
        if (req.currentUser.role == 'superadmin' || req.currentUser.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                message: 'Only Admin can perform this action'
            });
        }
    },
    isReportOwner: function(req, res, next) {
        let role = req.currentUser.role;
        let reportId = req.params.id;
        if (role === 'superadmin') {
            next();
        } else {
            Report
                .findOne({owner: req.currentUser._id, _id: reportId})
                .then((owner) => {
                    if(owner) {
                        next();
                    } else {
                        return res.status(401).json({message: "You don't have permission to perform this action"});
                    }
                })
                .catch((err) => {
                    return res.status(500).json({
                        message: err.message
                    })
                })
        }

    }

}