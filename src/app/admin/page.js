"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Star, ShieldAlert, Image as ImageIcon, Plus, PlayCircle, HardDrive, Upload, Eye, CheckCircle, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [reviews, setReviews] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isApproving, setIsApproving] = useState(null);

    // Review View Modal State
    const [viewReview, setViewReview] = useState(null);

    // Delete Modal & Toast State
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [toast, setToast] = useState(null);

    // Screenshot States
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    // Video States
    const [videoUrl, setVideoUrl] = useState("");
    const [isSavingVideo, setIsSavingVideo] = useState(false);

    // Zip States
    const [zipFile, setZipFile] = useState(null);
    const [isUploadingZip, setIsUploadingZip] = useState(false);
    const [currentZipFile, setCurrentZipFile] = useState(null);

    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    // Toast Function
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchData = async () => {
        try {
            const reviewsRes = await fetch("/api/reviews?admin=true");
            const reviewsData = await reviewsRes.json();
            if (reviewsData.success) setReviews(reviewsData.data);
        } catch (error) { console.error("Reviews Fetch Error:", error); }

        try {
            const screenshotsRes = await fetch("/api/screenshots");
            const screenshotsData = await screenshotsRes.json();
            if (screenshotsData.success) setScreenshots(screenshotsData.data);
        } catch (error) { console.error("Screenshots Fetch Error:", error); }

        try {
            const videoRes = await fetch("/api/settings/video");
            const videoData = await videoRes.json();
            if (videoData.success && videoData.url) setVideoUrl(videoData.url);
        } catch (error) { console.error("Video Fetch Error:", error); }

        try {
            const dlRes = await fetch("/api/settings/download");
            const dlData = await dlRes.json();
            if (dlData.success && dlData.fileName) setCurrentZipFile(dlData.fileName);
        } catch (error) { console.error("Download Fetch Error:", error); }

        setIsLoading(false);
    };

    const handleLogout = () => {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin-login");
    };

    // Approve Review (With Loading)
    const handleApproveReview = async (id) => {
        setIsApproving(id);
        try {
            const res = await fetch(`/api/reviews/${id}/approve`, { method: "PUT" });
            const data = await res.json();
            if (data.success) {
                showToast("Review approved successfully!");
                fetchData();
                setViewReview(null);
            } else {
                showToast("Error: " + data.error, "error");
            }
        } catch (error) {
            showToast("Failed to approve.", "error");
        } finally {
            setIsApproving(null);
        }
    };

    // Delete Review (Via Modal)
    const confirmDeleteReview = async () => {
        if (!deleteConfirm) return;
        const id = deleteConfirm;
        setIsDeleting(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setReviews(reviews.filter((rev) => rev.id !== id));
                showToast("Review deleted successfully!");
                if (viewReview && viewReview.id === id) setViewReview(null);
            } else {
                showToast("Error: " + data.error, "error");
            }
        } catch (error) {
            showToast("Failed to delete review.", "error");
        } finally {
            setIsDeleting(null);
            setDeleteConfirm(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddScreenshot = async (e) => {
        e.preventDefault();
        if (!imageFile) return showToast("Please select an image first", "error");
        setIsAdding(true);
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            const res = await fetch("/api/screenshots", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                setImagePreview(null);
                setImageFile(null);
                showToast("Screenshot added successfully!");
                fetchData();
            } else {
                showToast("Error: " + data.error, "error");
            }
        } catch (error) {
            showToast("Failed to add screenshot.", "error");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteScreenshot = async (id) => {
        if (!confirm("Delete this screenshot?")) return; // Keep confirm for screenshot for now
        try {
            const res = await fetch(`/api/screenshots/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setScreenshots(screenshots.filter((img) => img.id !== id));
                showToast("Screenshot deleted successfully!");
            } else {
                showToast("Error: " + data.error, "error");
            }
        } catch (error) {
            showToast("Failed to delete screenshot.", "error");
        }
    };

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
            if (data.success) showToast("Video URL saved successfully!");
            else showToast("Error: " + data.error, "error");
        } catch (error) {
            showToast("Failed to save video URL.", "error");
        } finally {
            setIsSavingVideo(false);
        }
    };

    const handleZipUpload = async (e) => {
        e.preventDefault();
        if (!zipFile) return showToast("Please select a zip file", "error");
        setIsUploadingZip(true);
        try {
            const formData = new FormData();
            formData.append("file", zipFile);
            const res = await fetch("/api/settings/download", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                showToast("Zip uploaded successfully!");
                setZipFile(null);
                fetchData();
            } else {
                showToast("Error: " + data.error, "error");
            }
        } catch (error) {
            showToast("Failed to upload zip.", "error");
        } finally {
            setIsUploadingZip(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-6 relative">

            {/* ==== TOAST NOTIFICATION ==== */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[200] flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border text-white font-medium transition-all ${toast.type === 'success' ? 'bg-green-600 border-green-700' : 'bg-red-600 border-red-700'}`}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {toast.message}
                </div>
            )}

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

                {/* Stats, Video, Zip, Screenshot Sections (Waisay hi rahenge) */}
                {/* ... */}

                {/* ==== VIDEO SETTINGS SECTION ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <PlayCircle size={20} className="text-blue-600" /> How to Install Video
                    </h2>
                    <form onSubmit={handleSaveVideo} className="flex flex-col sm:flex-row gap-3">
                        <input type="url" placeholder="Enter YouTube Embed URL..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none text-sm" />
                        <button type="submit" disabled={isSavingVideo} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer">
                            {isSavingVideo ? "Saving..." : "Update Video"}
                        </button>
                    </form>
                </div>

                {/* ==== ZIP DOWNLOAD SETTINGS ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <HardDrive size={20} className="text-blue-600" /> Manage Software Download (ZIP)
                    </h2>
                    <div className="mb-4 text-sm text-gray-600 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <strong className="text-gray-800">Current Download File:</strong>
                        {currentZipFile ? (
                            <a href={`/api/download-file?file=${currentZipFile}`} className="text-blue-600 underline font-medium hover:text-blue-800" download>{currentZipFile}</a>
                        ) : (<span className="text-gray-500 italic">No file uploaded yet</span>)}
                    </div>
                    <form onSubmit={handleZipUpload} className="flex flex-col sm:flex-row gap-4 items-center">
                        <input type="file" accept=".zip,.rar,.exe" onChange={(e) => setZipFile(e.target.files[0])} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                        <button type="submit" disabled={isUploadingZip} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer shrink-0">
                            <Upload size={16} /> {isUploadingZip ? "Uploading..." : "Upload ZIP"}
                        </button>
                    </form>
                </div>

                {/* ==== SCREENSHOTS SECTION ==== */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-blue-600" /> Manage Screenshots
                    </h2>
                    <form onSubmit={handleAddScreenshot} className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                        <div className="w-full sm:w-32 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                            {imagePreview ? (<img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />) : (<ImageIcon size={24} className="text-gray-400" />)}
                        </div>
                        <div className="flex-1 w-full">
                            <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                        </div>
                        <button type="submit" disabled={isAdding} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer shrink-0">
                            <Plus size={16} /> {isAdding ? "Uploading..." : "Add Screenshot"}
                        </button>
                    </form>
                    {screenshots.length === 0 ? (<p className="text-gray-500 text-sm text-center py-4">No screenshots added yet.</p>) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {screenshots.map((img) => (
                                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-[16/10]">
                                    <img src={img.imageUrl} alt="Screenshot" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <button onClick={() => handleDeleteScreenshot(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition cursor-pointer">
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
                    {isLoading ? (<div className="p-10 text-center text-gray-500">Loading data...</div>) : reviews.length === 0 ? (
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
                                        <th className="p-4 font-semibold">Status</th>
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
                                                    {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < review.rating ? "fill-yellow-400" : "fill-gray-200 text-gray-200"} />))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600"><p className="line-clamp-2">{review.comment}</p></td>
                                            <td className="p-4 text-sm">
                                                {review.status === "pending" ? (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">Pending</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Approved</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">{new Date(review.created_at || review.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 text-right flex items-center justify-end gap-2">
                                                <button onClick={() => setViewReview(review)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer" title="View Review">
                                                    <Eye size={18} />
                                                </button>
                                                {review.status === "pending" && (
                                                    <button
                                                        onClick={() => handleApproveReview(review.id)}
                                                        disabled={isApproving === review.id}
                                                        className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                                                        title="Approve Review"
                                                    >
                                                        {isApproving === review.id ? (
                                                            <svg className="animate-spin h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (<CheckCircle size={18} />)}
                                                    </button>
                                                )}
                                                <button onClick={() => setDeleteConfirm(review.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50" title="Delete Review">
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

            {/* ==== DELETE CONFIRM MODAL ==== */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Review?</h3>
                        <p className="text-gray-500 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer">Cancel</button>
                            <button onClick={confirmDeleteReview} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ==== VIEW REVIEW MODAL ==== */}
            {viewReview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl">
                        <button onClick={() => setViewReview(null)} className="absolute right-4 top-4 text-gray-400 hover:text-red-500 cursor-pointer">
                            <X size={24} />
                        </button>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-4">Review Details</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={viewReview.avatar || `https://ui-avatars.com/api/?name=${viewReview.name}`} alt="" className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h4 className="font-bold text-gray-800">{viewReview.name}</h4>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < viewReview.rating ? "fill-yellow-400" : "fill-gray-200"} />))}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{viewReview.comment}</p>
                        <div className="mt-6 flex justify-end gap-3">
                            {viewReview.status === "pending" && (
                                <button
                                    onClick={() => handleApproveReview(viewReview.id)}
                                    disabled={isApproving === viewReview.id}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition cursor-pointer flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isApproving === viewReview.id ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Approving...
                                        </>
                                    ) : "Approve"}
                                </button>
                            )}
                            <button onClick={() => setViewReview(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-300 transition cursor-pointer">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}