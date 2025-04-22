import { z } from 'zod';

export const planSchema = z.object({
  plan: z.string().refine((plan) => plan.trim().length > 0, {
    message: 'Plan is required',
  }),
});

// Advanced card validation is possible, skipping for this assignment
export const billingSchema = z.object({
  cardNumber: z
    .string()
    .min(19, 'Card number must be 16 digits')
    .max(19, 'Card number must be 16 digits')
    .regex(
      /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      'Card number must be in the format 1234 1234 1234 1234'
    ),
  expirationDate: z
    .string()
    .min(5, 'Expiration date must be in the format MM/YY')
    .max(5, 'Expiration date must be in the format MM/YY')
    .regex(/^\d{2}\/\d{2}$/, 'Expiration date must be in the format MM/YY')
    .refine((date) => {
      const [month, year] = date.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      // Check if month is valid (1-12)
      if (month < 1 || month > 12) return false;

      // Check if card is not expired
      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;

      return true;
    }, 'Card has expired or invalid date format'),
  cvc: z
    .string()
    .min(3, 'CVC must be 3 digits')
    .max(3, 'CVC must be 3 digits')
    .regex(/^\d+$/, 'CVC must contain only digits'),
});

export const teammateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type PlanFormValues = z.infer<typeof planSchema>;
export type BillingFormValues = z.infer<typeof billingSchema>;
export type TeammateFormValues = z.infer<typeof teammateSchema>;
