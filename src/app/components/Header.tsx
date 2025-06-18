'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4">
            <nav className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-wide uppercase">Lalz</h1>

                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-10 text-lg font-medium tracking-wide">
                    <li>
                        <a href="#projects" className="hover:text-gray-300 transition">Projects</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-300 transition">Contact</a>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-sm absolute top-full left-0 w-full py-6 px-6 space-y-4 z-40 text-lg font-medium tracking-wide">
                    <a href="#projects" onClick={() => setIsOpen(false)} className="block hover:text-gray-300">Projects</a>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="block hover:text-gray-300">Contact</a>
                </div>
            )}
        </header>
    );
}
