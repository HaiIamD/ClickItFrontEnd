export const latter = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export const latterAnimated = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
  },
};

export const image = {
  initial: {
    y: 600,
  },
  animate: {
    y: 0,
    transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 2.5 },
  },
};
