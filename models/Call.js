const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallSchema = new Schema({
    owner: {
        type: Number,
        required: true
    },
    contactTo: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum:["OUTBOUND", "INBOUND"]
    },
    status: {
        type: String,
        required: true,
        enum: ["SCHEDULED","COMPLETED","CANCELED","OVERDUE"]
    },
    time: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    }, 
    purpose:{
        type: String,
        required: true,
        enum: ["PROSPECTING","ADMINISTRATIVE","NEGOTIATION","DEMO","PROJECT","DESK"]
    },
    note: [],
    created_at: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        type: Date,
        default: Date.now,
    },
    modify_at: {
        type: Date,
        default: Date.now,
    },
    modify_by: {
        type: Date,
        default: Date.now,
    }

}, { autoCreate: true });

const Call = mongoose.model("Call", CallSchema);

module.exports = Call;

