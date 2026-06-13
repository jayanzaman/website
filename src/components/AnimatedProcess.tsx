// src/components/AnimatedProcess.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface AnimatedProcessProps {
  steps: Step[];
}

export default function AnimatedProcess({ steps }: AnimatedProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="border border-[var(--paper-edge)] rounded-[2px] p-6 my-8 bg-[var(--paper)] transition-colors">
      
      {/* Step Indicator Header */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-8 border-b border-[var(--rule)] pb-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <button 
              key={index}
              className='flex-grow md:flex-grow-0 flex items-center gap-3 text-left focus:outline-none group'
              onClick={() => setCurrentStep(index)}
            >
              {/* Step number block (Flat design, 2px border-radius max) */}
              <div className={`w-8 h-8 rounded-[2px] border flex items-center justify-center font-mono text-xs transition-all ${
                isActive 
                  ? 'bg-[var(--vermilion)] border-[var(--vermilion)] text-[var(--paper)]'
                  : isCompleted
                    ? 'border-[var(--sumi)] text-[var(--sumi)]'
                    : 'border-[var(--paper-edge)] text-[var(--sumi-3)]'
              }`}>
                {index + 1}
              </div>

              {/* Step Title */}
              <div className="space-y-0.5">
                <div className={`label-mono text-[10px] tracking-[0.06em] ${
                  isActive ? 'text-[var(--vermilion)]' : 'text-[var(--sumi-3)]'
                }`}>
                  STEP 0{index + 1}
                </div>
                <div className={`font-serif text-[14px] leading-tight transition-colors group-hover:text-[var(--vermilion)] ${
                  isActive ? 'text-[var(--sumi)] font-medium' : 'text-[var(--sumi-2)]'
                }`}>
                  {step.title.split(' (')[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Step Content Card */}
      <div className="bg-[var(--paper-deep)] rounded-[2px] p-6 md:p-8 border border-[var(--paper-edge)] min-h-[220px] flex flex-col justify-between">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-serif text-[var(--sumi)] font-light">
              {steps[currentStep].title}
            </h3>
            {steps[currentStep].icon && (
              <span className="text-2xl filter grayscale opacity-65 select-none" aria-hidden="true">
                {steps[currentStep].icon}
              </span>
            )}
          </div>
          <p className="font-serif text-[16px] leading-[1.65] text-[var(--sumi-2)] max-w-3xl">
            {steps[currentStep].description}
          </p>
        </motion.div>
      </div>
      
      {/* Stepper Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          className="btn-ghost text-xs px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &larr; PREVIOUS
        </button>
        
        <div className="label-mono text-[11px] text-[var(--sumi-3)] select-none">
          Step {currentStep + 1} of {steps.length}
        </div>
        
        <button 
          onClick={nextStep} 
          disabled={currentStep === steps.length - 1}
          className="btn-seal text-xs px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          NEXT &rarr;
        </button>
      </div>
    </div>
  );
}
