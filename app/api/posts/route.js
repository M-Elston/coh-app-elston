import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";

// Get All Posts
export async function GET() {
    await connectDB();
    const posts = await Post.find({ appVersion: "v1" }).sort({ createdAt: -1 });
    return Response.json(posts);
}

// Create Post
export async function POST(req) {
    try {
        await connectDB();
        const user = verifyToken(req);
        if (!user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const {
            title,
            content,
            imageUrl,
            youtubeUrl,
            externalLink,
            archetype
        } = await req.json();
        
        const newPost = await Post.create({
            title,
            content,
            imageUrl: imageUrl || null,
            youtubeUrl: youtubeUrl || null,
            externalLink: externalLink || null,
            archetype: archetype || null,
            userId: user.id,
            username: user.username,
            appVersion: "v1"
        });
        return Response.json(newPost, { status: 201 });
    } catch (err) {
        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

// Edit Post
export async function PUT(req) {
    try {
        await connectDB();
        const user = verifyToken(req);
        if (!user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { id, title, content, externalLink, imageUrl, youtubeUrl } = body;
        if (!id) {
            return Response.json(
                { error: "Post ID required" },
                { status: 400 }
            );
        }
        
        const post = await Post.findById(id);

        if (!post) {
            return Response.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        if (post.userId.toString() !== user.id) {
            return Response.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
                externalLink,
                imageUrl,
                youtubeUrl
            },
            { new: true }
        );

        return Response.json(updatedPost);
        
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        )
    };
}

// Delete Post
export async function DELETE(req) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { postId } = await req.json();
        const post = await Post.findById(postId);
        if (!post) {
            return Response.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        if (post.userId.toString() !== user.id) {
            return Response.json(
                { error: "Not allowed" },
                { status: 403 }
            );
        }

        await Post.findByIdAndDelete(postId);
        return Response.json({ message: "Post deleted" });
    } catch (err) {
        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}