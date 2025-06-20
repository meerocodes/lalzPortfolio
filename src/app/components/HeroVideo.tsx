'use client';

import { useEffect, useState, useRef } from 'react';
import { Power } from 'lucide-react';
import ProjectsSection from './ProjectSection';
import ProjectOne from './projects/ProjectOne';
import ProjectTwo from './projects/ProjectTwo';

export default function HeroVideo() {
    const [shrink, setShrink] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailIdx, setDetailIdx] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const menuOptions = [
        { label: 'Projects', action: () => setShowProjects(true) },
        { label: 'Contact', action: () => (window.location.href = 'mailto:you@example.com') },
        { label: 'Play Video', action: () => play() },
    ];

    useEffect(() => {
        const t1 = setTimeout(() => setShrink(true), 1500);
        const t2 = setTimeout(() => setShowText(true), 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const play = () => {
        setShowMenu(false);
        videoRef.current?.play();
    };

    const exit = () => {
        videoRef.current?.pause();
        setShowMenu(true);
        setShowProjects(false);
        setShowDetail(false);
    };

    const openDetail = (idx: number) => {
        setShowProjects(false);
        setShowDetail(true);
        setDetailIdx(idx);
        setShrink(false);
    };

    const backToProjects = () => {
        setShowDetail(false);
        setShrink(true);
        setShowProjects(true);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 overflow-hidden ${shrink ? 'w-[90vw] h-[90vw] md:w-[700px] md:h-[660px]' : 'w-full h-full'
                }`}>
                <div className="relative w-full h-full">
                    {showDetail && (
                        <div className="absolute inset-0 bg-black z-30 overflow-auto">
                            <button
                                onClick={backToProjects}
                                className="absolute top-4 left-4 z-40 bg-white/10 text-white rounded-full p-1 hover:bg-white/20 transition"
                            >
                                ← Back
                            </button>
                            <div className="p-8 pt-16">
                                {detailIdx === 0 && <ProjectOne />}
                                {detailIdx === 1 && <ProjectTwo />}
                            </div>
                        </div>
                    )}

                    {shrink && !showDetail && (
                        <div className="absolute top-[10%] left-[22%] w-[60%] h-[50%] rounded-sm " style={{ background: 'rgb(65 246 7 / 27%)' }}>
                            {showProjects ? (
                                <ProjectsSection onBack={() => setShowProjects(false)} onSelect={openDetail} />
                            ) : !showMenu ? (
                                <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
                                    <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                                </video>
                            ) : (
                                <div className="w-full h-full px-4 py-4 flex flex-col justify-center font-mono text-xs md:text-base" >
                                    <span className="ml-5">User@Macintosh:~$</span>
                                    <div className="mt-2 space-y-2">
                                        {menuOptions.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={opt.action}
                                                className="w-full flex items-center hover:bg-white/10 px-2 py-1 cursor-pointer"
                                            >
                                                <span className="ml-[10px]">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!shrink && !showDetail && (
                        <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                            <source src="/assets/lalzVideoIntro.mp4" type="video/mp4" />
                        </video>
                    )}

                    {shrink && !showMenu && !showProjects && !showDetail && (
                        <button
                            onClick={exit}
                            className="power-button absolute left-[21%] top-[66%] z-30 bg-red-600 border-2 border-red-800 text-white rounded-full p-1 shadow-inner hover:bg-red-700 transition"
                        >
                            <Power className="w-5 h-5" />
                        </button>
                    )}

                    {shrink && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <img src="/assets/macintosh-pc.png" alt="Vintage TV frame" className="w-full h-full object-contain" />
                        </div>
                    )}
                </div>
            </div>

            {showText && !showMenu && !showProjects && !showDetail && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center text-center text-white px-4 z-30 space-y-4 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold">LAILA ZAYED</h1>
                </div>
            )}

            <style jsx>{`
        @keyframes pulse3D {
          0% {
            transform: scale3d(1, 1, 1);
            box-shadow: 0 0 0 rgba(255, 0, 0, 0.7);
          }
          50% {
            transform: scale3d(1.2, 1.2, 1.2);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.7), 0 6px 10px rgba(0, 0, 0, 0.5);
          }
          100% {
            transform: scale3d(1, 1, 1);
            box-shadow: 0 0 0 rgba(255, 0, 0, 0.7);
          }
        }
        .power-button {
          perspective: 500px;
          transform-style: preserve-3d;
          animation: pulse3D 1.5s ease-in-out infinite;
        }
        .power-button:active {
          transform: translateZ(10px) scale3d(0.9, 0.9, 0.9);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
        </section>
    );
}
