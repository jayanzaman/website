'use client';

import { useState, useEffect, useRef } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info, Play, Pause, RotateCcw } from 'lucide-react'

// Penrose Entropy Visualization
function PenroseEntropyVisual({ entropy }: { entropy: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 400
    canvas.height = 300
    
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw phase space
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = 120
    
    // Calculate entropy regions
    const lowEntropyRadius = maxRadius * (1 - entropy / 10)
    const highEntropyRadius = maxRadius
    
    // Draw high entropy region (vast)
    ctx.fillStyle = 'rgba(255, 100, 100, 0.3)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, highEntropyRadius, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw low entropy region (tiny)
    ctx.fillStyle = 'rgba(100, 255, 100, 0.8)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, Math.max(2, lowEntropyRadius), 0, 2 * Math.PI)
    ctx.fill()
    
    // Add labels
    ctx.fillStyle = '#fff'
    ctx.font = '12px sans-serif'
    ctx.fillText('High Entropy', centerX + 60, centerY - 60)
    ctx.fillText('(Thermal Death)', centerX + 60, centerY - 45)
    ctx.fillText('Low Entropy', centerX - 80, centerY + 80)
    ctx.fillText('(Our Universe)', centerX - 80, centerY + 95)
    
    // Show probability ratio
    const ratio = Math.pow(10, -Math.pow(10, 123 * entropy / 10))
    ctx.fillText(`Probability: ~10^(-10^${(123 * entropy / 10).toFixed(0)})`, 10, 20)
    
  }, [entropy])
  
  return <canvas ref={canvasRef} className="w-full h-auto border border-white/20 rounded" />
}

// Cosmological Constant Visualization
function CosmologicalConstantVisual({ lambda }: { lambda: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 400
    canvas.height = 300
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const centerY = canvas.height / 2
    const timeScale = canvas.width / 100
    
    // Draw universe evolution
    for (let t = 0; t < 100; t++) {
      const x = t * timeScale
      let scale
      
      if (lambda > 1.2) {
        // Too large - runaway expansion
        scale = Math.exp(lambda * t / 20)
      } else if (lambda < 0.8) {
        // Too small - collapse
        scale = Math.max(0.1, 1 - (1 - lambda) * t / 50)
      } else {
        // Just right - steady expansion
        scale = 1 + lambda * t / 100
      }
      
      const y = centerY - (scale - 1) * 50
      const color = lambda > 1.2 ? 'rgba(255, 100, 100, 0.8)' : 
                   lambda < 0.8 ? 'rgba(255, 150, 0, 0.8)' : 
                   'rgba(100, 255, 100, 0.8)'
      
      ctx.fillStyle = color
      ctx.fillRect(x, Math.max(0, y), 2, Math.min(canvas.height, centerY - y + 50))
    }
    
    // Labels
    ctx.fillStyle = '#fff'
    ctx.font = '12px sans-serif'
    ctx.fillText('Universe Scale Factor', 10, 20)
    ctx.fillText('Time →', canvas.width - 60, canvas.height - 10)
    
  }, [lambda])
  
  return <canvas ref={canvasRef} className="w-full h-auto border border-white/20 rounded" />
}

// Flatness Problem Visualization
function FlatnessVisual({ density }: { density: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 400
    canvas.height = 300
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Draw geometry based on density
    if (Math.abs(density - 1) < 0.01) {
      // Flat geometry
      ctx.strokeStyle = 'rgba(100, 255, 100, 0.8)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(50, centerY)
      ctx.lineTo(canvas.width - 50, centerY)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '16px sans-serif'
      ctx.fillText('FLAT UNIVERSE', centerX - 60, centerY - 20)
      ctx.font = '12px sans-serif'
      ctx.fillText('Critical Density = 1.0', centerX - 70, centerY + 40)
      
    } else if (density > 1) {
      // Closed geometry (sphere)
      const curvature = (density - 1) * 100
      ctx.strokeStyle = 'rgba(255, 150, 0, 0.8)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY + curvature, 100 - curvature/2, 0, Math.PI)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '14px sans-serif'
      ctx.fillText('CLOSED UNIVERSE', centerX - 70, 30)
      ctx.font = '12px sans-serif'
      ctx.fillText('Will collapse!', centerX - 40, 50)
      
    } else {
      // Open geometry (hyperbolic)
      const curvature = (1 - density) * 100
      ctx.strokeStyle = 'rgba(255, 100, 100, 0.8)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(50, centerY - curvature)
      ctx.quadraticCurveTo(centerX, centerY + curvature, canvas.width - 50, centerY - curvature)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '14px sans-serif'
      ctx.fillText('OPEN UNIVERSE', centerX - 65, 30)
      ctx.font = '12px sans-serif'
      ctx.fillText('Expands forever', centerX - 50, 50)
    }
    
  }, [density])
  
  return <canvas ref={canvasRef} className="w-full h-auto border border-white/20 rounded" />
}

