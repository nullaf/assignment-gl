'use client';

import { useCallback, useMemo } from 'react';
import { useWizardStore } from '@/store/use-wizard-store';
import { toast } from 'sonner';
import { billingSchema, teammateSchema } from '@/schemas/wizard-schemas';

type StepValidation = {
  validate: () => boolean;
  errorMessage?: string;
};

export const useWizardSteps = () => {
  const { activeStep, selectedPlan, billingInfo, teammates, setActiveStep } =
    useWizardStore();

  const stepValidations = useMemo<Record<number, StepValidation>>(
    () => ({
      0: {
        validate: () => {
          return selectedPlan !== '';
        },
        errorMessage: 'Please select a valid plan to continue',
      },
      1: {
        validate: () => {
          const result = billingSchema.safeParse(billingInfo);
          return result.success;
        },
        errorMessage: 'Please complete all billing information correctly',
      },
      2: {
        validate: () => {
          if (teammates.length === 0) return true;
          const results = teammates.map((email) =>
            teammateSchema.safeParse({ email })
          );
          return results.every((result) => result.success);
        },
        errorMessage: 'Please ensure all teammate emails are valid',
      },
    }),
    [selectedPlan, billingInfo, teammates]
  );

  const isStepValid = useMemo(() => {
    return stepValidations[activeStep]?.validate();
  }, [activeStep, stepValidations]);

  const validateStep = useCallback(
    (showToast = true) => {
      const currentValidation = stepValidations[activeStep];
      if (!currentValidation) return true;

      const isValid = currentValidation.validate();

      if (!isValid && showToast && currentValidation.errorMessage) {
        toast.error(currentValidation.errorMessage);
      }

      return isValid;
    },
    [activeStep, stepValidations]
  );

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === Object.keys(stepValidations).length - 1;

  const handleSubmit = useCallback(() => {
    const data = {
      plan: selectedPlan,
      billing: billingInfo,
      teammates,
    };

    // In a real app, you would submit this data to an API, ideally with React Query along with error handling.
    console.log('Collected Data:', data);
    toast.success(
      "All done! You've completed the onboarding process. Submited data is logged in console."
    );
  }, [selectedPlan, billingInfo, teammates]);

  const handleNext = useCallback(async () => {
    const isValid = validateStep();
    if (isLastStep) {
      handleSubmit();
      return;
    }
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  }, [validateStep, isLastStep, handleSubmit, setActiveStep, activeStep]);

  return {
    isStepValid,
    handleNext,
    handleBack,
    isFirstStep,
    isLastStep,
    activeStep,
  };
};
