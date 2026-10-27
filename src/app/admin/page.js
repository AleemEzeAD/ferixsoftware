"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Star, ShieldAlert, Image as ImageIcon, Plus, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [reviews, setReviews] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(null);

    // Screenshot States
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    // Video States
    const [videoUrl, setVideoUrl] = useState("");
    const [isSavingVideo, setIsSavingVideo] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 1. Fetch Reviews
        try {
            const reviewsRes = await fetch("/api/reviews");
            const reviewsData = await reviewsRes.json();
            if (reviewsData.success) {
                setReviews(reviewsData.data);
            }
        } catch (error) {
            console.error("Reviews Fetch Error:", error);
        }

        // 2. Fetch Screenshots
        try {
            const screenshotsRes = await fetch("/api/screenshots");
            const screenshotsData = await screenshotsRes.json();
            if (screenshotsData.success) {
                setScreenshots(screenshotsData.data);
            }
        } catch (error) {
            console.error("Screenshots Fetch Error:", error);
        }

        // 3. Fetch Video URL
        try {
            const videoRes = await fetch("/api/settings/video");
            const videoData = await videoRes.json();
            if (videoData.success && videoData.url) {
                setVideoUrl(videoData.url);
            }
        } catch (error) {
            console.error("Video Fetch Error:", error);
        }

        setIsLoading(false);
    };

    const handleLogout = () => {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin-login");
    };

    // Delete Review
    const handleDeleteReview = async (id) => {
        if (!confirm("Kya aap waqai yeh review delete karna chahte hain?")) return;
        setIsDeleting(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setReviews(reviews.filter((rev) => rev.id !== id));
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Failed to delete review.");
        } finally {
            setIsDeleting(null);
        }
    };

    // Image Select Function
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

    // Add Screenshot
    const handleAddScreenshot = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert("Please select an image first");

        setIsAdding(true);
        try {
            const formData = new FormData();
            formData.append("file", imageFile);

            const res = await fetch("/api/screenshots", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setImagePreview(null);
                setImageFile(null);
                fetchData();
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Failed to add screenshot.");
        } finally {
            setIsAdding(false);
        }
    };

    // Delete Screenshot
    const handleDeleteScreenshot = async (id) => {
        if (!confirm("Delete this screenshot?")) return;
        try {
            const res = await fetch(`/api/screenshots/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setScreenshots(screenshots.filter((img) => img.id !== id));
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Failed to delete screenshot.");
        }
    };

    // Save Video URL
    const handleSaveVideo = async (e) => {
        e.preventDefault();
        setIsSavingVideo(true);
        try {
            const res = await fetch("/api/settings/video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Video URL saved successfully!");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Failed to save video URL.");
        } finally {
            setIsSavingVideo(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0f172a]">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage reviews, screenshots, and video.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/" className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">
                            View Website
                        </Link>
                        <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <Star size={24} className="fill-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Reviews</p>
                            <p className="text-2xl font-bold text-[#0f172a]">{reviews.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                            <ImageIcon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Screenshots</p>
                            <p className="text-2xl font-bold text-[#0f172a]">{screenshots.length}</p>
                        </div>
                    </div>
                </div>

                {/* ==== VIDEO SETTINGS SECTION ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <PlayCircle size={20} className="text-blue-600" /> How to Install Video
                    </h2>

                    <form onSubmit={handleSaveVideo} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="url"
                            placeholder="Enter YouTube Embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID)"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isSavingVideo}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer"
                        >
                            {isSavingVideo ? "Saving..." : "Update Video"}
                        </button>
                    </form>
                </div>

                {/* ==== SCREENSHOTS SECTION ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-blue-600" /> Manage Screenshots
                    </h2>

                    <form onSubmit={handleAddScreenshot} className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                        {/* Image Preview */}
                        <div className="w-full sm:w-32 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon size={24} className="text-gray-400" />
                            )}
                        </div>

                        <div className="flex-1 w-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isAdding}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer shrink-0"
                        >
                            <Plus size={16} /> {isAdding ? "Uploading..." : "Add Screenshot"}
                        </button>
                    </form>

                    {screenshots.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">No screenshots added yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {screenshots.map((img) => (
                                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-[16/10]">
                                    <img src={img.imageUrl} alt="Screenshot" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <button
                                            onClick={() => handleDeleteScreenshot(img.id)}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ==== REVIEWS TABLE ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-[#0f172a]">All Reviews</h2>
                    </div>

                    {isLoading ? (
                        <div className="p-10 text-center text-gray-500">Loading data...</div>
                    ) : reviews.length === 0 ? (
                        <div className="p-10 text-center text-gray-500 flex flex-col items-center">
                            <ShieldAlert size={48} className="text-gray-300 mb-3" />
                            No reviews found in database.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-sm">
                                        <th className="p-4 font-semibold">User</th>
                                        <th className="p-4 font-semibold">Rating</th>
                                        <th className="p-4 font-semibold w-1/3">Review</th>
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map((review) => (
                                        <tr key={review.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}`} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                    <span className="font-semibold text-gray-800">{review.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400" : "fill-gray-200 text-gray-200"} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                <p className="line-clamp-2">{review.comment}</p>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {new Date(review.created_at || review.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    disabled={isDeleting === review.id}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
                                                    title="Delete Review"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}