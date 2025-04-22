'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

export default function About() {
  return (
    <div className="content-wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00] mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-12 text-center">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/3">
              <div className="relative w-full h-[400px]">
                <Image 
                  src="/images/jayan_profile.png" 
                  alt="Jayan Zaman" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Jayan Zaman</h2>
              <p className="text-lg mb-6 text-[#4A4A4A]">
                I'm a strategy consultant with expertise in commercial insurance and AI implementation. My professional journey spans pricing tools development, Agile transformation, and AI operating models.
              </p>
              <p className="text-lg mb-6 text-[#4A4A4A]">
                Beyond my consulting work, I explore the fascinating intersections of quantum computing, metaphysics, and spirituality. I'm passionate about understanding how emerging technologies can create more human-centered systems.
              </p>
              <p className="text-lg text-[#4A4A4A]">
                My unique perspective combines analytical rigor with deep spiritual curiosity, allowing me to approach complex problems with both strategic insight and philosophical depth.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Professional Background</h3>
          <p className="text-[#4A4A4A] mb-12">
            With over a decade of experience in the consulting industry, I've helped organizations navigate digital transformation, develop innovative products, and implement AI solutions that drive business value while maintaining ethical considerations.
          </p>
          
          <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Areas of Interest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-3 text-[#1A1A1A]">Commercial Insurance</h4>
              <p className="text-[#4A4A4A]">Pricing strategies, product development, and digital transformation in the insurance sector.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-3 text-[#1A1A1A]">AI Implementation</h4>
              <p className="text-[#4A4A4A]">Ethical AI deployment, machine learning operations, and AI governance frameworks.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-3 text-[#1A1A1A]">Quantum Computing</h4>
              <p className="text-[#4A4A4A]">Quantum algorithms, quantum-inspired optimization, and philosophical implications.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-3 text-[#1A1A1A]">Metaphysics & Spirituality</h4>
              <p className="text-[#4A4A4A]">Consciousness studies, Eastern philosophical traditions, and their intersection with modern science.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
