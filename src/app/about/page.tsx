// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Navigation back */}
        <Link 
          href="/"
          className="inline-flex items-center text-[var(--sumi-2)] hover:text-[var(--vermilion)] mb-10 transition-colors font-mono text-[12px] tracking-wider"
        >
          <FaArrowLeft className="mr-2 text-[10px]" /> BACK TO HOME
        </Link>

        {/* Section title */}
        <div className="space-y-2 mb-12">
          <div className="label-mono text-[13px] text-[var(--vermilion)] tracking-[0.1em]">
            — PROFILE
          </div>
          <h1 className="heading-1 font-serif text-[var(--sumi)] font-light">About Me</h1>
        </div>
        
        {/* Main Content Container (Flat layout, no shadow, 1px border) */}
        <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
            
            {/* Image side */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-square w-full max-w-sm mx-auto border border-[var(--paper-edge)] rounded-[2px] overflow-hidden bg-[var(--paper)]">
                <Image 
                  src="/images/jayan_profile.png" 
                  alt="Jayan Zaman" 
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover rounded-[2px]"
                  onError={(e) => {
                    console.error('Profile image failed to load:', e);
                  }}
                />
              </div>
            </div>

            {/* Profile intro text */}
            <div className="md:w-2/3 space-y-6">
              <h2 className="text-3xl font-serif text-[var(--sumi)] font-light">Jayan Zaman</h2>
              <p className="font-serif text-[17px] text-[var(--sumi-2)] leading-relaxed">
                I'm a strategy consultant with expertise in commercial insurance and AI implementation. My professional journey spans pricing tools development, Agile transformation, and AI operating models.
              </p>
              <p className="font-serif text-[17px] text-[var(--sumi-2)] leading-relaxed">
                Beyond my consulting work, I explore the fascinating intersections of quantum computing, metaphysics, and spirituality. I'm passionate about understanding how emerging technologies can create more human-centered systems.
              </p>
              <p className="font-serif text-[17px] text-[var(--sumi-2)] leading-relaxed italic">
                My unique perspective combines analytical rigor with deep spiritual curiosity, allowing me to approach complex problems with both strategic insight and philosophical depth.
              </p>
            </div>
          </div>
          
          <hr className="hairline-rule mb-8" />
          
          {/* Professional Background */}
          <h3 className="text-xl font-serif font-light text-[var(--sumi)] mb-4">Professional Background</h3>
          <p className="font-serif text-[16px] text-[var(--sumi-2)] leading-relaxed mb-12">
            With over a decade of experience in the consulting industry, I've helped organizations navigate digital transformation, develop innovative products, and implement AI solutions that drive business value while maintaining ethical considerations.
          </p>
          
          <hr className="hairline-rule mb-8" />
          
          {/* Areas of Interest */}
          <h3 className="text-xl font-serif font-light text-[var(--sumi)] mb-6">Areas of Interest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="consulting" className="bg-[var(--paper)] border border-[var(--paper-edge)] p-6 rounded-[2px] transition-colors hover:border-[var(--sumi)]">
              <h4 className="font-serif text-[18px] font-medium text-[var(--sumi)] mb-2">Commercial Insurance</h4>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] leading-relaxed">Building agile teams, digital transformation, and enterprise architecture and strategies.</p>
            </div>
            
            <div id="ai" className="bg-[var(--paper)] border border-[var(--paper-edge)] p-6 rounded-[2px] transition-colors hover:border-[var(--sumi)]">
              <h4 className="font-serif text-[18px] font-medium text-[var(--sumi)] mb-2">AI Implementation</h4>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] leading-relaxed">Reimagining insurance operations through Generative AI and transformative technologies.</p>
            </div>
            
            <div id="quantum" className="bg-[var(--paper)] border border-[var(--paper-edge)] p-6 rounded-[2px] transition-colors hover:border-[var(--sumi)]">
              <h4 className="font-serif text-[18px] font-medium text-[var(--sumi)] mb-2">Quantum Computing</h4>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] leading-relaxed">Quantum algorithms, quantum-inspired optimization, and philosophical implications.</p>
            </div>
            
            <div id="speaking" className="bg-[var(--paper)] border border-[var(--paper-edge)] p-6 rounded-[2px] transition-colors hover:border-[var(--sumi)]">
              <h4 className="font-serif text-[18px] font-medium text-[var(--sumi)] mb-2">Science and Spirituality</h4>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] leading-relaxed">Eastern and Western philosophical traditions, and their intersection with modern science.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
