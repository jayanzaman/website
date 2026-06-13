// src/components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--bottle)] text-[var(--paper)] py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: READ */}
          <div>
            <h4 className="label-mono text-[12px] tracking-[0.1em] text-[var(--paper-edge)] mb-5">
              READ
            </h4>
            <ul className="space-y-3 font-serif font-light text-[15px]">
              <li>
                <Link href="/latest-thinking" className="hover:text-[var(--vermilion)] transition-colors">
                  Latest thinking
                </Link>
              </li>
              <li>
                <Link href="/latest-thinking/reinsurance-pricing-overshoot" className="hover:text-[var(--vermilion)] transition-colors">
                  The Great Overshoot
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.finetuneduniverse.net/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--vermilion)] transition-colors"
                >
                  Finetuned Universe
                </a>
              </li>
              <li>
                <Link href="/latest-thinking/risk-engineering-iot" className="hover:text-[var(--vermilion)] transition-colors">
                  Risk engineering & IoT
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: PRACTICE */}
          <div>
            <h4 className="label-mono text-[12px] tracking-[0.1em] text-[var(--paper-edge)] mb-5">
              PRACTICE
            </h4>
            <ul className="space-y-3 font-serif font-light text-[15px]">
              <li>
                <Link href="/about" className="hover:text-[var(--vermilion)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about#consulting" className="hover:text-[var(--vermilion)] transition-colors">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/about#speaking" className="hover:text-[var(--vermilion)] transition-colors">
                  Speaking
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--vermilion)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ELSEWHERE */}
          <div>
            <h4 className="label-mono text-[12px] tracking-[0.1em] text-[var(--paper-edge)] mb-5">
              ELSEWHERE
            </h4>
            <ul className="space-y-3 font-serif font-light text-[15px]">
              <li>
                <a 
                  href="https://www.linkedin.com/in/jayanzaman/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--vermilion)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://medium.com/@jayanzaman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--vermilion)] transition-colors"
                >
                  Medium
                </a>
              </li>
              <li>
                <a 
                  href="https://www.finetuneduniverse.net/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--vermilion)] transition-colors"
                >
                  Finetuned Universe ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--bottle-deep)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--paper-edge)] tracking-wide">
          <div>
            &copy; {currentYear} Jayan Zaman. All rights reserved.
          </div>
          <div>
            Set in Spectral, Tiro Bangla & IBM Plex Mono.
          </div>
        </div>
      </div>
    </footer>
  );
}
