import React from "react";
import Link from "next/link";
import {
    Target,
    Eye,
    ShieldCheck,
    TrendingUp,
    Users,
    Zap,
    ArrowRight
} from "lucide-react";

export default function AboutPage() {
    return (
        <div className="w-full">
            {/* 1. HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eef5ff] via-[#f6faff] to-white py-6 md:py-10">
                <div className="container mx-auto max-w-[1200px] px-6 text-center relative z-10">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600 mb-2">
                        About Ferix Software Pro
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight tracking-tight mb-2">
                        Empowering Traders with <br className="hidden md:block" />
                        <span className="text-green-600">
                            Smart Technology
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We are dedicated to building the most reliable, accurate, and user-friendly trading dashboard for professionals and beginners worldwide.
                    </p>
                </div>
            </section>

            {/* 2. OUR STORY SECTION */}
            <section className="py-6">
                <div className="container max-w-[1200px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200 to-green-100 rounded-3xl blur-2xl opacity-50"></div>
                            <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Trading Dashboard"
                                    className="w-full h-auto rounded-xl object-cover"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Ferix Software Pro was born out of a simple frustration: the trading tools available were either too complex for beginners or too expensive for retail traders.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our team of expert traders and software engineers came together to build a solution that bridges the gap between advanced AI algorithms and everyday trading. We wanted to create a dashboard that not only predicts market movements but also educates users along the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MISSION & VISION */}
            <section className="mission-vission bg-white border-y border-gray-100 py-6">
                <div className="container mx-auto max-w-[1200px] px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                <Target size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To democratize advanced trading technology by providing retail traders with the same powerful tools and real-time insights that were once only available to institutional investors.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 shadow-sm">
                            <div className="w-14 h-14 bg-green-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                                <Eye size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the world's most trusted and accessible trading companion, helping millions of traders achieve financial freedom through data-driven decisions and risk management.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. WHAT WE OFFER */}
            <section className="offer py-6">
                <div className="container max-w-[1200px]">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-[#0f172a] mb-2">What We Offer</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Built with cutting-edge technology to give you the ultimate trading edge.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: TrendingUp, title: "AI Signals", desc: "Real-time buy/sell alerts." },
                            { icon: Zap, title: "Fast Execution", desc: "Zero lag trading experience." },
                            { icon: ShieldCheck, title: "Secure Platform", desc: "Bank-level encryption." },
                            { icon: Users, title: "Community", desc: "Learn from pro traders." },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:-translate-y-1 transition duration-300">
                                    <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                        <Icon size={22} />
                                    </div>
                                    <h4 className="font-bold text-[#0f172a] mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="ready-to-upgrade">
                <div className="container max-w-[1200px]">
                    <div className="bg-[#0f172a] rounded-3xl p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 opacity-20 rounded-full blur-3xl"></div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                            Ready to Upgrade Your Trading?
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                            Join thousands of successful traders using Ferix Software Pro. Download now and start making smarter decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <a
                                href="/#download"
                                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition"
                            >
                                Download Now <ArrowRight size={18} />
                            </a>
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white border border-gray-600 hover:bg-white/5 transition"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}