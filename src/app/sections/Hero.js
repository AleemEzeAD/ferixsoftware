"use client";
import {
    ArrowRight,
    ShieldCheck,
    TrendingUp,
    Crosshair,
} from "lucide-react";

const softwareData = {
    badge: "Pro Trading Platform",
    titleFirst: "Ferix",
    titleSecond: "Software Pro",
    tagline: "Master the markets with real-time AI signals and precise analysis.",
    description:
        "Anzal NextCandle Pro is a powerful, professional trading dashboard that provides accurate market signals, live candle analysis, and seamless integration with your favorite platforms including Windows, macOS, and Web.",
    features: [
        { icon: TrendingUp, label: "Real-time", subLabel: "Signals" },
        { icon: Crosshair, label: "High", subLabel: "Accuracy" },
    ],
};

export default function HeroLeft() {
    return (
        <section className="w-full bg-gradient-to-b from-[#eef5ff] via-[#f6faff] to-white pt-6 pb-3 sm:pb-6 sm:pt-10">
            <div className="container mx-auto max-w-[1200px] md:px-6">
                <div className="grid items-center gap-5 lg:gap-10 lg:grid-cols-[1fr_1.1fr]">

                    <div className="relative z-10 text-center lg:text-left flex flex-col lg:items-start lg:content-start items-center content-center">
                        <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-semibold text-blue-600">
                            {softwareData.badge}
                        </span>

                        <h1 className="mt-4 text-[32px] md:text-[46px] font-extrabold leading-[1.1] text-[#0f172a]">
                            <span>{softwareData.titleFirst}</span> <span className="text-green-600">{softwareData.titleSecond}</span>
                        </h1>

                        <p className="mt-2 text-base md:text-xl font-medium text-[#475569]">
                            {softwareData.tagline}
                        </p>

                        <p className="mt-2 max-w-[34rem] text-[13px] md:text-[15px] leading-relaxed text-[#475569]">
                            {softwareData.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-4">
                            {softwareData.features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex sm:w-fit w-full items-center gap-2.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2"
                                    >
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dbeafe] bg-[#eff6ff] text-[#3b82f6]">
                                            <Icon size={18} />
                                        </span>
                                        <p className="whitespace-nowrap text-[13px] font-medium leading-tight text-start text-[#475569]">
                                            {feature.label} {feature.subLabel}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-2 flex">
                            <a
                                href="/about"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#dbeafe] bg-blue-600 px-3 py-2 sm:px-6 sm:py-3.5 text-[13px] sm:text-[15px] font-semibold text-[#fff] leading-[1.3] transition hover:bg-green-600 hover:text-[#fff]"
                            >
                                Learn More <ArrowRight size={16} />
                            </a>
                        </div>

                        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[#16a34a]">
                            <ShieldCheck size={16} /> Secure &amp; Encrypted Connection
                        </p>
                    </div>

                    <div className="relative w-full flex items-center justify-center">
                        <figure className="w-full h-full flex items-center justify-center">
                            <img
                                src="assets/images/anzal-hero.webp"
                                alt={softwareData.titleSecond}
                                className="w-full h-full object-contain"
                            />
                        </figure>
                    </div>

                </div>
            </div>
        </section>
    );
}