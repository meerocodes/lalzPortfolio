'use client';

import { Instagram, Linkedin, Mail } from 'lucide-react';

interface ContactSectionProps {
    onBack: () => void;
}

export default function ContactSection({ onBack }: ContactSectionProps) {
    return (
        <div className="relative w-full h-full  px-2 py-2 overflow-auto" style={{ top: '20%', left: '3%' }}>
            {/* Back button */}
            <button
                onClick={onBack}
                aria-label="Back"
                className="absolute top-1 left-1 text-green-300 font-mono hover:text-green-200 transition"
            >
                ← Back
            </button>

            {/* Content wrapper */}
            <div className="pt-6 px-2">
                {/* Heading */}
                {/* <h2 className="text-sm md:text-md font-semibold text-white text-left  mb-2">
                    Let’s connect
                </h2> */}

                {/* Contact details */}
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-sm md:text-base font-semibold text-white mb-1">Inquiries</h3>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a
                                href="mailto:info@lalzportfolio.com"
                                className="text-xs md:text-sm text-gray-300 hover:underline"
                            >
                                info@lalzportfolio.com
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm md:text-base font-semibold text-white mb-1">Socials</h3>
                        <div className="flex items-center space-x-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
