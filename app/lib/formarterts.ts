export const percentageFormarter = (number: number) => {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 0, // Minimum number of decimal places
    maximumFractionDigits: 0, // Maximum number of decimal places
  }).format(number);
};

export const currencyFormarter = (amount: number) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  return currencyFormatter.format(amount);
};

export const numberFormarter = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(amount);
};

export const compactFormarter = (number: number) => {
  const largeNumber = 1234567890;
  const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  return compactFormatter.format(largeNumber);
};
