import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#111827] text-gray-300 mt-2 pt-6 md:pt-10 pb-6">
            <div className="container mx-auto max-w-[1200px] px-6">
                <div className="flex flex-col items-center justify-center gap-3 pb-4 border-b border-gray-800">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <figure className="">
                                <img src="assets/images/dragan.png" alt="Ferix Software Logo" className="w-10 h-10" />
                            </figure>
                        </div>
                        <span className="text-base sm:text-xl font-bold text-white">Ferixsoftware Pro</span>
                    </Link>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium">
                        <Link href="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link>
                        <Link href="#how-to-install" className="text-gray-400 hover:text-blue-400 transition">How to Install</Link>
                        <Link href="#screenshots" className="text-gray-400 hover:text-blue-400 transition">Screenshots</Link>
                        <Link href="#requirments" className="text-gray-400 hover:text-blue-400 transition">Requirments</Link>
                    </div>
                </div>

                {/* Bottom Section: Copyright (Right Aligned) */}
                <div className="mt-3 flex justify-center text-[13px] text-center text-gray-500">
                    <p>© {new Date().getFullYear()} Ferixsoftware Pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}