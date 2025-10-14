'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Planetary System Visualization
function PlanetarySystem({ orbitalDistance, planetMass, atmosphericPressure }: {
  orbitalDistance: number;
  planetMass: number;
  atmosphericPressure: number;
}) {
  const starSize = 40;
  const planetSize = 8 + (planetMass * 12);
  const orbitRadius = 60 + (orbitalDistance * 80);
  const temperature = 400 / (orbitalDistance * orbitalDistance); // Simplified inverse square law
  const habitableZoneInner = 80;
  const habitableZoneOuter = 140;
  
  // Planet color based on temperature and atmosphere
  const getPlanetColor = () => {
    if (temperature > 100) return 'rgba(255, 100, 50, 0.9)'; // Too hot - red
    if (temperature < 0) return 'rgba(150, 200, 255, 0.9)'; // Too cold - blue
    if (atmosphericPressure > 0.5 && temperature > 0 && temperature < 100) {
      return 'rgba(100, 150, 255, 0.9)'; // Potentially habitable - blue-green
    }
    return 'rgba(180, 120, 80, 0.9)'; // Rocky - brown
  };

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="solar-system">
        {/* Habitable Zone */}
        <div 
          className="habitable-zone"
          style={{
            width: `${habitableZoneOuter * 2}px`,
            height: `${habitableZoneOuter * 2}px`,
            border: '2px solid rgba(100, 255, 100, 0.3)',
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="habitable-zone-inner"
          style={{
            width: `${habitableZoneInner * 2}px`,
            height: `${habitableZoneInner * 2}px`,
            border: '2px solid rgba(100, 255, 100, 0.3)',
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Star */}
        <div 
          className="star"
          style={{
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: 'rgba(255, 255, 100, 0.9)',
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 30px rgba(255, 255, 100, 0.6)',
            animation: 'stellar-glow 2s ease-in-out infinite alternate',
          }}
        />
        
        {/* Planet Orbit */}
        <div 
          className="orbit"
          style={{
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Planet */}
        <div 
          className="planet"
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            backgroundColor: getPlanetColor(),
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `planet-orbit ${6 / Math.sqrt(orbitalDistance)}s linear infinite`,
            transformOrigin: '0 0',
            boxShadow: atmosphericPressure > 0.3 ? '0 0 8px rgba(100, 150, 255, 0.5)' : 'none',
          }}
        />
        
        {/* Atmosphere effect */}
        {atmosphericPressure > 0.2 && (
          <div 
            className="atmosphere"
            style={{
              width: `${planetSize + 4}px`,
              height: `${planetSize + 4}px`,
              backgroundColor: 'transparent',
              border: `2px solid rgba(150, 200, 255, ${atmosphericPressure})`,
              borderRadius: '50%',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `planet-orbit ${6 / Math.sqrt(orbitalDistance)}s linear infinite`,
              transformOrigin: '0 0',
            }}
          />
        )}
      </div>
      
      <style jsx>{`
        .solar-system {
          position: relative;
          width: 300px;
          height: 300px;
        }
        .planet {
          left: calc(50% + ${orbitRadius}px);
        }
        .atmosphere {
          left: calc(50% + ${orbitRadius - 2}px);
        }
        @keyframes stellar-glow {
          0% { box-shadow: 0 0 20px rgba(255, 255, 100, 0.4); }
          100% { box-shadow: 0 0 40px rgba(255, 255, 100, 0.8); }
        }
        @keyframes planet-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(${orbitRadius}px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(${orbitRadius}px) rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}

export default function PlanetsSection({ educatorMode, cosmicTime = 0 }: { educatorMode: boolean; cosmicTime?: number }) {
  const [orbitalDistance, setOrbitalDistance] = useState(1.0) // AU
  const [planetMass, setPlanetMass] = useState(1.0) // Earth masses
  const [atmosphericPressure, setAtmosphericPressure] = useState(1.0) // Earth atmospheres
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setOrbitalDistance(Math.random() * 3 + 0.1)
      setPlanetMass(Math.random() * 3 + 0.1)
      setAtmosphericPressure(Math.random() * 2)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Calculate habitability
    const temperature = 400 / (orbitalDistance * orbitalDistance); // Simplified
    const inHabitableZone = orbitalDistance >= 0.8 && orbitalDistance <= 1.5;
    const hasAtmosphere = atmosphericPressure > 0.1;
    const rightSize = planetMass > 0.5 && planetMass < 2.0;
    
    const distanceScore = inHabitableZone ? 1 : Math.max(0, 1 - Math.abs(orbitalDistance - 1.0) / 1.0);
    const massScore = rightSize ? 1 : Math.max(0, 1 - Math.abs(planetMass - 1.0) / 1.0);
    const atmosphereScore = hasAtmosphere ? Math.min(1, atmosphericPressure) : 0;
    
    const totalScore = (distanceScore * 0.5) + (massScore * 0.3) + (atmosphereScore * 0.2);
    
    if (totalScore > 0.8 && temperature > 0 && temperature < 100) {
      setOutcome('✨ Perfect - liquid water and stable climate!')
    } else if (totalScore > 0.6 && inHabitableZone) {
      setOutcome('🌟 Good - potentially habitable conditions')
    } else if (totalScore > 0.4) {
      setOutcome('⚠️ Marginal - some favorable conditions present')
    } else if (temperature > 100) {
      setOutcome('🔥 Too hot - surface water boils away')
    } else if (temperature < 0) {
      setOutcome('❄️ Too cold - frozen ice world')
    } else if (planetMass < 0.3) {
      setOutcome('💨 Too small - cannot retain atmosphere')
    } else if (planetMass > 3) {
      setOutcome('🪐 Too massive - becomes gas giant')
    } else if (atmosphericPressure < 0.1) {
      setOutcome('🌑 No atmosphere - like Mars or Mercury')
    } else {
      setOutcome('❌ Poor conditions - hostile to life')
    }
  }, [orbitalDistance, planetMass, atmosphericPressure])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Planets & Habitability</h2>
          <p className="text-xl text-gray-300">
            Rocky planets form in the habitable zone around stars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Planetary System Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Planetary System</CardTitle>
              <CardDescription className="text-gray-300">
                Adjust orbital parameters and watch habitability change
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlanetarySystem 
                orbitalDistance={orbitalDistance}
                planetMass={planetMass}
                atmosphericPressure={atmosphericPressure}
              />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Habitability Assessment:</h4>
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
              
              {/* Environmental Data */}
              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
                <h4 className="font-semibold mb-3 text-white text-xs">Environmental Data:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Surface Temperature:</span>
                    <span className="text-white">{(400 / (orbitalDistance * orbitalDistance)).toFixed(0)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Orbital Period:</span>
                    <span className="text-white">{(orbitalDistance ** 1.5).toFixed(1)} Earth years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Surface Gravity:</span>
                    <span className="text-white">{planetMass.toFixed(1)}g</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Orbital Distance</CardTitle>
                <CardDescription className="text-gray-300">
                  Distance from star (Astronomical Units)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[orbitalDistance]}
                    onValueChange={(value) => setOrbitalDistance(value[0])}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Mercury-like</span>
                    <span className="text-white font-medium">{orbitalDistance.toFixed(1)} AU</span>
                    <span>Mars-like</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Planet Mass</CardTitle>
                <CardDescription className="text-gray-300">
                  Mass relative to Earth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[planetMass]}
                    onValueChange={(value) => setPlanetMass(value[0])}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Mars-size</span>
                    <span className="text-white font-medium">{planetMass.toFixed(1)} M⊕</span>
                    <span>Super-Earth</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Atmospheric Pressure</CardTitle>
                <CardDescription className="text-gray-300">
                  Atmospheric density relative to Earth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[atmosphericPressure]}
                    onValueChange={(value) => setAtmosphericPressure(value[0])}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>No Atmosphere</span>
                    <span className="text-white font-medium">{atmosphericPressure.toFixed(1)} atm</span>
                    <span>Dense</span>
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
                <p>• The habitable zone is where liquid water can exist on a planet's surface</p>
                <p>• Planet mass affects gravity and ability to retain atmosphere</p>
                <p>• Atmospheric pressure determines whether water stays liquid</p>
                <p>• Temperature follows inverse square law with distance from star</p>
                <p>• Earth sits in the "Goldilocks zone" - not too hot, not too cold</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
