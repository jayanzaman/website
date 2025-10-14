'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Star Visualization Component
function StarField({ stellarMass, metallicity, starFormationRate }: {
  stellarMass: number;
  metallicity: number;
  starFormationRate: number;
}) {
  const starSize = 50 + (stellarMass * 30);
  const starBrightness = 80 + (stellarMass * 40);
  const metalGlow = metallicity * 100;
  const formationSpeed = starFormationRate * 2;

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="star-system">
        {/* Main Star */}
        <div 
          className="main-star"
          style={{
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: `rgba(255, ${Math.floor(200 + metallicity * 55)}, ${Math.floor(100 + metallicity * 100)}, 0.9)`,
            boxShadow: `0 0 ${starSize}px rgba(255, ${Math.floor(180 + metallicity * 75)}, ${Math.floor(80 + metallicity * 120)}, ${0.6 + metallicity * 0.4})`,
            animation: `stellar-pulse ${3 / formationSpeed}s ease-in-out infinite`,
            filter: `brightness(${starBrightness}%) contrast(${100 + metalGlow}%)`,
          }}
        />
        
        {/* Heavy Elements (if metallicity > 0.3) */}
        {metallicity > 0.3 && (
          <div className="heavy-elements">
            {['Carbon', 'Oxygen', 'Silicon', 'Iron'].map((element, i) => (
              <div 
                key={element}
                className="element-particle"
                style={{
                  left: `${50 + Math.cos(i * 1.5) * 80}%`,
                  top: `${50 + Math.sin(i * 1.5) * 80}%`,
                  backgroundColor: `rgba(${100 + i * 40}, ${150 + i * 20}, 255, ${metallicity})`,
                  animation: `element-orbit ${5 / (stellarMass + 0.1)}s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .star-system {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .main-star {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
        .element-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes stellar-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes element-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}

export default function StarlightSection({ educatorMode, cosmicTime = 0 }: { educatorMode: boolean; cosmicTime?: number }) {
  const [stellarMass, setStellarMass] = useState(1.0)
  const [metallicity, setMetallicity] = useState(0.02)
  const [starFormationRate, setStarFormationRate] = useState(0.5)
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setStellarMass(Math.random() * 2)
      setMetallicity(Math.random() * 0.1)
      setStarFormationRate(Math.random() * 2)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Calculate stellar evolution outcome
    const massScore = stellarMass > 0.8 && stellarMass < 1.4 ? 1 : Math.max(0, 1 - Math.abs(stellarMass - 1.1) / 0.5);
    const metallicityScore = metallicity > 0.01 && metallicity < 0.05 ? 1 : Math.max(0, 1 - Math.abs(metallicity - 0.02) / 0.03);
    const formationScore = Math.max(0, 1 - Math.abs(starFormationRate - 0.7) / 0.5);
    
    const totalScore = (massScore * 0.4) + (metallicityScore * 0.35) + (formationScore * 0.25);
    
    if (totalScore > 0.8) {
      setOutcome('✨ Perfect stellar nursery - heavy elements abundant!')
    } else if (totalScore > 0.6) {
      setOutcome('🌟 Good conditions - stars forge essential elements')
    } else if (totalScore > 0.4) {
      setOutcome('⚠️ Marginal - limited heavy element production')
    } else if (stellarMass > 2) {
      setOutcome('💥 Too massive - stars explode too quickly')
    } else if (stellarMass < 0.5) {
      setOutcome('❄️ Too small - insufficient fusion temperatures')
    } else if (metallicity > 0.08) {
      setOutcome('🔥 Too metal-rich - runaway stellar formation')
    } else {
      setOutcome('❌ Poor conditions - no heavy elements created')
    }
  }, [stellarMass, metallicity, starFormationRate])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Starlight & Heavy Elements</h2>
          <p className="text-xl text-gray-300">
            The first stars ignite, forging heavy elements and seeding the cosmos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Star Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Stellar Nucleosynthesis</CardTitle>
              <CardDescription className="text-gray-300">
                Watch stars forge heavy elements through nuclear fusion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StarField 
                stellarMass={stellarMass}
                metallicity={metallicity}
                starFormationRate={starFormationRate}
              />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Stellar Outcome:</h4>
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
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Stellar Mass</CardTitle>
                <CardDescription className="text-gray-300">
                  Mass of first-generation stars (in solar masses)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[stellarMass]}
                    onValueChange={(value) => setStellarMass(value[0])}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Red Dwarf</span>
                    <span className="text-white font-medium">{stellarMass.toFixed(1)} M☉</span>
                    <span>Supergiant</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Metallicity</CardTitle>
                <CardDescription className="text-gray-300">
                  Fraction of heavy elements in stellar composition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[metallicity]}
                    onValueChange={(value) => setMetallicity(value[0])}
                    max={0.1}
                    min={0}
                    step={0.001}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Population III</span>
                    <span className="text-white font-medium">{(metallicity * 100).toFixed(2)}%</span>
                    <span>Metal-Rich</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Star Formation Rate</CardTitle>
                <CardDescription className="text-gray-300">
                  Rate of new star formation in the galaxy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[starFormationRate]}
                    onValueChange={(value) => setStarFormationRate(value[0])}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Slow</span>
                    <span className="text-white font-medium">{starFormationRate.toFixed(1)}</span>
                    <span>Rapid</span>
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
                <p>• Population III stars were the first stars, made only of hydrogen and helium</p>
                <p>• Nuclear fusion in stellar cores creates elements up to iron</p>
                <p>• Supernova explosions create elements heavier than iron</p>
                <p>• Stellar winds and supernovae seed space with heavy elements</p>
                <p>• Second-generation stars can form rocky planets due to heavy elements</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
