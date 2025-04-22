'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { Plan } from '@/store/use-wizard-store';

type PlanCardProps = {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
};

export function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md select-none',
        isSelected && 'border-primary ring-2 ring-primary ring-opacity-50'
      )}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto mb-0">
        <div
          className={cn(
            'w-full py-2 text-center rounded-md text-sm font-medium ',
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </div>
      </CardFooter>
    </Card>
  );
}
