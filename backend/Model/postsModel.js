const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, enum: ['Disaster', 'Resources'] },
        location: { type: String, required: true },
        disasterDate: { type: Date},
        imageUrl: { type: String, default: null },
        likes: { type: [String], default: [] }, // ✅ Ensure likes is an array
        comments: [
        {
            user: String,
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
        ],
        isUpcoming: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
