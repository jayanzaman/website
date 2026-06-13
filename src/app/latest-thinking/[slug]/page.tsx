// src/app/latest-thinking/[slug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Import articles data from a separate file
import { articles } from '../articles';
import ReinsurancePricingOvershoot from '@/components/latest-thinking/ReinsurancePricingOvershoot';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Redirect old slug to new slug
    if (slug === 'risk-engineering-iot-insurance') {
      router.replace('/latest-thinking/risk-engineering-iot');
    }
  }, [slug, router]);

  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center space-y-6">
          <h1 className="heading-1 font-serif text-[var(--sumi)]">Article Not Found</h1>
          <p className="font-serif text-[17px] text-[var(--sumi-2)]">Sorry, we couldn't find the article you're looking for.</p>
          <Link href="/latest-thinking" className="inline-link font-serif italic text-base mx-auto">
            &larr; Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Custom rendering function for article content following design system rules
  const renderContent = () => {
    const paragraphs = article.content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      
      // Handle headings
      if (trimmedParagraph.startsWith('## ')) {
        return (
          <h2 key={index} className="heading-2 text-[var(--sumi)] mt-12 mb-6 font-light">
            {trimmedParagraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (trimmedParagraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-serif text-[var(--sumi)] mt-8 mb-4 font-normal">
            {trimmedParagraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Handle lists (bullets with either '*' or '-')
      if (trimmedParagraph.includes('\n- ') || trimmedParagraph.includes('\n* ')) {
        const isHyphen = trimmedParagraph.includes('\n- ');
        const separator = isHyphen ? '\n- ' : '\n* ';
        const parts = trimmedParagraph.split(separator);
        const listIntro = parts[0].trim();
        const items = parts.slice(1);
        
        return (
          <div key={index} className="mb-6 space-y-3">
            {listIntro && <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi-2)]">{listIntro}</p>}
            <ul className="space-y-3 pl-2">
              {items.map((item, i) => (
                <li key={i} className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)] flex items-start">
                  <span className="text-[var(--vermilion)] mr-3 select-none mt-1.5 text-xs">•</span>
                  <span>{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Handle numbered lists
      if (trimmedParagraph.match(/^\d+\./m)) {
        const items = trimmedParagraph.split('\n').filter(item => /^\d+\./.test(item.trim()));
        return (
          <ol key={index} className="list-decimal pl-6 mb-6 space-y-3">
            {items.map((item, i) => (
              <li key={i} className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)] pl-2">
                {item.replace(/^\d+\.\s/, '').trim()}
              </li>
            ))}
          </ol>
        );
      }

      // Handle blockquotes / Pullquotes (using signature italic style)
      if (trimmedParagraph.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-2 border-[var(--vermilion)] pl-6 py-2 my-8">
            <p className="pullquote-text">
              {trimmedParagraph.replace('> ', '')}
            </p>
          </blockquote>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)] mb-6">
          {trimmedParagraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        
        {/* Back Link */}
        <Link 
          href="/latest-thinking" 
          className="inline-flex items-center text-[var(--sumi-2)] hover:text-[var(--vermilion)] mb-10 transition-colors font-mono text-[12px] tracking-wider"
        >
          <FaArrowLeft className="mr-2 text-[10px]" /> BACK TO ARTICLES
        </Link>
        
        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            {/* Category and Read Time */}
            <div className="label-mono text-[11px] text-[var(--sumi-3)] tracking-[0.08em] flex items-center gap-4">
              <span className="flex items-center gap-1.5"><FaTag className="text-[10px] text-[var(--vermilion)]" /> {article.category.toUpperCase()}</span>
              <span className="flex items-center gap-1.5"><FaClock className="text-[10px]" /> {article.readTime.toUpperCase()}</span>
              <span>{article.date.toUpperCase()}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--sumi)] leading-tight select-none">
              {article.title}
            </h1>
          </div>

          {/* Featured Image (Flat border, no shadow) */}
          {!imageError && article.imageUrl && (
            <div className="relative w-full border border-[var(--paper-edge)] rounded-[2px] overflow-hidden bg-[var(--paper-deep)] aspect-[16/10] my-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          {/* Body Content */}
          <div className="article-content pt-4">
            {slug === 'reinsurance-pricing-overshoot' ? (
              <div className="space-y-8">
                <ReinsurancePricingOvershoot />
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </article>

        {/* Share Section (Oxford-style flat borders) */}
        <div className="mt-16 pt-8 border-t border-[var(--rule)]">
          <h4 className="label-mono text-[11px] text-[var(--sumi-2)] mb-4">SHARE THIS ARTICLE</h4>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(`Check out this article: ${article.title}`);
                window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank') ;
              }}
              className="btn-ghost text-xs px-4 py-2"
            >
              X
            </button>
            <button 
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank') ;
              }}
              className="btn-ghost text-xs px-4 py-2"
            >
              LinkedIn
            </button>
            <button 
              onClick={() => {
                const subject = encodeURIComponent(`Sharing: ${article.title}`);
                const body = encodeURIComponent(`I thought you might find this interesting: ${article.title}\n\n${window.location.href}`);
                window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
              }}
              className="btn-ghost text-xs px-4 py-2"
            >
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
