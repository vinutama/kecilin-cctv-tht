const Cctv = require('../models/Cctv');

module.exports = {
    add: function (req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        let newCctv = {model, area, ipAddress, status} = req.body;
        Cctv
            .create(newCctv)
            .then((cctv) => {
                const resp = {model, area, ipAddress, status, createdAt, updatedAt} = cctv
                return res.status(201).json({message: "Success add new CCTV", data: resp});
            })
            .catch((err) => {
                const customErr = err.errors;
                const badReqErr = res.status(400);
                if (customErr.hasOwnProperty('model')) {
                    return badReqErr.json({message: customErr.model.message})
                } else if (customErr.hasOwnProperty('area')) {
                    return badReqErr.json({message: customErr.area.message})
                } else if (customErr.hasOwnProperty('ipAddress')) {
                    return badReqErr.json({message: customErr.ipAddress.message})
                } else if (customErr.hasOwnProperty('status')) {
                    return badReqErr.json({message: customErr.status.message})
                } else {
                    return res.status(500).json({message: err.message})
                }
            })
    },
    findAll: function(req, res) {
        // by default we search when isDeleted false or not 'soft' deleted 
        let filters = {isDeleted: false};
        let sortOptions = {createdAt: -1};
        const page = parseInt(req.query.offset) || 1;
        const pageLimit = parseInt(req.query.limit) || 5;

        const filterMapper = {
            model: {field: "model", caseInsensitive: true},
            area: {field: "area", caseInsensitive: true},
            status: {field: "status", caseInsensitive: false},
            ip: {field: "ipAddress", caseInsensitive: true},
        }
        for (const filter in filterMapper) {
            const {field, caseInsensitive} = filterMapper[filter];
            const paramVal = req.query[filter];
            if (paramVal) {
                if (caseInsensitive) {
                    filters[field] = {$regex: paramVal, $options: "i"};
                } else {
                    filters[field] = paramVal;
                }
            }
        }

        const sort = req.query.sort;
        if(sort) {
            const sortMod = sort === 'asc' ? 1 : sort === 'desc' ? -1 : -1;
            sortOptions.createdAt = sortMod;
        }

        Cctv
            .find(filters)
            .sort(sortOptions)
            .skip((page - 1) * pageLimit)
            .limit(pageLimit)
            .then((cctvs) => {
                return res.status(200).json({message: "CCTVs retrieved", data: cctvs});
            })
            .catch((err) => {
                return res.status(500).json({message: err.message});
            })
    },
    findOne: function (req, res) {
        Cctv
            .findOne({_id: req.params.id})
            .then((cctv) => {
                if (cctv) {
                    return res.status(200).json({message: "CCTV retrieved", data: cctv});
                } else {
                    return res.status(404).json({
                        message: "CCTV not found"
                    });
                }
            })
            .catch((err) => {
                return res.status(500).json({
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
                    return res.status(200).json({message: "Success edit CCTV", data: cctv});
                } else {
                    return res.status(404).json({
                        message: "CCTV not found"
                    });
                }
            })
            .catch((err) => {
                const customErr = err.errors;
                const badReqErr = res.status(400);
                if (customErr.hasOwnProperty('model')) {
                    return badReqErr.json({message: customErr.model.message})
                } else if (customErr.hasOwnProperty('area')) {
                    return badReqErr.json({message: customErr.area.message})
                } else if (customErr.hasOwnProperty('ipAddress')) {
                    return badReqErr.json({message: customErr.ipAddress.message})
                } else if (customErr.hasOwnProperty('status')) {
                    return badReqErr.json({message: customErr.status.message})
                } else {
                    return res.status(500).json({message: err.message})
                }
            })
    },
    delete: function(req, res) {
        Cctv
            .findOne({_id: req.params.id})
            .then((cctv) => {
                if (!cctv) {
                    return res.status(404).json({ message: "CCTV not found" });
                }
                if (cctv.status !== 'inactive') {
                    return res.status(400).json({ message: "Cannot delete CCTV that is still active" });
                }
                Cctv.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true }, { new: true })
                .then((removedCctv) => {
                    if (removedCctv) {
                        return res.status(200).json({message: "CCTV removed", data: removedCctv});
                    } 
                        return res.status(404).json({message: "CCTV not found"});
                })
                .catch((err) => {
                    return res.status(500).json({message: err.message});
                })
            })
            .catch((err) => {
                return res.status(500).json({message: err.message});
            })
    }       
};