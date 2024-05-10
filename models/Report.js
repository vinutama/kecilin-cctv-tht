const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validReportStatus } = require("../helpers/utils");

const ReportSchema = new Schema({
    cctv: {
        type: Schema.Types.ObjectId, ref: `Cctv`
    },
    owner: {
        type: Schema.Types.ObjectId, ref: `User`
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "investigate",
        enum: validReportStatus
    }
}, { timestamps: true });

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;