import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { Slider } from '@/components/ui/slider.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import * as THREE from 'three'

// Planet Visualization
function Planet({ distance, mass, hasMoon, magneticField }) {
  const planetRef = useRef()
  const moonRef = useRef()
  const atmosphereRef = useRef()

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01
    }
    if (moonRef.current && hasMoon) {
      moonRef.current.position.x = Math.cos(state.clock.elapsedTime) * 2
      moonRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2
    }
  })

  // Determine planet color based on distance (temperature)
  const getPlanetColor = () => {
    if (distance < 0.7) return '#ff6600' // Too hot (Venus-like)
    if (distance > 1.5) return '#6699ff' // Too cold (Mars-like)
    return '#4488ff' // Habitable (Earth-like)
  }

  const planetRadius = 0.5 + mass * 0.3

  return (
    <group>
      {/* Planet */}
      <Sphere ref={planetRef} args={[planetRadius, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color={getPlanetColor()} />
      </Sphere>

      {/* Atmosphere */}
      {distance >= 0.7 && distance <= 1.5 && (
        <Sphere ref={atmosphereRef} args={[planetRadius + 0.1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#88ccff"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
      )}

      {/* Magnetic Field Lines */}
      {magneticField > 0.5 && (
        <group>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * (planetRadius + 0.3),
                  0,
                  Math.sin(angle) * (planetRadius + 0.3)
                ]}
              >
                <torusGeometry args={[planetRadius + 0.3, 0.01, 8, 32]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={magneticField * 0.3} />
              </mesh>
            )
          })}
        </group>
      )}

      {/* Moon */}
      {hasMoon && (
        <Sphere ref={moonRef} args={[0.2, 16, 16]} position={[2, 0, 0]}>
          <meshStandardMaterial color="#888888" />
        </Sphere>
      )}

      {/* Star (Sun) */}
      <Sphere args={[0.8, 32, 32]} position={[-distance * 3, 0, 0]}>
        <meshBasicMaterial color="#ffff00" />
      </Sphere>

      {/* Orbit Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance * 3 - 0.02, distance * 3 + 0.02, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function PlanetsSection({ educatorMode }) {
  const [distance, setDistance] = useState(1.0) // AU
  const [mass, setMass] = useState(1.0) // Earth masses
  const [hasMoon, setHasMoon] = useState(true)
  const [magneticField, setMagneticField] = useState(1.0)

  useEffect(() => {
    const handleRandomize = () => {
      setDistance(0.3 + Math.random() * 2)
      setMass(0.1 + Math.random() * 2)
      setHasMoon(Math.random() > 0.5)
      setMagneticField(Math.random() * 2)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  // Calculate climate outcomes
  const getClimateOutcome = () => {
    const temp = 255 / Math.sqrt(distance) // Simplified temperature calculation
    const hasAtmosphere = mass > 0.3 && magneticField > 0.3
    const hasWater = temp > 273 && temp < 373 && hasAtmosphere

    if (distance < 0.7) {
      return {
        type: 'Venus-like',
        description: 'Runaway greenhouse effect - surface temperature >400°C',
        color: 'destructive',
        temp: temp
      }
    } else if (distance > 1.5) {
      return {
        type: 'Mars-like',
        description: 'Too cold - frozen surface, thin atmosphere',
        color: 'secondary',
        temp: temp
      }
    } else if (!hasAtmosphere) {
      return {
        type: 'Moon-like',
        description: 'No atmosphere - too small or no magnetic field',
        color: 'secondary',
        temp: temp
      }
    } else if (hasWater) {
      return {
        type: 'Earth-like',
        description: 'Habitable zone - liquid water possible!',
        color: 'default',
        temp: temp
      }
    } else {
      return {
        type: 'Marginal',
        description: 'Edge of habitability - challenging conditions',
        color: 'secondary',
        temp: temp
      }
    }
  }

  const climate = getClimateOutcome()

  // Calculate specific features
  const hasTectonics = mass > 0.5 && hasMoon
  const hasCO2Cycle = hasTectonics && climate.type === 'Earth-like'
  const hasProtection = magneticField > 0.5

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Planetary System</CardTitle>
              <CardDescription className="text-gray-400">
                Building a habitable world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-indigo-900/20 to-black">
                <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[-distance * 3, 0, 0]} intensity={2} color="#ffff00" />
                  <Planet
                    distance={distance}
                    mass={mass}
                    hasMoon={hasMoon}
                    magneticField={magneticField}
                  />
                </Canvas>
              </div>
              
              <div className="mt-4">
                <Badge variant={climate.color} className="w-full justify-center py-2">
                  {climate.type}: {climate.description}
                </Badge>
              </div>

              {/* Temperature Display */}
              <div className="mt-4 p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Surface Temperature:</span>
                  <span className="text-indigo-400 font-mono">
                    {climate.temp.toFixed(0)} K ({(climate.temp - 273).toFixed(0)} °C)
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
              <CardTitle className="text-white">Planetary Parameters</CardTitle>
              <CardDescription className="text-gray-400">
                Design your planet's characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Distance from Star</label>
                  <span className="text-xs text-indigo-400">
                    {distance.toFixed(2)} AU
                  </span>
                </div>
                <Slider
                  value={[distance]}
                  onValueChange={(val) => setDistance(val[0])}
                  min={0.3}
                  max={2.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Too Hot</span>
                  <span className="text-green-400">Habitable Zone</span>
                  <span>Too Cold</span>
                </div>
              </div>

              {/* Mass Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Planetary Mass</label>
                  <span className="text-xs text-indigo-400">
                    {mass.toFixed(2)} M⊕
                  </span>
                </div>
                <Slider
                  value={[mass]}
                  onValueChange={(val) => setMass(val[0])}
                  min={0.1}
                  max={2.5}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Mass affects gravity and ability to retain atmosphere
                </p>
              </div>

              {/* Moon Toggle */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-white">Large Moon Present</label>
                  <p className="text-xs text-gray-500">Stabilizes axial tilt and drives tides</p>
                </div>
                <Switch
                  checked={hasMoon}
                  onCheckedChange={setHasMoon}
                />
              </div>

              {/* Magnetic Field Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Magnetic Field Strength</label>
                  <span className="text-xs text-indigo-400">
                    {(magneticField * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[magneticField]}
                  onValueChange={(val) => setMagneticField(val[0])}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Protects atmosphere from solar wind
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Planetary Features */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Planetary Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-lg ${hasTectonics ? 'bg-green-950/30 border border-green-500/30' : 'bg-gray-900/30 border border-gray-700/30'}`}>
                  <div>
                    <div className="text-sm font-semibold text-white">Plate Tectonics</div>
                    <div className="text-xs text-gray-400">Requires sufficient mass and tidal forces</div>
                  </div>
                  <Badge variant={hasTectonics ? 'default' : 'secondary'}>
                    {hasTectonics ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg ${hasCO2Cycle ? 'bg-green-950/30 border border-green-500/30' : 'bg-gray-900/30 border border-gray-700/30'}`}>
                  <div>
                    <div className="text-sm font-semibold text-white">CO₂ Cycle</div>
                    <div className="text-xs text-gray-400">Regulates long-term climate</div>
                  </div>
                  <Badge variant={hasCO2Cycle ? 'default' : 'secondary'}>
                    {hasCO2Cycle ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg ${hasProtection ? 'bg-green-950/30 border border-green-500/30' : 'bg-gray-900/30 border border-gray-700/30'}`}>
                  <div>
                    <div className="text-sm font-semibold text-white">Magnetic Protection</div>
                    <div className="text-xs text-gray-400">Shields from cosmic radiation</div>
                  </div>
                  <Badge variant={hasProtection ? 'default' : 'secondary'}>
                    {hasProtection ? 'Protected' : 'Exposed'}
                  </Badge>
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
                  <li>Habitable zone depends on stellar luminosity and distance</li>
                  <li>Earth's moon stabilizes axial tilt (23.5°) preventing extreme climate swings</li>
                  <li>Plate tectonics recycles carbon and maintains habitability</li>
                  <li>Magnetic field generated by liquid iron core protects life</li>
                  <li>Mars lost its magnetic field and most of its atmosphere</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Ward & Brownlee (2000) "Rare Earth", Kasting (2010) "How to Find a Habitable Planet"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "Earth is not just in the right place - it has the right mass, the right moon, the right magnetic field. How many coincidences does it take to make a home?"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

