'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { stepDotAnimation, stepDotTextAnimation } from '../animations';

type StepDotProps = {
  index: number;
  activeStep: number;
};

export function StepDot({ index, activeStep }: StepDotProps) {
  const isActive = index <= activeStep;
  const isCompleted = index < activeStep;
  return (
    <motion.div
      className={cn(
        'h-10 w-10 rounded-full flex items-center justify-center border-2 mb-2',
        {
          'border-primary bg-primary text-primary-foreground': isActive,
          'border-muted-foreground text-muted-foreground': !isActive,
        }
      )}
      initial={false}
      variants={stepDotAnimation}
    >
      <motion.div initial={false} variants={stepDotTextAnimation}>
        {isCompleted ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
      </motion.div>
    </motion.div>
  );
}
