// src/app/quantum-beyond/page.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaUndo, FaPlay, FaPause } from 'react-icons/fa';

export default function QuantumBeyond() {
  // Simulator States
  const [theta, setTheta] = useState(90); // Polar angle (0 to 180 degrees)
  const [phi, setPhi] = useState(0);    // Azimuthal angle (0 to 360 degrees)
  const [r, setR] = useState(1.0);       // Magnitude (0 to 1.0)
  
  const [activeTab, setActiveTab] = useState(0); // 0: Qubits, 1: Entanglement, 2: Algorithms, 3: Decoherence
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'none' | 'phase-rotation' | 'decoherence' | 'gate-hadamard' | 'gate-phase'>('none');
  
  const animationRef = useRef<number | null>(null);
  const animationProgress = useRef<number>(0);

  // 1. Calculations for Qubit State Vector
  const thetaRad = (theta * Math.PI) / 180;
  const phiRad = (phi * Math.PI) / 180;

  // State coefficients
  const alpha = Math.cos(thetaRad / 2);
  const betaMag = Math.sin(thetaRad / 2);

  // Probabilities
  const p0 = alpha * alpha * r;
  const p1 = betaMag * betaMag * r;
  // Mixed state/decoherence leaves a portion of probability in an unpolarized "mixed state"
  const pMixed = 1.0 - r;

  // Coordinates for oblique 3D-to-2D projection
  // Center is (100, 100), Radius of sphere is 70
  const cx = 100;
  const cy = 100;
  const R_val = 70;

  const x3d = r * Math.sin(thetaRad) * Math.cos(phiRad);
  const y3d = r * Math.sin(thetaRad) * Math.sin(phiRad);
  const z3d = r * Math.cos(thetaRad);

  // Oblique Cabinet Projection: depth y3d goes at a 135-degree angle
  const vx = cx + R_val * x3d - R_val * y3d * 0.45;
  const vy = cy - R_val * z3d + R_val * y3d * 0.35;

  // 2. Animation Logic Loop
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (!isAnimating) return;

    const tick = () => {
      if (animationType === 'phase-rotation') {
        setPhi((prev) => (prev + 1.5) % 360);
        animationRef.current = requestAnimationFrame(tick);
      } else if (animationType === 'decoherence') {
        setR((prev) => {
          if (prev <= 0.005) {
            setIsAnimating(false);
            return 0;
          }
          return prev - 0.008;
        });
        animationRef.current = requestAnimationFrame(tick);
      } else if (animationType === 'gate-hadamard') {
        animationProgress.current += 0.04;
        if (animationProgress.current >= 1.0) {
          setTheta(90);
          setIsAnimating(false);
          setAnimationType('none');
        } else {
          // Linear interpolation from 0 (Ground) to 90 (Superposition)
          setTheta(90 * animationProgress.current);
          animationRef.current = requestAnimationFrame(tick);
        }
      } else if (animationType === 'gate-phase') {
        animationProgress.current += 0.04;
        if (animationProgress.current >= 1.0) {
          setPhi((prev) => (prev + 90) % 360);
          setIsAnimating(false);
          setAnimationType('none');
        } else {
          setPhi((prev) => (prev + 90 * 0.04) % 360);
          animationRef.current = requestAnimationFrame(tick);
        }
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animationType]);

  // 3. Preset Trigger Handlers
  const applyPreset = (preset: 'ground' | 'excited' | 'plus' | 'minus' | 'i' | 'minus-i') => {
    setIsAnimating(false);
    setAnimationType('none');
    setR(1.0);
    
    switch (preset) {
      case 'ground':
        setTheta(0);
        setPhi(0);
        break;
      case 'excited':
        setTheta(180);
        setPhi(0);
        break;
      case 'plus':
        setTheta(90);
        setPhi(0);
        break;
      case 'minus':
        setTheta(90);
        setPhi(180);
        break;
      case 'i':
        setTheta(90);
        setPhi(90);
        break;
      case 'minus-i':
        setTheta(90);
        setPhi(270);
        break;
    }
  };

  // 4. Tab selection side-effects (sync sandbox state to tab concepts)
  const selectTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setIsAnimating(false);
    setAnimationType('none');
    setR(1.0);

    if (tabIndex === 0) {
      // Qubits: Reset to Superposition State |+>
      setTheta(90);
      setPhi(0);
    } else if (tabIndex === 1) {
      // Entanglement/Phase: Reset to |+> and auto-run phase rotation
      setTheta(90);
      setPhi(0);
      setAnimationType('phase-rotation');
      setIsAnimating(true);
    } else if (tabIndex === 2) {
      // Algorithms: Reset to Ground |0>
      setTheta(0);
      setPhi(0);
    } else if (tabIndex === 3) {
      // Decoherence: Set to excited angle and trigger shrink animation
      setTheta(54);
      setPhi(42);
      setAnimationType('decoherence');
      setIsAnimating(true);
    }
  };

  const applyHadamardGate = () => {
    setIsAnimating(false);
    setR(1.0);
    setTheta(0);
    setPhi(0);
    animationProgress.current = 0;
    setAnimationType('gate-hadamard');
    setIsAnimating(true);
  };

  const applyPhaseGate = () => {
    setIsAnimating(false);
    setR(1.0);
    animationProgress.current = 0;
    setAnimationType('gate-phase');
    setIsAnimating(true);
  };

  const resetSandbox = () => {
    setIsAnimating(false);
    setAnimationType('none');
    setR(1.0);
    setTheta(90);
    setPhi(0);
  };

  return (
    <div className="min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Navigation Back */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[var(--sumi-2)] hover:text-[var(--vermilion)] mb-10 transition-colors font-mono text-[12px] tracking-wider"
        >
          <FaArrowLeft className="mr-2 text-[10px]" /> BACK TO HOME
        </Link>

        {/* Section Header */}
        <div className="space-y-4 mb-12">
          <div className="label-mono text-[13px] text-[var(--vermilion)] tracking-[0.1em]">
            — WORKSPACE
          </div>
          <h1 className="heading-1 font-serif text-[var(--sumi)] font-light">
            Qubit Sandbox &amp; Experiments
          </h1>
          <p className="lede-text max-w-3xl">
            An interactive laboratory instrument to explore single-qubit quantum states, phase coherence, 
            logical quantum gates, and environmental decoherence.
          </p>
        </div>

        {/* Main Dashboard Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT COLUMN: THE SANDBOX SIMULATOR ================= */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-6 md:p-8 space-y-6">
              
              <div className="flex justify-between items-center border-b border-[var(--rule)] pb-4">
                <span className="label-mono text-[11px] text-[var(--sumi-2)] font-medium">
                  QUANTUM STATE SIMULATION
                </span>
                <button 
                  onClick={resetSandbox}
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-[var(--sumi-3)] hover:text-[var(--vermilion)] transition-colors"
                  title="Reset state"
                >
                  <FaUndo className="text-[8px]" /> RESET
                </button>
              </div>

              {/* Graphic Display Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* SVG Bloch Sphere (Col-span 5) */}
                <div className="md:col-span-5 flex justify-center py-4 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px]">
                  <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="text-sumi">
                    {/* Faint Drafting Crosshair Guidelines */}
                    <circle cx={cx} cy={cy} r="88" stroke="var(--paper-edge)" strokeWidth="0.5" strokeDasharray="1 5" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="var(--paper-edge)" strokeWidth="0.5" strokeDasharray="1 5" />
                    <line x1="100" y1="10" x2="100" y2="190" stroke="var(--paper-edge)" strokeWidth="0.5" strokeDasharray="1 5" />

                    {/* Outer Sphere Boundary */}
                    <circle cx={cx} cy={cy} r={R_val} stroke="var(--sumi)" strokeWidth="1" fill="none" />

                    {/* Equator - Back (Dashed) */}
                    <path
                      d={`M ${cx - R_val} ${cy} A ${R_val} 20 0 0 1 ${cx + R_val} ${cy}`}
                      stroke="var(--sumi-3)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      fill="none"
                    />

                    {/* Equator - Front (Solid) */}
                    <path
                      d={`M ${cx - R_val} ${cy} A ${R_val} 20 0 0 0 ${cx + R_val} ${cy}`}
                      stroke="var(--sumi)"
                      strokeWidth="1"
                      fill="none"
                    />

                    {/* Faint Axes */}
                    {/* Z-Axis (Vertical) */}
                    <line x1={cx} y1={cy - R_val} x2={cx} y2={cy + R_val} stroke="var(--paper-edge)" strokeWidth="1" strokeDasharray="2 2" />
                    {/* X-Axis (Horizontal) */}
                    <line x1={cx - R_val} y1={cy} x2={cx + R_val} y2={cy} stroke="var(--paper-edge)" strokeWidth="1" strokeDasharray="2 2" />
                    {/* Y-Axis (Diagonal depth) */}
                    <line x1={50} y1={140} x2={150} y2={60} stroke="var(--paper-edge)" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Axis Labels */}
                    <text x={cx} y={cy - R_val - 6} textAnchor="middle" fill="var(--sumi)" className="font-mono text-[10px] select-none">|0⟩</text>
                    <text x={cx} y={cy + R_val + 14} textAnchor="middle" fill="var(--sumi)" className="font-mono text-[10px] select-none">|1⟩</text>
                    
                    {/* State Vector Line (Terracotta Accent) */}
                    <line x1={cx} y1={cy} x2={vx} y2={vy} stroke="var(--vermilion)" strokeWidth="1.5" />
                    {/* Vector Tip Dot */}
                    <circle cx={vx} cy={vy} r="3.5" fill="var(--vermilion)" />
                  </svg>
                </div>

                {/* State Readouts & Wavefunction (Col-span 7) */}
                <div className="md:col-span-7 space-y-6">
                  {/* Wavefunction Math Box */}
                  <div className="p-4 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] space-y-2">
                    <div className="label-mono text-[9px] text-[var(--sumi-3)]">WAVEFUNCTION DIRAC NOTATION</div>
                    <div className="font-serif text-[17px] text-[var(--sumi)] select-all leading-relaxed">
                      <span>|ψ⟩ = </span>
                      <span className="font-medium">{alpha.toFixed(3)}</span>
                      <span>|0⟩</span>
                      {betaMag >= 0.001 && (
                        <>
                          <span className="mx-1">+</span>
                          <span className="font-medium">{betaMag.toFixed(3)}</span>
                          {phi > 0 && <span className="text-xs align-super font-mono text-[var(--vermilion)]">e<sup>i·{Math.round(phi)}°</sup></span>}
                          <span>|1⟩</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Probability Gauges */}
                  <div className="space-y-3">
                    <div className="label-mono text-[9px] text-[var(--sumi-3)]">MEASUREMENT PROBABILITIES</div>
                    
                    {/* Probability P(0) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[var(--sumi-2)]">
                        <span>P(|0⟩) [Ground]</span>
                        <span>{Math.round(p0 * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--paper-edge)] rounded-[1px] overflow-hidden">
                        <div 
                          className="h-full bg-[var(--vermilion)] transition-all duration-150"
                          style={{ width: `${p0 * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Probability P(1) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[var(--sumi-2)]">
                        <span>P(|1⟩) [Excited]</span>
                        <span>{Math.round(p1 * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--paper-edge)] rounded-[1px] overflow-hidden">
                        <div 
                          className="h-full bg-[var(--sumi)] transition-all duration-150"
                          style={{ width: `${p1 * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Mixed State component (Decoherence) */}
                    {pMixed > 0.001 && (
                      <div className="space-y-1 pt-1 animate-pulse">
                        <div className="flex justify-between text-xs font-mono text-[var(--sumi-3)]">
                          <span>Mixed/Decohered State</span>
                          <span>{Math.round(pMixed * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--paper-edge)] rounded-[1px] overflow-hidden">
                          <div 
                            className="h-full bg-[var(--paper-edge)] border-l border-dashed border-[var(--sumi-3)]"
                            style={{ width: `${pMixed * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sliders Control Panel */}
              <div className="border-t border-[var(--rule)] pt-6 space-y-5">
                
                {/* Theta Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline font-mono text-xs text-[var(--sumi-2)]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[var(--vermilion)] font-serif text-sm">&theta;</span> 
                      <span>Polar Angle (State Mixture)</span>
                    </span>
                    <span className="bg-[var(--paper)] border border-[var(--paper-edge)] px-2 py-0.5 rounded-[1px]">
                      {Math.round(theta)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={theta}
                    onChange={(e) => {
                      setIsAnimating(false);
                      setTheta(Number(e.target.value));
                    }}
                    className="w-full h-1 bg-[var(--paper-edge)] rounded-lg appearance-none cursor-pointer accent-[var(--vermilion)]"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-[var(--sumi-3)] px-1">
                    <span>0° (|0⟩ State)</span>
                    <span>90° (Superposition)</span>
                    <span>180° (|1⟩ State)</span>
                  </div>
                </div>

                {/* Phi Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline font-mono text-xs text-[var(--sumi-2)]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[var(--vermilion)] font-serif text-sm">&phi;</span> 
                      <span>Azimuthal Angle (Quantum Phase)</span>
                    </span>
                    <span className="bg-[var(--paper)] border border-[var(--paper-edge)] px-2 py-0.5 rounded-[1px]">
                      {Math.round(phi)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={phi}
                    onChange={(e) => {
                      setIsAnimating(false);
                      setPhi(Number(e.target.value));
                    }}
                    className="w-full h-1 bg-[var(--paper-edge)] rounded-lg appearance-none cursor-pointer accent-[var(--sumi)]"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-[var(--sumi-3)] px-1">
                    <span>0° (+X)</span>
                    <span>90° (+Y)</span>
                    <span>180° (-X)</span>
                    <span>270° (-Y)</span>
                    <span>360°</span>
                  </div>
                </div>
              </div>

              {/* State Presets Section */}
              <div className="border-t border-[var(--rule)] pt-5 space-y-3">
                <div className="label-mono text-[9px] text-[var(--sumi-3)]">QUBIT STATE PRESETS</div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => applyPreset('ground')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |0⟩ Ground
                  </button>
                  <button onClick={() => applyPreset('excited')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |1⟩ Excited
                  </button>
                  <button onClick={() => applyPreset('plus')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |+⟩ Superposition
                  </button>
                  <button onClick={() => applyPreset('minus')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |-⟩ Phase Diff
                  </button>
                  <button onClick={() => applyPreset('i')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |i⟩ Complex
                  </button>
                  <button onClick={() => applyPreset('minus-i')} className="btn-ghost text-[10px] py-1.5 px-3">
                    |-i⟩ Complex
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE CONCEPT GUIDE ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tab selection menu */}
            <div className="border border-[var(--paper-edge)] bg-[var(--paper-deep)] rounded-[2px] p-2 flex flex-col space-y-1">
              {[
                { label: 'i. QUANTUM BITS', desc: 'Superposition & Probability' },
                { label: 'ii. QUANTUM ENTANGLEMENT', desc: 'Phase Rotation & Correlation' },
                { label: 'iii. QUANTUM ALGORITHMS', desc: 'Gate Operations & Rotation' },
                { label: 'iv. DECOHERENCE DECAY', desc: 'Environmental Noise & Mixed States' }
              ].map((tab, idx) => {
                const isActive = idx === activeTab;
                return (
                  <button
                    key={idx}
                    onClick={() => selectTab(idx)}
                    className={`text-left p-3 rounded-[1px] transition-all flex justify-between items-center ${
                      isActive 
                        ? 'bg-[var(--paper)] border border-[var(--paper-edge)] border-l-2 border-l-[var(--vermilion)]' 
                        : 'border border-transparent hover:bg-[var(--paper)]/50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className={`label-mono text-[10px] tracking-wider ${
                        isActive ? 'text-[var(--vermilion)] font-medium' : 'text-[var(--sumi-3)]'
                      }`}>
                        {tab.label}
                      </div>
                      <div className="font-serif text-sm text-[var(--sumi)]">
                        {tab.desc}
                      </div>
                    </div>
                    {isActive && <span className="text-[var(--vermilion)] font-mono text-xs">●</span>}
                  </button>
                );
              })}
            </div>

            {/* Concept Content details card */}
            <div className="bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-6 space-y-4">
              
              {/* Tab 0: Qubits */}
              {activeTab === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-light text-[var(--sumi)]">
                    Qubits &amp; Superposition
                  </h3>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    Unlike classical bits (which are fixed at 0 or 1), a quantum bit exists as a vector pointing 
                    to any point on the Bloch sphere surface. 
                  </p>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    Adjust the <span className="text-[var(--vermilion)]">&theta; (Polar)</span> slider above. 
                    Notice that when &theta; is at 90°, the vector lies on the equator, showing a 50/50 chance of measuring 0 or 1. 
                    Until a measurement is made, the qubit is in both states simultaneously.
                  </p>
                </div>
              )}

              {/* Tab 1: Entanglement / Phase */}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-light text-[var(--sumi)]">
                    Phase Rotation &amp; Correlation
                  </h3>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    Quantum information carries a phase angle, controlled by the <span className="text-[var(--vermilion)]">&phi; (Azimuthal)</span> slider. 
                    As the phase rotates, it changes how this qubit will interfere when entangled with other qubits.
                  </p>
                  <div className="p-3 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--sumi-2)]">Phase Rotation Loop</span>
                    <button
                      onClick={() => {
                        setAnimationType('phase-rotation');
                        setIsAnimating(!isAnimating);
                      }}
                      className="btn-primary text-[9px] py-1 px-3"
                    >
                      {isAnimating && animationType === 'phase-rotation' ? 'PAUSE LOOP' : 'RUN PHASE LOOP'}
                    </button>
                  </div>
                  <p className="font-serif text-sm text-[var(--sumi-3)] italic leading-relaxed">
                    * In the phase loop, &phi; cycles continuously. Notice the probabilities P(|0⟩) and P(|1⟩) do not change because phase only represents relative rotation on the equator.
                  </p>
                </div>
              )}

              {/* Tab 2: Algorithms / Gates */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-light text-[var(--sumi)]">
                    Quantum Gate Operations
                  </h3>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    Algorithms operate by rotating the state vector using logical gates. Try applying these preset operations below and observe the animated path of the vector:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={applyHadamardGate}
                      className="btn-seal text-[10px] py-2 flex flex-col items-center justify-center gap-1"
                    >
                      <span className="font-bold">Hadamard (H)</span>
                      <span className="text-[9px] text-[var(--sumi-3)]">Creates Superposition</span>
                    </button>
                    
                    <button 
                      onClick={applyPhaseGate}
                      className="btn-seal text-[10px] py-2 flex flex-col items-center justify-center gap-1"
                    >
                      <span className="font-bold">Phase Gate (S)</span>
                      <span className="text-[9px] text-[var(--sumi-3)]">Rotates phase +90°</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Decoherence */}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-light text-[var(--sumi)] text-[var(--vermilion)]">
                    Environmental Decoherence
                  </h3>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    In a real quantum computer, environmental noise causes qubits to lose their quantum properties, 
                    a process known as **decoherence**. 
                  </p>
                  <p className="font-serif text-sm text-[var(--sumi-2)] leading-relaxed">
                    Notice how the vector magnitude $r$ shrinks. As the vector approaches the center ($r = 0$), 
                    the state ceases to be a pure quantum state and collapses into a classical mixed state.
                  </p>
                  
                  <div className="p-3 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--sumi-2)]">Decoherence Decay</span>
                    <button
                      onClick={() => {
                        if (r <= 0.05) setR(1.0);
                        setAnimationType('decoherence');
                        setIsAnimating(!isAnimating);
                      }}
                      className="btn-primary text-[9px] py-1 px-3"
                    >
                      {isAnimating && animationType === 'decoherence' ? 'STOP DECAY' : r <= 0.05 ? 'RESET & RUN DECAY' : 'RUN DECAY LOOP'}
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Bottom Panel: Summary (Flat Card) */}
        <div className="mt-12 bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-8 md:p-12 space-y-6">
          <h2 className="text-2xl font-serif font-light text-[var(--sumi)]">Quantum Architecture Context</h2>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)]">
            While single-qubit manipulation forms the building blocks of quantum information, practical computational advantage 
            requires scaling to hundreds of thousands of coherent physical qubits. The ultimate boundary lies at the intersection of 
            quantum error correction (scaling up physical-to-logical qubit ratios) and maintaining coherence times long enough 
            to perform deep gate depth sequences before decoherence collapses the system.
          </p>
          
          <div className="pt-4">
            <Link href="/" className="btn-seal">
              &larr; BACK TO HOME
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
