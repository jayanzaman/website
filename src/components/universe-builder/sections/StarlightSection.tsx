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
                  <div className="relative">
                    <Slider
                      value={[stellarMass]}
                      onValueChange={(value) => setStellarMass(value[0])}
                      max={2}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    {/* Optimal range indicator - Sun-like stars */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.8 - 0.1) / (2 - 0.1)) * 100}%`,
                           width: `${((1.4 - 0.8) / (2 - 0.1)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Red Dwarf</span>
                    <span className="text-green-400 font-bold">0.8-1.4 M☉ (optimal)</span>
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
                  <div className="relative">
                    <Slider
                      value={[metallicity]}
                      onValueChange={(value) => setMetallicity(value[0])}
                      max={0.1}
                      min={0}
                      step={0.001}
                      className="w-full"
                    />
                    {/* Optimal range indicator - Solar metallicity */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.01 - 0) / (0.1 - 0)) * 100}%`,
                           width: `${((0.03 - 0.01) / (0.1 - 0)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Population III</span>
                    <span className="text-green-400 font-bold">1-3% (optimal)</span>
                    <span className="text-white font-medium">{(metallicity * 100).toFixed(2)}%</span>
                    <span>Metal-Rich</span>
                  </div>
                  {educatorMode && metallicity < 0.005 && (
                    <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-200">
                      <strong>⚠️ JWST Update:</strong> James Webb has discovered unexpectedly metal-rich galaxies at z{'>'}10, suggesting rapid early enrichment or alternative formation pathways.
                    </div>
                  )}
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
                  <div className="relative">
                    <Slider
                      value={[starFormationRate]}
                      onValueChange={(value) => setStarFormationRate(value[0])}
                      max={2}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    {/* Optimal range indicator - Moderate formation rate */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.8 - 0.1) / (2 - 0.1)) * 100}%`,
                           width: `${((1.5 - 0.8) / (2 - 0.1)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Slow</span>
                    <span className="text-green-400 font-bold">0.8-1.5 (optimal)</span>
                    <span className="text-white font-medium">{starFormationRate.toFixed(1)}</span>
                    <span>Rapid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {educatorMode && (
          <div className="space-y-4 mt-8">
            <Card className="bg-blue-900/20 border-blue-500/30">
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
                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                    <p className="text-yellow-200 font-semibold mb-2">🔭 Recent JWST Discoveries (2022-2024):</p>
                    <p className="text-xs text-yellow-100">James Webb has observed galaxies at redshift z{'>'}10 (400-600 Myr after Big Bang) with unexpectedly high metallicities. Some show carbon, oxygen, and nitrogen abundances suggesting very rapid early star formation and enrichment - challenging our timeline of Population III star formation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-300">⚠️ The Stellar Nucleosynthesis Puzzles</CardTitle>
                <CardDescription className="text-red-200">
                  Critical gaps in our understanding of how elements formed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-red-200">
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Triple-Alpha Process Fine-Tuning:</p>
                    <p className="text-xs">Carbon-12 formation requires <strong>three helium-4 nuclei</strong> to collide simultaneously - astronomically unlikely. Fred Hoyle predicted a precise energy resonance (7.65 MeV) that makes this possible. Without this exact resonance, no carbon → no organic chemistry → no life. <strong>The resonance exists, but we don't know why.</strong></p>
                  </div>
                  
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Lithium Problem:</p>
                    <p className="text-xs">Big Bang nucleosynthesis predicts 3-4x more lithium-7 than observed in old stars. Either: (1) unknown physics destroyed lithium, (2) stellar models are wrong, or (3) Big Bang models are incomplete. <strong>After 25+ years, this remains unsolved.</strong></p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The r-Process Mystery:</p>
                    <p className="text-xs">Half of elements heavier than iron require rapid neutron capture (r-process) in extreme environments. We thought this happened in core-collapse supernovae, but models can't reproduce observed abundances. <strong>Neutron star mergers help, but the full picture remains unclear.</strong></p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">Population III Star Problem:</p>
                    <p className="text-xs">We've never directly observed a Population III star. Theory predicts they were 100-1000x more massive than the Sun, but JWST finds metal-rich galaxies too early. Either: (1) Pop III stars were different than predicted, (2) enrichment happened faster than possible, or (3) alternative formation pathways exist.</p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Oxygen Isotope Anomaly:</p>
                    <p className="text-xs">Meteorites show oxygen isotope ratios that don't match stellar nucleosynthesis models. The Sun's composition differs from the local interstellar medium in ways we can't explain. <strong>Our stellar evolution models may be fundamentally incomplete.</strong></p>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                    <p className="text-yellow-200 font-semibold mb-2">🌟 The Uncomfortable Truth:</p>
                    <p className="text-xs text-yellow-100">
                      We can simulate stellar interiors and predict element production, but <strong>we've never seen it happen</strong>. Stellar lifetimes are millions to billions of years - far longer than human observation. Our models work for some elements but fail for others. The recent JWST discoveries suggest our timeline of cosmic chemical evolution may be fundamentally wrong.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
