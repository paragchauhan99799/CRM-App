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
    permissions: {
        type: Number,
        default: 7
    },
    // create notes and associate with client
    note: [{
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Note"
    }],
    // when the user was created
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { autoCreate: true });

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;

