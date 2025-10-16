'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Import articles data from a separate file
import { articles } from '../articles';

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
      <div className="content-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Sorry, we couldn't find the article you're looking for.</p>
          <Link href="/latest-thinking" className="text-primary hover:text-primary-dark flex items-center gap-2">
            <FaArrowLeft /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Custom rendering function for article content
  const renderContent = () => {
    const paragraphs = article.content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      
      // Handle headings
      if (trimmedParagraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
            {trimmedParagraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (trimmedParagraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            {trimmedParagraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Handle lists
      if (trimmedParagraph.includes('\n- ')) {
        const listIntro = trimmedParagraph.split('\n- ')[0].trim();
        const items = trimmedParagraph.split('\n- ').slice(1);
        
        return (
          <div key={index} className="mb-6">
            {listIntro && <p className="mb-3 text-base md:text-lg text-gray-700 dark:text-gray-300">{listIntro}</p>}
            <ul className="list-disc pl-6 space-y-2">
              {items.map((item, i) => (
                <li key={i} className="text-base md:text-lg text-gray-700 dark:text-gray-300">{item.trim()}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Handle numbered lists
      if (trimmedParagraph.match(/^\d+\./m)) {
        const items = trimmedParagraph.split('\n').filter(item => /^\d+\./.test(item.trim()));
        return (
          <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                {item.replace(/^\d+\.\s/, '').trim()}
              </li>
            ))}
          </ol>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="mb-6 text-base md:text-lg text-gray-700 dark:text-gray-300">
          {trimmedParagraph}
        </p>
      );
    });
  };

  return (
    <div className="content-wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <Link href="/latest-thinking" className="text-primary hover:text-primary-dark flex items-center gap-2 mb-4">
              <FaArrowLeft /> Back to Articles
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaClock /> {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <FaTag /> {article.category}
              </div>
            </div>
          </div>

          {!imageError && article.imageUrl && (
            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          <div className="article-content">
            {renderContent()}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Share this article</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(`Check out this article: ${article.title}`);
                window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank') ;
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
            >
              X
            </button>
            <button 
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(article.title);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank') ;
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
            >
              LinkedIn
            </button>
            <button 
              onClick={() => {
                const subject = encodeURIComponent(`Sharing: ${article.title}`);
                const body = encodeURIComponent(`I thought you might find this interesting: ${article.title}\n\n${window.location.href}`);
                window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
            >
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
