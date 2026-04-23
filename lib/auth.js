import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return null;
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) return null;
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
}