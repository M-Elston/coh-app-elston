import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        await connectDB();
        const { username, password } = await req.json();
        const user = await User.findOne({ username });
        if (!user) {
            return new Response(
                JSON.stringify({ error: "Invalid credentials" }),
                { 
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        
        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: "Invalid credentials" }),
                { 
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );
        
        return new Response(
            JSON.stringify({ message: "Login successful", token, username: user.username }), 
            { 
                status: 200, 
                headers: { "Content-Type": "application/json" }
            }
        );
    
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), 
            { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}