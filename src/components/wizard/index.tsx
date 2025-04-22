'use client';

import { ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { StepsIndicator } from './steps-indicator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useWizardSteps } from '@/hooks/use-wizard-steps';
import { motion, AnimatePresence } from 'motion/react';
import {
  containerAnimation,
  stepAnimation,
  contentAnimation,
  navigationAnimation,
} from './animations';
import { STEPS } from '@/constants/wizard';
import { createElement } from 'react';

export function Wizard() {
  const {
    activeStep,
    isFirstStep,
    isLastStep,
    handleNext,
    handleBack,
    isStepValid,
  } = useWizardSteps();

  return (
    <motion.div className="w-full" {...containerAnimation}>
      <StepsIndicator steps={STEPS} activeStep={activeStep} />

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[activeStep].title}</CardTitle>
          <CardDescription>
            Step {activeStep + 1} of {STEPS.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-fit min-h-70">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep}
              variants={stepAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div {...contentAnimation}>
                {createElement(STEPS[activeStep].component)}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <motion.div
        className="flex justify-between mt-6 gap-12 m-auto items-center"
        {...navigationAnimation}
      >
        {isFirstStep ? (
          <div className="hidden lg:flex" />
        ) : (
          <Button
            className="w-full flex-1 lg:max-w-32"
            variant="outline"
            onClick={handleBack}
          >
            <ChevronLeft className="ml-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          className="w-full flex-2 lg:max-w-32"
          onClick={handleNext}
          disabled={!isStepValid}
        >
          {isLastStep ? 'Finish' : 'Next'}
          {isLastStep ? (
            <PartyPopper className="h-4 w-4" />
          ) : (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
