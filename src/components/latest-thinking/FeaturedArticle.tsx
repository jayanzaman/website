'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  type?: 'article' | 'video' | 'slideshow' | 'update';
  imageUrl?: string;
}

export default function FeaturedArticle({
  title,
  excerpt,
  slug,
  category,
  date,
  type = 'article',
  imageUrl = '/images/default-article.jpg',
}: FeaturedArticleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-64 md:h-auto">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs uppercase font-bold px-2 py-1 rounded">
          {type}
        </div>
      </div>
      <div className="p-8 flex flex-col justify-center">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="uppercase font-semibold text-blue-600 dark:text-blue-400 mr-3">{category}</span>
          <span>{date}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{excerpt}</p>
        <Link 
          href={`/latest-thinking/${slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  ) ;
}
