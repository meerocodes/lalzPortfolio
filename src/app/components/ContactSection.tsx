'use client';

import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="bg-white text-black px-6 md:px-12 py-24 min-h-screen flex items-center"
        >
            <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                        Let’s make something beautiful together.
                    </h2>
                </div>

                {/* Info Rows */}
                <div className="grid md:grid-cols-2 gap-y-10 md:gap-20 text-base md:text-lg mb-20">
                    {/* Inquiries */}
                    <div className="space-y-2">
                        <h3 className="font-semibold">Inquiries</h3>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <a href="mailto:info@lalzportfolio.com" className="hover:underline">
                                info@lalzportfolio.com
                            </a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="space-y-2">
                        <h3 className="font-semibold">Socials</h3>
                        <div className="flex space-x-6 text-gray-700">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram className="hover:text-black transition" />
                            </a>
                            {/* <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                                <Tiktok className="hover:text-black transition" />
                            </a> */}
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="hover:text-black transition" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-gray-100 p-6 md:p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-3xl font-black tracking-tight">LALZ</div>

                    <div className="text-lg md:text-xl italic text-center md:text-left">
                        Let’s <span className="not-italic font-medium">collab</span>
                    </div>

                    <a
                        href="mailto:info@lalzportfolio.com"
                        className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                        Contact us
                    </a>
                </div>
            </div>
        </section>
    );
}
