import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Slider } from '@/components/ui/slider.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Info } from 'lucide-react'
import * as THREE from 'three'

// Energy Field Visualization
function EnergyField({ entropy, expansionRate, densityFluctuations }) {
  const meshRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta * expansionRate
      const positions = meshRef.current.geometry.attributes.position
      const count = positions.count

      for (let i = 0; i < count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)

        const distance = Math.sqrt(x * x + y * y + z * z)
        const wave = Math.sin(distance * 2 - timeRef.current) * densityFluctuations * 0.1
        
        positions.setZ(i, z + wave * 0.01)
      }

      positions.needsUpdate = true
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 128, 128]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(0.7 - entropy * 0.05, 0.8, 0.5)}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

export default function BeginningSection({ educatorMode }) {
  const [entropy, setEntropy] = useState(1)
  const [expansionRate, setExpansionRate] = useState(1)
  const [densityFluctuations, setDensityFluctuations] = useState(5)
  const [showPenrose, setShowPenrose] = useState(false)

  useEffect(() => {
    const handleRandomize = () => {
      setEntropy(Math.random() * 10)
      setExpansionRate(Math.random() * 2)
      setDensityFluctuations(Math.random() * 10)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  const getOutcome = () => {
    if (entropy > 7) return { text: 'Too much entropy - no structure can form', color: 'destructive' }
    if (entropy < 0.5) return { text: 'Frozen universe - no evolution possible', color: 'secondary' }
    if (expansionRate > 1.5) return { text: 'Expanding too fast - matter cannot clump', color: 'destructive' }
    if (expansionRate < 0.5) return { text: 'Collapsing - Big Crunch imminent', color: 'destructive' }
    if (densityFluctuations < 2) return { text: 'Too smooth - no galaxies will form', color: 'secondary' }
    if (densityFluctuations > 8) return { text: 'Too chaotic - black holes everywhere', color: 'destructive' }
    return { text: 'Goldilocks conditions - structure can emerge!', color: 'default' }
  }

  const outcome = getOutcome()

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">The Primordial Universe</CardTitle>
              <CardDescription className="text-gray-400">
                13.8 billion years ago - the moment of creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-purple-900/20 to-black">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <EnergyField
                    entropy={entropy}
                    expansionRate={expansionRate}
                    densityFluctuations={densityFluctuations}
                  />
                </Canvas>
              </div>
              
              <div className="mt-4">
                <Badge variant={outcome.color} className="w-full justify-center py-2">
                  {outcome.text}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Initial Conditions
                <button
                  onClick={() => setShowPenrose(!showPenrose)}
                  className="ml-auto"
                >
                  <Info className="h-4 w-4 text-purple-400 hover:text-purple-300" />
                </button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Adjust the fundamental parameters of the early universe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Entropy Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Initial Entropy</label>
                  <span className="text-xs text-purple-400">
                    10^{Math.floor(entropy * 12.3)} / 10^123
                  </span>
                </div>
                <Slider
                  value={[entropy]}
                  onValueChange={(val) => setEntropy(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Lower entropy = more order and potential for structure
                </p>
              </div>

              {/* Expansion Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Expansion Rate (Hubble Constant)</label>
                  <span className="text-xs text-purple-400">
                    {(expansionRate * 70).toFixed(1)} km/s/Mpc
                  </span>
                </div>
                <Slider
                  value={[expansionRate]}
                  onValueChange={(val) => setExpansionRate(val[0])}
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  How fast space itself is expanding
                </p>
              </div>

              {/* Density Fluctuations Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Density Fluctuations (Δρ/ρ)</label>
                  <span className="text-xs text-purple-400">
                    {(densityFluctuations * 0.00001).toFixed(5)}
                  </span>
                </div>
                <Slider
                  value={[densityFluctuations]}
                  onValueChange={(val) => setDensityFluctuations(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Quantum fluctuations that seed galaxies
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Penrose Fine-Tuning Explanation */}
          {showPenrose && (
            <Card className="bg-purple-950/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Penrose's Fine-Tuning Problem</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p>
                  Roger Penrose calculated that the probability of our universe starting with such low entropy is approximately:
                </p>
                <p className="text-center text-xl font-bold text-purple-400">
                  1 in 10^(10^123)
                </p>
                <p>
                  This number is so vast it defies comprehension. For comparison, there are only about 10^80 atoms in the observable universe.
                </p>
                <p className="text-xs text-gray-500 italic">
                  This extraordinary fine-tuning is what allows complexity, life, and consciousness to emerge.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Educator Mode Content */}
          {educatorMode && (
            <Card className="bg-blue-950/40 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Teaching Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p><strong>Key Concepts:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Second Law of Thermodynamics: entropy always increases</li>
                  <li>Low initial entropy is the "fuel" for all cosmic evolution</li>
                  <li>Inflation theory attempts to explain the smoothness problem</li>
                  <li>Quantum fluctuations during inflation seeded all structure</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Penrose (2004) "The Road to Reality", Carroll (2010) "From Eternity to Here"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "Why is there order instead of chaos? What if the universe had started with maximum entropy instead?"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

