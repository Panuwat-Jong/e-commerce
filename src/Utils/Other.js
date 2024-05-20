export const calDiscountPercentage = (price, discountPercentage) => {
  let sum = 0;
  sum = Math.round((price * (100 - discountPercentage)) / 100);
  return sum;
};
