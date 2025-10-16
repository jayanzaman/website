'use client';

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'

// Energy Field Visualization Component
function EnergyField({ entropy, expansionRate, densityFluctuations }: {
  entropy: number;
  expansionRate: number;
  densityFluctuations: number;
}) {
  // Enhanced entropy visualization with scientific accuracy
  const hue = Math.max(0, Math.min(360, 240 - (entropy * 30))); // Blue → Purple → Red → Orange
  const saturation = Math.min(100, 60 + (entropy * 8)); // Higher entropy = more saturated
  const lightness = Math.max(30, 70 - (entropy * 5)); // Higher entropy = darker
  
  // Physically-inspired animation speeds
  const animationSpeed = Math.pow(expansionRate, 1.5) * 1.5;
  const pulseFrequency = Math.log(expansionRate + 0.1) + 2;
  
  // Advanced density fluctuation effects
  const waveIntensity = densityFluctuations * 100;
  const blur = Math.max(0, 3 - (densityFluctuations * 3));
  const contrast = 100 + (densityFluctuations * 50);
  const brightness = Math.max(80, 120 - (densityFluctuations * 40));
  const scale = 1 + (Math.sin(Date.now() * 0.001) * densityFluctuations * 0.2);
  
  // Quantum uncertainty effects
  const uncertaintyFactor = densityFluctuations * 0.1;
  const quantumShimmer = Math.sin(Date.now() * 0.01) * uncertaintyFactor * 30;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        className="energy-sphere"
        style={{
          background: `radial-gradient(circle, hsla(${hue}, ${saturation}%, ${lightness}%, 0.9) 0%, hsla(${hue}, ${saturation * 0.8}%, ${lightness * 0.6}%, 0.5) 50%, transparent 100%)`,
          animation: `pulse ${2 / animationSpeed}s ease-in-out infinite, rotate ${10 / animationSpeed}s linear infinite`,
          filter: `blur(${blur}px) contrast(${contrast}%) brightness(${brightness}%) hue-rotate(${quantumShimmer}deg)`,
          transform: `scale(${scale})`,
        }}
      />
      <div 
        className="energy-ripple"
        style={{
          borderColor: `hsla(${hue}, ${saturation * 0.9}%, ${lightness * 1.2}%, 0.7)`,
          animation: `ripple ${3 / animationSpeed}s ease-out infinite`,
        }}
      />
      <style jsx>{`
        .energy-sphere {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          position: absolute;
        }
        .energy-ripple {
          width: 300px;
          height: 300px;
          border: 2px solid;
          border-radius: 50%;
          position: absolute;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function BeginningSection({ 
  educatorMode, 
  cosmicTime = 0
}: { 
  educatorMode: boolean; 
  cosmicTime?: number;
}) {
  const [entropy, setEntropy] = useState(1)
  const [expansionRate, setExpansionRate] = useState(0.5)
  const [densityFluctuations, setDensityFluctuations] = useState(0.1)
  const [showPenroseInfo, setShowPenroseInfo] = useState(false)
  const [universeOutcome, setUniverseOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setEntropy(Math.random() * 10)
      setExpansionRate(Math.random() * 2)
      setDensityFluctuations(Math.random() * 1)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Enhanced Goldilocks Zone Logic with weighted scoring
    const entropyScore = Math.max(0, 1 - Math.abs(entropy - 1) / 2);
    const expansionScore = Math.max(0, 1 - Math.abs(expansionRate - 0.7) / 0.5);
    const fluctuationScore = Math.max(0, 1 - Math.abs(densityFluctuations - 0.2) / 0.3);
    
    // Cross-parameter interactions
    const effectiveExpansionRate = expansionRate * (1 + (entropy - 1) * 0.1);
    const effectiveDensityFluctuations = densityFluctuations * Math.sqrt(entropy);
    const temperatureEffect = Math.exp(-effectiveExpansionRate) * (2 - entropy);
    
    // Compound scoring with realistic parameter coupling
    const totalScore = (entropyScore * 0.4) + (expansionScore * 0.35) + (fluctuationScore * 0.25);
    const cosmicComplexity = entropyScore * expansionScore * fluctuationScore;
    const structureFormationProbability = Math.pow(cosmicComplexity, 0.7);
    
    let outcome = '';
    
    // Graduated outcomes based on total score
    if (totalScore > 0.85) {
      outcome = '✨ Perfect conditions - complex structures flourish!'
    } else if (totalScore > 0.65) {
      outcome = '🌟 Excellent - life and galaxies likely to emerge'
    } else if (totalScore > 0.45) {
      outcome = '⚠️ Marginal - simple structures possible, life uncertain'
    } else if (totalScore > 0.25) {
      outcome = '❌ Poor conditions - mostly sterile universe'
    } else if (entropy > 7) {
      outcome = '🌀 Maximum entropy - complete thermal death'
    } else if (effectiveExpansionRate > 2) {
      outcome = '💨 Runaway expansion - matter tears apart instantly'
    } else if (effectiveExpansionRate < 0.1) {
      outcome = '💥 Big Crunch - universe collapses in seconds'
    } else if (effectiveDensityFluctuations > 1.5) {
      outcome = '🕳️ Quantum chaos - black holes dominate everything'
    } else {
      outcome = '💀 Catastrophic failure - universe cannot form atoms'
    }
    
    setUniverseOutcome(outcome)
  }, [entropy, expansionRate, densityFluctuations])

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/20 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-white">The Primordial Universe</CardTitle>
              <CardDescription className="text-gray-300">
                A smooth, low-entropy energy field at the moment of creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-black/30 rounded-lg overflow-hidden">
                <EnergyField 
                  entropy={entropy}
                  expansionRate={expansionRate}
                  densityFluctuations={densityFluctuations}
                />
              </div>
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Universe Outcome:</h4>
                <p className={`text-sm font-medium ${
                  universeOutcome.includes('✨') || universeOutcome.includes('Perfect') ? 'text-green-400' : 
                  universeOutcome.includes('🌟') || universeOutcome.includes('Excellent') ? 'text-emerald-400' :
                  universeOutcome.includes('⚠️') || universeOutcome.includes('Marginal') ? 'text-yellow-400' : 
                  universeOutcome.includes('❌') || universeOutcome.includes('Poor') ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {universeOutcome}
                </p>
              </div>
              
              {/* Physics Metrics */}
              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
                <h4 className="font-semibold mb-3 text-white text-xs">Cosmic Parameters:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entropy Score:</span>
                    <span className="text-white">{(Math.max(0, 1 - Math.abs(entropy - 1) / 2) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expansion Score:</span>
                    <span className="text-white">{(Math.max(0, 1 - Math.abs(expansionRate - 0.7) / 0.5) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fluctuation Score:</span>
                    <span className="text-white">{(Math.max(0, 1 - Math.abs(densityFluctuations - 0.2) / 0.3) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span className="text-gray-300 font-medium">Total Viability:</span>
                    <span className="text-white font-bold">{((Math.max(0, 1 - Math.abs(entropy - 1) / 2) * 0.4) + (Math.max(0, 1 - Math.abs(expansionRate - 0.7) / 0.5) * 0.35) + (Math.max(0, 1 - Math.abs(densityFluctuations - 0.2) / 0.3) * 0.25) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">The Beginning</h2>
            <p className="text-gray-300 mb-6">
              Adjust the fundamental parameters of the early universe and witness the consequences.
              Only precise conditions allow for the formation of structure and complexity.
            </p>
          </div>

          {/* Initial Entropy Control */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Initial Entropy</CardTitle>
                <button
                  onClick={() => setShowPenroseInfo(!showPenroseInfo)}
                  className="text-orange-400 hover:text-orange-300"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <CardDescription className="text-gray-300">
                Measure of disorder in the primordial universe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={[entropy]}
                    onValueChange={(value) => setEntropy(value[0])}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  {/* Optimal range indicator */}
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.5 - 0.1) / (10 - 0.1)) * 100}%`,
                         width: `${((1.5 - 0.5) / (10 - 0.1)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Perfect Order</span>
                  <span className="text-green-400 font-bold">0.5-1.5 (optimal)</span>
                  <span className="text-white font-medium">{entropy.toFixed(1)}</span>
                  <span>Maximum Chaos</span>
                </div>
              </div>
              
              {showPenroseInfo && (
                <div className="mt-4 p-3 bg-orange-900/30 border border-orange-500/30 rounded-lg">
                  <p className="text-xs text-orange-200">
                    <strong>Penrose's Calculation:</strong> The odds of our universe's low-entropy state 
                    were 1 in 10^(10^123) - a number so small it defies comprehension. This extraordinary 
                    fine-tuning is what allows structure to emerge from chaos.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Expansion Rate Control */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Expansion Rate (Hubble Constant)</CardTitle>
              <CardDescription className="text-gray-300">
                How fast the universe expands after the Big Bang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={[expansionRate]}
                    onValueChange={(value) => setExpansionRate(value[0])}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  {/* Optimal range indicator */}
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.5 - 0.1) / (2 - 0.1)) * 100}%`,
                         width: `${((0.9 - 0.5) / (2 - 0.1)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Too Slow</span>
                  <span className="text-green-400 font-bold">0.5-0.9 (optimal)</span>
                  <span className="text-white font-medium">{expansionRate.toFixed(1)}</span>
                  <span>Too Fast</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Density Fluctuations Control */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Density Fluctuations</CardTitle>
              <CardDescription className="text-gray-300">
                Quantum ripples that seed all future structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={[densityFluctuations]}
                    onValueChange={(value) => setDensityFluctuations(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  {/* Optimal range indicator */}
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.1 - 0) / (1 - 0)) * 100}%`,
                         width: `${((0.3 - 0.1) / (1 - 0)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Perfectly Smooth</span>
                  <span className="text-green-400 font-bold">10-30% (optimal)</span>
                  <span className="text-white font-medium">{(densityFluctuations * 100).toFixed(1)}%</span>
                  <span>Highly Chaotic</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {educatorMode && (
            <div className="space-y-4">
              <Card className="bg-blue-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Educational Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-200">
                    <p>• The universe began in an extraordinarily low-entropy state</p>
                    <p>• Cosmic inflation explains the universe's flatness and uniformity</p>
                    <p>• Quantum fluctuations during inflation created the seeds for galaxies</p>
                    <p>• The anthropic principle suggests our universe is fine-tuned for complexity</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-900/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-300">⚠️ The Improbability Cascade</CardTitle>
                  <CardDescription className="text-red-200">
                    Each step requires increasingly precise conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-red-200">
                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">Penrose's Low-Entropy Calculation:</p>
                      <p className="text-xs">Probability of our universe's initial low-entropy state: <strong>1 in 10^(10^123)</strong> - a number so vast that if every atom in the observable universe were a digit, you couldn't write it down.</p>
                    </div>
                    
                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">Cosmological Constant Problem:</p>
                      <p className="text-xs">Dark energy density appears fine-tuned to ~120 decimal places. Off by even 1 part in 10^120 and either: (1) universe collapses immediately, or (2) expands so fast no structures form.</p>
                    </div>

                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">Flatness Problem:</p>
                      <p className="text-xs">Universe's density must equal critical density to ~1 part in 10^60 at Planck time. Slight deviation = immediate collapse or runaway expansion.</p>
                    </div>

                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">Horizon Problem:</p>
                      <p className="text-xs">Cosmic microwave background uniform to 1 part in 100,000 across regions that should never have been in causal contact. Requires precise initial conditions or inflation mechanism.</p>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                      <p className="text-yellow-200 font-semibold mb-2">🤔 The Deeper Question:</p>
                      <p className="text-xs text-yellow-100">
                        Unlike abiogenesis (which we can study in labs), we cannot experiment with universe creation. 
                        Are these "fine-tuned" values: (1) necessary consequences of unknown physics, 
                        (2) selection effects from infinite multiverse, (3) evidence of design, or 
                        (4) simply the only universe we can observe? The question remains open.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
