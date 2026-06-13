// src/app/latest-thinking/page.tsx
'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { articles } from './articles';

export default function LatestThinkingPage() {
  const articlesArray = Object.entries(articles).map(([slug, article]) => ({
    ...article,
    slug,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Helper to get matching tag for the article layout
  const getArticleTag = (slug: string) => {
    if (slug === 'reinsurance-pricing-overshoot') return 'FEATURED';
    if (slug === 'universe-builder-interactive-experience') return 'SIMULATOR';
    return 'PRACTICE';
  };

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

        {/* Header */}
        <div className="space-y-4 mb-16">
          <div className="label-mono text-[13px] text-[var(--vermilion)] tracking-[0.1em]">
            — WRITING
          </div>
          <h1 className="heading-1 font-serif text-[var(--sumi)] font-light">Latest Insights</h1>
          <p className="lede-text max-w-2xl">
            Explore our latest thoughts and insights on quantum computing, digital transformation, and the future
            of financial services.
          </p>
        </div>

        {/* Articles Feed */}
        <div className="space-y-12">
          {articlesArray.map((article) => (
            <div 
              key={article.slug} 
              className="border-b border-[var(--rule)] pb-10 flex flex-col md:flex-row justify-between items-start gap-6 group hover:border-[var(--sumi)] transition-colors"
            >
              <div className="flex-grow space-y-4 max-w-4xl">
                {/* Metadata */}
                <div className="label-mono text-[11px] text-[var(--sumi-3)] tracking-[0.06em]">
                  {new Date(article.date).getDate()} · {new Date(article.date).toLocaleDateString('en-US', {month: 'short'}).toUpperCase()} · {new Date(article.date).getFullYear()} 
                  <span className="mx-2">•</span> 
                  {article.category.toUpperCase()} 
                  <span className="mx-2">•</span> 
                  {article.readTime.toUpperCase()}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-serif font-light text-[var(--sumi)] group-hover:text-[var(--vermilion)] transition-colors">
                  <Link href={`/latest-thinking/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* Content snippet */}
                <p className="font-serif text-[17px] text-[var(--sumi-2)] leading-relaxed">
                  {article.content.replace(/##.*/g, '').replace(/###.*/g, '').replace(/\*.*/g, '').trim().substring(0, 280)}...
                </p>
                
                {/* Inline link */}
                <div className="pt-2">
                  <Link href={`/latest-thinking/${article.slug}`} className="inline-link font-serif italic text-base">
                    Continue reading →
                  </Link>
                </div>
              </div>

              {/* Tag Stamp */}
              <div className="flex-shrink-0 self-end md:self-center">
                <span className="border border-[var(--paper-edge)] px-3 py-1 label-mono text-[10px] text-[var(--sumi-2)] tracking-[0.1em] rounded-[1px] bg-[var(--paper-deep)]">
                  {getArticleTag(article.slug)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
