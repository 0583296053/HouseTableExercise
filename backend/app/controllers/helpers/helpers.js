class NotFoundError extends Error { };

const percentage = (partialValue, totalValue) => {
  // Calculate percentage
  return (100 * partialValue) / totalValue;
};

const ratio = (num1, num2) => {
  // Calculate ratio of 2 numbers
  for (let num = num2; num > 1; num--) {
    if ((num1 % num) == 0 && (num2 % num) == 0) {
      num1 = num1 / num;
      num2 = num2 / num;
    }
  }
  const ratio = num1 / num2;
  return ratio;
};

const ratio2Percentage = (ratio) => {
  // convert ratio to percentage
  return ratio * 100;
};

const percentage2Ratio = (percentage) => {
  // convert percentage to ratio
  return percentage / 100;
};

module.exports = {
  NotFoundError,
  percentage,
  ratio,
  ratio2Percentage,
  percentage2Ratio
};
