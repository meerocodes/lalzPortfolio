'use client';

import { useState, useEffect } from 'react';
import ProjectOne from './projects/ProjectOne';
import ProjectTwo from './projects/ProjectTwo';
// import additional projects here

const PROJECT_COMPONENTS = [
    { label: 'Project One', Component: ProjectOne },
    { label: 'Project Two', Component: ProjectTwo },
    // add more projects as needed
];

interface ProjectsSectionProps {
    onBack: () => void;
    onSelect: (idx: number) => void;
}

export default function ProjectsSection({ onBack, onSelect }: ProjectsSectionProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + PROJECT_COMPONENTS.length) % PROJECT_COMPONENTS.length);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % PROJECT_COMPONENTS.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                onSelect(selectedIndex);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedIndex, onSelect]);

    return (
        <div className="absolute top-[20%] left-[8%] w-[60%] h-[50%] z-30 rounded-sm px-4 py-4 ">
            {/* Back button */}
            <button
                onClick={onBack}
                aria-label="Back to Menu"
                className="absolute top-2 left-2 text-green-300 font-mono hover:text-green-200 transition"
            >
                ← Back
            </button>

            {/* Title */}
            <h2 className="mt-8 ml-2 text-green-300 font-mono text-xs md:text-base">
                Projects:
            </h2>

            {/* Project list */}
            <div className="mt-2 space-y-2">
                {PROJECT_COMPONENTS.map((proj, idx) => (
                    <button
                        key={proj.label}
                        onClick={() => { setSelectedIndex(idx); onSelect(idx); }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center whitespace-nowrap text-left text-whitefont-mono text-xs md:text-base hover:bg-white/10 px-2 py-1 rounded ${selectedIndex === idx ? 'underline' : ''
                            }`}
                    >
                        <span className="mr-2">{selectedIndex === idx ? '→' : ' '}</span>
                        {proj.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