// Horizon Problem Visualization
function HorizonVisual({ uniformity }: { uniformity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 400
    canvas.height = 300
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw CMB temperature map
    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const baseTemp = 2.725 // Kelvin
        const variation = (Math.random() - 0.5) * (1 - uniformity) * 0.0001
        const temp = baseTemp + variation
        
        const intensity = Math.floor(255 * (temp - 2.7249) / 0.0002 + 128)
        const clampedIntensity = Math.max(0, Math.min(255, intensity))
        
        ctx.fillStyle = `rgb(${clampedIntensity}, ${clampedIntensity/2}, ${255 - clampedIntensity})`
        ctx.fillRect(x, y, gridSize, gridSize)
      }
    }
    
    // Draw causal horizons
    if (uniformity < 0.5) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(100 + i * 100, 150, 60, 0, 2 * Math.PI)
        ctx.stroke()
      }
      
      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.fillText('Causal horizons', 10, 20)
      ctx.fillText('(should be different)', 10, 35)
    }
    
  }, [uniformity])
  
  return <canvas ref={canvasRef} className="w-full h-auto border border-white/20 rounded" />
}

export default function ImprobabilityCascadeVisuals() {
  const [activeTab, setActiveTab] = useState('penrose')
  const [entropy, setEntropy] = useState(1)
  const [lambda, setLambda] = useState(1)
  const [density, setDensity] = useState(1)
  const [uniformity, setUniformity] = useState(0.99999)
  
  return (
    <Card className="bg-red-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-red-300">🔬 The Universe's Impossible Coincidences</CardTitle>
        <CardDescription className="text-red-200">
          Explore why our universe seems impossibly fine-tuned for life. Each tab shows a different "cosmic coincidence" that had to be just right for anything to exist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="penrose">Order vs Chaos</TabsTrigger>
            <TabsTrigger value="lambda">Dark Energy</TabsTrigger>
            <TabsTrigger value="flatness">Universe Shape</TabsTrigger>
            <TabsTrigger value="horizon">Temperature</TabsTrigger>
          </TabsList>
          
          <TabsContent value="penrose" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-100 mb-2">Why Did the Universe Start So Organized?</h4>
                <PenroseEntropyVisual entropy={entropy} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-red-200">How Organized vs Chaotic</label>
                  <Slider
                    value={[entropy]}
                    onValueChange={(v) => setEntropy(v[0])}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Current: {entropy.toFixed(1)} | Probability: 10^(-10^{(123 * entropy / 10).toFixed(0)})
                  </div>
                </div>
                <div className="text-xs text-red-200 space-y-2">
                  <p><strong>What's the problem?</strong> Imagine you have a perfectly organized deck of cards. There's only one way to arrange it perfectly, but millions of ways to shuffle it into chaos. The universe started perfectly organized (low entropy) instead of chaotic (high entropy).</p>
                  <p><strong>Why is this weird?</strong> It's like throwing a deck of cards in the air and having them land in perfect order every single time. The odds are so small they're basically impossible.</p>
                  <p><strong>How impossible?</strong> The chance is 1 in 10^(10^123). To put this in perspective: if you wrote one zero per atom in the entire observable universe, you still couldn't write this number down. It's that impossibly small.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lambda" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-100 mb-2">Why Is Dark Energy So Perfectly Balanced?</h4>
                <CosmologicalConstantVisual lambda={lambda} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-red-200">Dark Energy Strength</label>
                  <Slider
                    value={[lambda]}
                    onValueChange={(v) => setLambda(v[0])}
                    max={2}
                    min={0}
                    step={0.01}
                    className="mt-2"
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Current: {lambda.toFixed(3)} | Status: {
                      lambda > 1.2 ? 'Runaway expansion' :
                      lambda < 0.8 ? 'Universe collapses' :
                      'Goldilocks zone'
                    }
                  </div>
                </div>
                <div className="text-xs text-red-200 space-y-2">
                  <p><strong>What's dark energy?</strong> Think of it as an invisible force that pushes everything in the universe apart. It's like having tiny springs between every piece of matter, constantly pushing outward.</p>
                  <p><strong>What did scientists try to calculate?</strong> They wanted to figure out how strong this pushing force should be. Using quantum physics (the rules that govern tiny particles), they calculated how much energy empty space itself should contain - because even "empty" space isn't truly empty.</p>
                  <p><strong>How do we know what the real answer is?</strong> We can actually measure dark energy's strength by watching how fast the universe is expanding. We use telescopes to observe distant galaxies and see how quickly they're moving away from us.</p>
                  <p><strong>What's the problem?</strong> When scientists compared their calculation to what we actually observe, they were off by a factor of 1 followed by 120 zeros! That's like predicting someone weighs 1 pound but they actually weigh less than a single atom.</p>
                  <p><strong>Could the scientists just be wrong?</strong> That's possible, but this calculation has been checked thousands of times by different teams using different methods. The math seems solid, which makes this one of the biggest unsolved mysteries in physics.</p>
                  <p><strong>Why does it matter?</strong> If dark energy were even slightly stronger than what we observe, the universe would expand so fast that atoms couldn't stick together. If it were weaker, gravity would crush everything into black holes before stars could form.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="flatness" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-100 mb-2">Why Is the Universe Perfectly Flat?</h4>
                <FlatnessVisual density={density} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-red-200">Amount of Matter in Space</label>
                  <Slider
                    value={[density]}
                    onValueChange={(v) => setDensity(v[0])}
                    max={1.5}
                    min={0.5}
                    step={0.001}
                    className="mt-2"
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Current: {density.toFixed(3)} | Geometry: {
                      Math.abs(density - 1) < 0.01 ? 'Flat (stable)' :
                      density > 1 ? 'Closed (will collapse)' :
                      'Open (accelerating expansion)'
                    }
                  </div>
                </div>
                <div className="text-xs text-red-200 space-y-2">
                  <p><strong>What determines the universe's shape?</strong> The amount of matter and energy in space. Think of it like a stretched rubber sheet - too much weight makes it curve inward, too little keeps it flat, and way too little makes it curve outward.</p>
                  <p><strong>Why is "flat" special?</strong> A flat universe expands at just the right speed. If it curved inward (too much matter), gravity would pull everything back together in a "Big Crunch." If it curved outward (too little matter), it would expand so fast that nothing could ever come together to form stars or galaxies.</p>
                  <p><strong>How precise does it need to be?</strong> At the very beginning of time, the density had to be exactly right to 1 part in 10^60. That's like throwing a dart at a dartboard the size of North America and hitting a target smaller than an atom.</p>
                  <p><strong>What if it was wrong?</strong> Even the tiniest error would mean the universe either collapsed in less than a second or expanded so fast that atoms could never form.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="horizon" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-100 mb-2">Why Is the Universe the Same Temperature Everywhere?</h4>
                <HorizonVisual uniformity={uniformity} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-red-200">Temperature Uniformity</label>
                  <Slider
                    value={[uniformity]}
                    onValueChange={(v) => setUniformity(v[0])}
                    max={1}
                    min={0.9}
                    step={0.00001}
                    className="mt-2"
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Current: {(uniformity * 100).toFixed(5)}% | Variation: {((1-uniformity) * 100000).toFixed(1)} parts per 100,000
                  </div>
                </div>
                <div className="text-xs text-red-200 space-y-2">
                  <p><strong>What's the cosmic microwave background?</strong> It's the leftover heat from the Big Bang, like the warm glow from a campfire after the flames die out. We can see this ancient light coming from every direction in space.</p>
                  <p><strong>What's weird about it?</strong> This ancient light has almost exactly the same temperature everywhere we look - 2.725 degrees above absolute zero. It varies by only about 1 part in 100,000, which is incredibly uniform.</p>
                  <p><strong>Why is this a problem?</strong> Imagine two people on opposite sides of Earth trying to coordinate their watches without any way to communicate. That's what happened in the early universe - regions of space that are now on opposite sides of the sky were never close enough to "talk" to each other and agree on the same temperature.</p>
                  <p><strong>How uniform is it really?</strong> It's like having two ovens on opposite sides of the world, never connected, but both maintaining exactly the same temperature to within a fraction of a degree for billions of years.</p>
                  <p><strong>Possible explanations:</strong> Either the universe went through a period of super-fast expansion (inflation) that stretched connected regions apart, or the initial conditions were set up with impossible precision from the very beginning.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
