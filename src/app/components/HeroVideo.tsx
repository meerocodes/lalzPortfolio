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
    const screenRef = useRef<HTMLDivElement>(null);
    const powerButtonRef = useRef<HTMLButtonElement>(null);

    const menuOptions = [
        { label: 'Projects', action: () => setShowProjects(true) },
        { label: 'Contact', action: () => setShowContact(true) },
        { label: 'Play Video', action: () => play() },
    ];

    // Scanline effect for monitor screen
    useEffect(() => {
        const screen = screenRef.current;
        if (!screen || !shrink) return;

        const scanLine = document.createElement('div');
        scanLine.className = 'absolute top-0 left-0 w-full h-[1px] bg-green-400/20 z-40 animate-scanline pointer-events-none';
        screen.appendChild(scanLine);

        return () => {
            if (screen.contains(scanLine)) {
                screen.removeChild(scanLine);
            }
        };
    }, [shrink, showMenu, showProjects, showContact, showDetail]);

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
        // Add button press effect
        if (powerButtonRef.current) {
            powerButtonRef.current.classList.add('power-button-active');
            setTimeout(() => {
                if (powerButtonRef.current) {
                    powerButtonRef.current.classList.remove('power-button-active');
                }
            }, 200);
        }

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
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 overflow-hidden ${shrink ? 'w-[90vw] h-[100vw] md:w-[700px] md:h-[660px]' : 'w-full h-full'}`}>
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

                    {/* Inside monitor with CRT effects */}
                    {shrink && !showDetail && (
                        <div
                            ref={screenRef}
                            className={
                                "absolute top-[10%] left-[20%] w-[60%] h-[50%] rounded-sm z-10 md:left-[25%] md:w-[50%] " +
                                "bg-green-800 border border-green-500/30 " +
                                "shadow-[0_0_25px_rgba(0,255,127,0.5),inset_0_0_20px_rgba(0,255,0,0.1)] " +
                                "overflow-hidden"
                            }
                        >
                            {/* Vignette effect */}
                            <div className="absolute inset-0 rounded-sm shadow-[inset_0_0_40px_5px_rgba(0,0,0,0.6)] pointer-events-none z-0"></div>

                            {/* Content */}
                            {showProjects ? (
                                <ProjectsSection onBack={() => setShowProjects(false)} onSelect={openDetail} />
                            ) : showContact ? (
                                <ContactSection onBack={backFromContact} />
                            ) : !showMenu ? (
                                <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover relative z-10">
                                    <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                                </video>
                            ) : (
                                <div className="w-full h-full py-2 flex flex-col justify-center font-mono text-xs md:text-base relative z-10">
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

                    {/* Monitor frame */}
                    {shrink && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <img src="/assets/macintosh-pc.png" alt="Vintage TV frame" className="w-full h-full object-contain" />
                        </div>
                    )}

                    {/* POWER BUTTON - 3D STYLE WITH INNER AMBER GLOW */}
                    {shrink && !showDetail && (
                        <button
                            ref={powerButtonRef}
                            onClick={exit}
                            className="power-button absolute left-[21%] top-[66%] z-50 p-1 transition-all duration-200"
                        >
                            <div className="power-button-inner">
                                <Power className="w-5 h-5 relative z-10 text-amber-200/80" />
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Intro text */}
            {/* {showText && !showMenu && !showProjects && !showDetail && !showContact && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">LAILA ZAYED</h1>
                </div>
            )} */}

            <style jsx>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(calc(100% + 1px)); }
                }
                .animate-scanline {
                    animation: scanline 4s linear infinite;
                }
                
                /* Power button 3D styling with inner glow */
                .power-button {
                    left: 21%;
                    top: 66%;
                    width: 42px;
                    height: 42px;
                    perspective: 200px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    transform: translateZ(0);
                }
                
                .power-button-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(145deg, #d63031, #c0392b);
                    border-radius: 4px;
                    box-shadow: 
                        inset 0 -2px 0 rgba(0,0,0,0.3),
                        inset 0 2px 0 rgba(255,255,255,0.1),
                        inset 0 0 15px rgba(255, 165, 0, 0.4),
                        0 4px 8px rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateZ(0);
                    transition: all 0.15s ease;
                    z-index: 2;
                    animation: innerAmberPulse 1.5s infinite;
                }
                
                .power-button:hover .power-button-inner {
                    background: linear-gradient(145deg, #e74c3c, #d63031);
                    box-shadow: 
                        inset 0 -1px 0 rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 0 20px rgba(255, 165, 0, 0.6),
                        0 6px 12px rgba(0,0,0,0.5);
                }
                
                .power-button-active .power-button-inner {
                    transform: translateY(2px);
                    box-shadow: 
                        inset 0 -1px 0 rgba(0,0,0,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.05),
                        inset 0 0 10px rgba(255, 165, 0, 0.3),
                        0 1px 2px rgba(0,0,0,0.3);
                    background: linear-gradient(145deg, #c0392b, #b53224);
                }
                
                @keyframes innerAmberPulse {
                    0% { 
                        box-shadow: 
                            inset 0 -2px 0 rgba(0,0,0,0.3),
                            inset 0 2px 0 rgba(255,255,255,0.1),
                            inset 0 0 15px rgba(255, 165, 0, 0.4),
                            0 4px 8px rgba(0,0,0,0.4);
                    }
                    50% { 
                        box-shadow: 
                            inset 0 -2px 0 rgba(0,0,0,0.3),
                            inset 0 2px 0 rgba(255,255,255,0.1),
                            inset 0 0 25px rgba(255, 165, 0, 0.8),
                            0 4px 8px rgba(0,0,0,0.4);
                    }
                    100% { 
                        box-shadow: 
                            inset 0 -2px 0 rgba(0,0,0,0.3),
                            inset 0 2px 0 rgba(255,255,255,0.1),
                            inset 0 0 15px rgba(255, 165, 0, 0.4),
                            0 4px 8px rgba(0,0,0,0.4);
                    }
                }
            `}</style>
        </section>
    );
}