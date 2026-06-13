// src/app/quantum-beyond/page.tsx
'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import AnimatedProcess from '@/components/AnimatedProcess';

export default function QuantumBeyond() {
  // Define the quantum computing process steps
  const quantumSteps = [
    {
      title: 'Quantum Bits (Qubits)',
      description: 'Unlike classical bits that exist in a state of 0 or 1, qubits can exist in a superposition of both states simultaneously, enabling quantum computers to process vast amounts of information in parallel.',
      icon: '🔄'
    },
    {
      title: 'Quantum Entanglement',
      description: 'When qubits become entangled, the state of one qubit instantly influences the state of another, regardless of the distance separating them. This property enables quantum computers to perform complex calculations more efficiently.',
      icon: '🔗'
    },
    {
      title: 'Quantum Algorithms',
      description: 'Specialized algorithms like Shor\'s and Grover\'s leverage quantum properties to solve certain problems exponentially faster than classical computers, particularly in cryptography and search applications.',
      icon: '⚙️'
    },
    {
      title: 'Quantum Decoherence',
      description: 'The greatest challenge in quantum computing is maintaining qubit coherence. Environmental interactions cause qubits to lose their quantum properties, necessitating error correction techniques and extremely cold operating temperatures.',
      icon: '❄️'
    }
  ];

  return (
    <div className="min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* Navigation back */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[var(--sumi-2)] hover:text-[var(--vermilion)] mb-10 transition-colors font-mono text-[12px] tracking-wider"
        >
          <FaArrowLeft className="mr-2 text-[10px]" /> BACK TO HOME
        </Link>

        {/* Page Header */}
        <div className="space-y-4 mb-12">
          <div className="label-mono text-[13px] text-[var(--vermilion)] tracking-[0.1em]">
            — EXPERIMENTS
          </div>
          <h1 className="heading-1 font-serif text-[var(--sumi)] font-light">
            Quantum &amp; Beyond
          </h1>
          <p className="lede-text max-w-3xl">
            Exploring the intersection of quantum computing, metaphysics, and the future of technology.
          </p>
        </div>

        {/* Section 1: Understanding (Flat Card Layout) */}
        <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-serif font-light text-[var(--sumi)] mb-6">
            Understanding Quantum Computing
          </h2>
          <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)] mb-6">
            Quantum computing represents a paradigm shift in computational power, leveraging the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike traditional bits that exist in a state of either 0 or 1, quantum bits or &quot;qubits&quot; can exist in multiple states simultaneously through a phenomenon called superposition.
          </p>
          <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi-2)] mb-8">
            This fundamental difference allows quantum computers to explore multiple solutions to a problem at once, potentially solving complex calculations that would take classical computers millions of years to complete.
          </p>
          
          {/* Custom Stepper */}
          <AnimatedProcess steps={quantumSteps} />
          
          <h3 className="text-xl font-serif text-[var(--sumi)] mt-12 mb-4 font-normal">
            Philosophical Implications
          </h3>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)] mb-6">
            Beyond the technological applications, quantum mechanics raises profound philosophical questions about the nature of reality. The observer effect, wave-particle duality, and quantum entanglement challenge our classical understanding of causality, determinism, and locality.
          </p>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)]">
            These quantum phenomena have sparked discussions about consciousness, free will, and the interconnectedness of all things—bridging the gap between cutting-edge physics and ancient philosophical traditions.
          </p>
        </div>
        
        {/* Section 2: List Columns (Flat Cards Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] p-8 rounded-[2px]">
            <h3 className="text-xl font-serif font-light text-[var(--sumi)] mb-6">Quantum Applications</h3>
            <ul className="space-y-4">
              {[
                'Cryptography and secure communications',
                'Drug discovery and molecular modeling',
                'Optimization problems in logistics and finance',
                'Artificial intelligence and machine learning',
                'Climate modeling and materials science'
              ].map((item, i) => (
                <li key={i} className="font-serif text-[16px] text-[var(--sumi-2)] flex items-start">
                  <span className="text-[var(--vermilion)] mr-3 select-none mt-1.5 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] p-8 rounded-[2px]">
            <h3 className="text-xl font-serif font-light text-[var(--sumi)] mb-6">Metaphysical Connections</h3>
            <ul className="space-y-4">
              {[
                'Quantum consciousness theories',
                'Non-locality and universal interconnectedness',
                'Observer-dependent reality',
                'Parallels with Eastern philosophical traditions',
                'Implications for understanding time and causality'
              ].map((item, i) => (
                <li key={i} className="font-serif text-[16px] text-[var(--sumi-2)] flex items-start">
                  <span className="text-[var(--vermilion)] mr-3 select-none mt-1.5 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Section 3: Future Panel (Flat Card) */}
        <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-8 md:p-12 mb-8 space-y-6">
          <h2 className="text-2xl font-serif font-light text-[var(--sumi)]">Future Explorations</h2>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)]">
            This section will continue to evolve with new articles exploring the fascinating intersections of quantum theory, consciousness, and spiritual traditions. Let's explore these fascinating intersections and examine how emerging technologies might reshape our understanding of reality and what it means to be human.
          </p>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)]">
            Stay tuned for deep dives into quantum biology, the hard problem of consciousness, and how ancient wisdom traditions might offer insights into our most cutting-edge scientific discoveries. The term &quot;quantum supremacy&quot; refers to the potential milestone of a quantum computer solving a problem that is intractable for a classical computer.
          </p>
          
          <div className="pt-4">
            <Link href="/" className="btn-seal">
              &larr; BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
