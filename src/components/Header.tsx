// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AlponaRosette from './AlponaRosette';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'LATEST THINKING', path: '/latest-thinking' },
    { name: 'EXPERIMENTS', path: '/quantum-beyond' }, // Maps 'quantum-beyond' to 'EXPERIMENTS'
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="w-full bg-[var(--paper)] border-b border-[var(--rule)] sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-[var(--sumi)] group"
          >
            <AlponaRosette width={26} height={26} />
            <span className="font-serif font-light text-[22px] tracking-normal group-hover:text-[var(--vermilion)] transition-colors">
              Jayan Zaman
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[var(--sumi)] hover:text-[var(--vermilion)] p-1 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`label-mono text-[13px] tracking-[0.08em] transition-colors relative py-1 hover:text-[var(--vermilion)] ${
                    isActive ? 'text-[var(--vermilion)]' : 'text-[var(--sumi-2)]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--vermilion)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-[var(--paper-edge)] flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`label-mono text-[13px] tracking-[0.08em] transition-colors py-1 block hover:text-[var(--vermilion)] ${
                    isActive ? 'text-[var(--vermilion)] border-l-2 border-[var(--vermilion)] pl-2' : 'text-[var(--sumi-2)] pl-2'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
