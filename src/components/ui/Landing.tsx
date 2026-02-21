'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Star } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FFC229] selection:text-[#4A2B5E] overflow-x-hidden font-sans">
            
            {/* --- Ambient Background Glows --- */}
            <div className="fixed top-0 left-0 w-125 h-125 bg-[#FFC229]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
            <div className="fixed bottom-0 right-0 w-150 h-150 bg-[#4A2B5E]/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0"></div>

            {/* --- Navbar --- */}
            <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black tracking-tighter">FleetFlow</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
                        <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link 
                            href="/login" 
                            className="text-sm font-bold text-gray-400 hover:text-white transition-colors px-4 py-2"
                        >
                            Sign In
                        </Link>
                        <Link 
                            href="/register" 
                            className="bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-[#FFC229]/20 transition-all hover:-translate-y-0.5 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative pt-40 pb-20 px-6 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="flex h-2 w-2 rounded-full bg-[#FFC229] animate-pulse"></span>
                        <span className="text-xs font-black text-gray-300 uppercase tracking-widest">v4.0 Dispatch Engine Live</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Logistics, <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFC229] via-[#F59E0B] to-[#FFC229] bg-size-[200%_auto] animate-gradient">
                            Digitized.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        The AI-powered command center for modern fleets. Dispatch, track, and optimize your entire operation from a single, high-performance interface.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <Link 
                            href="/register" 
                            className="w-full sm:w-auto px-10 py-5 bg-[#FFC229] text-[#1F2937] rounded-2xl font-black text-lg shadow-2xl shadow-[#FFC229]/20 hover:shadow-[#FFC229]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            href="/login" 
                            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black text-lg transition-all"
                        >
                            Live Demo
                        </Link>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale animate-in fade-in duration-1000 delay-500">
                        <div className="text-2xl font-black tracking-tighter italic">GLOBAL-X</div>
                        <div className="text-2xl font-black tracking-tighter">SHIP.LY</div>
                        <div className="text-2xl font-black tracking-tighter italic underline decoration-[#FFC229]">NEXTRA</div>
                        <div className="text-2xl font-black tracking-tighter">VELOCITY</div>
                    </div>
                </div>
            </section>

            {/* --- Value Props --- */}
            <section id="features" className="py-24 px-6 relative z-10 border-t border-white/5 bg-white/1">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="text-[#FFC229]" />,
                                title: "Real-time Dispatch",
                                desc: "Automated route optimization and driver assignment in under 200ms."
                            },
                            {
                                icon: <Shield className="text-emerald-400" />,
                                title: "Safety Audits",
                                desc: "AI-driven safety scoring and predictive maintenance alerts for every asset."
                            },
                            {
                                icon: <Globe className="text-blue-400" />,
                                title: "Fleet Visibility",
                                desc: "End-to-end telemetry and live mapping across your entire operational territory."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-[#1E1E24]/50 border border-white/5 backdrop-blur-md hover:border-[#FFC229]/30 transition-all duration-500 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#4A2B5E] to-[#1F2937] -z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 -z-10"></div>
                    
                    <div className="p-12 md:p-20 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready to optimize your fleet?</h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-xl mx-auto font-medium">
                            Join over 500+ logistic companies using FleetFlow to scale their operations.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link 
                                href="/register" 
                                className="px-12 py-5 bg-[#FFC229] text-[#1F2937] rounded-2xl font-black text-lg shadow-xl hover:shadow-[#FFC229]/50 transition-all"
                            >
                                Get Started Free
                            </Link>
                            <span className="text-gray-400 font-bold text-sm">No credit card required.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-12 px-6 border-t border-white/5 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-50 grayscale">
                        
                        <span className="font-black tracking-tighter">FleetFlow</span>
                    </div>
                    <p className="text-gray-600 text-sm font-bold">© 2026 FleetFlow Systems Inc. Engineered for performance.</p>
                    <div className="flex gap-8 text-sm font-bold text-gray-500">
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}