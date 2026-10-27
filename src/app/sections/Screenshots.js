"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Screenshots() {
    const [screenshots, setScreenshots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
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
                                    onClick={() => setSelectedImage(img.imageUrl)}
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

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Fullscreen Screenshot"
                        className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
}