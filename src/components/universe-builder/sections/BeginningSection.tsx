'use client';

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import { SimplePenroseVisual, SimpleDarkEnergyVisual, SimpleFlatnessVisual, SimpleHorizonVisual } from './SimpleImprobabilityVisuals'

// Entropy Visualization - Shows order vs chaos with organized vs scattered particles
function EntropyVisual({ entropy }: { entropy: number }) {
  const particleCount = 20;
  const orderLevel = Math.max(0, 2 - entropy); // Higher entropy = less order
  
  return (
    <div className="relative w-full h-full bg-black/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {Array.from({ length: particleCount }).map((_, i) => {
            const angle = (i / particleCount) * 2 * Math.PI;
            const radius = orderLevel > 0.5 ? 60 + (Math.random() - 0.5) * 20 * (2 - orderLevel) : Math.random() * 80;
            const x = orderLevel > 0.5 ? Math.cos(angle) * radius : (Math.random() - 0.5) * 160;
            const y = orderLevel > 0.5 ? Math.sin(angle) * radius : (Math.random() - 0.5) * 160;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  opacity: 0.8,
                  animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-white/70">
        {entropy < 1 ? 'Highly Ordered' : entropy < 3 ? 'Moderate Order' : 'High Entropy (Chaos)'}
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

// Expansion Visualization - Shows universe expanding with galaxies moving apart
function ExpansionVisual({ expansionRate }: { expansionRate: number }) {
  const galaxyCount = 8;
  const expansionSpeed = expansionRate * 0.5;
  
  return (
    <div className="relative w-full h-full bg-black/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {Array.from({ length: galaxyCount }).map((_, i) => {
            const angle = (i / galaxyCount) * 2 * Math.PI;
            const baseRadius = 40;
            const expandedRadius = baseRadius + (expansionSpeed * 30);
            const x = Math.cos(angle) * expandedRadius;
            const y = Math.sin(angle) * expandedRadius;
            
            return (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animation: `expand ${3 / (expansionRate + 0.1)}s ease-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: '0 0 8px rgba(255, 255, 0, 0.5)'
                }}
              />
            );
          })}
          {/* Central reference point */}
          <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-white/70">
        {expansionRate < 0.3 ? 'Slow Expansion' : expansionRate < 1 ? 'Moderate Expansion' : 'Rapid Expansion'}
      </div>
      <style jsx>{`
        @keyframes expand {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// Density Fluctuations Visualization - Shows quantum ripples in space
function DensityFluctuationsVisual({ densityFluctuations }: { densityFluctuations: number }) {
  const rippleIntensity = densityFluctuations * 100;
  // Frequency increases with density fluctuations - more fluctuations = faster changes
  const timeFrequency = 0.001 + (densityFluctuations * 0.005);
  // Animation speed decreases with more fluctuations - more chaotic = faster ripples
  const animationSpeed = Math.max(0.5, 2 - (densityFluctuations * 1.5));
  
  return (
    <div className="relative w-full h-full bg-black/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        {/* Background grid representing space */}
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-1 p-2">
          {Array.from({ length: 48 }).map((_, i) => {
            // Add randomness to make each tile more independent
            const randomOffset = (i * 1.7 + Math.sin(i * 2.3) * 3); // Pseudo-random based on index
            const spatialPhase = randomOffset; // Each tile has unique phase
            const timePhase = Date.now() * timeFrequency;
            const fluctuation = (Math.sin(spatialPhase + timePhase) * densityFluctuations * 0.5) + 0.5;
            const brightness = Math.max(0.1, Math.min(1, fluctuation));
            
            // Add random variation to animation speed for each tile
            const tileAnimationSpeed = animationSpeed + (Math.sin(i * 1.5) * 0.3);
            const randomDelay = (i * 0.03 + Math.sin(i * 0.7) * 0.2) % 2; // More random delays
            
            return (
              <div
                key={i}
                className="bg-purple-400 rounded-sm"
                style={{
                  opacity: brightness,
                  animation: `ripple ${tileAnimationSpeed}s ease-in-out infinite`,
                  animationDelay: `${randomDelay}s`
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-white/70">
        {densityFluctuations < 0.1 ? 'Smooth Space' : densityFluctuations < 0.5 ? 'Quantum Ripples' : 'Strong Fluctuations'}
      </div>
      <style jsx>{`
        @keyframes ripple {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

// Temperature Uniformity Visualization - Shows CMB temperature map
function TemperatureUniformityVisual({ uniformity }: { uniformity: number }) {
  // Calculate temperature variation - lower uniformity = more variation
  const temperatureVariation = (1 - uniformity) * 0.001; // Scale to realistic CMB variations
  const baseTemp = 2.725; // CMB temperature in Kelvin
  
  return (
    <div className="relative w-full h-full bg-black/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-2">
        {/* CMB Temperature Map - representing the sky */}
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-0.5">
          {Array.from({ length: 96 }).map((_, i) => {
            // Create temperature variations across the "sky"
            const x = i % 12;
            const y = Math.floor(i / 12);
            
            // Generate realistic CMB-like temperature pattern
            const spatialVariation = Math.sin(x * 0.8) * Math.cos(y * 0.6) * temperatureVariation;
            const randomVariation = (Math.sin(i * 2.1) * Math.cos(i * 1.7)) * temperatureVariation * 0.5;
            const totalVariation = spatialVariation + randomVariation;
            
            const temperature = baseTemp + totalVariation;
            const normalizedTemp = (temperature - (baseTemp - temperatureVariation)) / (2 * temperatureVariation);
            
            // Color mapping: cold (blue) to hot (red) with very subtle variations
            const hue = uniformity > 0.99999 ? 220 : 240 - (normalizedTemp * 60); // Blue to red spectrum
            const saturation = uniformity > 0.99999 ? 20 : Math.min(80, (1 - uniformity) * 8000);
            const lightness = 40 + (normalizedTemp * 20);
            
            return (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  opacity: 0.8,
                  animation: `tempFlicker ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.01}s`
                }}
              />
            );
          })}
        </div>
        
        {/* Temperature scale indicator */}
        <div className="absolute top-2 right-2 text-xs text-white/80 bg-black/50 p-2 rounded">
          <div className="text-center mb-1">CMB Temp</div>
          <div className="text-center font-mono">
            {uniformity > 0.99999 
              ? '2.725000 K' 
              : `${(baseTemp + (Math.sin(Date.now() * 0.001) * temperatureVariation)).toFixed(6)} K`
            }
          </div>
          <div className="text-center text-xs mt-1">
            Δ{uniformity > 0.99999 ? '0' : (temperatureVariation * 1000).toFixed(2)}mK
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 text-xs text-white/70">
        {uniformity > 0.99999 ? 'Perfect Uniformity' : uniformity > 0.9999 ? 'Slight Variations' : 'Large Temperature Differences'}
      </div>
      
      <style jsx>{`
        @keyframes tempFlicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
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
  
  // Additional fine-tuning parameters
  const [darkEnergyStrength, setDarkEnergyStrength] = useState(1)
  const [universeDensity, setUniverseDensity] = useState(1)
  const [temperatureUniformity, setTemperatureUniformity] = useState(0.99999)

  useEffect(() => {
    const handleRandomize = () => {
      setEntropy(Math.random() * 10)
      setExpansionRate(Math.random() * 2)
      setDensityFluctuations(Math.random() * 1)
      setDarkEnergyStrength(Math.random() * 2)
      setUniverseDensity(0.5 + Math.random() * 1)
      setTemperatureUniformity(0.9 + Math.random() * 0.1)
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
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">The Beginning</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Adjust the fundamental parameters of the early universe and witness the consequences.
          Only precise conditions allow for the formation of structure and complexity.
        </p>
      </div>

      {/* Main Visualization - Full Width */}
      <div className="mb-12">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/20 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-white">The Primordial Universe</CardTitle>
              <CardDescription className="text-gray-300">
                Three fundamental aspects that determined the fate of our universe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white text-center">Initial Entropy</h4>
                  <div className="h-full">
                    <EntropyVisual entropy={entropy} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white text-center">Expansion Rate</h4>
                  <div className="h-full">
                    <ExpansionVisual expansionRate={expansionRate} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white text-center">Density Fluctuations</h4>
                  <div className="h-full">
                    <DensityFluctuationsVisual densityFluctuations={densityFluctuations} />
                  </div>
                </div>
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

      {/* Primary Controls - Balanced Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Initial Entropy Control */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Initial Entropy (Order vs Chaos)</CardTitle>
                <button
                  onClick={() => setShowPenroseInfo(!showPenroseInfo)}
                  className="text-orange-400 hover:text-orange-300"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <CardDescription className="text-gray-300">
                How organized was the universe at the beginning? The fundamental measure of cosmic order vs chaos.
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
                  <span className="text-green-400 font-bold">0.5-1.5 S/k (optimal)</span>
                  <span className="text-white font-medium">{entropy.toFixed(1)} S/k</span>
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
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What's the fundamental problem?</strong> Imagine you have a perfectly organized deck of cards. There's only one way to arrange it perfectly, but millions of ways to shuffle it into chaos. The universe started perfectly organized (low entropy) instead of chaotic (high entropy).</p>
                    <p><strong>Why is this so weird?</strong> It's like throwing a deck of cards in the air and having them land in perfect order every single time. The odds are so small they're basically impossible - yet here we are.</p>
                    <p><strong>How impossible exactly?</strong> The chance is 1 in 10^(10^123). To put this in perspective: if you wrote one zero per atom in the entire observable universe, you still couldn't write this number down. It's that impossibly small.</p>
                    <p><strong>Why does this matter?</strong> This initial order is what allowed gravity to clump matter into stars, galaxies, and eventually us. Without this precise initial state, the universe would be a uniform, lifeless soup of particles.</p>
                  </div>
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
                  <span className="text-green-400 font-bold">50-90 km/s/Mpc (optimal)</span>
                  <span className="text-white font-medium">{(expansionRate * 100).toFixed(0)} km/s/Mpc</span>
                  <span>Too Fast</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What is the Hubble constant?</strong> It measures how fast space itself is expanding. Think of it like a balloon being inflated - every point on the balloon moves away from every other point as the balloon gets bigger.</p>
                    <p><strong>Why is the expansion rate critical?</strong> Too slow, and gravity would pull everything back together in a "Big Crunch" before stars could form. Too fast, and matter would be torn apart so quickly that gravity could never clump it into stars and galaxies.</p>
                    <p><strong>How precise does it need to be?</strong> The expansion rate needs to be fine-tuned to about 1 part in 10^55. That's like setting a timer that needs to be accurate to within a trillionth of a trillionth of a second over the entire age of the universe.</p>
                    <p><strong>What makes this mysterious?</strong> We can measure the current expansion rate very precisely (~70 km/s/Mpc), but we don't fully understand why it has exactly the value needed for complexity to emerge.</p>
                  </div>
                </div>
              )}
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
                  <span className="text-green-400 font-bold">10⁻⁵-10⁻⁴ δρ/ρ (optimal)</span>
                  <span className="text-white font-medium">{(densityFluctuations * 0.0001).toExponential(1)} δρ/ρ</span>
                  <span>Highly Chaotic</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What are density fluctuations?</strong> Think of the early universe like a perfectly smooth lake surface. Quantum mechanics says this perfect smoothness is impossible - there must be tiny ripples. These microscopic variations in density are the "seeds" that eventually grew into all the structure we see today.</p>
                    <p><strong>Why are they so important?</strong> Without these quantum ripples, the universe would have remained perfectly uniform forever - no stars, no galaxies, no planets, no life. Gravity needs something to grab onto to start clumping matter together.</p>
                    <p><strong>How small were these ripples?</strong> The density variations were incredibly tiny - only about 1 part in 100,000 (10⁻⁵). That's like having a perfectly flat field with bumps only 1 millimeter high over an entire football stadium.</p>
                    <p><strong>What makes this fine-tuned?</strong> Too small, and gravity would never overcome the expansion to form structures. Too large, and the universe would collapse into black holes before stars could form. The range that works is extremely narrow.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

      </div>

      {/* Fine-Tuning Parameters Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-3 text-white">Cosmic Fine-Tuning Parameters</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These fundamental constants must be precisely calibrated for a universe capable of complexity and life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            

            {/* Dark Energy Strength */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Dark Energy Strength</CardTitle>
                <CardDescription className="text-gray-300">
                  How strong is the force pushing the universe apart?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                    <SimpleDarkEnergyVisual lambda={darkEnergyStrength} />
                  </div>
                  <div className="relative">
                    <Slider
                      value={[darkEnergyStrength]}
                      onValueChange={(value) => setDarkEnergyStrength(value[0])}
                      max={2}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.8 - 0) / (2 - 0)) * 100}%`,
                           width: `${((1.2 - 0.8) / (2 - 0)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Too Weak</span>
                    <span className="text-green-400 font-bold">0.8-1.2 Λ (optimal)</span>
                    <span className="text-white font-medium">{darkEnergyStrength.toFixed(2)} Λ</span>
                    <span>Too Strong</span>
                  </div>
                </div>
                
                {educatorMode && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="text-xs text-red-200 space-y-2">
                      <p><strong>What's dark energy?</strong> Think of it as an invisible force that pushes everything in the universe apart. It's like having tiny springs between every piece of matter, constantly pushing outward.</p>
                      <p><strong>What did scientists try to calculate?</strong> They wanted to figure out how strong this pushing force should be. Using quantum physics (the rules that govern tiny particles), they calculated how much energy empty space itself should contain - because even "empty" space isn't truly empty.</p>
                      <p><strong>What's the problem?</strong> When scientists compared their calculation to what we actually observe, they were off by a factor of 1 followed by 120 zeros! That's like predicting someone weighs 1 pound but they actually weigh less than a single atom.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Universe Shape */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Universe Shape</CardTitle>
                <CardDescription className="text-gray-300">
                  How much matter determines the geometry of space
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                    <SimpleFlatnessVisual density={universeDensity} />
                  </div>
                  <div className="relative">
                    <Slider
                      value={[universeDensity]}
                      onValueChange={(value) => setUniverseDensity(value[0])}
                      max={1.5}
                      min={0.5}
                      step={0.001}
                      className="w-full"
                    />
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.99 - 0.5) / (1.5 - 0.5)) * 100}%`,
                           width: `${((1.01 - 0.99) / (1.5 - 0.5)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Too Little</span>
                    <span className="text-green-400 font-bold">0.99-1.01 Ω (optimal)</span>
                    <span className="text-white font-medium">{universeDensity.toFixed(3)} Ω</span>
                    <span>Too Much</span>
                  </div>
                </div>
                
                {educatorMode && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="text-xs text-red-200 space-y-2">
                      <p><strong>What determines the universe's shape?</strong> The amount of matter and energy in space. Think of it like a stretched rubber sheet - too much weight makes it curve inward, too little keeps it flat, and way too little makes it curve outward.</p>
                      <p><strong>Why is "flat" special?</strong> A flat universe expands at just the right speed. If it curved inward (too much matter), gravity would pull everything back together in a "Big Crunch." If it curved outward (too little matter), it would expand so fast that nothing could ever come together to form stars or galaxies.</p>
                      <p><strong>How precise does it need to be?</strong> At the very beginning of time, the density had to be exactly right to 1 part in 10^60. That's like throwing a dart at a dartboard the size of North America and hitting a target smaller than an atom.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Temperature Uniformity */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Temperature Uniformity</CardTitle>
                <CardDescription className="text-gray-300">
                  How uniform is the cosmic background temperature?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                    <TemperatureUniformityVisual uniformity={temperatureUniformity} />
                  </div>
                  <div className="relative">
                    <Slider
                      value={[temperatureUniformity]}
                      onValueChange={(value) => setTemperatureUniformity(value[0])}
                      max={1}
                      min={0.9}
                      step={0.00001}
                      className="w-full"
                    />
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.99998 - 0.9) / (1 - 0.9)) * 100}%`,
                           width: `${((1 - 0.99998) / (1 - 0.9)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Very Uneven</span>
                    <span className="text-green-400 font-bold">2.725±0.00005 K (optimal)</span>
                    <span className="text-white font-medium">{(2.725 + (1-temperatureUniformity) * 0.0001).toFixed(6)} K</span>
                    <span>Perfect</span>
                  </div>
                </div>
                
                {educatorMode && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="text-xs text-red-200 space-y-2">
                      <p><strong>What's the cosmic microwave background?</strong> It's the leftover heat from the Big Bang, like the warm glow from a campfire after the flames die out. We can see this ancient light coming from every direction in space.</p>
                      <p><strong>What's weird about it?</strong> This ancient light has almost exactly the same temperature everywhere we look - 2.725 degrees above absolute zero. It varies by only about 1 part in 100,000, which is incredibly uniform.</p>
                      <p><strong>Why is this a problem?</strong> Imagine two people on opposite sides of Earth trying to coordinate their watches without any way to communicate. That's what happened in the early universe - regions of space that are now on opposite sides of the sky were never close enough to "talk" to each other and agree on the same temperature.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

        </div>
      </div>

      {/* Educational Content */}
      {educatorMode && (
            <div className="space-y-4">
              <Card className="bg-blue-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Educational Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-blue-200">
                    <div>
                      <p className="font-semibold text-blue-100 mb-1">Main Visualizations:</p>
                      <p>• <strong>Entropy Visual:</strong> Blue particles show order (organized circle) vs chaos (scattered randomly)</p>
                      <p>• <strong>Expansion Visual:</strong> Yellow galaxies move away from red center point at different speeds</p>
                      <p>• <strong>Density Fluctuations:</strong> Purple grid cells pulse to show quantum ripples in spacetime</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-blue-100 mb-1">Primary Parameters:</p>
                      <p>• <strong>Initial Entropy (S/k):</strong> Universe began in impossibly low-entropy state (1 in 10^(10^123) odds)</p>
                      <p>• <strong>Expansion Rate (km/s/Mpc):</strong> Hubble constant fine-tuned to 1 part in 10^55 for structure formation</p>
                      <p>• <strong>Density Fluctuations (δρ/ρ):</strong> Quantum ripples at 10^-5 scale that seeded all cosmic structures</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-blue-100 mb-1">Fine-Tuning Problems:</p>
                      <p>• <strong>Dark Energy (Λ):</strong> Cosmological constant problem - off by 120 orders of magnitude from theory</p>
                      <p>• <strong>Universe Shape (Ω):</strong> Flatness problem - density must equal critical value to 1 part in 10^60</p>
                      <p>• <strong>Temperature Uniformity (K):</strong> CMB temperature map shows variations from perfect 2.725K uniformity</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-blue-100 mb-1">Key Insights:</p>
                      <p>• Each parameter requires extraordinary precision for a life-permitting universe</p>
                      <p>• The interactive sliders demonstrate how narrow the "Goldilocks zones" really are</p>
                      <p>• These fine-tuning problems remain among the deepest mysteries in cosmology</p>
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
