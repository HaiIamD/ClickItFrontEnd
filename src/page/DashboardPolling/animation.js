export const popUp = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};
export const latterAnimated = {
  initial: {
    y: 300,
  },
  animate: {
    y: 0,
    transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
  },
};
