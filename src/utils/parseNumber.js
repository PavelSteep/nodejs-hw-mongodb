export const parseNumber = (value, defaultValue) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return defaultValue;
  }

  return number;
};
