// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-[var(--background)] border-b border-[var(--border-color)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--primary)]"
          >
            Jayan Zaman
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[var(--text-primary)] hover:text-[var(--primary)]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/' ? 'text-[var(--primary)]' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              href="/latest-thinking"
              className={`text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/latest-thinking' ? 'text-[var(--primary)]' : ''
              }`}
            >
              Latest Thinking
            </Link>
            <Link 
              href="/about"
              className={`text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/about' ? 'text-[var(--primary)]' : ''
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <Link 
              href="/" 
              className={`block text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/' ? 'text-[var(--primary)]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/latest-thinking"
              className={`block text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/latest-thinking' ? 'text-[var(--primary)]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Latest Thinking
            </Link>
            <Link 
              href="/about"
              className={`block text-[var(--text-secondary)] hover:text-[var(--primary)] ${
                pathname === '/about' ? 'text-[var(--primary)]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
