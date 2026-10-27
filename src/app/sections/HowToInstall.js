"use client";
import React, { useState, useEffect } from "react";
import { Download, Settings, PlayCircle, MonitorPlay } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Download the Software",
        description: "Click on the 'Download Now' button to get the latest version.",
        icon: Download,
    },
    {
        id: 2,
        title: "Install & Setup",
        description: "Run the .exe file and follow the simple on-screen instructions.",
        icon: Settings,
    },
    {
        id: 3,
        title: "Launch & Start Trading",
        description: "Log in and start receiving real-time trading signals instantly.",
        icon: PlayCircle,
    },
];

export default function HowToInstall() {
    const [videoUrl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await fetch("/api/settings/video");
                const data = await res.json();
                if (data.success && data.url) {
                    setVideoUrl(data.url);
                }
            } catch (error) {
                console.error("Failed to fetch video", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideo();
    }, []);

    return (
        <section id="how-to-install" className="scroll-mt-20 w-full rounded-xl border border-blue-100 bg-gradient-to-r from-[#f0f7ff] to-[#e6f2ff] py-3 sm:p-3 shadow-sm my-4">
            <div className="container mx-auto max-w-[1200px]">

                {/* Top Section: Heading & Steps */}
                <div className="mb-4">
                    <div className="mb-3">
                        <h2 className="text-2xl font-extrabold text-[#0f172a] sm:text-3xl mb-2">
                            How to Install
                        </h2>
                        <p className="text-[12px] sm:text-[15px] text-gray-600 max-w-xl">
                            Get started with Anzal NextCandle Pro in just a few simple steps. Watch the demo video below to see it in action.
                        </p>
                    </div>

                    {/* Steps Flex Wrap */}
                    <div className="flex md:flex-row flex-col gap-3">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.id}
                                    className="flex-1 max-w-full md:max-w-[280px] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative"
                                >
                                    <div className="flex items-center gap-3 sm:mb-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[12px] shadow-md">
                                            {step.id}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon size={18} className="text-blue-500" />
                                            <h3 className="font-bold text-[#0f172a] text-[12px] sm:text-[15px]">{step.title}</h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[10px] sm:text-sm text-gray-500 leading-relaxed pl-[52px]">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Section: Full Width Video */}
                <div className="relative w-full max-w-4xl mx-auto">
                    {/* Decorative background elements */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-300 to-indigo-300 rounded-2xl blur-2xl opacity-30 pointer-events-none"></div>

                    <div className="relative bg-white p-2 sm:p-3 rounded-2xl shadow-xl border border-gray-100">

                        <div className="flex items-center justify-between mb-2 px-2 pt-1">
                            <div className="flex items-center gap-2">
                                <MonitorPlay size={18} className="text-blue-600" />
                                <span className="text-sm font-bold text-gray-700">Watch Demo</span>
                            </div>
                            <span className="text-xs font-medium text-gray-400">HD Video</span>
                        </div>

                        {/* Video Container (16:9 Aspect Ratio) */}
                        <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                            {isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                                    Loading video...
                                </div>
                            ) : videoUrl ? (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={videoUrl}
                                    title="Anzal NextCandle Pro Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-800">
                                    No demo video added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}