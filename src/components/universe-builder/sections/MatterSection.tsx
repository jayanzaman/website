'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// Particle Visualization Component
function ParticleField({ strongForce }: { strongForce: number }) {
  const protonStability = Math.exp(-Math.abs(strongForce - 1) * 2);
  const nucleosynthesisEfficiency = 1 / (1 + Math.pow(Math.abs(strongForce - 1) * 3, 2));
  
  const particleSize = 100 + (strongForce * 50);
  const bondStrength = Math.min(255, strongForce * 128);
  const vibrationSpeed = Math.abs(strongForce - 1) * 5;
  const stability = protonStability * 100;

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-black/20 rounded-lg">
      <div 
        className="particle-cluster"
        style={{
          animation: `vibrate ${Math.max(0.5, 2 - vibrationSpeed)}s ease-in-out infinite`,
          filter: `brightness(${100 + stability}%) contrast(${100 + bondStrength / 2}%)`,
        }}
      >
        {/* Central Proton */}
        <div 
          className="proton"
          style={{
            width: `${particleSize * 0.8}px`,
            height: `${particleSize * 0.8}px`,
            backgroundColor: `rgba(255, ${Math.floor(bondStrength)}, ${Math.floor(bondStrength * 0.5)}, ${0.6 + protonStability * 0.4})`,
            borderRadius: '50%',
            position: 'absolute',
            boxShadow: `0 0 ${particleSize * 0.3}px rgba(255, ${Math.floor(bondStrength)}, 0, ${protonStability})`,
          }}
        />
        
        {/* Neutrons */}
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="neutron"
            style={{
              width: `${particleSize * 0.6}px`,
              height: `${particleSize * 0.6}px`,
              backgroundColor: `rgba(${Math.floor(bondStrength * 0.8)}, ${Math.floor(bondStrength * 0.8)}, 255, ${0.5 + nucleosynthesisEfficiency * 0.5})`,
              borderRadius: '50%',
              position: 'absolute',
              left: `${50 + Math.cos(i * 2.1) * 60}%`,
              top: `${50 + Math.sin(i * 2.1) * 60}%`,
              transform: 'translate(-50%, -50%)',
              animation: `orbit ${3 / (strongForce + 0.1)}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        .particle-cluster {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .proton {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes vibrate {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}

export default function MatterSection({ 
  educatorMode, 
  cosmicTime = 0
}: { 
  educatorMode: boolean; 
  cosmicTime?: number;
}) {
  const [strongForce, setStrongForce] = useState(1)
  const [outcome, setOutcome] = useState('')

  useEffect(() => {
    const handleRandomize = () => {
      setStrongForce(Math.random() * 2)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Enhanced strong force calculations
    const protonStability = Math.exp(-Math.abs(strongForce - 1) * 2);
    const nucleosynthesisEfficiency = 1 / (1 + Math.pow(Math.abs(strongForce - 1) * 3, 2));
    const forceScore = protonStability * nucleosynthesisEfficiency;
    
    if (forceScore > 0.8) {
      setOutcome('✨ Perfect - stable nuclei and efficient fusion!')
    } else if (forceScore > 0.5) {
      setOutcome('🌟 Good - atoms form, some instability present')
    } else if (forceScore > 0.2) {
      setOutcome('⚠️ Marginal - unstable atoms, limited chemistry')
    } else if (strongForce < 0.5) {
      setOutcome('💥 Too weak - protons decay instantly, no atoms')
    } else if (strongForce > 1.5) {
      setOutcome('🔥 Too strong - runaway fusion, no hydrogen left')
    } else {
      setOutcome('❌ Poor - nuclear chaos, chemistry impossible')
    }
  }, [strongForce])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Formation of Matter</h2>
          <p className="text-xl text-gray-300">
            As the universe cools, quarks combine to form the first protons and neutrons
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Particle Visualization */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Nuclear Particle Formation</CardTitle>
              <CardDescription className="text-gray-300">
                Watch protons and neutrons form as you adjust the strong force
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ParticleField strongForce={strongForce} />
              
              {/* Outcome Display */}
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10">
                <h4 className="font-semibold mb-2 text-white">Nuclear Outcome:</h4>
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
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Strong Nuclear Force</CardTitle>
              <CardDescription className="text-gray-300">
                Controls how quarks bind together into protons and neutrons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={[strongForce]}
                    onValueChange={(value) => setStrongForce(value[0])}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  {/* Optimal range indicator - around 1.0 */}
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.8 - 0.1) / (2 - 0.1)) * 100}%`,
                         width: `${((1.2 - 0.8) / (2 - 0.1)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Too Weak</span>
                  <span className="text-green-400 font-bold">0.8-1.2 (optimal)</span>
                  <span className="text-white font-medium">{strongForce.toFixed(1)}</span>
                  <span>Too Strong</span>
                </div>
              </div>
              
              {/* Physics Metrics */}
              <div className="mt-6 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Proton Stability:</span>
                  <span className="text-white">{(Math.exp(-Math.abs(strongForce - 1) * 2) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fusion Efficiency:</span>
                  <span className="text-white">{((1 / (1 + Math.pow(Math.abs(strongForce - 1) * 3, 2))) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {educatorMode && (
          <div className="space-y-4 mt-8">
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300">Educational Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-200">
                  <p>• The strong force binds quarks into protons and neutrons</p>
                  <p>• If too weak, protons would decay and atoms couldn't exist</p>
                  <p>• If too strong, all matter would fuse into heavy elements</p>
                  <p>• The precise strength allows for stable hydrogen - fuel for stars</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-300">⚠️ The Matter Formation Mysteries</CardTitle>
                <CardDescription className="text-red-200">
                  Fundamental physics problems we still don't understand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-red-200">
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Strong Force Fine-Tuning:</p>
                    <p className="text-xs">If the strong nuclear force were just <strong>2% weaker</strong>, deuterium wouldn't form → no nuclear fusion → no elements beyond hydrogen. If <strong>2% stronger</strong>, all hydrogen would fuse immediately → no long-lived stars → no time for complexity.</p>
                  </div>
                  
                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Hierarchy Problem:</p>
                    <p className="text-xs">Why is gravity 10^36 times weaker than electromagnetism? Quantum corrections should make the Higgs mass ~10^19 times larger. This requires fine-tuning to <strong>1 part in 10^34</strong> - the most severe fine-tuning problem in physics.</p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">Matter-Antimatter Asymmetry:</p>
                    <p className="text-xs">Big Bang should have produced equal matter and antimatter → total annihilation. Yet we exist. The observed asymmetry is ~1 part in 10^10, but Standard Model predicts ~1 part in 10^18. <strong>We don't know why matter won.</strong></p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Proton Stability Problem:</p>
                    <p className="text-xs">Grand Unified Theories predict protons should decay with lifetime ~10^34 years. Experiments show {'>'}10^35 years. If protons decayed faster, no stable atoms. If much slower, different physics. <strong>We don't understand proton stability.</strong></p>
                  </div>

                  <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                    <p className="font-semibold text-red-100 mb-2">The Neutron-Proton Mass Difference:</p>
                    <p className="text-xs">Neutron is 0.14% heavier than proton. If reversed, or if difference were larger, nuclear physics changes drastically. This tiny difference (1.3 MeV) determines which elements can exist and stellar nucleosynthesis pathways.</p>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                    <p className="text-yellow-200 font-semibold mb-2">🔬 The Deeper Reality:</p>
                    <p className="text-xs text-yellow-100">
                      Unlike chemistry (which follows known quantum mechanics), fundamental particle physics involves <strong>at least 19 free parameters</strong> in the Standard Model with no theoretical explanation for their values. We can measure them precisely, but we don't know why they have the values that allow matter to exist. New physics beyond the Standard Model remains elusive despite decades of searching.
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
