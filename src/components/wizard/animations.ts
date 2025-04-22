import type { Variants } from 'motion/react';

export const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const stepAnimation: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export const contentAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const navigationAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const stepIndicatorAnimation: Variants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const stepConnectorAnimation: Variants = {
  initial: {
    opacity: 0.5,
    scaleX: 0,
    transformOrigin: 'left',
    width: 0,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    width: '100%',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  inactive: {
    opacity: 0.5,
    scaleX: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const stepDotAnimation: Variants = {
  animate: {
    backgroundColor: '#000',
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    backgroundColor: '#fff',
  },
};

export const stepDotTextAnimation: Variants = {
  animate: {
    color: '#fff',
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    color: '#000',
  },
};

export const teammateAnimation: Variants = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};
