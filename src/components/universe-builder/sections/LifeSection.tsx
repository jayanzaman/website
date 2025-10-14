'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Molecular Evolution Visualization
function MolecularEvolution({ chemicalComplexity, energyAvailability, timeScale }: {
  chemicalComplexity: number;
  energyAvailability: number;
  timeScale: number;
}) {
  const moleculeCount = Math.floor(chemicalComplexity * 8);
  const energyIntensity = energyAvailability * 100;
  const evolutionSpeed = timeScale * 2;
  
  const getMoleculeColor = (index: number) => {
    const complexity = (index / moleculeCount) * chemicalComplexity;
    if (complexity < 0.3) return 'rgba(100, 200, 100, 0.8)'; // Simple molecules - green
    if (complexity < 0.6) return 'rgba(100, 150, 255, 0.8)'; // Amino acids - blue
    if (complexity < 0.8) return 'rgba(255, 150, 100, 0.8)'; // Proteins - orange
    return 'rgba(255, 100, 255, 0.8)'; // DNA/RNA - magenta
  };

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="molecular-soup">
        {/* Energy Source */}
        <div 
          className="energy-source"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: `rgba(255, 255, 100, ${0.5 + energyAvailability * 0.5})`,
            borderRadius: '50%',
            position: 'absolute',
            left: '10%',
            top: '20%',
            boxShadow: `0 0 ${20 + energyIntensity / 5}px rgba(255, 255, 100, ${energyAvailability})`,
            animation: `energy-pulse ${2 / evolutionSpeed}s ease-in-out infinite`,
          }}
        />
        
        {/* Molecules */}
        {Array.from({ length: moleculeCount }, (_, i) => (
          <div 
            key={i}
            className="molecule"
            style={{
              width: `${4 + (i / moleculeCount) * 8}px`,
              height: `${4 + (i / moleculeCount) * 8}px`,
              backgroundColor: getMoleculeColor(i),
              borderRadius: '50%',
              position: 'absolute',
              left: `${20 + (i * 60 / moleculeCount)}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              animation: `molecular-dance ${3 / evolutionSpeed + i * 0.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              boxShadow: i > moleculeCount * 0.7 ? '0 0 4px rgba(255, 255, 255, 0.5)' : 'none',
            }}
          />
        ))}
        
        {/* Self-replicating structure (if complexity > 0.7) */}
        {chemicalComplexity > 0.7 && (
          <div className="replicator">
            <div 
              className="dna-strand"
              style={{
                width: '60px',
                height: '4px',
                backgroundColor: 'rgba(255, 100, 255, 0.8)',
                position: 'absolute',
                right: '15%',
                top: '40%',
                animation: `dna-replication ${4 / evolutionSpeed}s ease-in-out infinite`,
                transformOrigin: 'left center',
              }}
            />
            <div 
              className="dna-strand-copy"
              style={{
                width: '60px',
                height: '4px',
                backgroundColor: 'rgba(100, 255, 255, 0.8)',
                position: 'absolute',
                right: '15%',
                top: '50%',
                animation: `dna-replication ${4 / evolutionSpeed}s ease-in-out infinite`,
                animationDelay: '0.5s',
                transformOrigin: 'left center',
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        .molecular-soup {
          position: relative;
          width: 100%;
          height: 100%;
        }
        @keyframes energy-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes molecular-dance {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes dna-replication {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>
    </div>
  )
}

export default function LifeSection({ educatorMode, cosmicTime = 0 }: { educatorMode: boolean; cosmicTime?: number }) {
  const [chemicalComplexity, setChemicalComplexity] = useState(0.5)
  const [energyAvailability, setEnergyAvailability] = useState(0.7)
  const [timeScale, setTimeScale] = useState(1.0)
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setChemicalComplexity(Math.random())
      setEnergyAvailability(Math.random())
      setTimeScale(Math.random() * 2 + 0.1)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Calculate abiogenesis probability
    const complexityScore = chemicalComplexity;
    const energyScore = energyAvailability > 0.3 && energyAvailability < 0.9 ? 1 : Math.max(0, 1 - Math.abs(energyAvailability - 0.6) / 0.4);
    const timeScore = timeScale > 0.5 ? Math.min(1, timeScale) : timeScale * 2;
    
    const totalScore = (complexityScore * 0.4) + (energyScore * 0.35) + (timeScore * 0.25);
    
    if (totalScore > 0.8 && chemicalComplexity > 0.7) {
      setOutcome('✨ Perfect - self-replicating life emerges!')
    } else if (totalScore > 0.6 && chemicalComplexity > 0.5) {
      setOutcome('🌟 Good - complex organic molecules form')
    } else if (totalScore > 0.4) {
      setOutcome('⚠️ Marginal - simple chemistry, limited complexity')
    } else if (energyAvailability < 0.2) {
      setOutcome('❄️ Too little energy - no chemical reactions')
    } else if (energyAvailability > 0.9) {
      setOutcome('🔥 Too much energy - molecules break apart')
    } else if (chemicalComplexity < 0.2) {
      setOutcome('🧪 Too simple - only basic molecules exist')
    } else if (timeScale < 0.3) {
      setOutcome('⏰ Too fast - insufficient time for complexity')
    } else {
      setOutcome('❌ Poor conditions - life cannot emerge')
    }
  }, [chemicalComplexity, energyAvailability, timeScale])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Emergence of Life</h2>
          <p className="text-xl text-gray-300">
            From simple molecules to self-replicating cells
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Molecular Evolution Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Molecular Evolution</CardTitle>
              <CardDescription className="text-gray-300">
                Watch molecules evolve from simple to complex
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MolecularEvolution 
                chemicalComplexity={chemicalComplexity}
                energyAvailability={energyAvailability}
                timeScale={timeScale}
              />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Abiogenesis Outcome:</h4>
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
              
              {/* Molecular Inventory */}
              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
                <h4 className="font-semibold mb-3 text-white text-xs">Molecular Complexity:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-green-400">Simple Molecules:</span>
                    <span className="text-white">{chemicalComplexity > 0.1 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">Amino Acids:</span>
                    <span className="text-white">{chemicalComplexity > 0.3 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400">Proteins:</span>
                    <span className="text-white">{chemicalComplexity > 0.6 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400">Self-Replication:</span>
                    <span className="text-white">{chemicalComplexity > 0.7 ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Chemical Complexity</CardTitle>
                <CardDescription className="text-gray-300">
                  Diversity and sophistication of available molecules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[chemicalComplexity]}
                    onValueChange={(value) => setChemicalComplexity(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Simple</span>
                    <span className="text-white font-medium">{(chemicalComplexity * 100).toFixed(0)}%</span>
                    <span>Complex</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Energy Availability</CardTitle>
                <CardDescription className="text-gray-300">
                  Energy sources for driving chemical reactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[energyAvailability]}
                    onValueChange={(value) => setEnergyAvailability(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Low</span>
                    <span className="text-white font-medium">{(energyAvailability * 100).toFixed(0)}%</span>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Evolutionary Time Scale</CardTitle>
                <CardDescription className="text-gray-300">
                  Time available for molecular evolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={[timeScale]}
                    onValueChange={(value) => setTimeScale(value[0])}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Rapid</span>
                    <span className="text-white font-medium">{timeScale.toFixed(1)}×</span>
                    <span>Extended</span>
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
                <p>• Abiogenesis is the process by which life arises from non-living matter</p>
                <p>• RNA World hypothesis suggests RNA was the first self-replicating molecule</p>
                <p>• Energy sources like hydrothermal vents drive prebiotic chemistry</p>
                <p>• Miller-Urey experiment showed amino acids can form from simple gases</p>
                <p>• The transition from chemistry to biology required self-replication</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
