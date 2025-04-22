'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaMedium, FaArrowRight } from 'react-icons/fa';
import AnimatedProcess from '@/components/AnimatedProcess';

export default function Home() {
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

  // Featured articles data
  const featuredArticles = [
    {
      title: "The Role of Risk Engineering and IoT in Modern Insurance Underwriting",
      excerpt: "Risk engineering is a critical function in insurance underwriting, focused on identifying, preventing, and mitigating potential losses associated with insuring properties or businesses.",
      category: "Insurance",
      slug: "risk-engineering-iot-insurance",
      imageUrl: "/images/insurance-article.jpg"
    },
    {
      title: "The Intersection of Quantum Computing and Artificial Intelligence",
      excerpt: "Exploring how quantum algorithms can enhance machine learning capabilities and transform AI applications across industries.",
      category: "Technology",
      slug: "quantum-computing-ai-intersection",
      imageUrl: "/images/quantum-ai.jpg"
    },
    {
      title: "Metaphysics in the Age of Quantum Information",
      excerpt: "How our understanding of reality is being reshaped by quantum information theory and its philosophical implications.",
      category: "Philosophy",
      slug: "metaphysics-quantum-information-age",
      imageUrl: "/images/metaphysics.jpg"
    }
  ];

  return (
    <div className="content-wrapper">
      <main className="flex min-h-screen flex-col">
        {/* Top Navigation Bar */}
        <div className="w-full bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-[#1A1A1A]">Jayan Zaman</div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-[#FF5F00]">Home</Link>
                <Link href="/latest-thinking" className="text-gray-600 hover:text-[#FF5F00]">Latest Thinking</Link>
                <Link href="/about" className="text-gray-600 hover:text-[#FF5F00]">About</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="w-full bg-[#1A1A1A] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Hi, I&apos;m Jayan Zaman
                </h1>
                <div className="text-lg text-gray-100 space-y-6">
                  <p>
                    We&apos;re not just adapting to change; we&apos;re driving it.
                  </p>
                  <p>
                    In the insurance sector, change may come slowly, but its impact will be profound. As the landscape reshapes, bold decisions made today will determine tomorrow&#39;s leaders, while hesitation may leave traditional players behind.
                  </p>
                  <p>
                    My mission is to guide clients through this transition—challenging outdated practices, embracing innovation, and navigating resistance with clarity and conviction. Together, we&apos;ll shape a smarter, more agile future for insurance.
                  </p>
                  <p>
                    Let&apos;s explore how emerging technologies can transform your operations.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/latest-thinking" className="synpulse-button bg-white text-[#1A1A1A] hover:bg-[#FF5F00] hover:text-white hover:border-[#FF5F00]">
                    Explore Insights
                  </Link>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image 
                  src="/images/insurance-article.jpg" 
                  alt="Insurance Technology" 
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="w-full bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Understanding Quantum Computing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how quantum computing is revolutionizing the way we process information and solve complex problems.
              </p>
            </div>
            <AnimatedProcess steps={quantumSteps} />
          </div>
        </div>

        {/* Featured Articles */}
        <div className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A]">Featured Insights</h2>
              <Link 
                href="/latest-thinking" 
                className="flex items-center text-[#1A1A1A] hover:text-[#FF5F00]"
              >
                View All <FaArrowRight className="ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[#E5E5E5]">
                  <div className="relative h-48">
                    <Image 
                      src={article.imageUrl} 
                      alt={article.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-medium text-[#FF5F00] mb-2">{article.category}</div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-[#1A1A1A] hover:text-[#FF5F00]">{article.title}</h3>
                    <p className="text-[#4A4A4A] mb-4 line-clamp-3">{article.excerpt}</p>
                    <Link 
                      href={`/latest-thinking/${article.slug}`} 
                      className="text-[#1A1A1A] hover:text-[#FF5F00] font-medium flex items-center"
                    >
                      Read More <FaArrowRight className="ml-2" size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full bg-[#1A1A1A] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-8">
                Subscribe to receive the latest insights on quantum computing and business transformation.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-md border-0 focus:outline-none focus:ring-2 focus:ring-[#FF5F00] text-gray-900"
                />
                <button className="synpulse-button rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#1A1A1A] text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://www.linkedin.com/in/jayanzaman/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5F00]">
                <FaLinkedin size={24} />
              </a>
              <a href="https://medium.com/@jayanzaman" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5F00]">
                <FaMedium size={24} />
              </a>
            </div>
            <div className="text-center text-sm">
              &copy; {new Date().getFullYear()} Jayan Zaman. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
