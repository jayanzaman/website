'use client';

import { useEffect, useRef, useCallback } from 'react'

// Simple Strong Force Visualization
export function SimpleStrongForceVisual({ strongForce }: { strongForce: number }) {
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
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Calculate force effects
    const bondStrength = Math.min(255, strongForce * 128)
    const stability = Math.exp(-Math.abs(strongForce - 1) * 2)
    const particleSize = Math.max(15, Math.min(40, 20 + strongForce * 10))
    
    // Draw quarks forming proton
    const quarkPositions = [
      { x: centerX - 15, y: centerY - 10 },
      { x: centerX + 15, y: centerY - 10 },
      { x: centerX, y: centerY + 15 }
    ]
    
    // Draw bonds between quarks
    ctx.strokeStyle = `rgba(255, ${Math.floor(bondStrength)}, 0, ${stability})`
    ctx.lineWidth = Math.max(1, strongForce * 3)
    ctx.beginPath()
    for (let i = 0; i < quarkPositions.length; i++) {
      const current = quarkPositions[i]
      const next = quarkPositions[(i + 1) % quarkPositions.length]
      ctx.moveTo(current.x, current.y)
      ctx.lineTo(next.x, next.y)
    }
    ctx.stroke()
    
    // Draw quarks
    quarkPositions.forEach((pos, i) => {
      const colors = ['rgba(255, 100, 100, 0.9)', 'rgba(100, 255, 100, 0.9)', 'rgba(100, 100, 255, 0.9)']
      ctx.fillStyle = colors[i]
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, particleSize / 3, 0, 2 * Math.PI)
      ctx.fill()
    })
    
    // Draw resulting proton
    ctx.fillStyle = `rgba(255, ${Math.floor(bondStrength)}, ${Math.floor(bondStrength * 0.5)}, ${0.6 + stability * 0.4})`
    ctx.beginPath()
    ctx.arc(centerX, centerY, particleSize, 0, 2 * Math.PI)
    ctx.fill()
    
    // Add labels
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Quarks', centerX - 20, centerY - 35)
    ctx.fillText('→ Proton', centerX - 25, centerY + 60)
    
  }, [strongForce])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Hierarchy Problem Visualization
export function SimpleHierarchyVisual({ massScale }: { massScale: number }) {
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
    const baseY = canvas.height - 30
    
    // Draw mass hierarchy bars
    const forces = [
      { name: 'Gravity', strength: 1, color: 'rgba(100, 100, 255, 0.8)' },
      { name: 'Weak', strength: massScale * 10, color: 'rgba(255, 255, 100, 0.8)' },
      { name: 'EM', strength: massScale * 100, color: 'rgba(255, 100, 255, 0.8)' },
      { name: 'Strong', strength: massScale * 120, color: 'rgba(255, 100, 100, 0.8)' }
    ]
    
    const barWidth = Math.max(20, canvas.width / 6)
    const maxHeight = canvas.height - 60
    
    forces.forEach((force, i) => {
      const x = centerX - (forces.length * barWidth) / 2 + i * barWidth + barWidth / 4
      const height = Math.min(maxHeight, (force.strength / 120) * maxHeight * massScale)
      
      ctx.fillStyle = force.color
      ctx.fillRect(x, baseY - height, barWidth / 2, height)
      
      // Labels
      ctx.fillStyle = '#fff'
      ctx.font = '8px sans-serif'
      ctx.fillText(force.name, x - 5, baseY + 15)
    })
    
    // Title
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Force Strengths', centerX - 35, 20)
    
  }, [massScale])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Matter-Antimatter Visualization
export function SimpleMatterAntimatterVisual({ asymmetry }: { asymmetry: number }) {
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
    
    // Calculate particle counts
    const totalParticles = 20
    const matterCount = Math.round(totalParticles * (0.5 + asymmetry / 2))
    const antimatterCount = totalParticles - matterCount
    
    // Draw matter particles (blue)
    for (let i = 0; i < matterCount; i++) {
      const angle = (i / matterCount) * Math.PI * 2
      const radius = 40 + Math.random() * 20
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.fillStyle = 'rgba(100, 150, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }
    
    // Draw antimatter particles (red)
    for (let i = 0; i < antimatterCount; i++) {
      const angle = (i / antimatterCount) * Math.PI * 2 + Math.PI
      const radius = 40 + Math.random() * 20
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.fillStyle = 'rgba(255, 100, 100, 0.8)'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }
    
    // Labels
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Matter', centerX - 60, centerY - 70)
    ctx.fillText('Antimatter', centerX + 20, centerY + 80)
    ctx.fillText(`Ratio: ${matterCount}:${antimatterCount}`, centerX - 40, centerY + 100)
    
  }, [asymmetry])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}

// Simple Proton Stability Visualization
export function SimpleProtonStabilityVisual({ lifetime }: { lifetime: number }) {
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
    
    // Draw proton
    const stability = Math.min(1, lifetime / 35)
    const protonSize = 20 + stability * 15
    
    ctx.fillStyle = `rgba(255, 200, 100, ${0.5 + stability * 0.5})`
    ctx.beginPath()
    ctx.arc(centerX, centerY, protonSize, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw decay products if unstable
    if (lifetime < 30) {
      const decayParticles = 3
      for (let i = 0; i < decayParticles; i++) {
        const angle = (i / decayParticles) * Math.PI * 2
        const distance = 40 + (30 - lifetime) * 2
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance
        
        ctx.fillStyle = 'rgba(255, 100, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
    
    // Labels
    ctx.fillStyle = '#fff'
    ctx.font = '10px sans-serif'
    ctx.fillText('Proton', centerX - 20, centerY - 40)
    ctx.fillText(`${lifetime.toFixed(0)} years`, centerX - 30, centerY + 50)
    
  }, [lifetime])
  
  return <canvas ref={canvasRef} className="w-full h-full border border-white/10 rounded" />
}
