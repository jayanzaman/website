import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Earth from Space
function Earth() {
  const earthRef = useRef()

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      <Sphere ref={earthRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#4488ff"
          emissive="#2244aa"
          emissiveIntensity={0.2}
        />
      </Sphere>
      {/* Atmosphere */}
      <Sphere args={[1.6, 64, 64]}>
        <meshStandardMaterial
          color="#88ccff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Clouds */}
      <Sphere args={[1.52, 64, 64]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  )
}

export default function ReflectiveSection({ educatorMode }) {
  const [selectedParameter, setSelectedParameter] = useState(null)
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    // Show quote after a delay
    const timer = setTimeout(() => setShowQuote(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const parameters = [
    {
      id: 'gravity',
      name: 'Gravitational Constant (G)',
      current: '6.674 × 10⁻¹¹ N⋅m²/kg²',
      outcomes: [
        { change: '+10%', result: 'Stars burn too fast, die before life evolves', viable: false },
        { change: '-10%', result: 'Stars too dim and long-lived, planets drift apart', viable: false },
        { change: 'Current', result: 'Perfect balance for stable stellar evolution', viable: true }
      ]
    },
    {
      id: 'electromagnetic',
      name: 'Electromagnetic Force',
      current: 'α ≈ 1/137',
      outcomes: [
        { change: '+4%', result: 'No chemistry - electrons too tightly bound', viable: false },
        { change: '-4%', result: 'No stable atoms - electrons escape', viable: false },
        { change: 'Current', result: 'Chemistry and molecular bonds possible', viable: true }
      ]
    },
    {
      id: 'strong',
      name: 'Strong Nuclear Force',
      current: 'αₛ ≈ 0.1',
      outcomes: [
        { change: '+2%', result: 'All hydrogen fuses to helium, no water', viable: false },
        { change: '-2%', result: 'No deuterium, no stellar fusion, no stars', viable: false },
        { change: 'Current', result: 'Stable nuclei and stellar nucleosynthesis', viable: true }
      ]
    },
    {
      id: 'weak',
      name: 'Weak Nuclear Force',
      current: 'Gf ≈ 10⁻⁵',
      outcomes: [
        { change: 'Stronger', result: 'Too much helium, no hydrogen left', viable: false },
        { change: 'Weaker', result: 'No supernovae, no heavy elements', viable: false },
        { change: 'Current', result: 'Proper H/He ratio and supernova mechanics', viable: true }
      ]
    },
    {
      id: 'cosmological',
      name: 'Cosmological Constant (Λ)',
      current: '1.1 × 10⁻⁵² m⁻²',
      outcomes: [
        { change: 'Larger', result: 'Universe expands too fast, no galaxies form', viable: false },
        { change: 'Smaller', result: 'Universe collapses before stars form', viable: false },
        { change: 'Current', result: 'Slow expansion allows structure formation', viable: true }
      ]
    },
    {
      id: 'proton-electron',
      name: 'Proton/Electron Mass Ratio',
      current: 'mp/me ≈ 1836',
      outcomes: [
        { change: 'Higher', result: 'No stable molecules, chemistry impossible', viable: false },
        { change: 'Lower', result: 'Atoms too large, no solid matter', viable: false },
        { change: 'Current', result: 'Stable atoms and complex chemistry', viable: true }
      ]
    }
  ]

  const selectedParam = parameters.find(p => p.id === selectedParameter)

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Pale Blue Dot</CardTitle>
              <CardDescription className="text-gray-400">
                Our home in the cosmos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-black">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
                  <Earth />
                </Canvas>
              </div>

              {/* Quote Overlay */}
              {showQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-blue-950/50 to-purple-950/50 rounded-lg border border-blue-500/30"
                >
                  <p className="text-lg text-white italic text-center leading-relaxed">
                    "We are the universe remembering itself."
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-3">
                    — Carl Sagan
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* What If Panel */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">What If...?</CardTitle>
              <CardDescription className="text-gray-400">
                Change one parameter and see what happens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {parameters.map((param) => (
                  <button
                    key={param.id}
                    onClick={() => setSelectedParameter(param.id === selectedParameter ? null : param.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedParameter === param.id
                        ? 'bg-purple-950/50 border-purple-500/50'
                        : 'bg-gray-900/30 border-gray-700/30 hover:border-gray-600/50'
                    }`}
                  >
                    <div className="font-semibold text-white text-sm">{param.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{param.current}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outcome Display */}
          {selectedParam && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Outcomes for {selectedParam.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedParam.outcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          outcome.viable
                            ? 'bg-green-950/30 border-green-500/30'
                            : 'bg-red-950/30 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-white">{outcome.change}</span>
                          <Badge variant={outcome.viable ? 'default' : 'destructive'} className="text-xs">
                            {outcome.viable ? '✓ Viable' : '✗ No Life'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300">{outcome.result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Fine-Tuning Summary */}
          <Card className="bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">The Fine-Tuning Problem</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-3">
              <p>
                The universe appears to be <strong className="text-white">exquisitely fine-tuned</strong> for complexity and life:
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Change any fundamental constant by a few percent → no stars, no chemistry, no life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Initial entropy fine-tuned to 1 in 10^(10^123)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Cosmological constant fine-tuned to 1 in 10^120</span>
                </li>
              </ul>
              
              <div className="p-3 bg-yellow-950/30 rounded-lg border border-yellow-500/20 mt-4">
                <p className="text-xs text-yellow-300">
                  <strong>Three Interpretations:</strong>
                </p>
                <ol className="list-decimal list-inside text-xs text-gray-300 mt-2 space-y-1">
                  <li>Pure coincidence (anthropic principle)</li>
                  <li>Multiverse - we're in a rare viable universe</li>
                  <li>Designed for life (teleological argument)</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <div className="text-xs font-semibold text-blue-300 mb-1">1. Low Entropy Start</div>
                  <p className="text-xs text-gray-300">
                    The initial low-entropy universe enabled all subsequent structure and complexity
                  </p>
                </div>

                <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <div className="text-xs font-semibold text-purple-300 mb-1">2. Parameter Sensitivity</div>
                  <p className="text-xs text-gray-300">
                    Small parameter changes yield radically different outcomes - we live in a narrow viable range
                  </p>
                </div>

                <div className="p-3 bg-pink-950/30 rounded-lg border border-pink-500/20">
                  <div className="text-xs font-semibold text-pink-300 mb-1">3. Lawful Yet Contingent</div>
                  <p className="text-xs text-gray-300">
                    The emergence of complexity follows physical laws, yet is profoundly contingent on initial conditions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educator Mode Content */}
          {educatorMode && (
            <Card className="bg-blue-950/40 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Teaching Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p><strong>Key Concepts:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Fine-tuning of fundamental constants</li>
                  <li>Anthropic principle (weak vs. strong)</li>
                  <li>Multiverse hypothesis and eternal inflation</li>
                  <li>Participatory anthropic principle (Wheeler)</li>
                  <li>Rare Earth hypothesis vs. Copernican principle</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Rees (1999) "Just Six Numbers", Davies (2006) "The Goldilocks Enigma", Tegmark (2014) "Our Mathematical Universe"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Final Reflection */}
          <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Final Reflection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic leading-relaxed">
                "From quantum foam to conscious thought - 13.8 billion years of cosmic evolution. You are not separate from this process. You are the universe experiencing itself, a brief eddy of complexity in an ocean of entropy. What will you do with your moment of awareness?"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

