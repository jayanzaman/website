'use client';

import React from 'react';
import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  type?: 'article' | 'video' | 'slideshow' | 'update';
  imageUrl?: string;
  featured?: boolean;
}

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}
