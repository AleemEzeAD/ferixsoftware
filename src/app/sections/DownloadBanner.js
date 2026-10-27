import {
    Download,
    ShieldCheck,
    Star,
    Monitor,
    Tag,
    HardDrive,
    CalendarDays,
    Shield
} from "lucide-react";
import Image from "next/image";

const appData = {
    name: "Anzal NextCandle Pro",
    badge: "Featured",
    description: "A professional and advanced trading dashboard for real-time market signals.",
    rating: "4.8",
    reviews: "(124,567 reviews)",
    version: "Version 3.0.20",
    size: "Size 40.5 MB",
    license: "License Free",
    updated: "Updated April 15, 2025",
};

export default function DownloadBanner() {
    return (
        <section id="download" className="scroll-mt-20 w-full rounded-xl border border-blue-100 bg-gradient-to-r from-[#f0f7ff] to-[#e6f2ff] md:p-6 py-3 shadow-sm my-4">
            <div className="container mx-auto max-w-[1200px]">
                <div className="relative overflow-hidden">
                    <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-100/50 blur-2xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-2 sm:gap-5">
                            <div className="flex-shrink-0 rounded-2xl bg-white p-1 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                                <div className="flex w-10 md:h-16 h-10 md:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-inner">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="sm:text-base md:text-xl font-extrabold text-[#0f172a]">
                                        {appData.name}
                                    </h2>
                                    <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider hidden sm:flex">
                                        {appData.badge}
                                    </span>
                                </div>

                                <p className="text-[10px] sm:text-[15px] text-gray-600 mb-3">
                                    {appData.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1.5 text-[10px] sm:text-sm mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-800">{appData.rating}</span>
                                    <span className="text-gray-500 hidden sm:flex">{appData.reviews}</span>
                                </div>

                                {/* Meta Details Row */}
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-base">
                                        <Monitor size={15} className="text-blue-500" />
                                        Windows
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-base">
                                        <Tag size={15} className="text-blue-500" />
                                        {appData.version}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-base">
                                        <HardDrive size={15} className="text-blue-500" />
                                        {appData.size}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-base">
                                        <Shield size={15} className="text-blue-500" />
                                        {appData.license}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-base">
                                        <CalendarDays size={15} className="text-blue-500" />
                                        {appData.updated}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Download Button */}
                        <div className="flex flex-col items-center justify-center min-w-[220px]">
                            <a
                                href="/assets/program/tradewithanzel.zip" download
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-3 py-2 sm:px-6 sm:py-3.5 text-white shadow-lg shadow-blue-600/30 transition hover:bg-[#1d4ed8]"
                            >
                                <Download size={22} />
                                <div className="text-left">
                                    <span className="block text-[15px] font-bold leading-none">Download Now</span>
                                    <span className="block text-[11px] font-normal text-blue-200 sm:mt-1">Official Website</span>
                                </div>
                            </a>
                            <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-[#16a34a]">
                                <ShieldCheck size={16} /> Safe &amp; Secure Download
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}