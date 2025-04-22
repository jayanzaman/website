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
    <div className="border border-[#E5E5E5] rounded-lg p-5 my-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center cursor-pointer ${index <= currentStep ? 'text-[#FF5F00]' : 'text-gray-400'}`}
            onClick={() => setCurrentStep(index)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              index <= currentStep ? 'bg-[#1A1A1A] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {index + 1}
            </div>
            <div className="text-xs text-center max-w-[150px] hover:whitespace-normal hover:overflow-visible hover:z-10" title={step.title}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[200px] border border-[#E5E5E5]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">{steps[currentStep].title}</h3>
          <p className="text-[#4A4A4A]">{steps[currentStep].description}</p>
          {steps[currentStep].icon && (
            <div className="flex justify-center mt-6">
              <div className="text-4xl">{steps[currentStep].icon}</div>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md text-sm ${
            currentStep === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-[#1A1A1A] text-white hover:bg-[#FF5F00]'
          }`}
        >
          Previous
        </button>
        <div className="text-sm text-[#4A4A4A] flex items-center">
          Step {currentStep + 1} of {steps.length}
        </div>
        <button 
          onClick={nextStep} 
          disabled={currentStep === steps.length - 1}
          className={`px-4 py-2 rounded-md text-sm ${
            currentStep === steps.length - 1 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-[#1A1A1A] text-white hover:bg-[#FF5F00]'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
