import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { motion } from 'framer-motion'

export default function ComplexitySection({ educatorMode }) {
  const [entropyFlow, setEntropyFlow] = useState(7)
  const [timeElapsed, setTimeElapsed] = useState(5)

  useEffect(() => {
    const handleRandomize = () => {
      setEntropyFlow(Math.random() * 10)
      setTimeElapsed(Math.random() * 10)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  // Calculate complexity levels based on entropy flow
  const complexityLevels = [
    { 
      id: 'atoms',
      name: 'Atoms',
      minEntropy: 0,
      active: entropyFlow > 0,
      description: 'Protons, neutrons, electrons bound by electromagnetic force',
      icon: '⚛️',
      time: 0.1
    },
    { 
      id: 'molecules',
      name: 'Molecules',
      minEntropy: 2,
      active: entropyFlow > 2,
      description: 'Atoms bonded into stable compounds',
      icon: '🔬',
      time: 1
    },
    { 
      id: 'stars',
      name: 'Stars & Galaxies',
      minEntropy: 3,
      active: entropyFlow > 3,
      description: 'Gravitational structures that forge heavy elements',
      icon: '⭐',
      time: 2
    },
    { 
      id: 'planets',
      name: 'Planets',
      minEntropy: 4,
      active: entropyFlow > 4,
      description: 'Differentiated spheres with geology and atmospheres',
      icon: '🌍',
      time: 3
    },
    { 
      id: 'life',
      name: 'Life',
      minEntropy: 5,
      active: entropyFlow > 5,
      description: 'Self-replicating dissipative structures',
      icon: '🦠',
      time: 4
    },
    { 
      id: 'multicellular',
      name: 'Multicellular Organisms',
      minEntropy: 6,
      active: entropyFlow > 6,
      description: 'Coordinated cellular collectives',
      icon: '🌿',
      time: 5
    },
    { 
      id: 'nervous',
      name: 'Nervous Systems',
      minEntropy: 7,
      active: entropyFlow > 7,
      description: 'Information processing networks',
      icon: '🧠',
      time: 6
    },
    { 
      id: 'consciousness',
      name: 'Consciousness',
      minEntropy: 8,
      active: entropyFlow > 8,
      description: 'Self-aware information processing',
      icon: '💭',
      time: 7
    },
    { 
      id: 'civilization',
      name: 'Civilization',
      minEntropy: 9,
      active: entropyFlow > 9,
      description: 'Collective intelligence and culture',
      icon: '🏛️',
      time: 8
    }
  ]

  const activeComplexity = complexityLevels.filter(level => level.active && level.time <= timeElapsed)
  const maxComplexity = activeComplexity.length > 0 ? activeComplexity[activeComplexity.length - 1] : null

  const getOutcome = () => {
    if (entropyFlow < 2) return { text: 'Insufficient energy flow - universe remains simple', color: 'destructive' }
    if (entropyFlow > 9.5) return { text: 'Too much chaos - structures destroyed as fast as they form', color: 'destructive' }
    if (maxComplexity) {
      return { text: `Complexity reached: ${maxComplexity.name}`, color: 'default' }
    }
    return { text: 'Building complexity...', color: 'secondary' }
  }

  const outcome = getOutcome()

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">The Complexity Ladder</CardTitle>
              <CardDescription className="text-gray-400">
                From atoms to minds - the arrow of time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Complexity Tree */}
              <div className="space-y-3">
                {complexityLevels.map((level, index) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: level.active && level.time <= timeElapsed ? 1 : 0.3,
                      x: 0,
                      scale: level.active && level.time <= timeElapsed ? 1 : 0.95
                    }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      level.active && level.time <= timeElapsed
                        ? 'bg-gradient-to-r from-purple-950/50 to-pink-950/50 border-purple-500/50'
                        : 'bg-gray-900/30 border-gray-700/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{level.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{level.name}</span>
                          {level.active && level.time <= timeElapsed && (
                            <Badge variant="default" className="text-xs">Active</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{level.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Badge variant={outcome.color} className="w-full justify-center py-2">
                  {outcome.text}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Energy Gradients</CardTitle>
              <CardDescription className="text-gray-400">
                Complexity emerges from energy flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Entropy Flow Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Entropy Flow Rate</label>
                  <span className="text-xs text-purple-400">
                    {entropyFlow.toFixed(1)} / 10
                  </span>
                </div>
                <Slider
                  value={[entropyFlow]}
                  onValueChange={(val) => setEntropyFlow(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Energy gradients drive the emergence of complex structures
                </p>
              </div>

              {/* Time Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Time Elapsed</label>
                  <span className="text-xs text-purple-400">
                    {timeElapsed.toFixed(1)} billion years
                  </span>
                </div>
                <Slider
                  value={[timeElapsed]}
                  onValueChange={(val) => setTimeElapsed(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Complexity requires time to emerge
                </p>
              </div>

              {/* Energy Flow Visualization */}
              <div className="p-4 bg-gradient-to-b from-yellow-950/30 to-purple-950/30 rounded-lg border border-yellow-500/20">
                <div className="text-sm font-semibold text-white mb-3">Energy Flow Dynamics</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Energy Input (Sun)</span>
                    <span className="text-yellow-400">↓ {(entropyFlow * 10).toFixed(0)} W/m²</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${entropyFlow * 10}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Complexity Generation</span>
                    <span className="text-purple-400">↑ {activeComplexity.length} levels</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(activeComplexity.length / complexityLevels.length) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Waste Heat (Entropy)</span>
                    <span className="text-red-400">↑ {(entropyFlow * 15).toFixed(0)} W/m²</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-700"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(entropyFlow * 15, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Arrow of Time */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">The Arrow of Time</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-3">
              <p>
                Complexity is <strong className="text-white">not inevitable</strong> - it requires:
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  <span><strong>Energy gradients</strong> - difference between hot and cold, order and chaos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  <span><strong>Far-from-equilibrium conditions</strong> - stable flow, not static balance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  <span><strong>Time</strong> - for trial and error, selection, and accumulation</span>
                </li>
              </ul>
              
              <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/20 mt-4">
                <p className="text-xs text-red-300">
                  <strong>Warning:</strong> When energy flow stops (heat death of universe), all complexity collapses. Entropy wins in the end.
                </p>
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
                  <li>Entropy always increases globally (Second Law)</li>
                  <li>Local complexity can increase by exporting entropy</li>
                  <li>Ilya Prigogine's dissipative structures theory</li>
                  <li>Maximum entropy production principle (MEP)</li>
                  <li>Complexity as a measure of information content</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Prigogine (1984) "Order Out of Chaos", Chaisson (2001) "Cosmic Evolution", England (2013) "Statistical physics of self-replication"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "Complexity is the universe's way of spending its initial low-entropy gift. We are temporary eddies in an irreversible flow toward equilibrium. Does that make us less meaningful, or more precious?"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

