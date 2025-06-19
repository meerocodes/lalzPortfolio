'use client';

import { useEffect, useState } from 'react';

export default function HeroVideo() {
    const [shrink, setShrink] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const shrinkTimeout = setTimeout(() => setShrink(true), 1500);
        const textTimeout = setTimeout(() => setShowText(true), 2000);
        return () => {
            clearTimeout(shrinkTimeout);
            clearTimeout(textTimeout);
        };
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Video + TV Frame Container */}
            <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 overflow-hidden
          ${shrink ? 'w-[90vw] h-[60vw] md:w-[700px] md:h-[460px]' : 'w-full h-full'}`}
            >
                <div className="relative w-full h-full">
                    {/* Fullscreen video before shrink */}
                    {!shrink && (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    {/* Video inset inside frame window */}
                    {shrink && (
                        <div className="absolute top-[20%] left-[22%] w-[55%] h-[58%] overflow-hidden rounded-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 pointer-events-none glitch-overlay" />
                        </div>
                    )}

                    {/* TV frame graphic overlay (plain <img> so it works after export) */}
                    {shrink && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <img
                                src="/assets/tv-frame.png"
                                alt="Vintage TV frame"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Intro text and button */}
            {showText && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">Hey, I&apos;m Lalz</h1>
                    <p className="text-lg md:text-xl max-w-2xl">
                        I&apos;m a multidisciplinary creative & developer. Welcome to my interactive portfolio — a space where design, storytelling, and code collide.
                    </p>
                    <button
                        onClick={scrollToProjects}
                        className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition"
                    >
                        View Projects
                    </button>
                </div>
            )}

            {/* Glitch scanline styles */}
            <style jsx>{`
        .glitch-overlay {
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 2px
          );
          mix-blend-mode: overlay;
          animation: glitch 0.5s infinite step-end;
        }
        @keyframes glitch {
          0% { opacity: 0.5; transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { opacity: 0.5; transform: translateX(0); }
        }
      `}</style>
        </section>
    );
}
