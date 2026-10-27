import { Monitor, Cpu, HardDrive, Layers, CheckCircle2 } from "lucide-react";

const requirementsData = {
    title: "System Requirements",
    subtitle: "Minimum hardware and software requirements to run Anzal NextCandle Pro smoothly.",
    os: "Windows 10 / 11 (32-bit & 64-bit)",
    processor: "Intel Core i3 or equivalent (1.5 GHz+)",
    ram: "4 GB RAM (8 GB recommended)",
    storage: "200 MB available space",
    display: "1366 x 768 resolution or higher",
};

export default function SystemRequirements() {
    return (
        <section id="requirments" className="scroll-mt-20 w-full rounded-xl border border-blue-100 bg-gradient-to-r from-[#f0f7ff] to-[#e6f2ff] py-3 sm:p-6 shadow-sm my-4">
            <div className="container mx-auto max-w-[1200px]">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
                        {requirementsData.title}
                    </h2>
                    <p className="mt-2 text-[15px] text-gray-600">
                        {requirementsData.subtitle}
                    </p>
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* OS */}
                    <div className="flex items-start gap-4 rounded-xl border border-white bg-white/60 p-3 sm:p-5 shadow-sm backdrop-blur-sm transition hover:bg-white">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Monitor size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0f172a]">Operating System</p>
                            <p className="mt-1 text-sm text-gray-600">{requirementsData.os}</p>
                        </div>
                    </div>

                    {/* Processor */}
                    <div className="flex items-start gap-4 rounded-xl border border-white bg-white/60 p-3 sm:p-5 shadow-sm backdrop-blur-sm transition hover:bg-white">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0f172a]">Processor</p>
                            <p className="mt-1 text-sm text-gray-600">{requirementsData.processor}</p>
                        </div>
                    </div>

                    {/* RAM */}
                    <div className="flex items-start gap-4 rounded-xl border border-white bg-white/60 p-3 sm:p-5 shadow-sm backdrop-blur-sm transition hover:bg-white">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Layers size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0f172a]">Memory (RAM)</p>
                            <p className="mt-1 text-sm text-gray-600">{requirementsData.ram}</p>
                        </div>
                    </div>

                    {/* Hard Drive */}
                    <div className="flex items-start gap-4 rounded-xl border border-white bg-white/60 p-3 sm:p-5 shadow-sm backdrop-blur-sm transition hover:bg-white">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <HardDrive size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0f172a]">Hard Drive</p>
                            <p className="mt-1 text-sm text-gray-600">{requirementsData.storage}</p>
                        </div>
                    </div>

                    {/* Display */}
                    <div className="flex items-start gap-4 rounded-xl border border-white bg-white/60 p-3 sm:p-5 shadow-sm backdrop-blur-sm transition hover:bg-white">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Monitor size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0f172a]">Display</p>
                            <p className="mt-1 text-sm text-gray-600">{requirementsData.display}</p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50/80 p-3 sm:p-5 shadow-sm backdrop-blur-sm">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-green-900">Both 32-bit & 64-bit</p>
                            <p className="mt-1 text-sm text-green-700">Fully compatible with Windows 32-bit and 64-bit architectures.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}