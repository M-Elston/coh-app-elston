"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    archetype: "",
    content: "",
    externalLink: "",
    imageUrl: "",
    youtubeUrl: ""    
  });

  useEffect (() => {
    document.title = "Home | CoH Build Hub";
  }, []);
    
  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        setQuote(data);
      } catch (err) {
        console.error("Failed to fetch quote", err);
      }
    };

    fetchPosts();
    fetchQuote();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      
    {/* ===== Edit Post Form ===== */}
      { editingPost && (
        <div className="edit-form">
          
        <h3>Edit Post</h3>

          <input
            placeholder="Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, title: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            placeholder="Archetype"
            value={editForm.archetype}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, archetype: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <textarea
            placeholder="Content"
            value={editForm.content}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, content: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
            rows={4}
          />

          <input
            placeholder="External Link"
            value={editForm.externalLink}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, externalLink: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            placeholder="Image Link"
            value={editForm.imageUrl}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, imageUrl: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            placeholder="YouTube Link"
            value={editForm.youtubeUrl}
            onChange={(e) =>
              setEditForm(prev => ({ ...prev, youtubeUrl: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <button
            onClick={async () => {
              const token = localStorage.getItem("token");
              const res = await fetch("/api/posts", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: editingPost._id,
                  ...editForm
                })
              });

              if (res.ok) {
                const updated = await res.json();

                setPosts(prev =>
                  prev.map(p =>
                  p._id === updated._id ? updated: p
                ));

                setEditingPost(null);
              } else {
                  const err = await res.json();
                  alert(err.error);
                }
              }}
              disabled={!editForm.title || !editForm.content}
              style={{
                marginRight: "10px",
                padding: "6px 10px",
                backgroundColor: "#d1ffd1",
                color: "#000",
                border: "1px solid green",
                cursor: !editForm.title || !editForm.content ? "not-allowed" : "pointer",
                opacity: !editForm.title || !editForm.content ? 0.5 : 1
              }}
          >
            Save
          </button>

          <button
            onClick={() => setEditingPost(null)}
            style={{ padding: "6px 10px" }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ===== Hero ===== */}
      <div className="hero">
        
        {/* Tagline */}
        <div className="hero-tagline">
          Share & Discover Builds from the Community
        </div>

        {/* Quote API */}
        {!quote && (
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Loading Quote...
          </p>
        )}
        
        {quote && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px"
            }}>
          
            <div style={{
              maxWidth: "600px",
              padding: "12px 18px",
              backgroundColor: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
            }}>
            
            <p style={{ fontStyle: "italic", marginBottom: "5px" }}>
              "{quote?.quote}"
            </p>
            
            <small>- {quote.author}</small>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <section>
            <h3>New to the App?</h3>
            <a href="/signup" className="btn-bevel">Sign Up</a>
          </section>
        </div>
      </div>

      {/* ===== Main ===== */}
      <main style={{ padding: "0 20px 20px" }}>
        
        {/* Instructions */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
           <section>
            <h2 className="section-title">Instructions</h2>
            <ol>
              <li>Sign Up or Log In</li>
              <li>Fill out the fields</li>
              <li>Add links if desired</li>
              <li>Click "Create Post"</li>
              <li>View your post in the Feed</li>
              <li>Edit or Delete if desired</li>
            </ol>
          </section>
        </div>
         
        {/* ===== Post Feed ===== */}
        <h2 className="section-title">Recent Posts</h2>
        <section className="post-grid">
          {loading && <p>Loading posts...</p>}
          {!loading && posts.length === 0 && <p>No posts yet.</p>}

          {posts.map((post) => (
            <div className="post-card" key={post._id}>

              <h3 style={{ marginBottom: "5px" }}>{post.title || post.name || "Untitled Post"}</h3>
              
              {post.archetype && (
                <span className="post-badge">
                  {post.archetype}
                </span>
              )}

              <p style={{ marginTop: "8px" }}>
                {post.content}
              </p>

              {post.externalLink && (
                <a
                  href={post.externalLink}
                  target="_blank"
                  className="post-link"
                  rel="noopener noreferrer"
                >
                  View Build Link
                </a>
              )}

              {post.imageUrl && (
                <img src={post.imageUrl} className="post-image" alt="Post image" />
              )}

              {post.youtubeUrl && (
                <iframe
                  src={post.youtubeUrl}
                  className="post-video"
                  allowFullScreen
                ></iframe>
              )}

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px"
              }}>
                
                <small>by {post.username || "unknown"}</small>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={async () => {
                      setEditingPost(post);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setEditForm({
                        title: post.title || "",
                        archetype: post.archetype || "",
                        content: post.content || "",
                        externalLink: post.externalLink || "",
                        imageUrl: post.imageUrl || "",
                        youtubeUrl: post.youtubeUrl || ""
                      });
                    }}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "#fff"
                      }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      const res = await fetch("/api/posts", {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ postId: post._id })
                      });

                      if (res.ok) {
                        setPosts(prev => prev.filter(p => p._id !== post._id));
                      } else {
                        const data = await res.json();
                        alert(data.error);
                      }
                    }}
                    style={{
                      backgroundColor: "var(--danger)",
                      color: "#fff"
                    }}
                  >
                    Delete
                </button>
              </div>
            </div>
          </div>          
          ))}
        </section>
      </main>
    </div>
  );
}
