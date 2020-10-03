export const toFahrenheit = (num) => {
  const res = (num - 273.15) * 1.8 + 32;
  return res.toFixed(0);
};
