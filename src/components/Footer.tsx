'use client';

import { FaLinkedin, FaMedium } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--text-primary)] dark:bg-[var(--text-primary)] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.linkedin.com/in/jayanzaman/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary) ]">
            <FaLinkedin size={24} />
          </a>
          <a href="https://medium.com/@jayanzaman" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary) ]">
            <FaMedium size={24} />
          </a>
        </div>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Jayan Zaman. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
