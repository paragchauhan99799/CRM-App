const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    contactFirstName: {
        type: String,
        required: true
    },
    contactLastName: {
        type: String
    },
    contactAccountName: {
        type: String
    },
    contactEmail: {
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

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;

