'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { SimpleStrongForceVisual, SimpleHierarchyVisual, SimpleMatterAntimatterVisual, SimpleProtonStabilityVisual } from './SimpleMatterVisuals'

// Particle Visualization Component
function ParticleField({ strongForce }: { strongForce: number }) {
  const protonStability = Math.exp(-Math.abs(strongForce - 1) * 2);
  const nucleosynthesisEfficiency = 1 / (1 + Math.pow(Math.abs(strongForce - 1) * 3, 2));
  
  const particleSize = 100 + (strongForce * 50);
  const bondStrength = Math.min(255, strongForce * 128);
  const vibrationSpeed = Math.abs(strongForce - 1) * 5;
  const stability = protonStability * 100;

  return (
    <div className="relative w-full h-64 overflow-hidden bg-black/20 rounded-lg">
      <div 
        className="particle-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
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
        .particle-container {
          position: relative;
        }
        .proton {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: vibrate ${Math.max(0.5, 2 - vibrationSpeed)}s ease-in-out infinite;
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
  
  // Additional fine-tuning parameters
  const [hierarchyScale, setHierarchyScale] = useState(1)
  const [matterAsymmetry, setMatterAsymmetry] = useState(0.1)
  const [protonLifetime, setProtonLifetime] = useState(35)

  useEffect(() => {
    const handleRandomize = () => {
      setStrongForce(Math.random() * 2)
      setHierarchyScale(0.5 + Math.random() * 1.5)
      setMatterAsymmetry(Math.random() * 0.2)
      setProtonLifetime(30 + Math.random() * 10)
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

        {/* Four Core Matter Formation Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Quark Binding Force */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quark Binding Force</CardTitle>
              <CardDescription className="text-gray-300">
                How tightly are the pieces of protons held together?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ParticleField strongForce={strongForce} />
              <div className="relative mt-4">
                <Slider
                  value={[strongForce]}
                  onValueChange={(value) => setStrongForce(value[0])}
                  max={2}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                     style={{
                       left: `${((0.8 - 0.1) / (2 - 0.1)) * 100}%`,
                       width: `${((1.2 - 0.8) / (2 - 0.1)) * 100}%`
                     }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-4">
                <span>Too Weak</span>
                <span className="text-green-400 font-bold">0.8-1.2 αs (optimal)</span>
                <span className="text-white font-medium">{strongForce.toFixed(2)} αs</span>
                <span>Too Strong</span>
              </div>
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
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Proton Stability:</span>
                  <span className="text-white">{(Math.exp(-Math.abs(strongForce - 1) * 2) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fusion Efficiency:</span>
                  <span className="text-white">{((1 / (1 + Math.pow(Math.abs(strongForce - 1) * 3, 2))) * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What holds protons together?</strong> Protons are made of smaller pieces called quarks, held together by the strong force. It's like having three marbles glued together - the "glue" is the strong force.</p>
                    <p><strong>What if the glue is too weak?</strong> If the strong force were just 2% weaker, protons would fall apart instantly. No protons means no atoms, no chemistry, no life. Everything would just be a soup of loose quarks.</p>
                    <p><strong>What if the glue is too strong?</strong> If the strong force were 2% stronger, protons would stick to each other so tightly that no hydrogen could exist. All matter would immediately fuse into heavy elements, and stars couldn't form or shine.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mass Hierarchy */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Mass Hierarchy</CardTitle>
              <CardDescription className="text-gray-300">
                Why are fundamental forces so different in strength?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                  <SimpleHierarchyVisual massScale={hierarchyScale} />
                </div>
                <div className="relative">
                  <Slider
                    value={[hierarchyScale]}
                    onValueChange={(value) => setHierarchyScale(value[0])}
                    max={2}
                    min={0.5}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.9 - 0.5) / (2 - 0.5)) * 100}%`,
                         width: `${((1.1 - 0.9) / (2 - 0.5)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Collapsed</span>
                  <span className="text-green-400 font-bold">0.9-1.1 (optimal)</span>
                  <span className="text-white font-medium">{hierarchyScale.toFixed(2)}</span>
                  <span>Runaway</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What's the hierarchy problem?</strong> Imagine you have four friends of different heights. One is 1 foot tall, another is 10 feet, the third is 100 feet, and the fourth is 1,000 feet tall. That's like the difference between gravity and the other forces - it's incredibly weak compared to everything else.</p>
                    <p><strong>Why is this weird?</strong> According to our best theories, quantum effects should make all forces roughly the same strength. It's like having a recipe that should make four identical cakes, but one comes out the size of a crumb while the others are normal-sized.</p>
                    <p><strong>How precise does it need to be?</strong> The mass of particles needs to be fine-tuned to 1 part in 10^34. That's like balancing the entire Earth on the tip of a needle and having it stay perfectly stable.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Matter vs Antimatter */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Matter vs Antimatter</CardTitle>
              <CardDescription className="text-gray-300">
                Why does matter exist instead of nothing?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                  <SimpleMatterAntimatterVisual asymmetry={matterAsymmetry} />
                </div>
                <div className="relative">
                  <Slider
                    value={[matterAsymmetry]}
                    onValueChange={(value) => setMatterAsymmetry(value[0])}
                    max={0.2}
                    min={0}
                    step={0.001}
                    className="w-full"
                  />
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((0.08 - 0) / (0.2 - 0)) * 100}%`,
                         width: `${((0.12 - 0.08) / (0.2 - 0)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Equal (Nothing)</span>
                  <span className="text-green-400 font-bold">8-12% excess (optimal)</span>
                  <span className="text-white font-medium">{(matterAsymmetry * 100).toFixed(1)}%</span>
                  <span>Too Much</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What should have happened?</strong> The Big Bang should have created equal amounts of matter and antimatter - like having equal numbers of left and right shoes. When matter and antimatter meet, they completely destroy each other, leaving only energy.</p>
                    <p><strong>Why do we exist?</strong> Somehow, there was a tiny excess of matter - about 1 extra matter particle for every billion matter-antimatter pairs. After all the annihilation, this tiny leftover became everything we see: stars, planets, and us.</p>
                    <p><strong>How mysterious is this?</strong> Our best theories predict the wrong amount of leftover matter by a factor of 100 million. It's like predicting someone will be 6 feet tall, but they turn out to be 600 million feet tall. We literally don't know why we exist instead of nothing.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proton Stability */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Proton Stability</CardTitle>
              <CardDescription className="text-gray-300">
                How long do the building blocks of atoms last?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 bg-black/30 rounded-lg overflow-hidden">
                  <SimpleProtonStabilityVisual lifetime={protonLifetime} />
                </div>
                <div className="relative">
                  <Slider
                    value={[protonLifetime]}
                    onValueChange={(value) => setProtonLifetime(value[0])}
                    max={40}
                    min={30}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((34 - 30) / (40 - 30)) * 100}%`,
                         width: `${((36 - 34) / (40 - 30)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Unstable</span>
                  <span className="text-green-400 font-bold">10^34-10^36 years (optimal)</span>
                  <span className="text-white font-medium">10^{protonLifetime.toFixed(0)} years</span>
                  <span>Too Stable</span>
                </div>
              </div>
              
              {educatorMode && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-xs text-red-200 space-y-2">
                    <p><strong>What's a proton?</strong> Protons are like the cores of atoms - every hydrogen atom has one proton, and they're in the center of every other atom too. They're the basic building blocks that make up you, me, and everything we see.</p>
                    <p><strong>Do protons last forever?</strong> We used to think so, but our theories suggest they should eventually fall apart. The question is: how long do they last? If they decay too quickly, atoms would fall apart and nothing stable could exist.</p>
                    <p><strong>How long is long enough?</strong> Protons need to last at least 10^34 years for life to be possible. That's a trillion trillion trillion times longer than the universe has existed! We've been watching protons for decades and haven't seen one decay yet - they're incredibly stable.</p>
                  </div>
                </div>
              )}
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
                <div className="space-y-3 text-sm text-blue-200">
                  <div>
                    <p className="font-semibold text-blue-100 mb-1">Four Core Matter Formation Concepts:</p>
                    <p>• <strong>Quark Binding Force:</strong> ParticleField shows proton formation with orbiting neutrons</p>
                    <p>• <strong>Mass Hierarchy:</strong> Bar chart displays relative strengths of fundamental forces</p>
                    <p>• <strong>Matter vs Antimatter:</strong> Particle visualization shows matter/antimatter distribution</p>
                    <p>• <strong>Proton Stability:</strong> Decay timeline shows proton lifetime scenarios</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-blue-100 mb-1">Fine-Tuning Requirements:</p>
                    <p>• <strong>Strong Force (αs):</strong> Must be within 0.8-1.2 range - 2% precision for stable protons</p>
                    <p>• <strong>Mass Hierarchy:</strong> Forces differ by 10^40 - requires 1 part in 10^34 fine-tuning</p>
                    <p>• <strong>Matter Asymmetry:</strong> Need 8-12% matter excess - theory off by factor of 100 million</p>
                    <p>• <strong>Proton Lifetime:</strong> Must exceed 10^34 years - trillion trillion times universe age</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-blue-100 mb-1">Key Physics Problems:</p>
                    <p>• <strong>Strong Force Precision:</strong> 2% weaker = no protons, 2% stronger = no hydrogen</p>
                    <p>• <strong>Hierarchy Mystery:</strong> Why is gravity 10^40 times weaker than other forces?</p>
                    <p>• <strong>Existence Puzzle:</strong> Why does anything exist instead of nothing?</p>
                    <p>• <strong>Stability Requirement:</strong> Building blocks must last longer than stellar evolution</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-blue-100 mb-1">Interactive Learning:</p>
                    <p>• Each visualization responds immediately to parameter changes</p>
                    <p>• Green optimal ranges show narrow "Goldilocks zones" for each parameter</p>
                    <p>• Educator mode provides contextual explanations with everyday analogies</p>
                    <p>• Scientific units (αs, %, 10^X years) connect to real physics research</p>
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
