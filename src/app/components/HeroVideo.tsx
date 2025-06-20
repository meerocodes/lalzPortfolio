'use client';

import { useEffect, useState, useRef } from 'react';
import { Power } from 'lucide-react';

export default function HeroVideo() {
    const [shrink, setShrink] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showProjectsList, setShowProjectsList] = useState(false);
    const [showProjectDetail, setShowProjectDetail] = useState(false);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // List of projects - replace with your real project data/rendering
    const projects = [
        { label: 'Project One', render: () => <div className="p-4 text-white">Project One Fullscreen Content</div> },
        { label: 'Project Two', render: () => <div className="p-4 text-white">Project Two Fullscreen Content</div> },
    ];

    // Menu options with label and action
    const menuOptions = [
        {
            label: 'Projects',
            action: () => {
                videoRef.current?.pause();
                setShowMenu(true);
                setShowProjectsList(true);
                setSelectedIndex(0);
            },
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
            if (!showMenu || showProjectsList || showProjectDetail) return;
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
    }, [showMenu, showProjectsList, showProjectDetail, selectedIndex]);

    const handleExit = () => {
        videoRef.current?.pause();
        setShowMenu(true);
        setSelectedIndex(0);
        setShowProjectsList(false);
        setShowProjectDetail(false);
    };

    const handlePlay = () => {
        setShowMenu(false);
        setShowProjectsList(false);
        setShowProjectDetail(false);
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
                            {/* Project Detail handles full-screen separately */}
                            {!showMenu && !showProjectsList && !showProjectDetail ? (
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
                            ) : showProjectsList && !showProjectDetail ? (
                                <div className="w-full h-full px-4 py-4 flex flex-col justify-center text-green-300 font-mono text-xs md:text-base">
                                    <div className="mb-2"><span className="ml-5">Projects:</span></div>
                                    <div className="space-y-2">
                                        {projects.map((proj, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedProjectIndex(idx);
                                                    setShowProjectDetail(true);
                                                }}
                                                className="w-full flex items-center hover:bg-white/10 px-2 py-1 cursor-pointer"
                                            >
                                                <span className="ml-[10px] text-green-300 font-mono text-xs md:text-base">
                                                    {proj.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
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
                                                className={`w-full flex items-center ${selectedIndex === idx ? 'underline' : ''} hover:bg-white/10 px-2 py-1 cursor-pointer`}
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
                    {shrink && !showMenu && !showProjectsList && !showProjectDetail && (
                        <button
                            onClick={handleExit}
                            aria-label="Power off"
                            className="absolute left-[21%] top-[66%] z-30 bg-red-600 border-2 border-red-800 text-white rounded-full p-1 shadow-inner hover:bg-red-700 transition pulse-glow"
                        >
                            <Power className="w-5 h-5" />
                        </button>
                    )}

                    {/* Back button inside monitor (to project list) */}
                    {shrink && showProjectsList && !showProjectDetail && (
                        <button
                            onClick={() => {
                                setShowProjectsList(false);
                                setShowMenu(true);
                            }}
                            aria-label="Back"
                            className="absolute left-3 top-3 z-30 bg-white/10 text-white rounded-full p-1 hover:bg-white/20 transition"
                        >
                            Back
                        </button>
                    )}

                    {/* TV frame graphic overlay */}
                    {shrink && !showProjectDetail && (
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
            {showText && !showMenu && !showProjectsList && !showProjectDetail && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">LAILA ZAYED</h1>
                </div>
            )}

            {/* Fullscreen project detail */}
            {showProjectDetail && selectedProjectIndex !== null && (
                <div className="absolute inset-0 bg-black text-white z-40 overflow-auto">
                    <button
                        onClick={() => {
                            setShowProjectDetail(false);
                            setShowProjectsList(true);
                        }}
                        aria-label="Back to Projects"
                        className="absolute top-4 left-4 z-50 bg-white/10 text-white rounded-full p-1 hover:bg-white/20 transition"
                    >
                        Back
                    </button>
                    <div className="p-8 pt-16">
                        {projects[selectedProjectIndex].render()}
                    </div>
                </div>
            )}

            {/* Glitch scanline styles + Pulse/Glow animation */}
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
        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
        }
        .pulse-glow {
          animation: pulseGlow 1.5s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
