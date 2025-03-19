import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, enum: ['Disaster', 'Resources'] },
        location: { type: String, required: true },
        disasterDate: { type: Date, required: true },
        imageUrl: { type: String, default: null },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
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

export default mongoose.model("Post", PostSchema);
