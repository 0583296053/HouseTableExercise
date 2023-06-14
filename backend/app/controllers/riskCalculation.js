const { ratio, per } = require('./helpers');

const riskCalculation = (currentValue, loanAmount) => {
  const risk = ratio(loanAmount, currentValue);

  if (per(currentValue, loanAmount)) {
    risk += _per(risk, 10);
  }

  return risk;
};

module.exports = {
  riskCalculation
};
