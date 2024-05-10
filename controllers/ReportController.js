const Report = require('../models/Report');
const Cctv = require('../models/Cctv');

module.exports = {
    add: function (req, res) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        let newReport = {
            description: req.body.description,
            status: req.body.status,
            owner: req.currentUser._id,
        };
        let reportRow = "";
        Cctv
            .findOne({ _id: req.params.cctvId })
            .then((cctv) => {
                if (cctv) {
                    return Report
                                .create(newReport)
                } else {
                    return res.message(404).json({
                        message: `CCTV does not exist`
                    });
                }
            })
            .then((report) => {
                reportRow = report
                return Cctv
                        .findOneAndUpdate({_id: req.params.cctvId}, {$push: {reports: report._id}}, {new: true});
            })
            .then((result) => {
                return res.status(201).json({message: "Success add report", data: reportRow});
            })
            .catch((err) => {
                err = err.errors;
                
                if (err.hasOwnProperty('status')) {
                    return res.status(400).json({message: err.status.message});
                } else {
                    return res.status(500).json({message: err.message});
                }
            })
    },
    findReportsByCctv: function(req, res) {
        let filters = {}
        const userId = req.query.userId;
        const role = req.currentUser.role;
        if (role == 'superadmin' || role == 'admin') {
            if (userId) {
                filters.owner = userId;
            }
        } else {
            filters.owner = req.currentUser._id;    
        }

        
        let sortOptions = {createdAt: -1};
        const page = parseInt(req.query.offset) || 1;
        const pageLimit = parseInt(req.query.limit) || 5;

        const statusVal = req.query.status;
        if (statusVal) {
            filters.status = statusVal;
        }

        const dateVal = req.query.date;
        if (dateVal) {
            const specificDate = new Date(dateVal);
            filters.createdAt = specificDate.toISOString();
        }

        const sort = req.query.sort;
        if(sort) {
            const sortMod = sort === 'asc' ? 1 : sort === 'desc' ? -1 : -1;
            sortOptions.createdAt = sortMod;
        }

        Cctv
            .findOne({_id: req.params.cctvId})
            .populate({
                path: 'reports',
                match: filters,
                options: {
                    limit: pageLimit,
                    skip: (page - 1) * pageLimit,
                    sort: sortOptions,
                }
            })

            .then((cctv) => {
                if (!cctv) {
                    return res.status(404).json({message: "CCTV does not exist"});
                }
                return res.status(200).json({message: "Reports retrieved", data: cctv.reports});
            })
            .catch((err) => {
                return res.status(500).json({message: err.message});
            })
    },
    findOne: function(req, res) {
        Report
            .findOne({_id: req.params.id})
            .then((report) => {
                if (report) {
                    return res.status(200).json({message: "Report retrieved", data: report});
                } else {
                    return res.status(404).json({
                        message: "Report does not exist"
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
        let editReport = {description, status} = req.body;
        Report
            .findOneAndUpdate({_id: req.params.id}, editReport, {new: true, runValidators: true})
            .then((report) => {
                if (report) {
                    return res.status(200).json({message: "Success edit Report", data: report});
                } else {
                    return res.status(404).json({
                        message: "Report not found"
                    });
                }
            })
            .catch((err) => {
                customErr = err.errors;
                badReqErr = res.status(400);
                if (err.hasOwnProperty('status')) {
                    return res.status(400).json({message: customErr.status.message})
                } else {
                    return res.status(500).json({message: err.message})
                }
            })
    },
    delete: function(req, res) {
        let reportId = req.params.id;
        Report
            .findOne({_id: reportId})
            .then((report) => {
                if (report) {
                    return Cctv
                        .findOneAndUpdate({_id: req.currentUser._id}, {$pull: {reports: reportId}}, {new: true})
                } else {
                    return res.status(404).json({message: "Report does not exist"});
                }
            })
            .then((cctv) => {
                return Report.deleteOne({_id: reportId})
            })
            .then(() => {
                return res.status(200).json({message: "Delete report success"})
            })
            .catch((err) => {
                return res.status(500).json({message: err.message});
            })
    }
}