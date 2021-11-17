const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyDomain: {
        type: String
    },
    companyType: {
        type: String
    },
    contactName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
}, { autoCreate: true });

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;

