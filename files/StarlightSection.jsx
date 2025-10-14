import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Slider } from '@/components/ui/slider.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import * as THREE from 'three'

// Star Field Visualization
function StarField({ time, starFormationEfficiency, metalEnrichment }) {
  const starsRef = useRef()
  const galaxiesRef = useRef()

  useFrame((state, delta) => {
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position
      const colors = starsRef.current.geometry.attributes.color
      const sizes = starsRef.current.geometry.attributes.size

      for (let i = 0; i < positions.count; i++) {
        // Stars twinkle
        const twinkle = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 0.5
        sizes.setX(i, 0.05 * (1 + twinkle * 0.3) * starFormationEfficiency)

        // Color shift based on metal enrichment (blue to red)
        const metalColor = metalEnrichment / 10
        colors.setXYZ(i, 0.8 + metalColor * 0.2, 0.8 - metalColor * 0.3, 1 - metalColor * 0.5)
      }

      sizes.needsUpdate = true
      colors.needsUpdate = true
    }

    if (galaxiesRef.current) {
      galaxiesRef.current.rotation.y += delta * 0.1
    }
  })

  const starCount = Math.floor(500 * starFormationEfficiency)
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)
  const sizes = new Float32Array(starCount)

  for (let i = 0; i < starCount; i++) {
    const radius = Math.random() * 4 + 1
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    colors[i * 3] = 0.8
    colors[i * 3 + 1] = 0.8
    colors[i * 3 + 2] = 1

    sizes[i] = 0.05 * starFormationEfficiency
  }

  return (
    <group ref={galaxiesRef}>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starCount}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent />
      </points>
    </group>
  )
}

export default function StarlightSection({ educatorMode }) {
  const [time, setTime] = useState(100) // millions of years
  const [starFormationEfficiency, setStarFormationEfficiency] = useState(1)
  const [metalEnrichment, setMetalEnrichment] = useState(0.1)

  useEffect(() => {
    const handleRandomize = () => {
      setTime(100 + Math.random() * 900)
      setStarFormationEfficiency(0.3 + Math.random() * 1.7)
      setMetalEnrichment(Math.random() * 10)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  // Calculate derived values
  const numberOfStars = Math.floor(starFormationEfficiency * time * 1e6)
  const populationIIIStars = time < 200 && metalEnrichment < 1
  const galaxyCount = Math.floor(starFormationEfficiency * (time / 100) * 10)

  const getOutcome = () => {
    if (starFormationEfficiency < 0.5) return { text: 'Too few stars - universe remains dark', color: 'secondary' }
    if (starFormationEfficiency > 1.7) return { text: 'Too many stars - rapid metal enrichment, early death', color: 'destructive' }
    if (metalEnrichment < 0.05 && time > 500) return { text: 'No metal enrichment - only hydrogen and helium', color: 'secondary' }
    if (metalEnrichment > 8) return { text: 'Over-enriched - heavy elements dominate', color: 'secondary' }
    return { text: 'Healthy star formation - galaxies emerging!', color: 'default' }
  }

  const outcome = getOutcome()

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">First Stars & Galaxies</CardTitle>
              <CardDescription className="text-gray-400">
                {time} million years after the Big Bang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-blue-900/20 to-black">
                <Canvas camera={{ position: [0, 0, 6] }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
                  <StarField
                    time={time}
                    starFormationEfficiency={starFormationEfficiency}
                    metalEnrichment={metalEnrichment}
                  />
                </Canvas>
              </div>
              
              <div className="mt-4">
                <Badge variant={outcome.color} className="w-full justify-center py-2">
                  {outcome.text}
                </Badge>
              </div>

              {/* Stats Display */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <div className="text-xs text-gray-400">Stars Formed</div>
                  <div className="text-lg text-blue-400 font-mono">
                    {numberOfStars.toExponential(2)}
                  </div>
                </div>
                <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <div className="text-xs text-gray-400">Galaxies</div>
                  <div className="text-lg text-purple-400 font-mono">
                    ~{galaxyCount}
                  </div>
                </div>
              </div>

              {populationIIIStars && (
                <div className="mt-3 p-3 bg-yellow-950/30 rounded-lg border border-yellow-500/20">
                  <div className="text-xs text-yellow-400 font-semibold">Population III Stars Active</div>
                  <div className="text-xs text-gray-400 mt-1">
                    First generation stars - pure hydrogen and helium, no metals
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Stellar Evolution</CardTitle>
              <CardDescription className="text-gray-400">
                Control star formation and chemical enrichment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Time Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Cosmic Time</label>
                  <span className="text-xs text-blue-400">
                    {time} Myr
                  </span>
                </div>
                <Slider
                  value={[time]}
                  onValueChange={(val) => setTime(val[0])}
                  min={100}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Time elapsed since the Big Bang (millions of years)
                </p>
              </div>

              {/* Star Formation Efficiency Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Star Formation Efficiency</label>
                  <span className="text-xs text-blue-400">
                    {(starFormationEfficiency * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[starFormationEfficiency]}
                  onValueChange={(val) => setStarFormationEfficiency(val[0])}
                  min={0.3}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  How efficiently gas clouds collapse into stars
                </p>
              </div>

              {/* Metal Enrichment Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Metal Enrichment Rate</label>
                  <span className="text-xs text-blue-400">
                    {(metalEnrichment * 0.001).toFixed(4)} Z☉
                  </span>
                </div>
                <Slider
                  value={[metalEnrichment]}
                  onValueChange={(val) => setMetalEnrichment(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Rate at which supernovae seed heavy elements (Z☉ = solar metallicity)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stellar Populations */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Stellar Populations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-3 rounded-lg border ${populationIIIStars ? 'bg-yellow-950/30 border-yellow-500/30' : 'bg-gray-900/30 border-gray-700/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Population III</span>
                    <Badge variant={populationIIIStars ? 'default' : 'secondary'} className="text-xs">
                      {populationIIIStars ? 'Active' : 'Extinct'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    First stars, zero metals, massive and short-lived
                  </p>
                </div>

                <div className={`p-3 rounded-lg border ${time > 200 ? 'bg-blue-950/30 border-blue-500/30' : 'bg-gray-900/30 border-gray-700/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Population II</span>
                    <Badge variant={time > 200 ? 'default' : 'secondary'} className="text-xs">
                      {time > 200 ? 'Forming' : 'Not Yet'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Low metallicity, found in globular clusters and halo
                  </p>
                </div>

                <div className={`p-3 rounded-lg border ${time > 500 && metalEnrichment > 2 ? 'bg-green-950/30 border-green-500/30' : 'bg-gray-900/30 border-gray-700/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Population I</span>
                    <Badge variant={time > 500 && metalEnrichment > 2 ? 'default' : 'secondary'} className="text-xs">
                      {time > 500 && metalEnrichment > 2 ? 'Forming' : 'Not Yet'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Metal-rich like our Sun, capable of forming rocky planets
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
                  <li>First stars formed ~100-200 million years after Big Bang</li>
                  <li>Population III stars were massive (100-1000 M☉) and short-lived</li>
                  <li>Supernovae from these stars seeded the first heavy elements</li>
                  <li>Metal enrichment is crucial for planet formation</li>
                  <li>JWST has detected galaxies from this era</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Bromm & Larson (2004) "The First Stars", Barkana & Loeb (2001) "In the Beginning"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "Every atom in your body heavier than hydrogen was forged in the heart of a dying star. We are literally made of stardust."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

