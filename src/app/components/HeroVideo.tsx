'use client';

import { useEffect, useState, useRef } from 'react';
import { Power } from 'lucide-react';

export default function HeroVideo() {
    const [shrink, setShrink] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Menu options with label and action
    const menuOptions = [
        {
            label: 'Projects',
            action: () =>
                document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
            label: 'Contact',
            action: () => (window.location.href = 'mailto:you@example.com'),
        },
        { label: 'Play Video', action: () => handlePlay() },
    ];

    useEffect(() => {
        const shrinkTimeout = setTimeout(() => setShrink(true), 1500);
        const textTimeout = setTimeout(() => setShowText(true), 2000);
        return () => {
            clearTimeout(shrinkTimeout);
            clearTimeout(textTimeout);
        };
    }, []);

    // Handle keyboard navigation when menu is open
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!showMenu) return;
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                menuOptions[selectedIndex].action();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [showMenu, selectedIndex]);

    const handleExit = () => {
        videoRef.current?.pause();
        setShowMenu(true);
        setSelectedIndex(0);
    };

    const handlePlay = () => {
        setShowMenu(false);
        videoRef.current?.play();
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Video + TV Frame Container */}
            <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-1000 ease-in-out z-10 overflow-hidden
          ${shrink ? 'w-[90vw] h-[90vw] md:w-[700px] md:h-[660px]' : 'w-full h-full'}`}
            >
                <div className="relative w-full h-full">
                    {/* Video or Command Prompt Menu inside frame window */}
                    {shrink && (
                        <div className="absolute top-[10%] left-[22%] w-[60%] h-[50%] rounded-sm bg-black z-10">
                            {!showMenu ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full h-full px-4 py-4 flex flex-col justify-center text-green-300 font-mono text-xs md:text-base">
                                    <div>
                                        <span className="ml-5">User@Macintosh:~$</span>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        {menuOptions.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedIndex(idx);
                                                    opt.action();
                                                }}
                                                className={`
                          w-full flex items-center
                          ${selectedIndex === idx ? 'underline' : ''}
                          hover:bg-white/10
                          px-2 py-1
                          cursor-pointer
                        `}
                                            >
                                                <span className="mr-2">
                                                    {selectedIndex === idx ? '→' : ' '}
                                                </span>
                                                <span className="ml-[10px]">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Fullscreen video before shrink */}
                    {!shrink && (
                        <video
                            ref={videoRef}
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

                    {/* 🔴 Red “Power” Exit button inside frame */}
                    {shrink && !showMenu && (
                        <button
                            onClick={handleExit}
                            aria-label="Power off"
                            className={`
                absolute left-[21%] top-[66%] z-30
                bg-red-600 border-2 border-red-800
                text-white
                rounded-full p-1
                shadow-inner
                hover:bg-red-700
                transition
              `}
                        >
                            <Power className="w-5 h-5" />
                        </button>
                    )}

                    {/* TV frame graphic overlay */}
                    {shrink && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <img
                                src="/assets/macintosh-pc.png"
                                alt="Vintage TV frame"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Intro text and button */}
            {showText && !showMenu && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">LAILA ZAYED</h1>
                    {/* <button
                        onClick={() =>
                            document
                                .getElementById('projects')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition"
                    >
                        View Projects
                    </button> */}
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
