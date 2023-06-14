class NotFoundError extends Error { };

const ratio = (num1, num2) => {
  for (let num = num2; num > 1; num--) {
    if ((num1 % num) == 0 && (num2 % num) == 0) {
      num1 = num1 / num;
      num2 = num2 / num;
    }
  }
  const ratio = num1 / num2;
  return ratio;
};

const per = (num, amount) => {
  return (amount / 100) * num;
};

module.exports = {
  NotFoundError,
  ratio,
  per
};
