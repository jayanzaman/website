'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Complexity Evolution Visualization
function ComplexityEvolution({ selectionPressure, mutationRate, environmentalStability }: {
  selectionPressure: number;
  mutationRate: number;
  environmentalStability: number;
}) {
  const complexityLevels = [
    { name: 'Molecules', threshold: 0.1, color: 'rgba(100, 255, 100, 0.8)' },
    { name: 'Cells', threshold: 0.3, color: 'rgba(100, 200, 255, 0.8)' },
    { name: 'Multicellular', threshold: 0.5, color: 'rgba(255, 200, 100, 0.8)' },
    { name: 'Neural Networks', threshold: 0.7, color: 'rgba(255, 150, 255, 0.8)' },
    { name: 'Intelligence', threshold: 0.85, color: 'rgba(255, 100, 100, 0.8)' },
  ];

  const evolutionSpeed = selectionPressure * mutationRate * environmentalStability;
  const maxComplexity = Math.min(1, evolutionSpeed * 1.2);
  
  return (
    <div className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="complexity-ladder w-full h-full relative">
        {/* Complexity Levels */}
        {complexityLevels.map((level, index) => {
          const achieved = maxComplexity >= level.threshold;
          const progress = Math.max(0, Math.min(1, (maxComplexity - level.threshold) / 0.1));
          
          return (
            <div 
              key={level.name}
              className="complexity-level"
              style={{
                position: 'absolute',
                left: '10%',
                top: `${80 - index * 15}%`,
                width: '80%',
                height: '12%',
                backgroundColor: achieved ? level.color : 'rgba(100, 100, 100, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: achieved ? '2px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(100, 100, 100, 0.3)',
                animation: achieved ? `complexity-glow ${2 + index * 0.5}s ease-in-out infinite alternate` : 'none',
                transform: `scale(${0.8 + progress * 0.2})`,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <span className="text-white text-sm font-medium">{level.name}</span>
              
              {/* Progress indicator */}
              {achieved && (
                <div 
                  className="progress-bar"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '2px',
                    right: '2px',
                    height: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '2px',
                    transform: `scaleX(${progress})`,
                    transformOrigin: 'left',
                  }}
                />
              )}
            </div>
          );
        })}
        
        {/* Evolution arrows */}
        {complexityLevels.slice(0, -1).map((_, index) => {
          const achieved = maxComplexity >= complexityLevels[index + 1].threshold;
          return (
            <div 
              key={`arrow-${index}`}
              className="evolution-arrow"
              style={{
                position: 'absolute',
                left: '50%',
                top: `${72 - index * 15}%`,
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: achieved ? '12px solid rgba(255, 255, 100, 0.8)' : '12px solid rgba(100, 100, 100, 0.3)',
                transform: 'translateX(-50%)',
                animation: achieved ? `arrow-pulse ${1 + index * 0.2}s ease-in-out infinite` : 'none',
              }}
            />
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes complexity-glow {
          0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
        }
        @keyframes arrow-pulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) translateY(0px); }
          50% { opacity: 1; transform: translateX(-50%) translateY(-3px); }
        }
      `}</style>
    </div>
  )
}

export default function ComplexitySection({ educatorMode, cosmicTime = 0 }: { educatorMode: boolean; cosmicTime?: number }) {
  const [selectionPressure, setSelectionPressure] = useState(0.7)
  const [mutationRate, setMutationRate] = useState(0.5)
  const [environmentalStability, setEnvironmentalStability] = useState(0.8)
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setSelectionPressure(Math.random())
      setMutationRate(Math.random())
      setEnvironmentalStability(Math.random())
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Calculate evolutionary success
    const evolutionScore = selectionPressure * mutationRate * environmentalStability;
    const balanceScore = 1 - Math.abs(selectionPressure - 0.6) - Math.abs(mutationRate - 0.4) - Math.abs(environmentalStability - 0.7);
    
    const totalScore = (evolutionScore * 0.6) + (Math.max(0, balanceScore) * 0.4);
    
    if (totalScore > 0.7 && evolutionScore > 0.15) {
      setOutcome('✨ Perfect - intelligence and consciousness emerge!')
    } else if (totalScore > 0.5 && evolutionScore > 0.1) {
      setOutcome('🌟 Good - complex multicellular life develops')
    } else if (totalScore > 0.3) {
      setOutcome('⚠️ Marginal - simple multicellular organisms only')
    } else if (selectionPressure < 0.2) {
      setOutcome('🐌 Too little pressure - evolution stagnates')
    } else if (selectionPressure > 0.9) {
      setOutcome('💀 Too much pressure - mass extinctions')
    } else if (mutationRate < 0.1) {
      setOutcome('🔒 Too stable - no genetic diversity')
    } else if (mutationRate > 0.8) {
      setOutcome('🧬 Too chaotic - harmful mutations dominate')
    } else if (environmentalStability < 0.3) {
      setOutcome('🌪️ Too unstable - constant catastrophes')
    } else {
      setOutcome('❌ Poor conditions - complexity cannot emerge')
    }
  }, [selectionPressure, mutationRate, environmentalStability])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Complexity & Consciousness</h2>
          <p className="text-xl text-gray-300">
            The arrow of time drives increasing complexity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complexity Evolution Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Evolutionary Ladder</CardTitle>
              <CardDescription className="text-gray-300">
                Watch complexity emerge through evolutionary processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComplexityEvolution 
                selectionPressure={selectionPressure}
                mutationRate={mutationRate}
                environmentalStability={environmentalStability}
              />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Evolutionary Outcome:</h4>
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
              
              {/* Complexity Metrics */}
              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
                <h4 className="font-semibold mb-3 text-white text-xs">Complexity Achieved:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Evolution Rate:</span>
                    <span className="text-white">{(selectionPressure * mutationRate * environmentalStability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Complexity:</span>
                    <span className="text-white">{Math.min(100, selectionPressure * mutationRate * environmentalStability * 120).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Intelligence Threshold:</span>
                    <span className="text-white">{selectionPressure * mutationRate * environmentalStability > 0.15 ? 'Reached' : 'Not Reached'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Selection Pressure</CardTitle>
                <CardDescription className="text-gray-300">
                  Environmental challenges driving adaptation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Slider
                      value={[selectionPressure]}
                      onValueChange={(value) => setSelectionPressure(value[0])}
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    {/* Optimal range indicator - moderate selection */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.3 - 0) / (1 - 0)) * 100}%`,
                           width: `${((0.7 - 0.3) / (1 - 0)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Weak</span>
                    <span className="text-green-400 font-bold">30-70% (optimal)</span>
                    <span className="text-white font-medium">{(selectionPressure * 100).toFixed(0)}%</span>
                    <span>Intense</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Mutation Rate</CardTitle>
                <CardDescription className="text-gray-300">
                  Rate of genetic variation and innovation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Slider
                      value={[mutationRate]}
                      onValueChange={(value) => setMutationRate(value[0])}
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    {/* Optimal range indicator - moderate mutation */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.1 - 0) / (1 - 0)) * 100}%`,
                           width: `${((0.4 - 0.1) / (1 - 0)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Conservative</span>
                    <span className="text-green-400 font-bold">10-40% (optimal)</span>
                    <span className="text-white font-medium">{(mutationRate * 100).toFixed(0)}%</span>
                    <span>Chaotic</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Environmental Stability</CardTitle>
                <CardDescription className="text-gray-300">
                  Consistency of environmental conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Slider
                      value={[environmentalStability]}
                      onValueChange={(value) => setEnvironmentalStability(value[0])}
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    {/* Optimal range indicator - moderate stability */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((0.6 - 0) / (1 - 0)) * 100}%`,
                           width: `${((0.9 - 0.6) / (1 - 0)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Chaotic</span>
                    <span className="text-green-400 font-bold">60-90% (optimal)</span>
                    <span className="text-white font-medium">{(environmentalStability * 100).toFixed(0)}%</span>
                    <span>Stable</span>
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
                  <p>• Evolution requires both selection pressure and genetic variation</p>
                  <p>• Too much pressure causes extinction, too little causes stagnation</p>
                  <p>• Moderate mutation rates provide optimal innovation without chaos</p>
                  <p>• Environmental stability allows complex adaptations to develop</p>
                  <p>• Intelligence emerges from the interplay of all these factors</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-300">⚠️ The Consciousness and Complexity Paradoxes</CardTitle>
                <CardDescription className="text-red-200">
                  Deep mysteries about evolution, intelligence, and the nature of consciousness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-red-200">
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Hard Problem of Consciousness:</p>
                    <p className="text-xs">We have no scientific explanation for <strong>why subjective experience exists</strong>. Neural correlates don't explain qualia - why does red look red? Why is there "something it's like" to be conscious? This may be the deepest unsolved problem in science.</p>
                  </div>
                  
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Fermi Paradox:</p>
                    <p className="text-xs">If intelligence is a natural outcome of evolution, <strong>where is everybody?</strong> The universe should be teeming with civilizations, yet we see none. Either: (1) intelligence is incredibly rare, (2) civilizations self-destruct, (3) they're hiding, or (4) we're fundamentally wrong about something.</p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Cambrian Explosion Problem:</p>
                    <p className="text-xs">Complex life appeared "suddenly" ~540 million years ago after 3 billion years of simple cells. <strong>We don't understand what triggered this explosion</strong> of complexity. Was it oxygen, predation, genetic innovations, or something else entirely?</p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Intelligence Convergence Question:</p>
                    <p className="text-xs">Intelligence evolved independently multiple times (humans, octopi, dolphins, corvids), suggesting it's advantageous. But <strong>why did only humans develop technology and language?</strong> What specific conditions or mutations made our intelligence qualitatively different?</p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Entropy-Complexity Paradox:</p>
                    <p className="text-xs">The Second Law of Thermodynamics says entropy always increases, yet we see increasing complexity and organization. <strong>How does evolution create order from chaos?</strong> The answer involves energy gradients and dissipative structures, but the full picture remains unclear.</p>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                    <p className="text-yellow-200 font-semibold mb-2">🧠 The Ultimate Mystery:</p>
                    <p className="text-xs text-yellow-100">
                      Consciousness may be the universe's way of understanding itself, but <strong>we don't know if it's inevitable or miraculous</strong>. Are we the result of 13.8 billion years of cosmic evolution naturally producing observers, or are we an impossibly unlikely accident? The answer shapes how we view our place in the cosmos.
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
