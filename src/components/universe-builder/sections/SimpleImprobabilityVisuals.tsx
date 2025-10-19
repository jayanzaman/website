'use client';

import { useEffect, useRef, useCallback } from 'react'

// Simple Penrose Entropy Visualization
export function SimplePenroseVisual({ entropy }: { entropy: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Make canvas responsive to container size
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    } else {
      canvas.width = 280
      canvas.height = 180
    }
    
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw phase space
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = 80
    
    // Calculate entropy regions
    const lowEntropyRadius = Math.max(3, maxRadius * (1 - entropy / 10))
    const highEntropyRadius = maxRadius
    
    // Draw high entropy region (vast)
    ctx.fillStyle = 'rgba(255, 100, 100, 0.4)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, highEntropyRadius, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw low entropy region (tiny)
    ctx.fillStyle = 'rgba(100, 255, 100, 0.9)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, lowEntropyRadius, 0, 2 * Math.PI)
    ctx.fill()
    
    // Add simple labels
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Chaos', centerX + 40, centerY - 30)
    ctx.fillText('Order', centerX - 30, centerY + 40)
    
  }, [entropy])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Dark Energy Visualization
export function SimpleDarkEnergyVisual({ lambda }: { lambda: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Make canvas responsive to container size
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    } else {
      canvas.width = 280
      canvas.height = 180
    }
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const centerY = canvas.height / 2
    const timeScale = canvas.width / 50
    
    // Draw universe evolution
    for (let t = 0; t < 50; t++) {
      const x = t * timeScale
      let scale
      
      if (lambda > 1.2) {
        // Too large - runaway expansion
        scale = Math.exp(lambda * t / 15)
      } else if (lambda < 0.8) {
        // Too small - collapse
        scale = Math.max(0.1, 1 - (1 - lambda) * t / 30)
      } else {
        // Just right - steady expansion
        scale = 1 + lambda * t / 60
      }
      
      const y = centerY - (scale - 1) * 30
      const color = lambda > 1.2 ? 'rgba(255, 100, 100, 0.8)' : 
                   lambda < 0.8 ? 'rgba(255, 150, 0, 0.8)' : 
                   'rgba(100, 255, 100, 0.8)'
      
      ctx.fillStyle = color
      ctx.fillRect(x, Math.max(0, y), 3, Math.min(canvas.height, centerY - y + 30))
    }
    
    // Simple labels
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Universe Size', 10, 15)
    ctx.fillText('Time →', canvas.width - 40, canvas.height - 5)
    
  }, [lambda])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Flatness Visualization
export function SimpleFlatnessVisual({ density }: { density: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Make canvas responsive to container size
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    } else {
      canvas.width = 280
      canvas.height = 180
    }
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Draw geometry based on density
    ctx.lineWidth = 3
    
    if (Math.abs(density - 1) < 0.05) {
      // Flat geometry
      ctx.strokeStyle = 'rgba(100, 255, 100, 0.8)'
      ctx.beginPath()
      ctx.moveTo(30, centerY)
      ctx.lineTo(canvas.width - 30, centerY)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '12px sans-serif'
      ctx.fillText('FLAT', centerX - 15, centerY - 10)
      
    } else if (density > 1) {
      // Closed geometry (sphere)
      const curvature = (density - 1) * 60
      ctx.strokeStyle = 'rgba(255, 150, 0, 0.8)'
      ctx.beginPath()
      ctx.arc(centerX, centerY + curvature, 60 - curvature/3, 0, Math.PI)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.fillText('CLOSED', centerX - 20, 25)
      
    } else {
      // Open geometry (hyperbolic)
      const curvature = (1 - density) * 60
      ctx.strokeStyle = 'rgba(255, 100, 100, 0.8)'
      ctx.beginPath()
      ctx.moveTo(30, centerY - curvature/2)
      ctx.quadraticCurveTo(centerX, centerY + curvature, canvas.width - 30, centerY - curvature/2)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.fillText('OPEN', centerX - 15, 25)
    }
    
  }, [density])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Horizon Visualization
export function SimpleHorizonVisual({ uniformity }: { uniformity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Make canvas responsive to container size
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    } else {
      canvas.width = 280
      canvas.height = 180
    }
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw CMB temperature map
    const gridSize = Math.max(8, Math.min(20, canvas.width / 20))
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const baseTemp = 2.725
        const variation = (Math.random() - 0.5) * (1 - uniformity) * 0.0002
        const temp = baseTemp + variation
        
        const intensity = Math.floor(255 * (temp - 2.7248) / 0.0004 + 128)
        const clampedIntensity = Math.max(0, Math.min(255, intensity))
        
        ctx.fillStyle = `rgb(${clampedIntensity}, ${clampedIntensity/2}, ${255 - clampedIntensity})`
        ctx.fillRect(x, y, gridSize, gridSize)
      }
    }
    
    // Simple label
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Temperature Map', 10, 15)
    
  }, [uniformity])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}
