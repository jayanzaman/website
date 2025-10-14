import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { motion, AnimatePresence } from 'framer-motion'

export default function LifeSection({ educatorMode }) {
  const [selectedMolecules, setSelectedMolecules] = useState([])
  const [energySource, setEnergySource] = useState('none')
  const [energyLevel, setEnergyLevel] = useState(5)
  const [lifeStage, setLifeStage] = useState('none')

  const molecules = [
    { id: 'h2o', name: 'Water (H₂O)', formula: 'H₂O', essential: true, color: 'blue' },
    { id: 'ch4', name: 'Methane (CH₄)', formula: 'CH₄', essential: false, color: 'orange' },
    { id: 'nh3', name: 'Ammonia (NH₃)', formula: 'NH₃', essential: false, color: 'green' },
    { id: 'amino', name: 'Amino Acids', formula: 'NH₂-CHR-COOH', essential: true, color: 'purple' },
    { id: 'nucleotide', name: 'Nucleotides', formula: 'Base-Sugar-Phosphate', essential: true, color: 'pink' },
    { id: 'lipid', name: 'Lipids', formula: 'Fatty Acids', essential: true, color: 'yellow' }
  ]

  const energySources = [
    { id: 'none', name: 'None', power: 0 },
    { id: 'sunlight', name: 'Sunlight', power: 8 },
    { id: 'lightning', name: 'Lightning', power: 6 },
    { id: 'geothermal', name: 'Geothermal Vents', power: 7 }
  ]

  useEffect(() => {
    const handleRandomize = () => {
      const randomMolecules = molecules.filter(() => Math.random() > 0.5).map(m => m.id)
      setSelectedMolecules(randomMolecules)
      const randomEnergy = energySources[Math.floor(Math.random() * energySources.length)].id
      setEnergySource(randomEnergy)
      setEnergyLevel(Math.random() * 10)
    }

    window.addEventListener('randomizeUniverse', handleRandomize)
    return () => window.removeEventListener('randomizeUniverse', handleRandomize)
  }, [])

  useEffect(() => {
    // Determine life stage based on molecules and energy
    const hasEssentials = selectedMolecules.includes('h2o') && 
                          selectedMolecules.includes('amino') && 
                          selectedMolecules.includes('nucleotide') &&
                          selectedMolecules.includes('lipid')
    
    const hasEnergy = energySource !== 'none' && energyLevel > 3

    if (!hasEssentials || !hasEnergy) {
      setLifeStage('none')
    } else if (selectedMolecules.length >= 4 && energyLevel > 6) {
      setLifeStage('cells')
    } else if (selectedMolecules.length >= 3 && energyLevel > 4) {
      setLifeStage('prebiotic')
    } else {
      setLifeStage('molecules')
    }
  }, [selectedMolecules, energySource, energyLevel])

  const toggleMolecule = (id) => {
    if (selectedMolecules.includes(id)) {
      setSelectedMolecules(selectedMolecules.filter(m => m !== id))
    } else {
      setSelectedMolecules([...selectedMolecules, id])
    }
  }

  const getLifeStageInfo = () => {
    switch (lifeStage) {
      case 'cells':
        return {
          title: 'Simple Cells Forming!',
          description: 'Self-replicating protocells with membrane boundaries',
          color: 'default',
          icon: '🦠'
        }
      case 'prebiotic':
        return {
          title: 'Prebiotic Soup',
          description: 'Complex organic molecules forming, but not yet alive',
          color: 'secondary',
          icon: '🧪'
        }
      case 'molecules':
        return {
          title: 'Simple Molecules',
          description: 'Basic building blocks present, need more complexity',
          color: 'secondary',
          icon: '⚛️'
        }
      default:
        return {
          title: 'No Life Chemistry',
          description: 'Missing essential ingredients or energy',
          color: 'destructive',
          icon: '❌'
        }
    }
  }

  const stageInfo = getLifeStageInfo()

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization */}
        <div className="relative">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Molecular Assembly</CardTitle>
              <CardDescription className="text-gray-400">
                Build the chemistry of life
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Molecule Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {molecules.map((molecule) => (
                  <button
                    key={molecule.id}
                    onClick={() => toggleMolecule(molecule.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMolecules.includes(molecule.id)
                        ? `bg-${molecule.color}-950/50 border-${molecule.color}-500/50 scale-105`
                        : 'bg-gray-900/30 border-gray-700/30 hover:border-gray-600/50'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{molecule.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{molecule.formula}</div>
                    {molecule.essential && (
                      <Badge variant="outline" className="mt-2 text-xs">Essential</Badge>
                    )}
                  </button>
                ))}
              </div>

              {/* Life Stage Display */}
              <div className="mt-6 p-6 bg-gradient-to-br from-green-950/30 to-blue-950/30 rounded-lg border border-green-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-3">{stageInfo.icon}</div>
                  <Badge variant={stageInfo.color} className="mb-2">
                    {stageInfo.title}
                  </Badge>
                  <p className="text-sm text-gray-300 mt-2">{stageInfo.description}</p>
                </div>
              </div>

              {/* Evolutionary Tree */}
              {lifeStage === 'cells' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-purple-950/30 rounded-lg border border-purple-500/20"
                >
                  <div className="text-sm font-semibold text-white mb-3">Evolutionary Potential</div>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Prokaryotes (bacteria, archaea)</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Eukaryotes (complex cells)</span>
                    </div>
                    <div className="flex items-center gap-2 ml-8">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Multicellular life</span>
                    </div>
                    <div className="flex items-center gap-2 ml-12">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Complex organisms</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Energy Sources</CardTitle>
              <CardDescription className="text-gray-400">
                Life requires energy to organize and replicate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Energy Source Selection */}
              <Tabs value={energySource} onValueChange={setEnergySource}>
                <TabsList className="grid w-full grid-cols-4">
                  {energySources.map((source) => (
                    <TabsTrigger key={source.id} value={source.id}>
                      {source.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Energy Level Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Energy Intensity</label>
                  <span className="text-xs text-green-400">
                    {energyLevel.toFixed(1)} / 10
                  </span>
                </div>
                <Slider
                  value={[energyLevel]}
                  onValueChange={(val) => setEnergyLevel(val[0])}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                  disabled={energySource === 'none'}
                />
                <p className="text-xs text-gray-500">
                  {energySource === 'none' 
                    ? 'Select an energy source first'
                    : 'Higher energy drives more complex chemistry'}
                </p>
              </div>

              {/* Energy Source Info */}
              {energySource !== 'none' && (
                <div className="p-3 bg-yellow-950/30 rounded-lg border border-yellow-500/20">
                  <div className="text-xs text-gray-300">
                    {energySource === 'sunlight' && (
                      <p>Photosynthesis pathway - most abundant but requires complex machinery</p>
                    )}
                    {energySource === 'lightning' && (
                      <p>Miller-Urey experiment showed lightning can synthesize amino acids from simple gases</p>
                    )}
                    {energySource === 'geothermal' && (
                      <p>Hydrothermal vents provide continuous energy and chemical gradients - likely origin of life</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Self-Organization */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Non-Equilibrium Thermodynamics</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-3">
              <p>
                Life is a <strong className="text-white">dissipative structure</strong> - it maintains order by increasing entropy in its surroundings.
              </p>
              <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-500/20">
                <div className="text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Local Entropy (Life)</span>
                    <span className="text-purple-400">↓ Decreasing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Global Entropy (Universe)</span>
                    <span className="text-orange-400">↑ Increasing</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                Life doesn't violate the Second Law - it exploits energy gradients to create temporary islands of order.
              </p>
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
                  <li>Abiogenesis: life arising from non-living matter</li>
                  <li>RNA World hypothesis: RNA preceded DNA and proteins</li>
                  <li>Hydrothermal vents as likely origin sites (alkaline vents)</li>
                  <li>Self-organization in far-from-equilibrium systems</li>
                  <li>LUCA (Last Universal Common Ancestor) ~3.5 billion years ago</li>
                </ul>
                <p className="text-xs text-gray-500 italic mt-3">
                  References: Lane (2015) "The Vital Question", Deamer (2019) "Assembling Life"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflection Card */}
          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Pause and Reflect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="italic">
                "Life is not a thing, but a process - a pattern of energy flow that maintains itself far from equilibrium. When did chemistry become biology?"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

