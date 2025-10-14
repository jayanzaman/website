import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Slider } from '@/components/ui/slider.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import * as THREE from 'three'

// Particle System for Quark-Gluon Plasma
function QuarkGluonPlasma({ strongForce, photonBaryonRatio, cooling }) {
  const particlesRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (particlesRef.current) {
      timeRef.current += delta
      const positions = particlesRef.current.geometry.attributes.position
      const colors = particlesRef.current.geometry.attributes.color
      const count = positions.count

      for (let i = 0; i < count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)

        // Simulate cooling and clustering based on strong force
        const clusterStrength = strongForce * 0.1
        const angle = Math.atan2(y, x) + delta * clusterStrength
        const radius = Math.sqrt(x * x + y * y) * (1 - cooling * 0.01)

        positions.setX(i, Math.cos(angle) * radius)
        positions.setY(i, Math.sin(angle) * radius)

        // Color based on energy/temperature
        const temp = 1 - cooling * 0.1
        colors.setXYZ(i, temp, 0.3 + cooling * 0.07, 1 - temp)
      }

      positions.needsUpdate = true
      colors.needsUpdate = true
    }
  })

  const particleCount = Math.floor(1000 * photonBaryonRatio)
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    colors[i * 3] = 1
    colors[i * 3 + 1] = 0.5
    colors[i * 3 + 2] = 0.2
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  )
}

export default function MatterSection({ educatorMode }) {
  const [strongForce, setStrongForce] = useState(1)
  const [photonBaryonRatio, setPhotonBaryonRatio] = useState(1.6)
  const [cooling, setCooling] = useState(5)

  useEffect(() => {
    const handleRandomize = () => {
      setStrongForce(0.5 + Math.random() * 1.5)
      setPhotonBaryonRatio(0.5 + Math.random() * 2.5)
      setCooling(Math.random() * 10)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  const getOutcome = () => {
    if (strongForce < 0.7) return { text: 'Too weak - protons fall apart, no atoms', color: 'destructive' }
    if (strongForce > 1.3) return { text: 'Too strong - all matter fuses into iron', color: 'destructive' }
    if (photonBaryonRatio < 0.8) return { text: 'Too few photons - matter dominates, collapses', color: 'secondary' }
    if (photonBaryonRatio > 2.5) return { text: 'Too many photons - matter blown apart', color: 'secondary' }
    if (cooling < 2) return { text: 'Cooling too slow - plasma remains unstable', color: 'secondary' }
    if (cooling > 8) return { text: 'Cooling too fast - no time for nucleosynthesis', color: 'secondary' }
    return { text: 'Stable atoms forming - hydrogen and helium!', color: 'default' }
  }

  const outcome = getOutcome()

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Quark-Gluon Plasma Cooling</CardTitle>
              <CardDescription className="text-gray-400">
                First microseconds after the Big Bang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-orange-900/20 to-black">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#ff6600" />
                  <QuarkGluonPlasma
                    strongForce={strongForce}
                    photonBaryonRatio={photonBaryonRatio}
                    cooling={cooling}
                  />
                </Canvas>
              </div>
              
              <div className="mt-4">
                <Badge variant={outcome.color} className="w-full justify-center py-2">
                  {outcome.text}
                </Badge>
              </div>

              {/* Temperature Display */}
              <div className="mt-4 p-3 bg-orange-950/30 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Temperature:</span>
                  <span className="text-orange-400 font-mono">
                    {(1e12 / Math.pow(cooling, 2)).toExponential(2)} K
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Nuclear Forces</CardTitle>
              <CardDescription className="text-gray-400">
                Control the fundamental forces governing matter formation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Strong Force Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Strong Nuclear Force</label>
                  <span className="text-xs text-orange-400">
                    {(strongForce * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[strongForce]}
                  onValueChange={(val) => setStrongForce(val[0])}
                  min={0.5}
                  max={1.5}
                  step={0.05}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Binds quarks into protons and neutrons
                </p>
              </div>

              {/* Photon-Baryon Ratio Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Photon-Baryon Ratio</label>
                  <span className="text-xs text-orange-400">
                    {(photonBaryonRatio * 1e9).toExponential(1)}
                  </span>
                </div>
                <Slider
                  value={[photonBaryonRatio]}
                  onValueChange={(val) => setPhotonBaryonRatio(val[0])}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Balance between radiation and matter
                </p>
              </div>

              {/* Cooling Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Cooling Rate</label>
                  <span className="text-xs text-orange-400">
                    {cooling.toFixed(1)}x
                  </span>
                </div>
                <Slider
                  value={[cooling]}
                  onValueChange={(val) => setCooling(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  How quickly the plasma cools and condenses
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Matter Composition */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Predicted Matter Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Hydrogen (H)</span>
                  <span className="text-white font-mono">~75%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: '75%' }} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Helium (He)</span>
                  <span className="text-white font-mono">~25%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ width: '25%' }} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Lithium & Others</span>
                  <span className="text-white font-mono">&lt;0.01%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: '1%' }} />
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
                  <li>Big Bang Nucleosynthesis (BBN) occurred 10 seconds to 20 minutes after the Big Bang</li>
                  <li>Strong force must be precisely tuned for stable nuclei</li>
                  <li>Observed 75/25 H/He ratio matches theoretical predictions</li>
                  <li>No elements heavier than lithium formed - stars needed for that</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Weinberg (1977) "The First Three Minutes", Ryden (2016) "Introduction to Cosmology"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "What if the strong force were just 2% weaker? No carbon, no life. Just 2% stronger? No hydrogen, no stars."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

