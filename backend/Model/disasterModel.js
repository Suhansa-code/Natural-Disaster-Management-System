const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disasterSchema = new Schema({
    disasterType: {
        type: String,
        required: true,
    },
    severityLevel: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String // Store image URLs (e.g., from cloud storage like AWS S3, Firebase, etc.)
        }
    ],
    dateTimeOfIncident: {
        type: Date,
        default: Date.now // Auto-set to current time but can be changed
    },
    exactLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    numberOfPeopleAffected: {
        type: Number,
        default: 0 // Optional, default value set to zero
    },
    additionalNotes: {
        type: String
    }
});

module.exports = mongoose.model(
    "Disaster",
     disasterSchema
    );
