const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
}, { autoCreate: true });

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;

