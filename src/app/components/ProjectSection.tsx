'use client';

import { useState, useEffect } from 'react';
import { Folder } from 'lucide-react';
import ProjectOne from './projects/ProjectOne';
import ProjectTwo from './projects/ProjectTwo';
// import additional project components as needed

// Define folder categories and their associated projects
const FOLDERS = [
    {
        label: 'Photo',
        projects: [
            { label: 'Project One', Component: ProjectOne },
            { label: 'Project Two', Component: ProjectTwo },
            // add more Photo projects here
        ],
    },
    {
        label: 'Video',
        projects: [
            { label: 'Project One', Component: ProjectOne },
            { label: 'Project Two', Component: ProjectTwo },
            // add more Video projects here
        ],
    },
    {
        label: 'Events',
        projects: [
            { label: 'Project One', Component: ProjectOne },
            { label: 'Project Two', Component: ProjectTwo },
            // add more Events projects here
        ],
    },
    {
        label: 'Workshops',
        projects: [
            { label: 'Project One', Component: ProjectOne },
            { label: 'Project Two', Component: ProjectTwo },
            // add more Workshops projects here
        ],
    },
];

interface ProjectsSectionProps {
    onBack: () => void;
    onSelect: (idx: number) => void;
}

export default function ProjectsSection({ onBack, onSelect }: ProjectsSectionProps) {
    const [stage, setStage] = useState<'folders' | 'projects'>('folders');
    const [selectedFolderIndex, setSelectedFolderIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const length =
                stage === 'folders'
                    ? FOLDERS.length
                    : FOLDERS[selectedFolderIndex].projects.length;

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + length) % length);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % length);
            } else if (stage === 'folders' && e.key === 'ArrowLeft') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + FOLDERS.length) % FOLDERS.length);
            } else if (stage === 'folders' && e.key === 'ArrowRight') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % FOLDERS.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (stage === 'folders') {
                    setSelectedFolderIndex(selectedIndex);
                    setStage('projects');
                    setSelectedIndex(0);
                } else {
                    onSelect(selectedIndex);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                if (stage === 'projects') {
                    // go back to folder view
                    setStage('folders');
                    setSelectedIndex(selectedFolderIndex);
                } else {
                    // back out of the whole section
                    onBack();
                }
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [stage, selectedIndex, selectedFolderIndex, onSelect, onBack]);
    

    const handleItemClick = (idx: number) => {
        setSelectedIndex(idx);
        if (stage === 'folders') {
            setSelectedFolderIndex(idx);
            setStage('projects');
            setSelectedIndex(0);
        } else {
            onSelect(idx);
        }
    };

    const listLabels =
        stage === 'folders'
            ? FOLDERS.map((f) => f.label)
            : FOLDERS[selectedFolderIndex].projects.map((p) => p.label);

    return (
        <div className="absolute top-[20%] left-[5%] w-[60%] h-[50%] z-30 rounded-sm px-4 py-4">
            {/* Back button */}
            <button
                onClick={() => {
                    if (stage === 'projects') {
                        setStage('folders');
                        setSelectedIndex(selectedFolderIndex);
                    } else {
                        onBack();
                    }
                }}
                aria-label="Back"
                className="absolute top-2 left-2 md:left-4 lg:left-6 text-green-300 font-mono hover:text-green-200 transition"
            >
                ← Back
            </button>

            {/* Title */}
            <h2 className="mt-8 ml-2 text-green-300 font-mono text-xs md:text-base">
                {stage === 'folders' ? 'Projects:' : FOLDERS[selectedFolderIndex].label + ':'}
            </h2>

            {stage === 'folders' ? (
                <div className=" pl-12 mt-2 grid grid-cols-4 gap-x-13 gap-y-2 md:grid-cols-2 md:pl-20 md:gap-x-15 md:gap-y-4 justify-center">
                    {FOLDERS.map((folder, idx) => (
                        <button
                            key={folder.label}
                            onClick={() => handleItemClick(idx)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex flex-col items-center text-green-300 hover:text-white transition ${selectedIndex === idx ? 'underline' : ''
                                }`}
                        >
                            <Folder className="w-4 h-4 md:w-8 md:h-8 mb-1" />
                            <span className="text-xs md:text-sm whitespace-nowrap">
                                {folder.label}
                            </span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mt-4 space-y-2">
                    {listLabels.map((label, idx) => (
                        <button
                            key={label}
                            onClick={() => handleItemClick(idx)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center whitespace-nowrap text-left text-green-300 font-mono text-xs md:text-base hover:bg-white/10 px-2 py-1 rounded ${selectedIndex === idx ? 'underline' : ''
                                }`}
                        >
                            <span className="mr-2">{selectedIndex === idx ? '→' : ' '}</span>
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}