'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import AnimatedProcess from '@/components/AnimatedProcess';
import { articles } from './latest-thinking/articles';

export default function Home() {
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
      title: 'Quantum Bits (Qubits)',
      description: 'Unlike classical bits that exist in a state of 0 or 1, qubits can exist in a superposition of both states simultaneously.',
      icon: '🔄'
    },
    {
      title: 'Quantum Entanglement',
      description: 'When qubits become entangled, the state of one qubit instantly influences the state of another, regardless of the distance separating them.',
      icon: '🔗'
    },
    {
      title: 'Quantum Algorithms',
      description: 'Specialized algorithms like Shor\'s and Grover\'s leverage quantum properties to solve certain problems exponentially faster than classical computers.',
      icon: '⚙️'
    },
    {
      title: 'Quantum Decoherence',
      description: 'The greatest challenge in quantum computing is maintaining qubit coherence. Environmental interactions cause qubits to lose their quantum properties.',
      icon: '❄️'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Technology & Strategy Consultant</h1>
              <p className="text-xl mb-8">Where enterprise architecture meets emerging technologies: GenAI, quantum computing, and philosophical insights.</p>
              <Link 
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-[#FF5F00] text-white rounded-lg hover:bg-[#FF7F00] transition-colors"
              >
                Learn More <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/images/yusuf-onuk-yI6alVpYC6o-unsplash.jpg"
                  alt="Quantum Computing Visualization"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJiEyNzQ3MjIxPTFDRUJNQkM/RV5GP0FPVlNXY2FjSkROV2Zpal3/2wBDARUXFx4aHR4eHV1CIyAjQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Link key={article.slug} href={`/latest-thinking/${article.slug}`}>
                <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-text-primary dark:text-white">{article.title}</h3>
                    <p className="text-text-secondary dark:text-[#A3A3A3] mb-4">{article.content.substring(0, 150)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary dark:text-[#A3A3A3]">{article.date}</span>
                      <FaArrowRight className="text-primary" />
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
