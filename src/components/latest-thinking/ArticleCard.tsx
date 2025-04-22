'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  type?: 'article' | 'video' | 'slideshow' | 'update';
  imageUrl?: string;
  featured?: boolean;
}

export default function ArticleCard({
  title,
  excerpt,
  slug,
  category,
  date,
  type = 'article',
  imageUrl = '/images/default-article.jpg',
  featured = false,
}: ArticleCardProps) {
  return (
    <div className={`rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 ${featured ? 'col-span-2 row-span-2' : ''}`}>
      <Link href={`/latest-thinking/${slug}`}>
        <div className="relative">
          <div className="relative h-48 w-full">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs uppercase font-bold px-2 py-1 rounded">
            {type}
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="uppercase font-semibold text-blue-600 dark:text-blue-400 mr-3">{category}</span>
              <span>{date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
