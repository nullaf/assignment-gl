'use client';

import { StepDot } from './step-dot';
import { StepContent } from './step-content';
import { motion } from 'motion/react';
import { stepIndicatorAnimation } from '../animations';

type Step = {
  title: string;
};

type StepsIndicatorProps = {
  steps: Step[];
  activeStep: number;
};

export function StepsIndicator({ steps, activeStep }: StepsIndicatorProps) {
  return (
    <motion.div
      className="w-full mb-6"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center w-full relative"
            variants={stepIndicatorAnimation}
            initial="initial"
            animate={index <= activeStep ? 'animate' : 'inactive'}
          >
            <StepDot index={index} activeStep={activeStep} />
            <StepContent
              title={step.title}
              index={index}
              activeStep={activeStep}
              totalSteps={steps.length}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
