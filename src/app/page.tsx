// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import BlochSphere from '@/components/BlochSphere';
import AlponaRosette from '@/components/AlponaRosette';
import { articles } from './latest-thinking/articles';

export default function Home() {
  const [sphereState, setSphereState] = useState<'ground' | 'superposition' | 'excited'>('superposition');

  // Convert articles object to array and sort by date (newest first)
  const articlesArray = Object.entries(articles)
    .map(([slug, article]) => ({
      ...article,
      slug,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Get only the latest 3 articles

  // Helper to get matching tag for the article layout
  const getArticleTag = (slug: string) => {
    if (slug === 'reinsurance-pricing-overshoot') return 'FEATURED';
    if (slug === 'universe-builder-interactive-experience') return 'SIMULATOR';
    return 'PRACTICE';
  };

  return (
    <div className="min-h-screen transition-colors">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero text */}
          <div className="w-full md:w-3/5 space-y-6">
            <div className="label-mono text-[13px] text-[var(--vermilion)] tracking-[0.1em] font-medium">
              STRATEGY · GENAI · QUANTUM · REINSURANCE
            </div>
            
            <h1 className="display-text text-[var(--sumi)] select-none">
              At the seam of <br />
              <span className="italic font-light">enterprise</span> and <br />
              <span className="italic font-normal text-[var(--vermilion)]">the wavefunction.</span>
            </h1>
            
            <p className="lede-text max-w-xl">
              A strategy consultant working where commercial insurance, generative AI, and quantum thinking come
              into contact. Long-form essays, simulators, and the occasional <span className="italic">metaphysical detour.</span>
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href="/latest-thinking" className="btn-primary">
                READ LATEST THINKING →
              </Link>
              <Link href="/about" className="inline-link font-serif italic text-base">
                About the practice &rarr;
              </Link>
            </div>
          </div>
          
          {/* Interactive Bloch Sphere Graphic */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-6 bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] transition-all relative group">
            <div className="absolute top-4 right-4 label-mono text-[10px] text-[var(--sumi-3)]">
              ACTIVE STATE: {sphereState.toUpperCase()}
            </div>
            
            <div className="cursor-pointer" onClick={() => {
              if (sphereState === 'superposition') setSphereState('excited');
              else if (sphereState === 'excited') setSphereState('ground');
              else setSphereState('superposition');
            }}>
              <BlochSphere state={sphereState} width={220} height={220} />
            </div>

            <div className="mt-4 text-center space-y-1">
              <span className="label-mono text-[11px] text-[var(--sumi-2)]">
                {sphereState === 'ground' && 'C · GROUND'}
                {sphereState === 'superposition' && 'B · SUPERPOSITION'}
                {sphereState === 'excited' && 'A · EXCITED'}
              </span>
              <p className="font-serif italic text-sm text-[var(--sumi-3)]">
                {sphereState === 'ground' && 'A conclusion, resting.'}
                {sphereState === 'superposition' && 'A hypothesis, held.'}
                {sphereState === 'excited' && 'A question, angled.'}
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              {(['ground', 'superposition', 'excited'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSphereState(s)}
                  className={`px-2 py-1 font-mono text-[9px] uppercase border transition-colors ${
                    sphereState === s
                      ? 'border-[var(--vermilion)] text-[var(--vermilion)]'
                      : 'border-[var(--paper-edge)] text-[var(--sumi-3)] hover:text-[var(--sumi)]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DOSSIER TABLE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="border-t border-[var(--rule)] pt-8">
          <div className="label-mono text-[12px] text-[var(--vermilion)] tracking-[0.1em] mb-8">
            — THE DOSSIER
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="label-mono text-[11px] text-[var(--sumi-3)] mb-2">DISCIPLINE</div>
              <p className="font-serif text-[17px] text-[var(--sumi)]">Strategy consulting,<br />over a decade.</p>
            </div>
            
            <div>
              <div className="label-mono text-[11px] text-[var(--sumi-3)] mb-2">PRACTICE</div>
              <p className="font-serif text-[17px] text-[var(--sumi)]">Commercial insurance,<br />AI operating models.</p>
            </div>
            
            <div>
              <div className="label-mono text-[11px] text-[var(--sumi-3)] mb-2">CURIOSITY</div>
              <p className="font-serif text-[17px] text-[var(--sumi)]">Quantum algorithms,<br />fine-tuned cosmology.</p>
            </div>
            
            <div>
              <div className="label-mono text-[11px] text-[var(--sumi-3)] mb-2">ROOTS</div>
              <p className="font-serif text-[17px] text-[var(--sumi)]">Bengal & the diaspora.</p>
              <p className="font-bangla text-base text-[var(--vermilion)] mt-1">ঢাকা — নিউ ইয়র্ক</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST THINKING */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="border-t border-[var(--rule)] pt-12">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="heading-2 text-[var(--sumi)] font-light">Latest thinking</h2>
            <Link href="/latest-thinking" className="label-mono text-[12px] tracking-[0.08em] border-b border-[var(--sumi-3)] pb-1 hover:text-[var(--vermilion)] hover:border-[var(--vermilion)] transition-all">
              View all writing →
            </Link>
          </div>

          <div className="space-y-8">
            {articlesArray.map((article) => (
              <div 
                key={article.slug} 
                className="bg-[var(--paper)] border-b border-[var(--rule)] pb-8 flex flex-col md:flex-row justify-between items-start gap-6 group hover:border-[var(--sumi)] transition-colors"
              >
                <div className="flex-grow space-y-3 max-w-4xl">
                  {/* Metadata */}
                  <div className="label-mono text-[11px] text-[var(--sumi-3)] tracking-[0.06em]">
                    {new Date(article.date).getDate()} · {new Date(article.date).toLocaleDateString('en-US', {month: 'short'}).toUpperCase()} · {new Date(article.date).getFullYear()} 
                    <span className="mx-2">•</span> 
                    {article.category.toUpperCase()} 
                    <span className="mx-2">•</span> 
                    {article.readTime.toUpperCase()}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif font-light text-[var(--sumi)] group-hover:text-[var(--vermilion)] transition-colors">
                    <Link href={`/latest-thinking/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  {/* Lede snippet */}
                  <p className="font-serif text-[16px] text-[var(--sumi-2)] leading-relaxed line-clamp-2">
                    {article.content.replace(/##.*/g, '').replace(/###.*/g, '').replace(/\*.*/g, '').trim().substring(0, 240)}...
                  </p>
                  
                  {/* Link */}
                  <div className="pt-2">
                    <Link href={`/latest-thinking/${article.slug}`} className="inline-link font-serif italic text-base">
                      Continue reading →
                    </Link>
                  </div>
                </div>

                {/* Right stamp tag */}
                <div className="flex-shrink-0 self-end md:self-center">
                  <span className="border border-[var(--paper-edge)] px-3 py-1 label-mono text-[10px] text-[var(--sumi-2)] tracking-[0.1em]">
                    {getArticleTag(article.slug)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINETUNED UNIVERSE PROMO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] p-8 md:p-12 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-3/5 space-y-4">
            <div className="label-mono text-[11px] text-[var(--sumi-3)] tracking-[0.1em]">
              — INTERACTIVE · A SIMULATOR
            </div>
            
            <h2 className="heading-1 font-serif text-[var(--sumi)]">
              Our finetuned <span className="italic font-light">universe.</span>
            </h2>
            
            <p className="font-serif text-[17px] text-[var(--sumi-2)] leading-relaxed">
              A hands-on instrument for the constants. Drag the dials and watch the cosmos collapse, fly apart, or
              briefly become something stranger than ours. The improbable path from the Big Bang to
              consciousness, made visible.
            </p>
            
            <div className="pt-4">
              <a 
                href="https://www.finetuneduniverse.net/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                OPEN THE SIMULATOR →
              </a>
            </div>
          </div>

          <div className="md:w-2/5 flex justify-center items-center">
            {/* Outline quadrant graphic representing the simulator */}
            <div className="w-48 h-48 border-l border-b border-[var(--sumi-3)] rounded-bl-full flex items-end justify-start p-4 relative overflow-hidden">
              <div className="w-full h-full border-l border-b border-dashed border-[var(--paper-edge)] rounded-bl-full absolute bottom-0 left-0"></div>
              <line x1="0" y1="192" x2="150" y2="42" stroke="var(--vermilion)" strokeWidth="1.5" />
              <circle cx="150" cy="42" r="4" fill="var(--vermilion)" />
              <span className="absolute bottom-6 left-6 font-mono text-[9px] text-[var(--sumi-3)]">R = 1.000000...</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AREAS OF INTEREST */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="border-t border-[var(--rule)] pt-12">
          <div className="label-mono text-[12px] text-[var(--vermilion)] tracking-[0.1em] mb-4">
            — AREAS OF INTEREST
          </div>
          
          <h2 className="heading-1 font-serif text-[var(--sumi)] mb-12">
            Four practices that <span className="italic font-light">share</span> a single table.
          </h2>

          <div className="space-y-12">
            {/* Practice i */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-[var(--paper-edge)] pb-8">
              <div className="md:col-span-1 label-mono text-[12px] text-[var(--vermilion)] font-light mt-1">i.</div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-xl font-serif text-[var(--sumi)] font-medium">
                  Commercial <span className="italic font-light text-[var(--sumi-2)]">insurance</span>
                </h3>
                <p className="font-serif text-[17px] text-[var(--sumi-2)] max-w-3xl leading-relaxed">
                  Building agile teams, digital transformation, and enterprise architecture for the long-cycle businesses that actually carry risk.
                </p>
              </div>
            </div>

            {/* Practice ii */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-[var(--paper-edge)] pb-8">
              <div className="md:col-span-1 label-mono text-[12px] text-[var(--vermilion)] font-light mt-1">ii.</div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-xl font-serif text-[var(--sumi)] font-medium">
                  AI <span className="italic font-light text-[var(--sumi-2)]">implementation</span>
                </h3>
                <p className="font-serif text-[17px] text-[var(--sumi-2)] max-w-3xl leading-relaxed">
                  Reimagining insurance operations through generative AI — operating models that compound, rather than collapse under, complexity.
                </p>
              </div>
            </div>

            {/* Practice iii */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-[var(--paper-edge)] pb-8">
              <div className="md:col-span-1 label-mono text-[12px] text-[var(--vermilion)] font-light mt-1">iii.</div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-xl font-serif text-[var(--sumi)] font-medium">
                  Quantum <span className="italic font-light text-[var(--sumi-2)]">computing</span>
                </h3>
                <p className="font-serif text-[17px] text-[var(--sumi-2)] max-w-3xl leading-relaxed">
                  Quantum algorithms, quantum-inspired optimization, and the philosophical implications of a probabilistic substrate.
                </p>
              </div>
            </div>

            {/* Practice iv */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-1 label-mono text-[12px] text-[var(--vermilion)] font-light mt-1">iv.</div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-xl font-serif text-[var(--sumi)] font-medium">
                  Science &amp; <span className="italic font-light text-[var(--sumi-2)]">spirit</span>
                </h3>
                <p className="font-serif text-[17px] text-[var(--sumi-2)] max-w-3xl leading-relaxed">
                  Eastern and Western philosophical traditions, and the surprising places they intersect with modern physics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GREEN TRANSITION BANNER */}
      <section className="w-full bg-[var(--bottle)] py-16 px-6 md:px-12 text-center transition-colors">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="font-serif font-light text-2xl md:text-3xl text-[var(--paper)] leading-relaxed italic select-none">
            "A practice for thinking <span className="text-[var(--paper-edge)] not-italic">at the edges</span> of strategy, science, and the inner life."
          </p>
          <div className="font-bangla text-2xl text-[var(--vermilion)] font-normal pt-2">
            বাংলা চিন্তন, বিশ্ব চিন্তন
          </div>
        </div>
      </section>

    </div>
  );
}
