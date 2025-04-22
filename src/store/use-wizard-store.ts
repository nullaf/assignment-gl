import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Step = {
  title: string;
  component: React.FC;
};

export type Plan = {
  name: string;
  price: string;
  features: string[];
};

export type BillingInfo = {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

type WizardState = {
  activeStep: number;
  selectedPlan: string;
  billingInfo: BillingInfo;
  teammates: string[];

  // Actions
  setActiveStep: (step: number) => void;
  selectPlan: (plan: string) => void;
  updateBillingInfo: (info: Partial<BillingInfo>) => void;
  addTeammate: (email: string) => void;
  removeTeammate: (email: string) => void;
  reset: () => void;
};

const initialState = {
  activeStep: 0,
  selectedPlan: '',
  billingInfo: {
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  },
  teammates: [],
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...initialState,

      setActiveStep: (step) => set({ activeStep: step }),

      selectPlan: (plan) => set({ selectedPlan: plan }),

      updateBillingInfo: (info) =>
        set((state) => ({
          billingInfo: { ...state.billingInfo, ...info },
        })),

      addTeammate: (email) =>
        set((state) => ({
          teammates: [...state.teammates, email],
        })),

      removeTeammate: (email) =>
        set((state) => ({
          teammates: state.teammates.filter((e) => e !== email),
        })),

      reset: () => set(initialState),
    }),
    {
      // Billing info is sensitive so we don't persist it therefore not persisting active step too
      name: 'wizard-store',
      partialize: (state) => ({
        selectedPlan: state.selectedPlan,
        teammates: state.teammates,
      }),
    }
  )
);
