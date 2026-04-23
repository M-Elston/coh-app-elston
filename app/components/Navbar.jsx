"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [token, setToken] = useState(null);
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/";
    };

    return (
        <nav className="navbar">
            <h2>CoH Build Hub</h2>
            
            <button className="hamburger" onClick={() => setOpen(!open)}>
                ☰
            </button>
            
            <div className={`nav-links ${open ? "open" : ""}`}>
                
                <Link
                    href="/"
                    className={`nav-link ${pathname === "/" ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                >
                    Home
                </Link>

                {!token && (
                    <>
                        <Link
                            href="/login"
                            className={`nav-link ${pathname === "/login" ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className={`nav-link ${pathname === "/signup" ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            Signup
                        </Link>
                    </>
                )}

                {token && (
                    <>
                        <Link
                            href="/create-post"
                            className={`nav-link ${pathname === "/create-post" ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            Create Post
                        </Link>
                        <button onClick={() => {
                            handleLogout();
                            setOpen(false);
                            }}
                            className="nav-button"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}