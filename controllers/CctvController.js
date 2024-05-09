const Cctv = require('../models/Cctv');

module.exports = {
    add: function (req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        let newCctv = {model, area, ip_address, status} = req.body;
        Cctv
            .create(newCctv)
            .then((cctv) => {
                res.status(201).json({message: "Success add new CCTV", data: cctv});
            })
            .catch((err) => {
                err = err.errors;
                badReqErr = res.status(400);
                if (err.hasOwnProperty('model')) {
                    badReqErr.json({message: err.model.message})
                } else if (err.hasOwnProperty('area')) {
                    badReqErr.json({message: err.area.message})
                } else if (err.hasOwnProperty('ip_address')) {
                    badReqErr.json({message: err.ip_address.message})
                } else if (err.hasOwnProperty('status')) {
                    badReqErr.json({message: err.status.message})
                } else {
                    res.status(500).json({message: err.message})
                }
            })
    },
    findAll: function(req, res) {
        Cctv
        .find({})
        .then((cctvs) => {
            res.status(200).json({message: "CCTVs retrieved", data: cctvs});
        })
        .catch((err) => {
            res.status(500).json({message: err.message});
        })
    },
    findOne: function (req, res) {
        Cctv
            .findOne({_id: req.params.id})
            .then((cctv) => {
                if (cctv) {
                    res.status(200).json({message: "CCTV retrieved", data: cctv});
                } else {
                    res.status(404).json({
                        message: "CCTV not found"
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                });
            })
    },
    update: function(req, res) {
        let editCctv = {model, area, ip_address, status} = req.body;
        Cctv
            .findOneAndUpdate({_id: req.params.id}, editCctv, {new: true, runValidators: true})
            .then((cctv) => {
                if (cctv) {
                    res.status(200).json({message: "Success edit CCTV", data: cctv});
                } else {
                    res.status(404).json({
                        message: "CCTV not found"
                    });
                }
            })
            .catch((err) => {
                err = err.errors;
                badReqErr = res.status(400);
                if (err.hasOwnProperty('model')) {
                    badReqErr.json({message: err.model.message})
                } else if (err.hasOwnProperty('area')) {
                    badReqErr.json({message: err.area.message})
                } else if (err.hasOwnProperty('ip_address')) {
                    badReqErr.json({message: err.ip_address.message})
                } else if (err.hasOwnProperty('status')) {
                    badReqErr.json({message: err.status.message})
                } else {
                    res.status(500).json({message: err.message})
                }
            })
    },
    delete: function(req, res) {
        Cctv
            .findOneAndUpdate({_id: req.params.id}, {isDeleted: true}, {new: true})
            .then((cctv) => {
                if (cctv) {
                    res.status(200).json({message: "CCTV removed", data: cctv});
                } else {
                    res.status(404).json({message: "CCTV not found"});
                }
            })
            .catch((err) => {
                res.status(500).json({message: err.message});
            })
    }       
};