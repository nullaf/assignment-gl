'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '@/store/use-wizard-store';
import {
  billingSchema,
  type BillingFormValues,
} from '@/schemas/wizard-schemas';
import { Form } from '@/components/ui/form';
import { BillingFormField } from '../billing/billing-form-field';
import {
  formatCardNumber,
  formatExpirationDate,
} from '@/utils/billing-formatters';

export function BillingInfo() {
  const { billingInfo, updateBillingInfo } = useWizardStore();

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: billingInfo,
    mode: 'onChange',
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      if (Object.values(value).some(Boolean)) {
        updateBillingInfo(value as BillingFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateBillingInfo]);

  return (
    <Form {...form}>
      <form className="space-y-6" aria-label="Billing Information Form">
        <p className="text-muted-foreground">
          Enter your payment details to continue.
        </p>
        <div className="space-y-2">
          <BillingFormField
            control={form.control}
            name="cardNumber"
            label="Credit Card Number"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            formatter={formatCardNumber}
          />

          <div className="grid grid-cols-2 gap-4">
            <BillingFormField
              control={form.control}
              name="expirationDate"
              label="Expiration Date"
              placeholder="MM/YY"
              maxLength={5}
              formatter={formatExpirationDate}
            />

            <BillingFormField
              control={form.control}
              name="cvc"
              label="CVC"
              placeholder="123"
              maxLength={3}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            By clicking "Next", you agree to our{' '}
            <a
              className="text-primary hover:underline font-medium"
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              className="text-primary hover:underline font-medium"
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </Form>
  );
}
