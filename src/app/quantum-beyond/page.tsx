import Link from 'next/link';
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
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <section className="w-full max-w-5xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Quantum &amp; Beyond</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
          Exploring the intersection of quantum computing, metaphysics, and the future of technology
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Understanding Quantum Computing</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Quantum computing represents a paradigm shift in computational power, leveraging the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike traditional bits that exist in a state of either 0 or 1, quantum bits or &quot;qubits&quot; can exist in multiple states simultaneously through a phenomenon called superposition.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This fundamental difference allows quantum computers to explore multiple solutions to a problem at once, potentially solving complex calculations that would take classical computers millions of years to complete.
          </p>
          
          <AnimatedProcess steps={quantumSteps} />
          
          <h3 className="text-xl font-bold mt-8 mb-3">Philosophical Implications</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Beyond the technological applications, quantum mechanics raises profound philosophical questions about the nature of reality. The observer effect, wave-particle duality, and quantum entanglement challenge our classical understanding of causality, determinism, and locality.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            These quantum phenomena have sparked discussions about consciousness, free will, and the interconnectedness of all things—bridging the gap between cutting-edge physics and ancient philosophical traditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-3">Quantum Applications</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Cryptography and secure communications</li>
              <li>Drug discovery and molecular modeling</li>
              <li>Optimization problems in logistics and finance</li>
              <li>Artificial intelligence and machine learning</li>
              <li>Climate modeling and materials science</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-3">Metaphysical Connections</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Quantum consciousness theories</li>
              <li>Non-locality and universal interconnectedness</li>
              <li>Observer-dependent reality</li>
              <li>Parallels with Eastern philosophical traditions</li>
              <li>Implications for understanding time and causality</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Future Explorations</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This section will continue to evolve with new articles exploring the fascinating intersections of quantum theory, consciousness, and spiritual traditions. Let's explore these fascinating intersections and examine how emerging technologies might reshape our understanding of reality and what it means to be human.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Stay tuned for deep dives into quantum biology, the hard problem of consciousness, and how ancient wisdom traditions might offer insights into our most cutting-edge scientific discoveries. The term &quot;quantum supremacy&quot; refers to the potential milestone of a quantum computer solving a problem that is intractable for a classical computer.
          </p>
          
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
