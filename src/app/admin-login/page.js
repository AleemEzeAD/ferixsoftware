"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Password show/hide state
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin");
            } else {
                setError(data.error || "Invalid Credentials!");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Lock size={32} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Login</h1>
                <p className="text-center text-gray-500 text-sm mb-6">Enter credentials to access dashboard</p>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-100 text-red-500 text-sm text-center p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Password Input with Show/Hide */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input
                            type={showPassword ? "text" : "password"} // Toggle type
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 transition cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            "Login to Dashboard"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}