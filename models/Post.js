import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: String },
    archetype: { type: String, default: null },
    imageUrl: { type: String, default: null },
    youtubeUrl: { type: String, default: null },
    externalLink: { type: String, default: null },
    appVersion: { type: String, default: "v1" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);