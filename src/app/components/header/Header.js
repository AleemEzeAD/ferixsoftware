"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Download, Search, FileText, MessageSquare } from 'lucide-react';

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Debounce Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim().length > 1) {
                performGlobalSearch(searchQuery);
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const performGlobalSearch = async (query) => {
        setIsSearching(true);
        const lowerQuery = query.toLowerCase();
        let results = [];

        // 1. Static Sections Search
        const staticSections = [
            { id: "hero", name: "Anzal NextCandle Pro", desc: "Professional trading dashboard and AI signals." },
            { id: "download", name: "Download Software", desc: "Get the latest version 3.0.20 for free." },
            { id: "how-to-install", name: "How to Install", desc: "Step by step guide to setup the software." },
            { id: "screenshots", name: "Screenshots", desc: "View the dashboard images and charts." },
            { id: "requirements", name: "System Requirements", desc: "Check Windows, RAM and Hard drive requirements." },
            { id: "reviews", name: "User Reviews", desc: "Read what traders are saying about us." },
        ];

        staticSections.forEach(section => {
            if (section.name.toLowerCase().includes(lowerQuery) || section.desc.toLowerCase().includes(lowerQuery)) {
                results.push({ type: "section", id: section.id, name: section.name, comment: section.desc });
            }
        });

        // 2. Dynamic Reviews Search (From Database)
        try {
            const res = await fetch(`/api/search?q=${query}`);
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                const dynamicResults = data.data.map(rev => ({
                    ...rev,
                    type: "review",
                    name: rev.name,
                    comment: rev.comment
                }));
                results = [...results, ...dynamicResults];
            }
        } catch (error) {
            console.error("Search error", error);
        }

        setSearchResults(results);
        setIsSearching(false);
    };

    const handleResultClick = (item) => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSidebarOpen(false);

        if (item.type === "review") {
            // Dispatch event for Reviews component (Pagination handling)
            window.dispatchEvent(new CustomEvent('scrollToReview', { detail: { id: item.id } }));

            setTimeout(() => {
                const element = document.getElementById(`review-${item.id}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    // Highlight Review
                    element.classList.add("ring-2", "ring-blue-500", "bg-blue-50", "transition-all", "duration-500");
                    setTimeout(() => element.classList.remove("ring-2", "ring-blue-500", "bg-blue-50"), 3000);
                }
            }, 300);
        } else {
            // Scroll to Static Section
            const element = document.getElementById(item.id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                // Highlight Section
                element.classList.add("ring-2", "ring-yellow-400", "bg-yellow-50/50", "transition-all", "duration-500");
                setTimeout(() => element.classList.remove("ring-2", "ring-yellow-400", "bg-yellow-50/50"), 3000);
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto max-w-[1200px] px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="text-base leading-4 sm:text-xl sm:leading-5 font-bold text-gray-800">
                            Ferix <div>
                                <span className="text-green-600">Software</span> Pro
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium text-gray-600">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 transition">Home</Link>
                        <a href="#how-to-install" className="hover:text-blue-600 transition cursor-pointer">How to Install</a>
                        <a href="#screenshots" className="hover:text-blue-600 transition cursor-pointer">Screenshots</a>
                        <a href="#download" className="hover:text-blue-600 transition cursor-pointer">Download</a>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 relative">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm ml-2 md:w-30 lg:w-48 text-gray-700"
                            />

                            {/* Search Results Dropdown (Desktop) */}
                            {searchQuery.length > 1 && (
                                <div className="absolute top-full mt-2 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                                    {isSearching ? (
                                        <div className="p-3 text-sm text-gray-500 text-center">Searching...</div>
                                    ) : searchResults.length > 0 ? (
                                        <ul>
                                            {searchResults.map((item, idx) => (
                                                <li key={idx} className="border-b last:border-0 border-gray-100">
                                                    <div
                                                        onClick={() => handleResultClick(item)}
                                                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                                                    >
                                                        <div className="mt-0.5 text-blue-500">
                                                            {item.type === "section" ? <FileText size={16} /> : <MessageSquare size={16} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                                                            <p className="text-xs text-gray-500 line-clamp-2">{item.comment}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-3 text-sm text-gray-500 text-center">No results found for "{searchQuery}"</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button (Hamburger) */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div >

            {/* ================= MOBILE SIDEBAR (DRAWER) ================= */}

            {/* Overlay Background */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-800">FerixSoft</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Sidebar Search (Mobile) */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700"
                        />

                        {/* Search Results Dropdown (Mobile) */}
                        {searchQuery.length > 1 && (
                            <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                {isSearching ? (
                                    <div className="p-3 text-sm text-gray-500 text-center">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((item, idx) => (
                                            <li key={idx} className="border-b last:border-0 border-gray-100">
                                                <div
                                                    onClick={() => handleResultClick(item)}
                                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                                                >
                                                    <div className="mt-0.5 text-blue-500">
                                                        {item.type === "section" ? <FileText size={16} /> : <MessageSquare size={16} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                                                        <p className="text-xs text-gray-500 line-clamp-2">{item.comment}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-3 text-sm text-gray-500 text-center">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Links */}
                <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    <Link href="/" onClick={() => setIsSidebarOpen(false)} className="px-4 py-3 rounded-lg text-blue-600 font-semibold bg-blue-50">
                        Home
                    </Link>
                    <Link href="#features" onClick={() => setIsSidebarOpen(false)} className="px-4 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-50">
                        Features
                    </Link>
                    <Link href="#screenshots" onClick={() => setIsSidebarOpen(false)} className="px-4 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-50">
                        Screenshots
                    </Link>
                    <Link href="#download" onClick={() => setIsSidebarOpen(false)} className="px-4 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-50">
                        Download
                    </Link>
                </nav>

                {/* Sidebar Footer (Download Button) */}
                <div className="p-4 border-t border-gray-100">
                    <a
                        href="#download"
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition shadow-md shadow-blue-200"
                    >
                        <Download size={18} />
                        Download Now
                    </a>
                </div>
            </div>
        </header >
    );
}