'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const articles = [
  {
    title: "The Role of Risk Engineering and IoT in Modern Insurance Underwriting",
    category: "Insurance",
    excerpt: "Risk engineering is a critical function in insurance underwriting, focused on identifying, preventing, and mitigating potential losses.",
    imageUrl: "/images/risk-engineering.jpg",
    slug: "risk-engineering-iot-insurance",
    readTime: "5 min read"
  },
  {
    title: "Quantum Computing in Financial Services",
    category: "Technology",
    excerpt: "Exploring the transformative potential of quantum computing in the financial sector.",
    imageUrl: "/images/quantum-finance.jpg",
    slug: "quantum-computing-finance",
    readTime: "5 min read"
  },
  {
    title: "AI in Risk Management",
    category: "Risk & Compliance",
    excerpt: "Leveraging artificial intelligence for better risk assessment and management.",
    imageUrl: "/images/ai-risk.jpg",
    slug: "ai-risk-management",
    readTime: "6 min read"
  },
  {
    title: "Metaphysics in the Age of Quantum Information",
    category: "Philosophy",
    excerpt: "How our understanding of reality is being reshaped by quantum information theory and its philosophical implications.",
    imageUrl: "/images/metaphysics-quantum.jpg",
    slug: "metaphysics-quantum-information",
    readTime: "7 min read"
  },
  {
    title: "Importance of Customer Centricity in Commercial Insurance",
    category: "Insurance",
    excerpt: "Understanding and implementing customer-centric approaches in commercial insurance operations.",
    imageUrl: "/images/customer-centricity.jpg",
    slug: "customer-centricity-insurance",
    readTime: "4 min read"
  },
  {
    title: "Agile for an Organization Not Ready",
    category: "Innovation",
    excerpt: "Strategies for implementing agile methodologies in organizations resistant to change.",
    imageUrl: "/images/agile-transformation.jpg",
    slug: "agile-transformation",
    readTime: "5 min read"
  }
];

export default function LatestThinking() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="content-wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00] mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Latest Insights</h1>
        <p className="text-[#4A4A4A] mb-12 max-w-3xl">
          Explore our latest thoughts and insights on quantum computing, digital transformation, 
          and the future of financial services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[#E5E5E5]"
            >
              <div className="relative h-48">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-[#FF5F00]">{article.category}</div>
                  <div className="text-sm text-[#4A4A4A]">{article.readTime}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] hover:text-[#FF5F00]">
                  {article.title}
                </h3>
                <p className="text-[#4A4A4A] mb-4 line-clamp-2">{article.excerpt}</p>
                <Link 
                  href={`/latest-thinking/${article.slug}`}
                  className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00] font-medium"
                >
                  Read More <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-[#1A1A1A] text-white hover:bg-[#FF5F00]'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-[#FF5F00] text-white'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#FF5F00]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-[#1A1A1A] text-white hover:bg-[#FF5F00]'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
