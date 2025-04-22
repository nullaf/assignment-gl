'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { stepConnectorAnimation } from '../animations';

type StepContentProps = {
  title: string;
  index: number;
  activeStep: number;
  totalSteps: number;
};

export function StepContent({
  title,
  index,
  activeStep,
  totalSteps,
}: StepContentProps) {
  return (
    <div className="space-y-1 relative w-full whitespace-nowrap h-11">
      <div
        className={cn(
          'text-sm font-medium',
          index === activeStep ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          'text-xs',
          index === activeStep
            ? 'text-muted-foreground'
            : 'text-muted-foreground/60'
        )}
      >
        {`Step ${index + 1} of ${totalSteps}`}
      </div>
      {index < totalSteps - 1 && (
        <>
          <div
            className="absolute top-[-30px] left-[55%] h-1 bg-muted -z-1"
            style={{ width: 'calc(100% - 1.5rem)' }}
          />
          <motion.div
            className={cn(
              'absolute top-[-30px] left-[55%] h-1 -z-1',
              index < activeStep ? 'bg-primary' : 'bg-transparent'
            )}
            style={{ width: 'calc(100% - 1.5rem)' }}
            variants={stepConnectorAnimation}
            initial="initial"
            animate={index < activeStep ? 'animate' : 'inactive'}
          />
        </>
      )}
    </div>
  );
}
