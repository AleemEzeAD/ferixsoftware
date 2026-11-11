"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Screenshots() {
    const [screenshots, setScreenshots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null); // Ab index state use kar rahe hain
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchScreenshots();
    }, []);

    const fetchScreenshots = async () => {
        try {
            const res = await fetch("/api/screenshots");
            const data = await res.json();
            if (data.success) {
                setScreenshots(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch screenshots", error);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    // Viewer ke andar next/prev functions
    const handleNext = () => {
        if (selectedIndex < screenshots.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrev = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    if (isLoading) return <div className="text-center py-10 text-gray-500">Loading screenshots...</div>;
    if (screenshots.length === 0) return null;

    return (
        <section id="screenshots" className="w-full py-2 scroll-mt-24">
            <div className="container mx-auto max-w-[1200px] px-6">

                <h2 className="mb-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
                    Screenshots
                </h2>

                <div className="relative group">
                    {/* Custom Slider Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {screenshots.map((img, index) => (
                            <div
                                key={img.id || index}
                                className="snap-center shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)]"
                            >
                                <div
                                    onClick={() => setSelectedIndex(index)} // Index set kar rahe hain
                                    className="cursor-pointer group relative overflow-hidden rounded-xl border-[6px] border-[#f0f7ff] bg-white shadow-sm transition hover:border-blue-200"
                                >
                                    <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-100">
                                        <img
                                            src={img.imageUrl}
                                            alt={`Screenshot ${index + 1}`}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Custom Arrows */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 -translate-x-3 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition hover:bg-gray-50 hover:scale-105 md:-translate-x-5"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition hover:bg-gray-50 hover:scale-105 md:translate-x-5"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* ==== NEW FULLSCREEN VIEWER ==== */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md">

                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="cursor-pointer absolute right-2 top-4 sm:right-8 sm:top-8 z-50 rounded-full bg-white/10 sm:p-2 text-white hover:bg-white/20 transition"
                    >
                        <X size={32} />
                    </button>

                    {/* Image Container */}
                    <div className="relative w-full max-w-5xl flex items-center justify-center h-[50vh] sm:h-[80vh]">
                        <img
                            src={screenshots[selectedIndex].imageUrl}
                            alt="Fullscreen Screenshot"
                            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                        />
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-6 flex items-center justify-center gap-2 sm:gap-6 bg-white/10 px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md border border-white/10">

                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            disabled={selectedIndex === 0}
                            className="cursor-pointer sm:p-2 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 rounded-full transition"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* Counter */}
                        <span className="text-white font-semibold text-lg min-w-[50px] text-center">
                            {selectedIndex + 1} / {screenshots.length}
                        </span>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            disabled={selectedIndex === screenshots.length - 1}
                            className="cursor-pointer sm:p-2 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 rounded-full transition"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}