import type React from 'react';
import { Control } from 'react-hook-form';
import type { BillingFormValues } from '@/schemas/wizard-schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  control: Control<BillingFormValues>;
  name: keyof BillingFormValues;
  label: string;
  placeholder: string;
  maxLength: number;
  formatter?: (value: string) => string;
}

export const BillingFormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  maxLength,
  formatter,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            maxLength={maxLength}
            onChange={(e) => {
              const value = formatter
                ? formatter(e.target.value)
                : e.target.value.replace(/\D/g, '');
              field.onChange(value);
            }}
            aria-label={label}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);