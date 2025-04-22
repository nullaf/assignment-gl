import { InviteTeammates } from '@/components/wizard/steps/invite-teammates';
import { ChoosePlan } from '@/components/wizard/steps/choose-plan';
import { Plan, Step } from '@/store/use-wizard-store';
import { BillingInfo } from '@/components/wizard/steps/billing-info';

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$9/month',
    features: ['5 Projects', '10GB Storage', 'Basic Support', '1 Team Member'],
  },
  {
    name: 'Professional',
    price: '$29/month',
    features: [
      '15 Projects',
      '50GB Storage',
      'Priority Support',
      '5 Team Members',
      'Advanced Analytics',
    ],
  },
  {
    name: 'Enterprise',
    price: '$99/month',
    features: [
      'Unlimited Projects',
      '500GB Storage',
      '24/7 Support',
      'Unlimited Team Members',
      'Advanced Analytics',
      'Custom Integrations',
    ],
  },
];

export const STEPS: Step[] = [
  {
    title: 'Choose a Plan',
    component: ChoosePlan,
  },
  {
    title: 'Set Up Billing',
    component: BillingInfo,
  },
  {
    title: 'Invite Teammates',
    component: InviteTeammates,
  },
];
