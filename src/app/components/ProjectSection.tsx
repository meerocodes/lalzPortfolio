'use client';
export default function ProjectsSection() {

    return (
        <section id="projects" className="relative w-full h-screen">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold">Welcome to Lalz</h2>
            </div>
        </section>
    );
}
