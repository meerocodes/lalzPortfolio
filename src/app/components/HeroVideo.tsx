'use client';

import { useEffect, useState, useRef } from 'react';
import { Power } from 'lucide-react';
import ProjectsSection from './ProjectSection';
import ContactSection from './ContactSection';
import ProjectOne from './projects/ProjectOne';
import ProjectTwo from './projects/ProjectTwo';

export default function HeroVideo() {
    const [shrink, setShrink] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailIdx, setDetailIdx] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const menuOptions = [
        { label: 'Projects', action: () => setShowProjects(true) },
        { label: 'Contact', action: () => setShowContact(true) },
        { label: 'Play Video', action: () => play() },
    ];

    useEffect(() => {
        const t1 = setTimeout(() => setShrink(true), 1500);
        const t2 = setTimeout(() => setShowText(true), 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!showMenu && !showProjects && !showContact) return;
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + menuOptions.length) % menuOptions.length);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % menuOptions.length);
            } else if (e.key === 'Enter' && showMenu) {
                e.preventDefault();
                menuOptions[selectedIndex].action();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [showMenu, showProjects, showContact, selectedIndex]);

    const play = () => {
        setShowMenu(false);
        videoRef.current?.play();
    };

    const exit = () => {
        videoRef.current?.pause();
        setShowMenu(true);
        setShowProjects(false);
        setShowContact(false);
        setShowDetail(false);
        setSelectedIndex(0);
    };

    const openDetail = (idx: number) => {
        setShowProjects(false);
        setShowContact(false);
        setShowDetail(true);
        setDetailIdx(idx);
        setShrink(false);
    };

    const backToProjects = () => {
        setShowDetail(false);
        setShrink(true);
        setShowProjects(true);
        setSelectedIndex(0);
    };

    const backFromContact = () => {
        setShowContact(false);
        setSelectedIndex(0);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Frame container */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 overflow-hidden ${shrink ? 'w-[90vw] h-[90vw] md:w-[700px] md:h-[660px]' : 'w-full h-full'}`}>
                <div className="relative w-full h-full">
                    {/* Detail view */}
                    {showDetail && (
                        <div className="absolute inset-0 bg-black z-30 overflow-auto">
                            <button onClick={backToProjects} className="absolute top-4 left-4 z-40 bg-white/10 text-white rounded-full p-1 hover:bg-white/20 transition">← Back</button>
                            <div className="p-8 pt-16">
                                {detailIdx === 0 && <ProjectOne />}
                                {detailIdx === 1 && <ProjectTwo />}
                            </div>
                        </div>
                    )}

                    {/* Inside monitor */}
                    {shrink && !showDetail && (
                        <div className="absolute top-[10%] left-[22%] w-[60%] h-[50%] rounded-sm bg-green-800 z-10">
                            {showProjects ? (
                                <ProjectsSection onBack={() => setShowProjects(false)} onSelect={openDetail} />
                            ) : showContact ? (
                                <ContactSection onBack={backFromContact} />
                            ) : !showMenu ? (
                                <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
                                    <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                                </video>
                            ) : (
                                <div className="w-full h-full px-4 py-4 flex flex-col justify-center font-mono text-xs md:text-base">
                                    <span className="ml-5">User@Macintosh:~$</span>
                                    <div className="mt-2 space-y-2">
                                        {menuOptions.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setSelectedIndex(idx); opt.action(); }}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`w-full flex items-center hover:bg-white/10 px-2 py-1 cursor-pointer ${selectedIndex === idx ? 'underline' : ''}`}
                                            >
                                                <span className="mr-2">{selectedIndex === idx ? '→' : ' '}</span>
                                                <span>{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Full video before shrink */}
                    {!shrink && !showDetail && (
                        <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                            <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                        </video>
                    )}

                    {/* Power button */}
                    {shrink && !showMenu && !showProjects && !showDetail && !showContact && (
                        <button onClick={exit} className="absolute left-[21%] top-[66%] z-30 bg-red-600 border-2 border-red-800 text-white rounded-full p-1 shadow-inner hover:bg-red-700 transition pulse-glow">
                            <Power className="w-5 h-5" />
                        </button>
                    )}

                    {/* Monitor frame */}
                    {shrink && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <img src="/assets/macintosh-pc.png" alt="Vintage TV frame" className="w-full h-full object-contain" />
                        </div>
                    )}
                </div>
            </div>

            {/* Intro text */}
            {showText && !showMenu && !showProjects && !showDetail && !showContact && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">LAILA ZAYED</h1>
                </div>
            )}

            <style jsx>{`
                @keyframes pulseGlow {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,0,0,0.7); }
                    50% { transform: scale(1.2); box-shadow: 0 0 10px 5px rgba(255,0,0,0.7); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,0,0,0.7); }
                }
                .pulse-glow { animation: pulseGlow 1.5s ease-in-out infinite; }
            `}</style>
        </section>
    );
}
