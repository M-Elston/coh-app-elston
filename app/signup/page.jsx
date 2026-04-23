"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
        alert("Account created successfully! Please log in.");
        router.push("/login");
        } else {
        alert(data.error);
        }
    };

    useEffect (() => {
        document.title = "Sign Up | CoH Build Hub";
    }, []);

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
            
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "var(--accent)",
                        color: "#fff",
                    }}
                >Sign Up</button>
            </form>
        </div>
    );
}