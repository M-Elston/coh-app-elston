"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function formatYoutubeUrl(url) {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        
        if (parsed.hostname.includes("youtube.com")) {
            const videoId = parsed.searchParams.get("v");
            if (videoId) { 
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        if (parsed.hostname.includes("youtu.be")) {
            const videoId = parsed.pathname.slice(1);
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        return url;
    } catch {
        return url;
    }
}

export default function CreatePostPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: "",
        archetype: "",
        externalLink: "",
        imageUrl: "",
        youtubeUrl: ""
    });

    useEffect (() => {
        document.title = "Create Post | CoH Build Hub";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        if (!token) {
            alert("Please log in first.");
            window.location.href = "/login";
            return;
        }
        
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                ...form,
                youtubeUrl: formatYoutubeUrl(form.youtubeUrl)
            })
        });
        
        if (res.status === 401) {
            alert("Session expired. Please log back in.");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/login";
            return;
        }

        const data = await res.json();
        if (res.ok) {
            alert("Post created!");
            setForm({
                title: "",
                content: "",
                archetype: "",
                externalLink: "",
                imageUrl: "",
                youtubeUrl: ""
            });

            router.push("/");
        } else {
            alert(data.error);
        }
    };

    return (
        <div style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "2rem",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: " 0 4px 12px rgba(0,0,0,0.15)"
        }}>
                      
            <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Create Post</h1>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, title: e.target.value }))
                    }
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />
                
                <input
                    placeholder="Archetype (e.g. Blaster, Tanker)"
                    value={form.archetype}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, archetype: e.target.value }))
                    }

                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />

                <textarea
                    placeholder="Describe your build, powers, strategy..."
                    value={form.content}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, content: e.target.value }))
                    }
                    rows={6}
                    required
                    
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />

                <input
                    placeholder="External build link (optional)"
                    value={form.externalLink}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, externalLink: e.target.value }))
                    }
                    
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />
                           
                <input
                    placeholder="Image URL (optional)"
                    value={form.imageUrl}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, imageUrl: e.target.value }))
                    }

                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />

                <input
                    placeholder="YouTube URL (optional)"
                    value={form.youtubeUrl}
                    onChange={(e) =>
                        setForm(prev => ({ ...prev, youtubeUrl: e.target.value }))
                    }

                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        backgroundColor: "var(--accent)",
                        color: "#fff"
                    }}
                    >Create Post</button>
            </form>
        </div>
    );
}