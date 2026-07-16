export const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: "easeOut" },
  },
};

export const kenBurns = {
  initial: { scale: 1 },
  animate: {
    scale: 1.08,
    transition: { duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const },
  },
};
