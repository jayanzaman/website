'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import AnimatedProcess from '@/components/AnimatedProcess';
import { useState } from 'react';
import { articles } from './latest-thinking/articles';

export default function Home() {
  // Add state for image errors
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  // Convert articles object to array and sort by date (newest first)
  const articlesArray = Object.entries(articles)
    .map(([slug, article]) => ({
      ...article,
      slug,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Get only the latest 3 articles

  // Define the quantum computing process steps
  const quantumSteps = [
    {
      title: "Quantum Bits (Qubits)",
      description: "Unlike classical bits that exist in a state of 0 or 1, qubits can exist in a superposition of both states simultaneously.",
      icon: "🔄"
    },
    {
      title: "Quantum Entanglement",
      description: "When qubits become entangled, the state of one qubit instantly influences the state of another, regardless of the distance separating them.",
      icon: "🔗"
    },
    {
      title: "Quantum Algorithms",
      description: "Specialized algorithms like Shor's and Grover's leverage quantum properties to solve certain problems exponentially faster than classical computers.",
      icon: "⚙️"
    },
    {
      title: "Quantum Decoherence",
      description: "The greatest challenge in quantum computing is maintaining qubit coherence. Environmental interactions cause qubits to lose their quantum properties.",
      icon: "❄️"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quantum Computing Specialist
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Bridging the gap between quantum theory and practical applications in finance and technology.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-[#FF5F00] text-white rounded-lg hover:bg-[#FF7F00] transition-colors"
              >
                Learn More <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px] max-w-md mx-auto rounded-lg overflow-hidden">
                <Image
                  src={imageErrors['hero'] ? '/images/default-article.jpg' : '/images/yusuf-onuk-yI6alVpYC6o-unsplash.jpg'}
                  alt="Quantum Computing Visualization"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageErrors(prev => ({...prev, hero: true}))}
                />
                {/* Add a subtle overlay to improve text readability if needed */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temporarily commented out until fixed
      <section className="py-20 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-text-primary dark:text-white mb-12">
            Understanding Quantum Computing
          </h2>
          <AnimatedProcess steps={quantumSteps} />
        </div>
      </section>
      */}

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white">Latest Insights</h2>
            <Link 
              href="/latest-thinking"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
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
                    <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="text-sm text-text-secondary dark:text-gray-300">
                      {article.readTime} • {article.category}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
