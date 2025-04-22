'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '@/store/use-wizard-store';
import { planSchema, type PlanFormValues } from '@/schemas/wizard-schemas';
import { PlanCard } from '@/components/wizard/plan/plan-card';
import { Form } from '@/components/ui/form';
import { PLANS } from '@/constants/wizard';

export function ChoosePlan() {
  const { selectedPlan, selectPlan } = useWizardStore();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: selectedPlan || '',
    },
  });

  const handlePlanSelection = (planName: string) => {
    selectPlan(planName);
    form.setValue('plan', planName);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <p className="text-muted-foreground">
          Select the plan that works best for your needs.
        </p>
        <div
          className="grid gap-6 lg:grid-cols-3"
          role="radiogroup"
          aria-label="Subscription plans"
        >
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === plan.name}
              onSelect={() => handlePlanSelection(plan.name)}
            />
          ))}
        </div>
      </form>
    </Form>
  );
}
