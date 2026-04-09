import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: String,
    name: String,
    archetype: String,
    imageUrl: String,
    externalLinks: [String],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);