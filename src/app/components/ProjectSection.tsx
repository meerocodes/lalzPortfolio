'use client';

import ProjectOne from './projects/ProjectOne';
import ProjectTwo from './projects/ProjectTwo';
// import additional projects as needed

const PROJECT_COMPONENTS = [
    { label: 'Project One', Component: ProjectOne },
    { label: 'Project Two', Component: ProjectTwo },
    // add more here
];

interface ProjectsSectionProps {
    onBack: () => void;
    onSelect: (idx: number) => void;
}

export default function ProjectsSection({ onBack, onSelect }: ProjectsSectionProps) {
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
            <h2 className="mt-8 ml-2 text-white font-mono text-xs md:text-base">
                Projects:
            </h2>

            {/* Project list */}
            <div className="mt-2 space-y-2">
                {PROJECT_COMPONENTS.map((proj, idx) => (
                    <button
                        key={proj.label}
                        onClick={() => onSelect(idx)}
                        className="w-full text-left text-white font-mono text-xs md:text-base hover:bg-white/10 px-2 py-1 rounded  "
                    >
                        {proj.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
