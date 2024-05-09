const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validActStatus } = require("../helpers/utils");

const ActivitySchema = new Schema({
    cctv: {
        type: Schema.Types.ObjectId, ref: `Cctv`
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "investigate",
        enum: validActStatus
    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;