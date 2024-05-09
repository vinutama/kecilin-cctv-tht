const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validCctvStatus } = require("../helpers/utils");

const CctvSchema = new Schema({
    model: {
        type: String,
        required: [true, "Model must be filled"],
    },
    area: {
        type: String,
        required: [true, "Area must be filled"],
    },
    ipAddress: {
        type: String,
        required: [true, "Ip address must be filled"],
        validator: async function (ipAddress) {
            const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

            let validIp = ipv4Regex.test(ipAddress);
            if (!validIp) {
                throw new Error('IP address invalid must have format IPv4');
            }
            return validIp;
        },
        validator: async function (ipAddress) {
            const foundIp = await Cctv.findOne({ipAddress, _id: {$ne: this._id}});
            if (foundIp) {
                throw new Error('IP address already used');
            }
            return true;
        }
    },
    status: {
        type: String,
        default: "Inactive",
        enum: validCctvStatus
    },
    notes: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Cctv = mongoose.model('Cctv', CctvSchema);

module.exports = Cctv;