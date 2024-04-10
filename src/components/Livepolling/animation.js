export const menuSlide = {
  initial: {
    x: 'calc(100% + 100px)',
  },
  enter: {
    x: '0%',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: 'calc(100% + 100px)',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slide = {
  initial: {
    x: '80px',
  },
  enter: {
    x: '0px',
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: '80px',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
