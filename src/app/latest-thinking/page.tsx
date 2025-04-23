'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { articles } from './articles';
import { useState } from 'react';

export default function LatestThinkingPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const articlesArray = Object.entries(articles).map(([slug, article]) => ({
    ...article,
    slug,
  }));

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-text-primary hover:text-primary mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-text-primary mb-4">Latest Insights</h1>
        <p className="text-text-secondary mb-12">
          Explore our latest thoughts and insights on quantum computing, digital transformation, and the future
          of financial services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesArray.map((article) => (
            <Link 
              key={article.slug} 
              href={`/latest-thinking/${article.slug}`}
              className="group"
            >
              <div className="bg-white dark:bg-[#1A1A1A] rounded-lg overflow-hidden shadow-md border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-primary dark:hover:border-primary transition-colors">
                <div className="relative h-48">
                  <Image
                    src={imageErrors[article.slug] ? '/images/default-article1.jpg' : article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={() => setImageErrors(prev => ({ ...prev, [article.slug]: true }))}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {article.content.split('\n\n')[0]}
                  </p>
                  <div className="text-sm text-text-secondary">
                    {article.readTime} • {article.category}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
