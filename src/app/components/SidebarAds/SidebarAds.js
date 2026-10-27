import React from 'react';
import Image from 'next/image';

export default function SidebarAds({ position = 'left' }) {
    return (
        <aside className={`hidden xl:block w-[280px] shrink-0 sticky top-24 h-fit ${position === 'left' ? 'mr-6' : 'ml-6'}`}>
            <div className="bg-gradient-to-b from-blue-600 to-indigo-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12 transition-transform duration-700 group-hover:scale-110"></div>

                <span className="inline-block bg-blue-500/50 text-xs font-semibold px-2 py-1 rounded mb-4">Advertisement</span>

                <h2 className="text-2xl font-bold mb-3 leading-tight relative z-10">Upgrade Your Trading Experience</h2>
                <p className="text-sm text-blue-100 mb-6 relative z-10">Get Premium Signals and maximize your profits with our Pro tools.</p>

                {/* Trading Image replacing the Placeholder */}
                <div className="bg-white/10 rounded-lg p-2 mb-6 border border-white/20 relative z-10 overflow-hidden group-hover:border-white/40 transition-colors">
                    <div className="relative w-full h-36 rounded overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Trading Chart"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Overlay gradient for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            Live Market Analysis
                        </div>
                    </div>
                </div>

                <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition shadow-md relative z-10 flex justify-center items-center gap-2">
                    Explore Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}