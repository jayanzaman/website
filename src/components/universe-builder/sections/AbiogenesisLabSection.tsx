'use client';

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

// Types and Interfaces
interface SimulationState {
  stage: number; // 0-6
  aminoAcidYield: number;
  peptideCount: number;
  meanPeptideLength: number;
  vesicleCount: number;
  encapsulationRate: number;
  templateStrands: number;
  meanStrandLength: number;
  rnaStrands: number;
  rnaLength: number;
  dnaStrands: number;
  dnaLength: number;
  perBaseAccuracy: number;     // p (0-1)
  strandFidelity: number;      // p^L (display only)
  passesEigen: boolean;        // above Eigen threshold
  lifePotential: number;
}

interface EnvironmentalControls {
  energyInputs: {
    uv: number;
    lightning: number;
    hydrothermal: number;
    dryWetCycling: number;
  };
  chemistryRichness: number;
  waterActivity: number;
  ph: number;
  temperature: number;
  mineralCatalysis: boolean;
  timeScale: number;
}

// Simulation Canvas Component
const SimulationCanvas: React.FC<{ state: SimulationState; controls: EnvironmentalControls }> = ({ state, controls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the simulation
    drawSimulation(ctx, state, controls);
  }, [state, controls]);

  return (
    <canvas ref={canvasRef} width={800} height={600} />
  );
};


  const getComplement = (base: string, mode: string): string => {
    const complements: { [key: string]: string } = {
      'A': mode === 'RNA' ? 'U' : 'T',
      'T': 'A',
      'U': 'A',
      'C': 'G',
      'G': 'C'
    };
    return complements[base] || base;
  };

  const drawSimulation = (ctx: CanvasRenderingContext2D, state: SimulationState, controls: EnvironmentalControls) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw stage progression zones
    const stageWidth = width / 7;
    const stageHeight = height - 40;
    
    // Stage labels and zones
    const stages = [
      { name: 'Simple\nMolecules', color: '#6b7280', active: state.stage >= 0 },
      { name: 'Amino\nAcids', color: '#10b981', active: state.stage >= 1 },
      { name: 'Peptide\nChains', color: '#f59e0b', active: state.stage >= 2 },
      { name: 'Proto-\ncells', color: '#8b5cf6', active: state.stage >= 3 },
      { name: 'Simple\nTemplates', color: '#ec4899', active: state.stage >= 4 },
      { name: 'RNA\nWorld', color: '#06b6d4', active: state.stage >= 5 },
      { name: 'DNA\nGenomes', color: '#dc2626', active: state.stage >= 6 }
    ];
    
    // Draw stage zones and transitions
    for (let i = 0; i < stages.length; i++) {
      const x = i * stageWidth;
      const stage = stages[i];
      
      // Draw zone background
      ctx.fillStyle = stage.active ? `${stage.color}20` : '#1a1a1a';
      ctx.fillRect(x, 20, stageWidth, stageHeight);
      
      // Draw zone border
      ctx.strokeStyle = stage.active ? stage.color : '#333';
      ctx.lineWidth = stage.active ? 3 : 1;
      ctx.strokeRect(x, 20, stageWidth, stageHeight);
      
      // Draw stage label
      ctx.fillStyle = stage.active ? stage.color : '#666';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      const lines = stage.name.split('\n');
      lines.forEach((line: string, lineIndex: number) => {
        ctx.fillText(line, x + stageWidth/2, 40 + lineIndex * 15);
      });
      
      // Draw transition arrows
      if (i < stages.length - 1 && stage.active) {
        const arrowX = x + stageWidth - 10;
        const arrowY = height/2;
        ctx.fillStyle = stage.color;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX + 15, arrowY - 8);
        ctx.lineTo(arrowX + 15, arrowY + 8);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Draw stage-specific content
    ctx.textAlign = 'left';
    
    // Stage 0: Simple molecules
    if (state.stage >= 0) {
      const x = 0 * stageWidth + 10;
      const y = 80;
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px monospace';
      const molecules = ['H₂O', 'CO₂', 'NH₃', 'CH₄', 'H₂S'];
      molecules.forEach((mol, i) => {
        ctx.fillText(mol, x + (i % 3) * 25, y + Math.floor(i / 3) * 20);
      });
      
      // Show yield
      ctx.fillStyle = '#888';
      ctx.font = '9px sans-serif';
      ctx.fillText(`Precursors: ${state.aminoAcidYield.toFixed(1)} ppm`, x, y + 60);
    }
    
    // Stage 1: Amino acids
    if (state.stage >= 1) {
      const x = 1 * stageWidth + 10;
      const y = 80;
      ctx.fillStyle = '#10b981';
      ctx.font = '10px monospace';
      const aminoAcids = ['Gly', 'Ala', 'Val', 'Asp', 'Glu', 'Ser'];
      aminoAcids.forEach((aa, i) => {
        const opacity = Math.min(1, state.aminoAcidYield / 5);
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.fillText(aa, x + (i % 3) * 25, y + Math.floor(i / 3) * 20);
      });
      
      ctx.fillStyle = '#10b981';
      ctx.font = '9px sans-serif';
      ctx.fillText(`Yield: ${state.aminoAcidYield.toFixed(1)} ppm`, x, y + 60);
    }
    
    // Stage 2: Peptides
    if (state.stage >= 2) {
      const x = 2 * stageWidth + 10;
      const y = 80;
      
      // Draw peptide chains
      const chainCount = Math.min(5, Math.floor(state.peptideCount / 20));
      for (let i = 0; i < chainCount; i++) {
        const chainY = y + i * 15;
        const length = Math.min(8, Math.max(2, Math.round(state.meanPeptideLength / 3)));
        
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, chainY);
        ctx.lineTo(x + length * 8, chainY);
        ctx.stroke();
        
        // Draw amino acid nodes
        ctx.fillStyle = '#f59e0b';
        for (let j = 0; j <= length; j++) {
          ctx.beginPath();
          ctx.arc(x + j * 8, chainY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      ctx.fillStyle = '#f59e0b';
      ctx.font = '9px sans-serif';
      ctx.fillText(`Count: ${state.peptideCount.toFixed(0)}`, x, y + 80);
      ctx.fillText(`Length: ${state.meanPeptideLength.toFixed(1)} aa`, x, y + 95);
    }
    
    // Stage 3: Protocells
    if (state.stage >= 3) {
      const x = 3 * stageWidth + 20;
      const y = 100;
      
      // Draw vesicles
      const vesicleCount = Math.min(3, Math.floor(state.vesicleCount / 15));
      for (let i = 0; i < vesicleCount; i++) {
        const vesX = x + (i % 2) * 40;
        const vesY = y + Math.floor(i / 2) * 40;
        const radius = 15 + state.encapsulationRate * 10;
        
        // Draw membrane
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(vesX, vesY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw contents
        if (state.encapsulationRate > 0.1) {
          ctx.fillStyle = `rgba(245, 158, 11, ${state.encapsulationRate})`;
          for (let j = 0; j < 5; j++) {
            const contentX = vesX + (Math.random() - 0.5) * radius;
            const contentY = vesY + (Math.random() - 0.5) * radius;
            ctx.beginPath();
            ctx.arc(contentX, contentY, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.fillStyle = '#8b5cf6';
      ctx.font = '9px sans-serif';
      ctx.fillText(`Vesicles: ${state.vesicleCount.toFixed(0)}`, x - 10, y + 70);
      ctx.fillText(`Encap: ${(state.encapsulationRate * 100).toFixed(0)}%`, x - 10, y + 85);
    }
    
    // Stage 4: Simple Templates
    if (state.stage >= 4) {
      const x = 4 * stageWidth + 10;
      const y = 80;
      
      // Draw simple template strands
      const strandCount = Math.min(3, Math.floor(state.templateStrands / 5));
      for (let i = 0; i < strandCount; i++) {
        const strandY = y + i * 20;
        const length = Math.min(4, Math.max(2, Math.round(state.meanStrandLength / 8)));
        
        // Draw simple backbone
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, strandY);
        ctx.lineTo(x + length * 10, strandY);
        ctx.stroke();
        
        // Draw simple bases
        ctx.font = '8px monospace';
        ctx.fillStyle = '#fff';
        for (let j = 0; j < length; j++) {
          const baseX = x + j * 10;
          ctx.fillText('•', baseX, strandY - 3);
        }
      }
      
      ctx.fillStyle = '#ec4899';
      ctx.font = '9px sans-serif';
      ctx.fillText(`Templates: ${state.templateStrands.toFixed(0)}`, x, y + 70);
      ctx.fillText(`Length: ${state.meanStrandLength.toFixed(1)} nt`, x, y + 85);
    }
    
    // Stage 5: RNA World
    if (state.stage >= 5) {
      const x = 5 * stageWidth + 10;
      const y = 80;
      
      const rnaBases = ['A', 'U', 'C', 'G'];
      
      // Draw RNA strands
      const rnaCount = Math.min(3, Math.floor(state.rnaStrands / 3));
      for (let i = 0; i < rnaCount; i++) {
        const strandY = y + i * 25;
        const length = Math.min(6, Math.max(3, Math.round(state.rnaLength / 5)));
        
        // Draw RNA backbone (more complex)
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, strandY);
        ctx.lineTo(x + length * 12, strandY);
        ctx.stroke();
        
        // Draw RNA bases
        ctx.font = '10px monospace';
        ctx.fillStyle = '#fff';
        for (let j = 0; j < length; j++) {
          const base = rnaBases[Math.floor(Math.random() * rnaBases.length)];
          const baseX = x + j * 12;
          ctx.fillText(base, baseX, strandY - 5);
          
          // Show secondary structure (folding)
          if (Math.random() < 0.3) {
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(baseX + 3, strandY - 15, 8, 0, Math.PI);
            ctx.stroke();
          }
        }
      }
      
      ctx.fillStyle = '#06b6d4';
      ctx.font = '9px sans-serif';
      ctx.fillText(`RNA: ${state.rnaStrands.toFixed(0)}`, x, y + 80);
      ctx.fillText(`Length: ${state.rnaLength.toFixed(1)} nt`, x, y + 95);
      ctx.fillText(`Catalytic: ${state.rnaStrands > 5 ? 'Yes' : 'No'}`, x, y + 110);
    }
    
    // Stage 6: DNA Genomes
    if (state.stage >= 6) {
      const x = 6 * stageWidth + 10;
      const y = 80;
      
      const dnaBases = ['A', 'T', 'C', 'G'];
      
      // Draw DNA double helix
      const dnaCount = Math.min(2, Math.floor(state.dnaStrands / 2));
      for (let i = 0; i < dnaCount; i++) {
        const strandY = y + i * 30;
        const length = Math.min(8, Math.max(4, Math.round(state.dnaLength / 4)));
        
        // Draw DNA double strand
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, strandY);
        ctx.lineTo(x + length * 12, strandY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, strandY + 10);
        ctx.lineTo(x + length * 12, strandY + 10);
        ctx.stroke();
        
        // Draw DNA bases with complementarity
        ctx.font = '10px monospace';
        for (let j = 0; j < length; j++) {
          const base = dnaBases[Math.floor(Math.random() * dnaBases.length)];
          const complement = getComplement(base, 'DNA');
          const baseX = x + j * 12;
          
          ctx.fillStyle = '#fff';
          ctx.fillText(base, baseX, strandY - 5);
          ctx.fillText(complement, baseX, strandY + 20);
          
          // Draw hydrogen bonds
          ctx.strokeStyle = '#ffeb3b';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(baseX + 3, strandY + 2);
          ctx.lineTo(baseX + 3, strandY + 8);
          ctx.stroke();
        }
      }
      
      ctx.fillStyle = '#dc2626';
      ctx.font = '9px sans-serif';
      ctx.fillText(`DNA: ${state.dnaStrands.toFixed(0)}`, x, y + 90);
      ctx.fillText(`Length: ${state.dnaLength.toFixed(0)} bp`, x, y + 105);
      ctx.fillText(`Stable: ${state.dnaLength > 50 ? 'Yes' : 'No'}`, x, y + 120);
    }
  };

// Stage Information Component
function StageInfo({ stage }: { stage: number }) {
  const stageData = [
    {
      title: "Prebiotic Soup",
      description: "Simple gases and energy sources create reactive environment",
      confidence: "Empirically supported"
    },
    {
      title: "Amino Acids",
      description: "Energy + simple molecules → building blocks of proteins",
      confidence: "Empirically demonstrated"
    },
    {
      title: "Peptides",
      description: "Amino acids link into short chains, some weakly catalytic",
      confidence: "Lab-demonstrated"
    },
    {
      title: "Protocells",
      description: "Fatty acids form vesicles, compartmentalizing reactions",
      confidence: "Lab-demonstrated"
    },
    {
      title: "Simple Templates",
      description: "Basic self-copying molecular systems with low fidelity",
      confidence: "Active research"
    },
    {
      title: "RNA World",
      description: "Catalytic RNA molecules that can replicate and evolve",
      confidence: "Strongly hypothesized",
      difficulty: "Very Difficult",
      requirements: "Requires high accuracy (Eigen threshold) + optimal conditions",
      caveat: "No lab has demonstrated prebiotic formation of replicating RNA. Chirality problem: life uses only right-handed sugars, but prebiotic chemistry produces 50/50 mixtures."
    },
    {
      title: "DNA Genomes",
      description: "Stable double-stranded genetic storage with high fidelity",
      confidence: "Evolutionary transition",
      difficulty: "Extremely Difficult",
      requirements: "Requires 85%+ accuracy + perfect temperature control",
      caveat: "Prebiotic DNA synthesis pathway unknown. Homochirality problem remains unsolved for both sugars and amino acids."
    }
  ];

  const currentStage = stageData[stage] || stageData[0];
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "Empirically supported": return "text-green-400";
      case "Empirically demonstrated": return "text-green-400";
      case "Lab-demonstrated": return "text-yellow-400";
      case "Active research": return "text-orange-400";
      case "Strongly hypothesized": return "text-blue-400";
      case "Evolutionary transition": return "text-purple-400";
      default: return "text-gray-400";
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Very Difficult": return "text-red-400";
      case "Extremely Difficult": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/20">
      <h3 className="text-lg font-semibold mb-2">Stage {stage}: {currentStage.title}</h3>
      <p className="text-sm text-gray-300 mb-2">{currentStage.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-2">
        <span className={`text-xs px-2 py-1 rounded ${getConfidenceColor(currentStage.confidence)} bg-white/10`}>
          {currentStage.confidence}
        </span>
        
        {(currentStage as any).difficulty && (
          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor((currentStage as any).difficulty)} bg-red-900/20 border border-red-500/30`}>
            ⚠️ {(currentStage as any).difficulty}
          </span>
        )}
      </div>
      
      {(currentStage as any).requirements && (
        <div className="text-xs text-yellow-300 bg-yellow-900/20 p-2 rounded border border-yellow-500/30 mt-2">
          <strong>Requirements:</strong> {(currentStage as any).requirements}
        </div>
      )}
      
      {(currentStage as any).caveat && (
        <div className="text-xs text-red-300 bg-red-900/20 p-2 rounded border border-red-500/30 mt-2">
          <strong>Scientific Reality:</strong> {(currentStage as any).caveat}
        </div>
      )}
    </div>
  );
}

export default function AbiogenesisLabSection({ 
  educatorMode, 
  cosmicTime = 0,
  contemplativeMode 
}: { 
  educatorMode: boolean; 
  cosmicTime?: number;
  contemplativeMode?: boolean;
}) {
  // Simulation state
  const [simulationState, setSimulationState] = useState<SimulationState>({
    stage: 0,
    aminoAcidYield: 0,
    peptideCount: 0,
    meanPeptideLength: 0,
    vesicleCount: 0,
    encapsulationRate: 0,
    templateStrands: 0,
    meanStrandLength: 0,
    rnaStrands: 0,
    rnaLength: 0,
    dnaStrands: 0,
    dnaLength: 0,
    perBaseAccuracy: 0.7,
    strandFidelity: 0,
    passesEigen: false,
    lifePotential: 0
  });

  // Environmental controls
  const [controls, setControls] = useState<EnvironmentalControls>({
    energyInputs: {
      uv: 30,
      lightning: 20,
      hydrothermal: 40,
      dryWetCycling: 50
    },
    chemistryRichness: 60,
    waterActivity: 70,
    ph: 7,
    temperature: 298, // 25°C in Kelvin
    mineralCatalysis: true,
    timeScale: 1
  });

  const [isRunning, setIsRunning] = useState(false);

  // Simulation logic
  useEffect(() => {
    if (!isRunning) return;

    // Helper functions
    const approach = (current: number, target: number, rate: number) => {
      return current + rate * (target - current);
    };

    const tickHz = 30; // 30 FPS for smooth animation
    const baseDt = 0.1; // base simulation time step
    const dt = baseDt * controls.timeScale;

    const interval = setInterval(() => {
      setSimulationState(prev => {
        const newState = { ...prev };
        
        // Calculate reaction rates with UV damage tradeoff
        const energyFactor = Math.min(1.0, 
          (controls.energyInputs.uv * 0.5 + controls.energyInputs.lightning + 
           controls.energyInputs.hydrothermal + controls.energyInputs.dryWetCycling) / 400);
        const mineralFactor = controls.mineralCatalysis ? 1.5 : 1.0;
        const richnessFactor = Math.max(0, Math.min(1, controls.chemistryRichness / 100));
        
        // Stage 1: Amino Acids (with smoother growth)
        if (newState.stage >= 0) {
          newState.aminoAcidYield = approach(
            newState.aminoAcidYield, 
            10, 
            energyFactor * richnessFactor * 0.02 * dt
          );
          
          // Add decay if no energy
          if (energyFactor < 0.1) {
            newState.aminoAcidYield = Math.max(0, newState.aminoAcidYield - 0.01 * dt);
          }
        }
        
        // Stage 2: Peptides (stronger dry-wet coupling) - requires optimal dry-wet cycling
        if (newState.aminoAcidYield > 1.0) {
          newState.stage = Math.max(newState.stage, 1);
          
          // Check if conditions are suitable for stage 2 progression
          const stage2Ready = controls.energyInputs.dryWetCycling >= 60 && 
                             controls.energyInputs.hydrothermal >= 40;
          
          if (stage2Ready) {
            newState.peptideCount = Math.min(100, newState.peptideCount + 
              0.3 * (controls.energyInputs.dryWetCycling / 100) * mineralFactor * dt);
            newState.meanPeptideLength = approach(
              newState.meanPeptideLength, 
              20, 
              0.01 * dt
            );
          }
        }
        
        // Stage 3: Protocells (smoother encapsulation) - requires high water activity
        if (newState.meanPeptideLength >= 5 && newState.peptideCount > 50) {
          newState.stage = Math.max(newState.stage, 2);
          
          // Check if conditions are suitable for stage 3 progression
          const stage3Ready = controls.waterActivity >= 60 && 
                             controls.energyInputs.hydrothermal >= 60;
          
          if (stage3Ready) {
            newState.vesicleCount = Math.min(50, newState.vesicleCount + 
              (controls.waterActivity / 100) * 0.3 * dt);
            newState.encapsulationRate = approach(
              newState.encapsulationRate,
              1.0,
              0.03 * (controls.waterActivity / 100) * dt
            );
          }
        }
        
        // Stage 4: Templates with improved accuracy calculations - requires optimal conditions
        if (newState.vesicleCount > 20 && newState.encapsulationRate > 0.1) {
          newState.stage = Math.max(newState.stage, 3);
          
          // Check if conditions are suitable for stage 4 progression
          const stage4Ready = controls.chemistryRichness >= 70 && 
                             controls.energyInputs.hydrothermal >= 70 &&
                             controls.energyInputs.dryWetCycling >= 70 &&
                             Math.abs(controls.temperature - 298) <= 10; // Within 10K of optimal
          
          if (stage4Ready) {
            newState.templateStrands = Math.min(20, newState.templateStrands + 
              mineralFactor * richnessFactor * 0.1 * dt);
            newState.meanStrandLength = approach(
              newState.meanStrandLength,
              30,
              0.05 * dt
            );
          }
          
          // Per-base accuracy calculation with Gaussian temperature curve (optimal ~298K/25°C)
          const tempBoost = Math.exp(-0.5 * Math.pow((controls.temperature - 298) / 8, 2));
          let p = 0.70
            + (controls.mineralCatalysis ? 0.18 : 0.0)  // mineral catalysis boost
            + 0.12 * tempBoost                          // temperature optimum ~25°C
            - 0.20 * (controls.energyInputs.uv / 100);  // UV damage
          
          // Clamp per-base accuracy
          p = Math.min(0.995, Math.max(0.5, p));
          newState.perBaseAccuracy = p;
          
          // Calculate Eigen threshold
          const L = Math.max(1, Math.round(newState.meanStrandLength));
          const s = 2.0; // selective advantage
          const pCrit = 1 - Math.log(s) / L;
          newState.passesEigen = (p >= pCrit);
          
          // Whole-strand fidelity for display only
          newState.strandFidelity = Math.pow(p, L);
          
          // Advance to stage 4 when we have basic templates AND optimal conditions
          if (newState.templateStrands >= 5 && newState.meanStrandLength >= 5 && stage4Ready) {
            newState.stage = Math.max(newState.stage, 4);
          }
        }
        
        // Stage 5: RNA World - requires precise conditions for RNA stability
        if (newState.templateStrands >= 10 && newState.meanStrandLength >= 10 && newState.passesEigen) {
          // Check if conditions are suitable for RNA World
          const stage5Ready = controls.energyInputs.uv >= 25 && controls.energyInputs.uv <= 45 && // Moderate UV
                             controls.energyInputs.lightning >= 30 && controls.energyInputs.lightning <= 55 && // Moderate lightning
                             controls.chemistryRichness >= 85 && // High complexity
                             controls.waterActivity >= 75 && // High water activity
                             Math.abs(controls.temperature - 298) <= 5; // Very close to optimal temp
          
          if (stage5Ready) {
            newState.stage = Math.max(newState.stage, 5);
            newState.rnaStrands = Math.min(50, newState.rnaStrands + 
              mineralFactor * richnessFactor * 0.08 * dt);
            newState.rnaLength = approach(
              newState.rnaLength,
              100,
              0.05 * dt
            );
          }
        }
        
        // Stage 6: DNA Genomes - requires extremely precise conditions
        if (newState.rnaStrands >= 10 && newState.rnaLength >= 25 && newState.perBaseAccuracy > 0.85) {
          // Check if conditions are suitable for DNA formation
          const stage6Ready = controls.energyInputs.uv >= 20 && controls.energyInputs.uv <= 35 && // Low UV for DNA protection
                             controls.energyInputs.dryWetCycling >= 80 && // Very high cycling
                             controls.chemistryRichness >= 85 && // Maximum complexity
                             controls.waterActivity >= 75 && controls.waterActivity <= 90 && // Precise water balance
                             Math.abs(controls.temperature - 298) <= 3; // Extremely precise temperature
          
          if (stage6Ready) {
            newState.stage = Math.max(newState.stage, 6);
            newState.dnaStrands = Math.min(20, newState.dnaStrands + 
              mineralFactor * richnessFactor * 0.03 * dt);
            newState.dnaLength = approach(
              newState.dnaLength,
              200,
              0.02 * dt
            );
          }
        }
        
        // Life potential calculation with stage-dependent scoring
        const L = Math.max(1, Math.round(newState.meanStrandLength));
        const infoFactor = Math.min(1, L / 20); // information content
        const baseHeredityScore = 0.6 * newState.perBaseAccuracy + 0.4 * infoFactor * newState.perBaseAccuracy;
        
        // Stage multipliers - life potential is capped by actual achievements
        let stageMultiplier = 1.0;
        let maxPotential = 40; // Basic chemistry can only reach 40%
        
        if (newState.stage >= 4) {
          maxPotential = 60; // Templates unlock 60%
        }
        if (newState.stage >= 5 && newState.rnaStrands >= 5) {
          maxPotential = 80; // RNA World unlocks 80%
          stageMultiplier = 1.2; // RNA bonus
        }
        if (newState.stage >= 6 && newState.dnaStrands >= 3) {
          maxPotential = 100; // DNA unlocks full potential
          stageMultiplier = 1.5; // DNA bonus
        }
        
        const rawPotential = (
          (newState.meanPeptideLength / 20) * 0.3 +
          (newState.encapsulationRate) * 0.3 +
          (baseHeredityScore) * 0.4
        ) * 100 * stageMultiplier;
        
        newState.lifePotential = Math.max(0, Math.min(maxPotential, rawPotential));
        
        return newState;
      });
    }, 1000 / tickHz); // Fixed 30 FPS, time scaling handled by dt

    return () => clearInterval(interval);
  }, [isRunning, controls]);

  // Trigger contemplative reflection when optimal conditions are met
  useEffect(() => {
    if (contemplativeMode && 
        simulationState.stage >= 4 && 
        simulationState.perBaseAccuracy > 0.97 && 
        simulationState.lifePotential > 80) {
      window.dispatchEvent(new CustomEvent('perfectCondition', { 
        detail: { section: 'abiogenesis' } 
      }));
    }
  }, [simulationState, contemplativeMode]);

  const resetSimulation = () => {
    setSimulationState({
      stage: 0,
      aminoAcidYield: 0,
      peptideCount: 0,
      meanPeptideLength: 0,
      vesicleCount: 0,
      encapsulationRate: 0,
      templateStrands: 0,
      meanStrandLength: 0,
      rnaStrands: 0,
      rnaLength: 0,
      dnaStrands: 0,
      dnaLength: 0,
      perBaseAccuracy: 0.7,
      strandFidelity: 0,
      passesEigen: false,
      lifePotential: 0
    });
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Panel - Simulation Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white/5 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Abiogenesis Lab: From Chemistry to Codes
              </CardTitle>
              <CardDescription className="text-gray-300">
                Interactive simulation of life's chemical origins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimulationCanvas state={simulationState} controls={controls} />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
                  >
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSimulation}
                    className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-gray-400">
                  Time Scale: {
                    controls.timeScale < 0.1 ? "1 million years/tick" :
                    controls.timeScale < 0.5 ? "100,000 years/tick" :
                    controls.timeScale < 1 ? "10,000 years/tick" :
                    controls.timeScale < 5 ? "1,000 years/tick" :
                    controls.timeScale < 10 ? "100 years/tick" :
                    controls.timeScale < 50 ? "10 years/tick" :
                    controls.timeScale < 100 ? "1 year/tick" :
                    controls.timeScale < 500 ? "1 month/tick" :
                    "1 day/tick"
                  }
                </div>
              </div>
            </CardContent>
          </Card>
          
          <StageInfo stage={simulationState.stage} />
        </div>

        {/* Right Panel - Controls */}
        <div className="space-y-4">
          <Card className="bg-white/5 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Environmental Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Energy Inputs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-blue-300">Energy Inputs</h4>
                  {simulationState.stage >= 4 && (
                    <div className="text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded border border-red-500/30">
                      ⚠️ RNA/DNA require precise tuning
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">UV Radiation</label>
                    <span className="text-xs text-gray-400">{(controls.energyInputs.uv * 0.3).toFixed(1)} W/m²</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.energyInputs.uv]}
                      onValueChange={(value) => setControls(prev => ({
                        ...prev,
                        energyInputs: { ...prev.energyInputs, uv: value[0] }
                      }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 4 ? '30%' : simulationState.stage < 5 ? '25%' : '20%',
                           width: simulationState.stage < 4 ? '30%' : simulationState.stage < 5 ? '20%' : '15%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 4 ? '30-60 (energy for chemistry)' :
                         simulationState.stage < 5 ? '25-45 (template formation)' :
                         '20-35 (DNA precision)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.energyInputs.uv < 10 ? "Safe for humans" :
                     controls.energyInputs.uv < 30 ? "Sunburn in hours" :
                     controls.energyInputs.uv < 60 ? "DNA damage, cancer risk" :
                     "Lethal to most life"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Lightning</label>
                    <span className="text-xs text-gray-400">{(controls.energyInputs.lightning * 0.02).toFixed(1)} strikes/km²/yr</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.energyInputs.lightning]}
                      onValueChange={(value) => setControls(prev => ({
                        ...prev,
                        energyInputs: { ...prev.energyInputs, lightning: value[0] }
                      }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 3 ? '50%' : simulationState.stage < 5 ? '40%' : '30%',
                           width: simulationState.stage < 3 ? '30%' : simulationState.stage < 5 ? '20%' : '25%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 3 ? '50-80 (amino acids)' :
                         simulationState.stage < 5 ? '40-60 (protocells)' :
                         '30-55 (RNA stability)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.energyInputs.lightning < 25 ? "Rural areas" :
                     controls.energyInputs.lightning < 50 ? "Thunderstorm regions" :
                     controls.energyInputs.lightning < 75 ? "Tropical storm zones" :
                     "Constant electrical storms"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Hydrothermal</label>
                    <span className="text-xs text-gray-400">{(controls.energyInputs.hydrothermal * 0.5).toFixed(1)} MW/km²</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.energyInputs.hydrothermal]}
                      onValueChange={(value) => setControls(prev => ({
                        ...prev,
                        energyInputs: { ...prev.energyInputs, hydrothermal: value[0] }
                      }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 2 ? '40%' : simulationState.stage < 4 ? '60%' : '70%',
                           width: simulationState.stage < 2 ? '40%' : simulationState.stage < 4 ? '20%' : '15%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 2 ? '40-80 (amino synthesis)' :
                         simulationState.stage < 4 ? '60-80 (vesicle formation)' :
                         '70-85 (template stability)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.energyInputs.hydrothermal < 20 ? "Hot springs" :
                     controls.energyInputs.hydrothermal < 40 ? "Yellowstone geysers" :
                     controls.energyInputs.hydrothermal < 70 ? "Ocean floor vents" :
                     "Volcanic activity"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Dry-Wet Cycling</label>
                    <span className="text-xs text-gray-400">{(controls.energyInputs.dryWetCycling * 0.1).toFixed(1)} cycles/day</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.energyInputs.dryWetCycling]}
                      onValueChange={(value) => setControls(prev => ({
                        ...prev,
                        energyInputs: { ...prev.energyInputs, dryWetCycling: value[0] }
                      }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 2 ? '60%' : simulationState.stage < 4 ? '70%' : '80%',
                           width: simulationState.stage < 2 ? '30%' : simulationState.stage < 4 ? '20%' : '15%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 2 ? '60-90 (peptide formation)' :
                         simulationState.stage < 4 ? '70-90 (concentration)' :
                         '80-95 (critical for RNA/DNA)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.energyInputs.dryWetCycling < 25 ? "Stable pools" :
                     controls.energyInputs.dryWetCycling < 50 ? "Tidal zones" :
                     controls.energyInputs.dryWetCycling < 75 ? "Desert flash floods" :
                     "Extreme wet-dry cycles"}
                  </div>
                </div>
              </div>

              {/* Chemistry & Environment */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-green-300">Chemistry & Environment</h4>
                  {simulationState.stage >= 4 && simulationState.perBaseAccuracy < 0.85 && (
                    <div className="text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded border border-red-500/30">
                      ⚠️ Need 85%+ accuracy for DNA
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Chemistry Richness</label>
                    <span className="text-xs text-gray-400">{(controls.chemistryRichness * 0.01).toFixed(2)} M total</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.chemistryRichness]}
                      onValueChange={(value) => setControls(prev => ({ ...prev, chemistryRichness: value[0] }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 1 ? '50%' : simulationState.stage < 4 ? '70%' : '85%',
                           width: simulationState.stage < 1 ? '40%' : simulationState.stage < 4 ? '25%' : '15%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 1 ? '50-90 (precursor diversity)' :
                         simulationState.stage < 4 ? '70-95 (complex chemistry)' :
                         '85-100 (maximum complexity)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.chemistryRichness < 25 ? "Pure water" :
                     controls.chemistryRichness < 50 ? "River water" :
                     controls.chemistryRichness < 75 ? "Seawater" :
                     "Concentrated brine"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Water Activity</label>
                    <span className="text-xs text-gray-400">{(controls.waterActivity * 0.01).toFixed(2)} aw</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.waterActivity]}
                      onValueChange={(value) => setControls(prev => ({ ...prev, waterActivity: value[0] }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: simulationState.stage < 3 ? '60%' : simulationState.stage < 5 ? '70%' : '75%',
                           width: simulationState.stage < 3 ? '35%' : simulationState.stage < 5 ? '20%' : '15%'
                         }}></div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span className="text-green-400 font-bold">
                        {simulationState.stage < 3 ? '60-95 (vesicle formation)' :
                         simulationState.stage < 5 ? '70-90 (compartmentalization)' :
                         '75-90 (RNA/DNA stability)'}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {controls.waterActivity < 25 ? "Dry salt" :
                     controls.waterActivity < 50 ? "Honey consistency" :
                     controls.waterActivity < 75 ? "Seawater" :
                     "Pure water"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs">Temperature</label>
                    <span className="text-xs text-gray-400">{controls.temperature} K ({(controls.temperature - 273.15).toFixed(0)}°C)</span>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[controls.temperature]}
                      onValueChange={(value) => setControls(prev => ({ ...prev, temperature: value[0] }))}
                      min={253}  // -20°C
                      max={673}  // 400°C
                      step={1}
                      className="w-full"
                    />
                    {/* Dynamic optimal range indicator */}
                    <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                         style={{
                           left: `${((298 - (simulationState.stage < 4 ? 10 : simulationState.stage < 5 ? 5 : 3) - 253) / (673 - 253)) * 100}%`,
                           width: `${((simulationState.stage < 4 ? 20 : simulationState.stage < 5 ? 10 : 6) / (673 - 253)) * 100}%`
                         }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>253 K (-20°C)</span>
                    <span className="text-green-400 font-bold">
                      {simulationState.stage < 4 ? '298 K (±10K optimal)' :
                       simulationState.stage < 5 ? '298 K (±5K for RNA)' :
                       '298 K (±3K for DNA)'}
                    </span>
                    <span>673 K (400°C)</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {controls.temperature < 273 ? "Frozen, slow chemistry" :
                     controls.temperature < 310 ? "Human body temperature" :
                     controls.temperature < 373 ? "Hot bath to boiling" :
                     controls.temperature < 473 ? "Pressure cooker" :
                     controls.temperature < 573 ? "Deep hydrothermal vents" :
                     "Extreme volcanic conditions"}
                  </div>
                  {/* Dynamic temperature feedback */}
                  {simulationState.stage < 4 && Math.abs(controls.temperature - 298) <= 10 && (
                    <div className="text-xs text-green-400 mt-1 text-center font-bold">
                      ✓ Good for basic templates!
                    </div>
                  )}
                  {simulationState.stage >= 4 && simulationState.stage < 5 && Math.abs(controls.temperature - 298) <= 5 && (
                    <div className="text-xs text-green-400 mt-1 text-center font-bold">
                      ✓ Suitable for RNA formation!
                    </div>
                  )}
                  {simulationState.stage >= 5 && Math.abs(controls.temperature - 298) <= 3 && (
                    <div className="text-xs text-green-400 mt-1 text-center font-bold">
                      ✓ Perfect for DNA stability!
                    </div>
                  )}
                  {simulationState.stage >= 4 && Math.abs(controls.temperature - 298) > (simulationState.stage < 5 ? 5 : 3) && (
                    <div className="text-xs text-red-400 mt-1 text-center font-bold">
                      ⚠️ Too far from 298K for {simulationState.stage < 5 ? 'RNA' : 'DNA'}!
                    </div>
                  )}
                </div>
              </div>

              {/* Time Scale */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs">Time Scale</label>
                  <span className="text-xs text-gray-400">
                    {controls.timeScale < 0.1 ? "1 Myr/tick" :
                     controls.timeScale < 0.5 ? "100 kyr/tick" :
                     controls.timeScale < 1 ? "10 kyr/tick" :
                     controls.timeScale < 5 ? "1 kyr/tick" :
                     controls.timeScale < 10 ? "100 yr/tick" :
                     controls.timeScale < 50 ? "10 yr/tick" :
                     controls.timeScale < 100 ? "1 yr/tick" :
                     controls.timeScale < 500 ? "1 mo/tick" :
                     "1 day/tick"}
                  </span>
                </div>
                <Slider
                  value={[3 - Math.log10(controls.timeScale * 10)]}
                  onValueChange={(value) => setControls(prev => ({ 
                    ...prev, 
                    timeScale: Math.pow(10, 3 - value[0]) / 10 
                  }))}
                  min={0}  // 1000x (fast) on left
                  max={4}  // 0.1x (slow) on right
                  step={0.1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {controls.timeScale < 0.1 ? "Mass extinctions, continental drift" :
                   controls.timeScale < 0.5 ? "Ice ages, human evolution" :
                   controls.timeScale < 1 ? "Rise of agriculture, civilizations" :
                   controls.timeScale < 5 ? "Recorded history, empires" :
                   controls.timeScale < 10 ? "Industrial revolution era" :
                   controls.timeScale < 50 ? "Climate change, technology" :
                   controls.timeScale < 100 ? "Human lifespans, generations" :
                   controls.timeScale < 500 ? "Lab experiments, research" :
                   "Chemical reactions, observations"}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-lg">System Readouts</CardTitle>
              {educatorMode && (
                <CardDescription className="text-sm text-gray-300">
                  These metrics track the molecular complexity and replication fidelity of your prebiotic system
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Amino Acids:</span>
                  <div className="font-mono">{simulationState.aminoAcidYield.toFixed(1)} ppm</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Building blocks of proteins. Miller-Urey experiments produced ~2-15 ppm. <span className="text-red-300">⚠️ Lab produces 50/50 mix of left/right-handed amino acids, but life uses only left-handed forms.</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Peptides:</span>
                  <div className="font-mono">{simulationState.peptideCount.toFixed(0)}</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Short protein chains. Fox's thermal proteins formed 3-18 amino acid chains. Catalytic activity emerges at 5+ residues. <span className="text-red-300">⚠️ Mixed chirality peptides have different properties than biological proteins.</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Vesicles:</span>
                  <div className="font-mono">{simulationState.vesicleCount.toFixed(0)}</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Fatty acid bubbles that concentrate reactions. Szostak lab creates stable vesicles from 8-12 carbon chains.
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Templates:</span>
                  <div className="font-mono">{simulationState.templateStrands.toFixed(0)}</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Simple self-copying molecules. Lincoln & Joyce (2009) created RNA enzymes that replicate each other <span className="text-yellow-300">using purified components - not from prebiotic conditions.</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">RNA:</span>
                  <div className="font-mono">{simulationState.rnaStrands.toFixed(0)}</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Catalytic RNA (ribozymes). Ribosomes use 23S rRNA to catalyze peptide bonds. Some speed reactions 10⁷x. <span className="text-yellow-300">⚠️ No prebiotic pathway to complex ribozymes demonstrated.</span> <span className="text-red-300">RNA requires right-handed sugars - prebiotic synthesis gives mixed chirality.</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">DNA:</span>
                  <div className="font-mono">{simulationState.dnaStrands.toFixed(0)}</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Stable double helix storing 3.2 billion base pairs in humans. 100,000x more stable than RNA. <span className="text-yellow-300">⚠️ Prebiotic DNA synthesis remains unsolved.</span> <span className="text-red-300">DNA also requires homochiral (right-handed) sugars not found in prebiotic chemistry.</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Per-Base:</span>
                  <div className="font-mono">{(simulationState.perBaseAccuracy * 100).toFixed(1)}%</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Accuracy per nucleotide. E. coli DNA polymerase: 99.9%. Early RNA replicases: ~85-95%.
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Strand:</span>
                  <div className="font-mono">{(simulationState.strandFidelity * 100).toFixed(1)}%</div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      Whole-strand fidelity = (per-base accuracy)^length. 90% accuracy over 100 bases = 0.003% success.
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Eigen:</span>
                  <div className={`font-mono text-xs ${simulationState.passesEigen ? 'text-green-400' : 'text-red-400'}`}>
                    {simulationState.passesEigen ? '✓ Pass' : '✗ Fail'}
                    {simulationState.stage >= 4 && !simulationState.passesEigen && (
                      <span className="ml-2 text-red-400">⚠️ Critical for RNA</span>
                    )}
                  </div>
                  {educatorMode && (
                    <div className="text-xs text-blue-300 mt-1">
                      <strong>Theoretical limit:</strong> Eigen's threshold (1971): p_crit = 1 - ln(s)/L. For 100-base RNA: need 99.3% accuracy. <span className="text-yellow-300">⚠️ No lab has achieved prebiotic RNA/DNA formation meeting this threshold.</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Life Potential Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Life Potential</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-400">{simulationState.lifePotential.toFixed(0)}%</span>
                    {simulationState.stage >= 4 && simulationState.lifePotential < 70 && (
                      <span className="text-xs text-red-400">⚠️ Low</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${simulationState.lifePotential}%` }}
                  />
                </div>
                {educatorMode && (
                  <div className="text-xs text-blue-300 mt-2">
                    <strong>Stage-dependent metric:</strong> Basic chemistry (max 40%) → Templates (max 60%) → RNA World (max 80%) → DNA (max 100%). Formula: 30% catalysis + 30% compartmentalization + 40% heredity, with stage multipliers for RNA/DNA achievements.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
