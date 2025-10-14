'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Consciousness Network Visualization
function ConsciousnessNetwork({ awarenessLevel, interconnectedness, cosmicTime }: {
  awarenessLevel: number;
  interconnectedness: number;
  cosmicTime: number;
}) {
  const nodeCount = Math.floor(awarenessLevel * 12 + 3);
  const connectionDensity = interconnectedness;
  const timePhase = (cosmicTime * 0.1) % (2 * Math.PI);
  
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: 50 + Math.cos(i * 2 * Math.PI / nodeCount) * 35,
    y: 50 + Math.sin(i * 2 * Math.PI / nodeCount) * 35,
    size: 4 + (awarenessLevel * 6),
    brightness: 0.5 + (awarenessLevel * 0.5),
  }));

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="consciousness-network w-full h-full relative">
        {/* Central consciousness */}
        <div 
          className="central-mind"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${20 + awarenessLevel * 20}px`,
            height: `${20 + awarenessLevel * 20}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.3 + awarenessLevel * 0.7})`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${10 + awarenessLevel * 30}px rgba(255, 255, 255, ${awarenessLevel})`,
            animation: `consciousness-pulse ${2 + Math.sin(timePhase)}s ease-in-out infinite`,
          }}
        />
        
        {/* Network nodes */}
        {nodes.map((node, index) => (
          <div 
            key={node.id}
            className="network-node"
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              backgroundColor: `rgba(100, 200, 255, ${node.brightness})`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `node-pulse ${1.5 + index * 0.1}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
        
        {/* Connections */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((otherNode, j) => {
            if (Math.random() < connectionDensity) {
              return (
                <div 
                  key={`connection-${i}-${j}`}
                  className="connection"
                  style={{
                    position: 'absolute',
                    left: `${Math.min(node.x, otherNode.x)}%`,
                    top: `${Math.min(node.y, otherNode.y)}%`,
                    width: `${Math.abs(otherNode.x - node.x)}%`,
                    height: '1px',
                    backgroundColor: `rgba(255, 255, 100, ${0.2 + interconnectedness * 0.6})`,
                    transformOrigin: '0 0',
                    transform: `rotate(${Math.atan2(otherNode.y - node.y, otherNode.x - node.x)}rad)`,
                    animation: `connection-flow ${3 + i * 0.1}s linear infinite`,
                  }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Cosmic awareness waves */}
        {awarenessLevel > 0.7 && (
          <div className="cosmic-waves">
            {[1, 2, 3].map((wave) => (
              <div 
                key={wave}
                className="awareness-wave"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${100 + wave * 50}px`,
                  height: `${100 + wave * 50}px`,
                  border: `2px solid rgba(255, 100, 255, ${0.3 / wave})`,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `cosmic-expansion ${4 + wave}s ease-out infinite`,
                  animationDelay: `${wave * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes consciousness-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes connection-flow {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        @keyframes cosmic-expansion {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function ReflectiveSection({ educatorMode, cosmicTime = 0 }: { educatorMode: boolean; cosmicTime?: number }) {
  const [awarenessLevel, setAwarenessLevel] = useState(0.8)
  const [interconnectedness, setInterconnectedness] = useState(0.6)
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setAwarenessLevel(Math.random())
      setInterconnectedness(Math.random())
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Calculate cosmic consciousness
    const consciousnessScore = awarenessLevel * interconnectedness;
    const transcendenceThreshold = 0.6;
    
    if (consciousnessScore > 0.8 && awarenessLevel > 0.7) {
      setOutcome('✨ Perfect - the universe achieves self-awareness!')
    } else if (consciousnessScore > 0.6) {
      setOutcome('🌟 Good - consciousness emerges and reflects')
    } else if (consciousnessScore > 0.4) {
      setOutcome('⚠️ Marginal - limited self-awareness develops')
    } else if (awarenessLevel < 0.3) {
      setOutcome('🤖 Too mechanical - no consciousness emerges')
    } else if (interconnectedness < 0.2) {
      setOutcome('🏝️ Too isolated - consciousness remains fragmented')
    } else {
      setOutcome('❌ Poor conditions - universe remains unconscious')
    }
  }, [awarenessLevel, interconnectedness])

  const philosophicalQuotes = [
    { quote: 'We are the universe remembering itself.', author: 'Carl Sagan' },
    { quote: 'The cosmos is within us. We are made of star-stuff.', author: 'Carl Sagan' },
    { quote: 'Consciousness is the universe becoming aware of itself.', author: 'Eckhart Tolle' },
    { quote: 'We are not going into the universe, we are the universe.', author: 'Alan Watts' },
  ];

  const currentQuote = philosophicalQuotes[Math.floor(cosmicTime / 10) % philosophicalQuotes.length];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">The Reflective Cosmos</h2>
          <p className="text-xl text-gray-300">
            We are the universe remembering itself
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Consciousness Network Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Cosmic Consciousness</CardTitle>
              <CardDescription className="text-gray-300">
                The universe awakening to its own existence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConsciousnessNetwork 
                awarenessLevel={awarenessLevel}
                interconnectedness={interconnectedness}
                cosmicTime={cosmicTime}
              />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Consciousness Outcome:</h4>
                <p className={`text-sm font-medium ${
                  outcome.includes('✨') ? 'text-green-400' : 
                  outcome.includes('🌟') ? 'text-emerald-400' :
                  outcome.includes('⚠️') ? 'text-yellow-400' : 
                  outcome.includes('❌') ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {outcome}
                </p>
              </div>
              
              {/* Philosophical Quote */}
              <div className="mt-4 p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <blockquote className="text-purple-200 italic text-center">
                  "{currentQuote.quote}"
                  <footer className="text-purple-300 text-sm mt-2">— {currentQuote.author}</footer>
                </blockquote>
              </div>
            </CardContent>
          </Card>

          {/* Controls and Reflection */}
          <div className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Awareness Level</CardTitle>
                <CardDescription className="text-gray-300">
                  Depth of cosmic self-understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[awarenessLevel]}
                    onValueChange={(value) => setAwarenessLevel(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Unconscious</span>
                    <span className="text-white font-medium">{(awarenessLevel * 100).toFixed(0)}%</span>
                    <span>Transcendent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Interconnectedness</CardTitle>
                <CardDescription className="text-gray-300">
                  Unity of consciousness across space and time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[interconnectedness]}
                    onValueChange={(value) => setInterconnectedness(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Isolated</span>
                    <span className="text-white font-medium">{(interconnectedness * 100).toFixed(0)}%</span>
                    <span>Universal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">The Anthropic Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-purple-200">
                  <p>You have journeyed through 13.8 billion years of cosmic evolution.</p>
                  <p>From quantum fluctuations to consciousness - each step required precise fine-tuning.</p>
                  <p>The universe's ability to know itself through us is perhaps its greatest achievement.</p>
                  <div className="mt-4 p-3 bg-black/20 rounded-lg">
                    <p className="text-center text-purple-300 font-medium">
                      "In contemplating the cosmos, we contemplate ourselves."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {educatorMode && (
          <Card className="bg-blue-900/20 border-blue-500/30 mt-8">
            <CardHeader>
              <CardTitle className="text-blue-300">Educational Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-200">
                <p>• Consciousness may be an emergent property of complex information processing</p>
                <p>• The anthropic principle suggests the universe is fine-tuned for observers</p>
                <p>• We are literally made of elements forged in stellar cores - "star stuff"</p>
                <p>• Through science, the universe studies itself objectively</p>
                <p>• Our existence allows the cosmos to experience wonder and beauty</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
