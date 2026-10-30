"use client";
import React, { useState, useEffect } from "react";
import { Star, CheckCircle2, ThumbsUp, Award, Quote, X, Upload, ChevronLeft, ChevronRight } from "lucide-react";

const ratingStats = {
    average: "4.8",
    total: "124,567",
    stars: [
        { label: "5 stars", percentage: 82 },
        { label: "4 stars", percentage: 12 },
        { label: "3 stars", percentage: 4 },
        { label: "2 stars", percentage: 1 },
        { label: "1 star", percentage: 1 },
    ],
};

const highlights = [
    { text: "Accurate Trading Signals", count: "2,450+" },
    { text: "User-Friendly Interface", count: "1,200+" },
];

export default function Reviews() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;

    // 1. Fetch Reviews Function
    const fetchReviews = async () => {
        try {
            const res = await fetch("/api/reviews");
            const data = await res.json();
            if (data.success) {
                setReviews(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Single useEffect for Fetching and Scroll Event
    useEffect(() => {
        fetchReviews();

        const handleScrollToReview = (e) => {
            const reviewId = e.detail.id;
            const reviewIndex = reviews.findIndex(r => r.id === reviewId);

            if (reviewIndex !== -1) {
                const pageNumber = Math.floor(reviewIndex / reviewsPerPage) + 1;
                setCurrentPage(pageNumber);
            }
        };

        window.addEventListener('scrollToReview', handleScrollToReview);
        return () => window.removeEventListener('scrollToReview', handleScrollToReview);
    }, [reviews]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // FormData banayein
            const formData = new FormData();
            formData.append("name", name);
            formData.append("rating", rating);
            formData.append("comment", comment);
            if (imageFile) {
                formData.append("file", imageFile); // Actual file bhejein
            }

            const res = await fetch("/api/reviews", {
                method: "POST",
                body: formData, // JSON ki jagah FormData
            });

            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                setName("");
                setComment("");
                setRating(0);
                setImagePreview(null);
                setImageFile(null);
                setCurrentPage(1);
                fetchReviews();
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    return (
        <section className="w-full rounded-xl border border-blue-100 bg-gradient-to-r from-[#f0f7ff] to-[#e6f2ff] py-3 sm:p-6 shadow-sm my-4 relative">
            <div className="container mx-auto max-w-[1200px]">

                <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#0f172a] sm:text-3xl">User Reviews</h2>
                        <p className="mt-2 text-[15px] text-gray-600">See what our community of professional traders is saying.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-3xl font-extrabold text-[#0f172a]">{ratingStats.average}</div>
                        <div>
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Based on {reviews.length} reviews</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#0f172a] mb-4">Rating Breakdown</h3>
                            <div className="space-y-3">
                                {ratingStats.stars.map((star, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm">
                                        <span className="w-14 font-medium text-gray-600">{star.label}</span>
                                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star.percentage}%` }}></div>
                                        </div>
                                        <span className="w-8 text-right text-gray-500 font-medium">{star.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="w-full mt-6 bg-[#2563eb] text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                                Write a Review
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-md flex flex-col items-center text-center">
                            <Award size={40} className="text-yellow-300 mb-2" />
                            <h3 className="text-xl font-bold">Excellent</h3>
                            <p className="text-sm text-blue-100 mt-1">Based on community feedback</p>
                            <div className="flex gap-1 mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                                <Quote size={18} className="text-blue-500" /> Most Mentioned
                            </h3>
                            <ul className="space-y-3">
                                {highlights.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-between">
                        <div className="space-y-4 flex-grow">
                            {isLoading ? (
                                <div className="bg-white p-6 rounded-xl text-center text-gray-500">Loading reviews...</div>
                            ) : reviews.length === 0 ? (
                                <div className="bg-white p-6 rounded-xl text-center text-gray-500">No reviews yet. Be the first to review!</div>
                            ) : (
                                currentReviews.map((review) => (
                                    <div
                                        key={review.id}
                                        id={`review-${review.id}`} // <--- YEH LINE ADD KI HAI SCROLL KE LIYE
                                        className="bg-white p-3 sm:p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-500"
                                    >
                                        <div className="flex flex-wrap gap-1 items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}&background=random`}
                                                    alt={review.name}
                                                    className="w-8 sm:w-12 h-8 sm:h-12 rounded-full object-cover border-2 border-gray-100"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-[#0f172a]">{review.name}</h4>
                                                        <CheckCircle2 size={16} className="text-blue-500 fill-blue-100" title="Verified User" />
                                                    </div>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                                                        {new Date(review.created_at || review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400" : "fill-gray-200 text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-[13px] sm:text-[15px] text-gray-600 leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition">
                                                <ThumbsUp size={14} /> Helpful
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {!isLoading && totalPages > 1 && (
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="text-sm font-semibold text-gray-600">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal Waisa hi rahega */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition cursor-pointer">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-1">Write a Review</h3>
                        <p className="text-sm text-gray-500 mb-4">Share your experience with Anzal NextCandle Pro.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload size={24} className="text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1 cursor-pointer">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Picture (Optional)</label>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-110 focus:outline-none">
                                            <Star className={`w-6 h-6 sm:w-8 sm:h-8 transition-all ${star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{rating > 0 ? `You selected ${rating} stars` : "Select a rating"}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Review</label>
                                <textarea required rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What do you like most about this software?" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] py-3 text-white font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : ("Submit Review")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}