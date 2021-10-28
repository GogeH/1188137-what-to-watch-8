export const getRandomInteger = (a = 0, b = 1): number => {
  const upper = Math.floor(Math.max(a, b));
  const lower = Math.ceil(Math.min(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
