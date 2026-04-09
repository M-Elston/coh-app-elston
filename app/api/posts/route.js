import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// Create a post
export async function Post(req) {
    await connectDB();
    const body = await req.json();
    const post = await Post.create(body);
    return Response.json(post);
}

//Get all posts
export async function GET() {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return Response.json(posts);
}