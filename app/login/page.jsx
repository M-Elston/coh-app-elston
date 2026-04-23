"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            alert("Login successful!");
            router.push("/create-post");
        } else {
            alert(data.error);
        }
    };

    useEffect (() => {
        document.title = "Login | CoH Build Hub";
    }, []);

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
            
            <h1>Login</h1>
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
                        color: "#fff"
                    }}
                >Login</button>
            </form>
        </div>
    );
}