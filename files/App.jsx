import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Info, RotateCcw, Shuffle, Play, Pause } from 'lucide-react'
import './App.css'

// Section Components
import BeginningSection from './components/BeginningSection'
import MatterSection from './components/MatterSection'
import StarlightSection from './components/StarlightSection'
import PlanetsSection from './components/PlanetsSection'
import LifeSection from './components/LifeSection'
import ComplexitySection from './components/ComplexitySection'
import ReflectiveSection from './components/ReflectiveSection'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [educatorMode, setEducatorMode] = useState(false)

  const sections = [
    { id: 0, title: 'The Beginning', subtitle: 'Low Entropy Start', component: BeginningSection },
    { id: 1, title: 'Formation of Matter', subtitle: 'Quarks to Atoms', component: MatterSection },
    { id: 2, title: 'Starlight & Heavy Elements', subtitle: 'First Stars', component: StarlightSection },
    { id: 3, title: 'Planets & Habitability', subtitle: 'Goldilocks Zone', component: PlanetsSection },
    { id: 4, title: 'Emergence of Life', subtitle: 'From Molecules to Cells', component: LifeSection },
    { id: 5, title: 'Complexity & Consciousness', subtitle: 'The Arrow of Time', component: ComplexitySection },
    { id: 6, title: 'The Reflective Cosmos', subtitle: 'We Are the Universe', component: ReflectiveSection }
  ]

  const CurrentSectionComponent = sections[currentSection].component

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleReset = () => {
    setCurrentSection(0)
    window.location.reload()
  }

  const handleRandomize = () => {
    // This will be handled by individual sections
    window.dispatchEvent(new CustomEvent('randomizeUniverse'))
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrevious()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Universe Builder
            </h1>
            <p className="text-xs text-gray-400">From Nothing to Now</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEducatorMode(!educatorMode)}
              className="bg-white/5 border-white/20 hover:bg-white/10"
            >
              {educatorMode ? 'Student Mode' : 'Educator Mode'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRandomize}
              className="bg-white/5 border-white/20 hover:bg-white/10"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="bg-white/5 border-white/20 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Section Navigation */}
      <nav className="fixed top-[90px] left-0 right-0 z-40 bg-black/30 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(idx)}
                className={`flex-shrink-0 px-4 py-2 text-xs transition-all ${
                  currentSection === idx
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <div className="font-semibold">{section.title}</div>
                <div className="text-[10px] opacity-70">{section.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[150px] pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentSectionComponent educatorMode={educatorMode} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          variant="outline"
          className="bg-black/50 backdrop-blur-md border-white/20 hover:bg-white/10 disabled:opacity-30"
        >
          Previous
        </Button>
        
        <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
          <span className="text-sm font-medium">
            {currentSection + 1} / {sections.length}
          </span>
        </div>

        <Button
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
          variant="outline"
          className="bg-black/50 backdrop-blur-md border-white/20 hover:bg-white/10 disabled:opacity-30"
        >
          Next
        </Button>
      </div>

      {/* Background Stars */}
      <div className="fixed inset-0 -z-10 opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
    </div>
  )
}

export default App

