import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const { username, password } = await req.json();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error:"User already exists" }),
                { status: 400 }
            );
        }

        const passwordHash = await hash(password, 10);
        const newUser = new User({
            username,
            passwordHash,
        });

        await newUser.save();
        return new Response(
            JSON.stringify({ message: "User created successfully" }),
            { status: 201 }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 }
        );
    }
}